import React, { useState } from "react";
import Form from "./Form";
import getDayDescription, { LoadingState } from "./DayDescription";

const App: React.FC = () => {
    const [loading, setLoading] = useState(LoadingState.WAITING);
    const handleSubmit = async (itineraryId: string, day: string): Promise<string> => {
        const handleSetLoading = (value: LoadingState) => {
            setLoading(value);
        };

        return await getDayDescription({ itineraryId, day, setLoading: handleSetLoading });
    };

    return (
        <div
            className="app"
            style={{
                width: "100vw",
                height: "100vh",
                display: "grid",
                placeContent: "center",
            }}
        >
            <h1>Day description generator</h1>
            <Form onSubmit={handleSubmit} loading={loading} />
        </div>
    );
};

export default App;
