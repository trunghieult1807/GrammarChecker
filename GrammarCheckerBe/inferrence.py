from unidecode import unidecode
from model import model
import spacy
import re
from nltk.tokenize.treebank import TreebankWordDetokenizer

from model.predict import predict_for_sentences
from model.utils.preprocess_data import align_sequences, convert_tagged_line

DELIMITER = 'SEPL|||SEPR'
RE_HYPHENS = re.compile(r'(\w) - (\w)')
RE_QUOTES1 = re.compile(r"([\"']) (.*?[^\\])")
RE_QUOTES2 = re.compile(r"(.*?[^\\]) ([\"'])")
RE_QUOTES = re.compile(r"([\"']) (.+) ([\"'])")

nlp = spacy.load("en_core_web_sm")
model = model.load_model(
    vocab_path="model/data/output_vocabulary",
    model_paths=["model/data/model_files/xlnet_0_gector.th"],
    model_name="xlnet"
)


def grammar_checker(input_text):
    """Predicts a correction for an input text and returns the tagged input and output."""
    input_text = unidecode(input_text)
    tokenized_sentences = tokenize_and_segment(input_text)
    corrected_sentences = predict_for_sentences(tokenized_sentences, model)
    correct_untokenized_sentences = [untokenize(sent) for sent in corrected_sentences]

    tagged_input, tagged_output, stats = get_changes(sentencize(input_text), correct_untokenized_sentences)

    tagged_input = unsentencize(tagged_input)
    tagged_output = unsentencize(tagged_output)

    return {
        "input": input_text,
        "output": correct_untokenized_sentences,
        "tagged_input": tagged_input,
        "tagged_output": tagged_output
    }


def sentencize(text):
    return [sent for sent in nlp(text).sents]


def unsentencize(sentences):
    output_text = ' '.join(sent for sent in sentences)
    return output_text


def tokenize_and_segment(input_text):
    """Returns a list of tokenized sentences."""

    doc = nlp(input_text)
    sentences = []
    for sent in doc.sents:
        sentences.append(' '.join(token.text for token in sent))
    return sentences


def untokenize(tokens):
    output_text = TreebankWordDetokenizer().detokenize(tokens)
    output_text = re.sub(RE_HYPHENS, r'\1-\2', output_text)
    output_text = re.sub(RE_QUOTES, r'\1\2\3', output_text)
    return output_text


def get_changes(input_text, output_text):
    """Retrieves the changes made and tags the input and output accordingly."""

    tagged_input = list()
    tagged_output = list()
    stats = {'total': 0, 'add': 0, 'del': 0, 'modif': 0, 'changes': []}
    for i in range(len(input_text)):
        input_sent = input_text[i].text
        input_tokens = input_sent.split()
        output_sent = output_text[i]
        sent_with_tags = align_sequences(input_sent, output_sent)
        target_text, replaced_tok_ids, deleted_tok_ids, edits_for_stats = convert_tagged_line(sent_with_tags)
        stats = get_sent_stats(stats, input_tokens, edits_for_stats)
        tagged_input.append(highlight_changes_input(sent_with_tags, replaced_tok_ids, deleted_tok_ids))
        tagged_output.append(highlight_changes_output(target_text))
    return tagged_input, tagged_output, stats


def get_sent_stats(stats, input_tokens, edits_for_stats: 'List[List[Tuple]]'):
    for edit in edits_for_stats:
        offset, tags = edit
        beg, end = offset
        stats['total'] += len(tags)
        for tag in tags:
            if tag == '$DELETE':
                stats['del'] += 1
            elif tag.startswith('$APPEND'):
                stats['add'] += 1
            elif tag.startswith('$TRANSFORM'):
                stats['changes'].append((input_tokens[beg:end], tag))
                stats['modif'] += 1
            else:
                stats['modif'] += 1
    return stats


def highlight_changes_input(sent_with_tags, replaced_tok_ids, deleted_tok_ids):
    """Returns the input string with css tags."""

    tagged_input_tokens = []
    for idx, token in enumerate(sent_with_tags.split()[1:]):
        token = token.split(DELIMITER)[0]
        if idx in deleted_tok_ids:
            token = add_css_tag(token, 'input_delete')
            deleted_tok_ids = [i + 1 for i in deleted_tok_ids[1:]]  # shift index
            replaced_tok_ids = [i + 1 for i in replaced_tok_ids]
        elif idx in replaced_tok_ids:
            token = add_css_tag(token, 'input_replace')
            replaced_tok_ids = replaced_tok_ids[1:]
        tagged_input_tokens.append(token)
    return ' '.join(tagged_input_tokens)


def highlight_changes_output(target_text):
    """Returns the output string with css tags."""

    tagged_output_tokens = []
    for token in target_text.split():
        if '$_$' in token:
            modif_tag = token.split('$_$')[1]
            token = token.split('$_$')[0]
            if modif_tag == 'REPLACE' or modif_tag == 'TRANSFORM':
                token = add_css_tag(token, 'replace')
            elif modif_tag == 'APPEND':
                token = add_css_tag(token, 'append')
            elif modif_tag == 'PUNCT':
                token = add_css_tag(token, 'punctuation')
        tagged_output_tokens.append(token)
    return ' '.join(tagged_output_tokens)


def add_css_tag(token, modification):
    """Returns a token wrapped with the corresponding css tag."""
    if modification == 'replace':
        token = '<span class=\"delta-replace\">' + token + '<div class=\"show-me\"></div>' + '</span>'
    elif modification == 'delete':
        token = '<span class=\"delta-delete\">' + token + '<div class=\"show-me\"></div>' + '</span>'
    elif modification == 'append':
        token = '<span class=\"delta-insert\">' + token + '<div class=\"show-me\"></div>' + '</span>'
    elif modification == 'punctuation':
        token = token[:-1] + '<span class=\"delta-insert\">' + token[-1] + '<div class=\"show-me\"></div>' + '</span>'
    elif modification == 'input_delete':
        token = '<span class=\"delta-input-delete\">' + token + '<div class=\"show-me\"></div>' + '</span>'
    elif modification == 'input_replace':
        token = '<span class=\"delta-input-replace\">' + token + '<div class=\"show-me\"></div>' + '</span>'
    return token
