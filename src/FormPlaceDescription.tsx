import React, { useState } from "react";
import getPlaceDescription, { LoadingState } from "./PlaceDescription";

const Form: React.FC = () => {
    const [itineraryId, setItineraryId] = useState("");
    const [place, setPlace] = useState("");
    const [day, setDay] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(LoadingState.WAITING);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(LoadingState.LOADING);
        const resultString = await getPlaceDescription({ itineraryId, place, day, setLoading: (loading) => setLoading(loading) });
        setResult(resultString);
        setItineraryId("");
        setPlace("");
        setDay("");
    };

    

    const textArea = () => {
        switch (loading) {
            case LoadingState.LOADING:
                return <div className="loader">Loading...</div>;
            case LoadingState.ERROR:
                return <div className="loader">Error</div>;
            case LoadingState.SUCCESS:
                return <textarea className="loader" readOnly value={result} />;
            case LoadingState.WAITING:
            default:
                return <div className="loader">Waiting for submision</div>;
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="itineraryId">Itinerary ID:</label>
                <input type="text" id="itineraryId" value={itineraryId} onChange={(e) => setItineraryId(e.target.value)} />

                <label htmlFor="place">PlaceId:</label>
                <input type="text" id="place" value={place} onChange={(e) => setPlace(e.target.value)} />

                <label htmlFor="day">Day: (optional)</label>
                <input type="text" id="day" value={day} onChange={(e) => setPlace(e.target.value)} />

                <button type="submit">Submit</button>
                <hr style={{ width: "100%" }} />
                <p>Output:</p>
                {textArea()}
            </form>
        </div>
    );
};

export default Form;
