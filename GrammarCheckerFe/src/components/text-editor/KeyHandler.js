import { toggleMark } from 'components/text-editor/CustomEditor'

export const KeyHandler = (event, editor) => {

    if (!event.ctrlKey) {
        return
    }

    event.preventDefault()

    switch (event.key) {
        case 'b': {
            toggleMark(editor, 'bold')
            break
        }
        case 'i': {
            toggleMark(editor, 'italic')
            break
        }
        default:
    }

}