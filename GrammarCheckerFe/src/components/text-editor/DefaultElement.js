import React from 'react';
import 'styles/text-editor.css';

export const DefaultElement = ({ attributes, children, element }) => {
    console.log('abc')
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'paragraph highlight':
            return <p className='highlight' {...attributes}>{children}</p>
        case 'block-quote highlight':
            return <blockquote className='highlight' {...attributes}>{children}</blockquote>
        case 'bulleted-list highlight':
            return <ul className='highlight' {...attributes}>{children}</ul>
        case 'heading-one highlight':
            return <h1 className='highlight' {...attributes}>{children}</h1>
        case 'heading-two highlight':
            return <h2 className='highlight' {...attributes}>{children}</h2>
        case 'list-item highlight':
            return <li className='highlight' {...attributes}>{children}</li>
        case 'numbered-list highlight':
            return <ol className='highlight' {...attributes}>{children}</ol>
        default:
            {
                console.log('addadada')
                return <p {...attributes}>{children}</p>
            }
            
    }
}