import './TodoElement.scss';
import {useState} from "react";
import {EditField} from "../EditField/EditField";

export const TodoElement = ({card, row, onUpdateRow, onDeleteRow, dragInterface}) => {
    const [editingVisibility, setEditingVisibility] = useState('');
    const [textContent, setTextContent] = useState(row.text);
    const [isEditing, setIsEditing] = useState(false);
    const [posData, setPosData] = useState();

    return (
        <li draggable={true}
            onDragOver={e => dragInterface.handleDragOver(e, card, row)}
            onDragLeave={e => dragInterface.handleDragLeave(e)}
            onDragStart={e => dragInterface.handleDragStart(e, card, row)}
            onDragEnd={e => dragInterface.handleDragEnd(e)}
            onDrop={e => dragInterface.handleDrop(e, card, row)}
            onMouseEnter={() => setEditingVisibility('visible')}
            onMouseLeave={() => setEditingVisibility('')}
            className="list-element">
            {!isEditing && <div className="list-element__content">{textContent}</div>}
            {!isEditing &&
                <div
                    onClick={(element) => {
                        const data = element.target.parentElement.getBoundingClientRect();
                        console.log(element.target.parentElement);
                        setPosData(data);
                        setIsEditing(true);
                    }}
                    className={"list-element__edit " + editingVisibility}>
                </div>
            }

            {isEditing && <EditField
                posData={posData} title="  Edit  "
                basicValue={textContent}
                id={row.id}
                handleDelete={onDeleteRow}
                onUpdateRow={onUpdateRow}
                setTextContent={setTextContent}
                handleClose={setIsEditing}/>}

        </li>
    )
}