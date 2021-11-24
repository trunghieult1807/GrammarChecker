import React from 'react';
import Icon from 'react-icons-kit';
import { toggleMark } from 'components/text-editor/CustomEditor';

export const MarkButton = ({ format, icon, editor }) => {
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            className="tooltip-icon-button"
        >
            <Icon icon={icon} />
        </button>
    )
}