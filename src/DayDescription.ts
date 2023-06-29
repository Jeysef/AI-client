export enum LoadingState {
    WAITING = "WAITING",
    LOADING = "LOADING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
}

export interface DayDescriptionProps {
    itineraryId: string;
    day: string;
    setLoading: (loading: LoadingState) => void;
}

export default async function DayDescription(props: DayDescriptionProps) {
    const { itineraryId, day, setLoading } = props;

    setLoading(LoadingState.LOADING);
    const url = `${import.meta.env.VITE_FUNCTION_URL}?itineraryId=${itineraryId}&itineraryDay=${day}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Handle non-successful response (e.g., show an error message)
            throw new Error("Failed to retrieve day description");
        }

        const data = await response.text();
        setLoading(LoadingState.SUCCESS);
        return data;
    } catch (error) {
        // Handle error gracefully (e.g., show an error message)
        setLoading(LoadingState.ERROR);
        throw new Error("Failed to connect to the server");
    }
}
