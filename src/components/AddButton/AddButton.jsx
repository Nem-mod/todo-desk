import plus from "../../resources/plus-icon.png";
import './AddButton.scss'

export const AddButton = (props) => {
	return (
		<a onClick={props.onClick} className="add-content add-box">
			<img className="plus" src={plus} alt="+"/>
			<span>{props.title}</span>
		</a>
	)
}