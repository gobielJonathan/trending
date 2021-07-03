import { useQuery } from "react-query";
import { getTrending } from "../api/movie-db";

export function useFilm({type = 'movie', time = 'day'}) {
    return useQuery(['trending-film', type, time],() => getTrending({type,time}))
}