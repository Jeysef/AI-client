import React, { useState } from "react";
import getDayDescription, { LoadingState } from "./DayDescription";

const Form: React.FC = () => {
    const [itineraryId, setItineraryId] = useState("");
    const [day, setDay] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(LoadingState.WAITING);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(LoadingState.LOADING);
        const resultString = await getDayDescription({ itineraryId, day, setLoading: (loading) => setLoading(loading) });
        setResult(resultString);
        setItineraryId("");
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

                <label htmlFor="day">Day: (0 - day 1)</label>
                <input type="text" id="day" value={day} onChange={(e) => setDay(e.target.value)} />

                <button type="submit">Submit</button>
                <hr style={{ width: "100%" }} />
                <p>Output:</p>
                {textArea()}
            </form>
        </div>
    );
};

export default Form;
