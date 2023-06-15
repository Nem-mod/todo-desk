import './TodoList.scss'
import {TodoElement} from "../TodoElement/TodoElement";

export const TodoList = ({card, cardRows, onUpdateRow, dragInterface}) => {
    return (
        <ul className="list">
            {cardRows.map(row => <TodoElement
                card={card}
                dragInterface={dragInterface}
                key={row.id}
                row={row}
                onUpdateRow={onUpdateRow}/>)}
        </ul>
    )
}