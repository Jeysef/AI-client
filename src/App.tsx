import React from "react";
import FormPlace from "./FormPlaceDescription";
import FormDay from "./FormDayDescription";

const App: React.FC = () => {
    return (
        <div
            className="app"
            style={{
                width: "100vw",
                height: "100vh",
                display: "grid",
                placeContent: "center",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                padding: "4rem",
                boxSizing: "border-box",
            }}
        >
            <div>
                <h1>Place description generator</h1>
                <FormPlace />
            </div>
            <div>
                <h1>Day description generator</h1>
                <FormDay />
            </div>
        </div>
    );
};

export default App;
