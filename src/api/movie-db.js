import axios from "axios"

//type = movie,tv, person
//time = day, week
export const getTrending = async ({ type = 'movie', time = 'day', page = 1 }) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/${time}`, {
        params: {
            api_key: process.env.REACT_APP_KEY_MOVIE_DB,
            page: page || 1 
        }
    }) 
    return data
}

export const getFilm = async id => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3b1e12aee4a220dda47707e1111d5182&append_to_response=videos`, {
        params: {
            api_key: process.env.REACT_APP_KEY_MOVIE_DB,
        }
    })
    return data
}

export const getFilmReview = async id => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=3b1e12aee4a220dda47707e1111d5182&append_to_response=videos`, {
        params: {
            api_key: process.env.REACT_APP_KEY_MOVIE_DB,
        }
    })
    return data
}

export const getFilmRecommendations = async id => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3b1e12aee4a220dda47707e1111d5182&append_to_response=videos`, {
        params: {
            api_key: process.env.REACT_APP_KEY_MOVIE_DB,
        }
    })
    return data
}