import React, { useState } from 'react';
import { SubmitButton } from 'components/text-editor/SubmitButton';
import 'styles/text-editor.css';
import ContentEditable from 'react-contenteditable'

export const TextEditor = ({passValue}) => {
  const [value, setValue] = useState('');
  const setValueHandler = (newValue) => {
    setValue(newValue);
  }
  const onClick = () => {
    setValue(document.getElementById("text-field").textContent);
    return document.getElementById("text-field").textContent;
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const pass = (newValue) => {
    passValue(newValue)
  }
  return (
    <div className="editor-wrapper">
      <div className="scroll-container">
        <div
          data-placeholder="Start typing your paragraph here..."
          spellCheck={false}
          id="text-field"
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
      <SubmitButton setValueHandler={setValueHandler} onClick={onClick} pass={pass}/>
    </div>
  );
}