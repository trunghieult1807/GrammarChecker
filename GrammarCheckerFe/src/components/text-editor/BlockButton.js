import React from 'react';
import Icon from 'react-icons-kit';
import { toggleBlock } from 'components/text-editor/CustomEditor';

export const BlockButton = ({ format, icon, editor }) => {
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
            className="tooltip-icon-button"
        >
            <Icon icon={icon} />
        </button>
    )
}