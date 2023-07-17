export enum LoadingState {
    WAITING = "WAITING",
    LOADING = "LOADING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
}

export interface PlaceDescriptionProps {
    itineraryId: string;
    place: string;
    day?: string;
    setLoading: (loading: LoadingState) => void;
}

export default async function PlaceDescription(props: PlaceDescriptionProps) {
    const { itineraryId, place, day, setLoading } = props;

    setLoading(LoadingState.LOADING);
    const url = `${import.meta.env.VITE_GET_DESCRIPTION_URL}?code=${import.meta.env.VITE_GET_DESCRIPTION_KEY}&type=place&itineraryId=${itineraryId}&placeId=${place}${day && `&itineraryDay=${day}`}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Handle non-successful response (e.g., show an error message)
            throw new Error("Failed to retrieve place description");
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
