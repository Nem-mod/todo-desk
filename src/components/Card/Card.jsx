import {TodoList} from "../TodoList/TodoList";
import './Card.scss'
import {AddButton} from "../AddButton/AddButton";
import {useState} from "react";
import {AddField} from "../AddField/AddField";

export const Card = ({card, onUpdateRow, dragInterface}) => {
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
        <div className="desk-card">
            <div className="desk-card__header">
                <div className="desk-card_title">{card?.title}</div>
            </div>
            <div className="desk-card__cards"
                 onDragOver={e => dragInterface.handleDragOver(e)}
                 onDrop={e => dragInterface.handleDropCard(e, card)}
            >
                {card?.rows &&
                    <TodoList
                        card={card}
                        cardRows={card.rows}
                        dragInterface={dragInterface}
                        onUpdateRow={handleUpdateRow}
                        onDeleteRow={handleDeleteElem}/>}

                {!isComponentVisible &&
                    <AddButton
                        onClick={handleOpen}
                        title={'Add a new row'}/>}

                {isComponentVisible &&
                    <AddField title=" Add a row" cardId={card.id} onAdd={handleUpdateRow}
                              handleClose={setIsComponentVisible}/>}
            </div>
        </div>
    )
}