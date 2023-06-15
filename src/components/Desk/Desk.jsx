import {AddCard} from "../AddCard/AddCard";
import {Card} from "../Card/Card";
import './Desk.scss'
import {useEffect, useState} from "react";

export const Desk = () => {
    const [cardList, setCardList] = useState(JSON.parse(localStorage.getItem('cards')));
    useEffect(() => {
        window.localStorage.setItem('cards', JSON.stringify(cardList));
    })
    const handleAddNewCard = (data) => {
        setCardList((prevState) => {
            return [...prevState, data]
        })
    }

    const hasId = (arr, value) => {
        for (const arrElement of arr) {
            if (arrElement.id === value) return true;
        }
        return false;
    }

    const updateRows = (cardId, rowId, newText) => {
        setCardList(prevCards => {
            return prevCards.map(card => {
                if (card.id === cardId) {

                    if (newText === null) {
                        return {
                            ...card, rows: card.rows.filter(row => row.id !== rowId)
                        }
                    }

                    if (hasId(card.rows, rowId)) {
                        return {
                            ...card, rows: card.rows.map(row => {
                                if (row.id === rowId) {
                                    return {...row, text: newText};
                                }
                                return row;
                            })
                        }
                    }
                    
                    return {
                        ...card, rows: [...card.rows, {id: rowId, text: newText}]
                    };

                }
                return card;
            });
        });
    };

    return (<div className="desk">
            {cardList.map(card => <Card card={card} key={card.id} id={card.id} onUpdateRow={updateRows}/>)}
            <AddCard type="addCard" onAdd={handleAddNewCard}/>
        </div>)
}