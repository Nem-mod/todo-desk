import useComponentVisible from "../../utils/utils";
import {useEffect, useState} from "react";
import './EditField.scss'

export const EditField = (props) => {
    const {ref, isComponentVisible} = useComponentVisible(true);
    const [editText, setEditText] = useState(props.basicValue)
    useEffect(() => props.handleClose(isComponentVisible));

    const handleConfirmEdit = () => {
        if (!editText) {
            return;
        }
        props.onUpdateRow(props.id, editText);
        props.setTextContent(editText);
        props.handleClose(!isComponentVisible);
    }
    const handleInput = (element) => {
        setEditText(element.target.value);
        element.target.style.height = '5px';
        element.target.style.height = (element.target.scrollHeight) + "px";
    }

    const deleteElem = () => {
        props.onUpdateRow(props.id, null);
    }
    return (
        <form style={
            {
                width: props.posData.width,
                position: 'absolute',
                top: props.posData.top + 'px',
                left: props.posData.left + 'px'
            }

        } className="edit-field">
            <div ref={ref}>
                <div className="edit-field__input">
                    <textarea onInput={handleInput} defaultValue={props.basicValue}></textarea>
                </div>
                <div className="edit-field__buttons">
                    <div onClick={handleConfirmEdit} className="edit-field__add-button button">
                        <a>{props.title}</a>
                    </div>
                    <div onClick={deleteElem} className="edit-field__delete-button button">
                        <a>Delete</a>
                    </div>
                </div>
            </div>
            <div className="bg-shade"></div>
        </form>
    )
}