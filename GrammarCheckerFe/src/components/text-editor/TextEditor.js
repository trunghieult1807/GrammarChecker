import React, { useMemo, useState, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import {
  ic_format_bold,
  ic_format_italic,
  ic_format_underlined,
  ic_code,
  ic_format_quote,
  ic_format_list_numbered,
  ic_format_list_bulleted
} from 'react-icons-kit/md';
import { BlockButton } from 'components/text-editor/BlockButton';
import { Leaf } from 'components/text-editor/Leaf';
import { KeyHandler } from 'components/text-editor/KeyHandler';
import { FormatToolbar } from 'components/text-editor/FormatToolbar';
import { MarkButton } from 'components/text-editor/MarkButton';
import { DefaultElement } from 'components/text-editor/DefaultElement';
import { initialValue } from '@fake-db/TextEditorDb';
import { SubmitButton } from 'components/text-editor/SubmitButton';
import 'styles/text-editor.css';

export const TextEditor = () => {

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback(props => {
    return <DefaultElement {...props} />
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onKeyDown = (event) => KeyHandler(event, editor)

  return (
    <div className="editor-wrapper">
      <FormatToolbar>
        <MarkButton format="bold" icon={ic_format_bold} editor={editor} />
        <MarkButton format="italic" icon={ic_format_italic} editor={editor} />
        <MarkButton format="underline" icon={ic_format_underlined} editor={editor} />
        <MarkButton format="code" icon={ic_code} editor={editor} />
        <BlockButton format="block-quote" icon={ic_format_quote} editor={editor} />
        <BlockButton format="numbered-list" icon={ic_format_list_numbered} editor={editor} />
        <BlockButton format="bulleted-list" icon={ic_format_list_bulleted} editor={editor} />
      </FormatToolbar>
      <Slate editor={editor} value={value} onChange={(value) => { setValue(value) }} >
        <Editable
          style={{ maxHeight: "450px", overflowY: "scroll" }}
          placeholder="Paste in your paragraph..."
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown} />
      </Slate>
      <SubmitButton input={value} />
    </div>
  )
}