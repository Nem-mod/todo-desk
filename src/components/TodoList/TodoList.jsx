import './TodoList.scss'
import {TodoElement} from "../TodoElement/TodoElement";

export const TodoList = ({cardRows, onUpdateRow}) => {
    return (
        <ul className="list">
            {cardRows.map(row => <TodoElement
                key={row.id} row={row} onUpdateRow={onUpdateRow}/>)}
        </ul>
    )
}