import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const initialCardState = {
        front: "",
        back: "",
    };

    const [card, setCard] = useState(initialCardState);

    useEffect(() => {
        async function fetchData() {
            const cardResponse = await readCard(cardId);
            setCard(cardResponse);
        }
        fetchData();
    }, [cardId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCard({
            ...card,
            [name]: value,
        });
    };

    const handleCardSubmit = async (updatedCard) => {
        await updateCard(updatedCard);
        history.push(`/decks/${deckId}`);
    };

    return (
        <div>
            <ol className="breadcrumb">
            </ol>
            <CardForm
                card={card}
                handleChange={handleChange}
                handleSubmit={handleCardSubmit}
                handleCancel={() => history.push(`/decks/${deckId}`)}
            />
        </div>
    );
}

export default EditCard;