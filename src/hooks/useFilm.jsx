import { useQuery } from "react-query";
import { getFilm, getFilmRecommendations, getFilmReview, getTrending } from "../api/movie-db";

export function useFilm({type = 'movie', time = 'day', page = 1}) {
    return useQuery(['trending-film', type, time, page],() => getTrending({type,time, page}))
}

export function useFilmDetail(id){
    return useQuery(['film', id], () => getFilm(id))
}


export function useFilmReview(id){
    return useQuery(['film-reviews', id], () => getFilmReview(id))
}

export function useFilmRecommendations(id){
    return useQuery(['film-recommendations', id], () => getFilmRecommendations(id))
}

