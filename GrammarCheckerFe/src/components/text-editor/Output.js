import React, { useState } from 'react';
import { SubmitButton } from 'components/text-editor/SubmitButton';
import 'styles/text-editor.css';
import ContentEditable from 'react-contenteditable'

export const Output = ({value}) => {
  return (
    <div className="editor-wrapper">
      <div className="scroll-container">
        <ContentEditable
          html={value}
          disabled={false}
        />
      </div>
    </div>
  );
}