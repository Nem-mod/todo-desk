import {TodoList} from "../TodoList/TodoList";
import './Card.scss'
import {AddButton} from "../AddButton/AddButton";
import {useState} from "react";
import {AddField} from "../AddField/AddField";

export const Card = ({card, onUpdateRow}) => {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [elementList, setElementList] = useState([]);

    const handleUpdateRow = (rowId, newText) => {
        onUpdateRow(card.id, rowId, newText);
    };

    const handleDeleteElem = (id) => {
		const newList = elementList.filter(e => e.id !== id);
		setElementList(newList);
    }
    const handleOpen = () => {
        setIsComponentVisible(true);
    }

    return (
        <div className="desk-column">
            <div className="desk-column__header">
                <div className="desk-column_title">{card?.title}</div>
            </div>
            <div className="desk-column__cards">
                {card?.rows && <TodoList cardRows={card.rows} onUpdateRow={handleUpdateRow} onDeleteRow={handleDeleteElem}/>}
                {!isComponentVisible && <AddButton onClick={handleOpen} title={'Add a new row'}/>}
                {isComponentVisible &&
                    <AddField title=" Add a card" cardId={card.id} onAdd={handleUpdateRow} handleClose={setIsComponentVisible}/>}
            </div>
        </div>
    )
}