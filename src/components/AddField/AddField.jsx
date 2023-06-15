import useComponentVisible from "../../utils/utils";
import {useEffect, useState} from "react";
import './AddField.scss'
import close from '../../resources/close.png'

export const AddField = ({type, onAdd, handleClose, title, padding}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);
    const [textValue, setTextValue] = useState();
    useEffect(() => handleClose(isComponentVisible));
    const handleInput = (element) => {
        setTextValue(element.target.value);
        element.target.style.height = '5px';
        element.target.style.height = (element.target.scrollHeight) + "px";
    }

    const handleAdd = () => {
        if (!textValue) {
            return
        }
        if (type === 'addCard') {
            onAdd({
                id: Math.floor(Math.random() * (10 ** 10 - 1 + 1)) + 1,
                title: textValue,
                rows: []
            });
            return;
        }

        onAdd(Math.floor(Math.random() * (10 ** 10 - 1 + 1)) + 1, textValue);
        handleClose(setIsComponentVisible(false));

    }


    return (
        <form ref={ref} className="add-field" style={{padding: padding}}>
            <div className="add-field__input">
                <textarea onInput={handleInput}/>
            </div>
            <div className="add-field__buttons">
                <button type={"submit"} onClick={handleAdd} className="add-field__add-button">
                    <span>{title}</span>
                </button>
                <div className="add-field__close-button">
                    <img onClick={() => handleClose(setIsComponentVisible(false))} src={close} alt="X"/>
                </div>
            </div>

        </form>
    )
}