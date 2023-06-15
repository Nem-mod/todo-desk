import './TodoElement.scss';
import editing from '../../resources/editing.png';
import {useState} from "react";
import {EditField} from "../EditField/EditField";

export const TodoElement = ({row, onUpdateRow, onDeleteRow}) => {
    const [editingVisibility, setEditingVisibility] = useState('');
    const [textContent, setTextContent] = useState(row.text);
    const [isEditing, setIsEditing] = useState(false);
    const [posData, setPosData] = useState();



    return (
        <li
            onMouseEnter={() => setEditingVisibility('visible')}
            onMouseLeave={() => setEditingVisibility('')}
            className="list-element">
            {!isEditing && <div className="list-element__content">{textContent}</div>}
            {!isEditing &&
                <div
                    onClick={(element) => {
                        const data = element.target.parentElement.parentElement.getBoundingClientRect();
                        setPosData(data);
                        setIsEditing(true);
                    }}
                    className={"list-element__edit " + editingVisibility}>
                    <img src={editing} alt=""/>
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