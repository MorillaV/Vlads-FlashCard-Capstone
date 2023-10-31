import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm"; 

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();
    const initialState = {
        front: "",
        back: "",
    };

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewCard({
            ...newCard,
            [name]: value,
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            { ...newCard },
            abortController.signal
        );
        history.go(0);
        setNewCard(initialState);
        return response;
    }

    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <CardForm
    card={newCard}
    handleChange={handleChange} 
    handleSubmit={handleSubmit}
    handleCancel={handleDone}
            />
        </div>
    );
}

export default AddCard;