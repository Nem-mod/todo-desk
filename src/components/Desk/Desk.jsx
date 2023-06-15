import {AddCard} from "../AddCard/AddCard";
import {Card} from "../Card/Card";
import './Desk.scss'
import {useEffect, useState} from "react";

const hasId = (arr, value) => {
    for (const arrElement of arr) {
        if (arrElement?.id === value) return true;
    }
    return false;
}
export const Desk = () => {

    const dataFromLocalStorage = JSON.parse(localStorage.getItem('cards'));
    const [cardList, setCardList] = useState(dataFromLocalStorage);
    const [currentCard, setCurrentCard] = useState();
    const [currentToDoElement, setCurrentToDoElement] = useState();

    useEffect(() => {
        if (typeof cardList !== "object" || cardList === null)
            setCardList([]);
        window.localStorage.setItem('cards', JSON.stringify(cardList));
    }, [cardList]);

    const handleAddNewCard = (data) => {
        setCardList((prevState) => {
            return [...prevState, data]
        })
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


    const dragNDropInterface = {
        handleDragOver: function (e, card, row) {
            e.preventDefault();
            if (e.target.className === 'list-element')
                e.target.style.boxShadow = '0 1px 1px #fff';
        },

        handleDragStart: function (e, card, row) {
            setCurrentCard(card);
            setCurrentToDoElement(row);
        },

        handleDragLeave: function (e) {
            e.target.style.boxShadow = 'none';
        },

        handleDragEnd: function (e) {
            e.target.style.boxShadow = 'none';
        },

        handleDrop: function (e, card, row) {
            e.preventDefault();
            const currentIndex = currentCard.rows.indexOf(currentToDoElement);
            currentCard.rows.splice(currentIndex, 1);
            const dropIndex = card.rows.indexOf(row);
            card.rows.splice(dropIndex + 1, 0, currentToDoElement);

            setCardList((prevState) => {
                return prevState.map(c => {
                    if (c.id === card.id) {
                        return card;
                    }
                    if (c.id === currentCard.id) {
                        return currentCard;
                    }
                    return c;
                })
            });
        },

        handleDropCard: function (e, card) {
            if (card.rows.length !== 0) {
                return;
            }
            card.rows.push(currentToDoElement);
            const currentIndex = currentCard.rows.indexOf(currentToDoElement);
            currentCard.rows.splice(currentIndex, 1);

            setCardList((prevState) => {
                return prevState.map(c => {
                    if (c.id === card.id) {
                        return card;
                    }
                    if (c.id === currentCard.id) {
                        return currentCard;
                    }
                    return c;
                })
            });
        }


    }

    return (
        <div className="desk">
            {cardList?.map(card => <Card
                card={card}
                key={card.id}
                id={card.id}
                onUpdateRow={updateRows}
                dragInterface={dragNDropInterface}/>)}
            <AddCard type="addCard" onAdd={handleAddNewCard}/>
        </div>
    )
}