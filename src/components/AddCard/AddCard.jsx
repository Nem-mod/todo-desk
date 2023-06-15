import './AddCard.scss'
import {AddButton} from "../AddButton/AddButton";
import {AddField} from "../AddField/AddField";
import {useState} from "react";

export const AddCard = (props) => {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const handleOpen = () => {
        setIsComponentVisible(true);
    }

    return (
        <div className="add-column">
            {!isComponentVisible && <AddButton onClick={handleOpen} title={'Add a new column'}/>}
            {isComponentVisible && <AddField title=" Add a list" type={'addCard'} onAdd={props.onAdd} padding="10px" handleAdd={props.handleAdd} handleClose={setIsComponentVisible}/>}
        </div>

    )
}