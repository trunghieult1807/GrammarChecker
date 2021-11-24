from unidecode import unidecode
from model import model
import spacy
import re
from nltk.tokenize.treebank import TreebankWordDetokenizer

from model.predict import predict_for_sentences


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


def predict(input_text):
    """Predicts a correction for an input text and returns the tagged input and output."""
    input_text = unidecode(input_text)
    tokenized_sentences = tokenize_and_segment(input_text)
    corrected_sentences = predict_for_sentences(tokenized_sentences, model)
    correct_untokenized_sentences = [untokenize(sent) for sent in corrected_sentences]

    # tagged_input, tagged_output, stats = get_changes(sentencize(input_text), correct_untokenized_sentences)

    # tagged_input = unsentencize(tagged_input)
    # tagged_output = unsentencize(tagged_output)

    return {"input": input_text, "output": correct_untokenized_sentences}


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
