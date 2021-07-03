import axios from "axios"

//type = movie,tv, person
//time = day, week
export const getTrending = async ({type = 'movie', time = 'day'}) => {
    const { data : {results} } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/${time}`, {
        params: {
            api_key: process.env.REACT_APP_KEY_MOVIE_DB
        }
    })
    return results
}