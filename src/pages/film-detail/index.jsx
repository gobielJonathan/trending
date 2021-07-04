import './index.css'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { useFilmDetail, useFilmRecommendations, useFilmReview } from '../../hooks/useFilm'
import Rating from '../../component/rating'
import { Link } from 'react-router-dom'
import Shimmer from '../../component/shimmer'

export default function FilmDetail() {
    const { name } = useParams()

    const [id] = name.split("-")

    const { data } = useFilmDetail(id)
    const { data: review, isLoading: loading_get_review } = useFilmReview(id)
    const { data: recommendations, isLoading: loading_get_recommendations } = useFilmRecommendations(id)

    const {
        vote_average,
        original_title,
        poster_path,
        adult,
        release_date,
        original_name,
        first_air_date,
        genres, overview,
        videos,
        production_companies,
    } = data ?? {}

    return <section className="film-detail">
        <div className="p-2">
            <Link to={"/main/film"}>
                <button className="btn btn-sm bg-transparent shadow-sm">
                    <i className="fa fa-caret-left" aria-hidden="true"></i>
                    <span className="ml-2">Back</span>
                </button></Link>


        </div>
        <div className="film-detail-header">

            <div className="row">
                <div className="col-sm-12 col-lg-3">
                    <img
                        className={"rounded w-100 h-100"}
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={original_title}
                    />
                </div>
                <div className="col-sm-12 col-lg-9">
                    <h3 className="f-bold">{original_title || original_name} ({format(new Date(release_date || first_air_date || new Date().toString()), 'yyyy')})</h3>

                    <div className="d-flex">
                        <div className="p-1 film-detail-article d-flex align-items-center justify-content-center" style={{ border: "1px solid black", width: 24, height: 24 }}>{adult ? "A" : "R"}</div>
                        <p className="mb-0 film-detail-article">{release_date || first_air_date}</p>
                        <p className="film-detail-article">{genres?.map(({ name }) => name)?.join(', ')}</p>
                    </div>

                    <div className="film-detail-section d-flex align-items-center">
                        <Rating text={
                            Math.round(vote_average) * 10
                        } />
                        <span className="f-bold ml-2">User Score</span>
                        <a target={"_blank"} href={`https://www.youtube.com/watch?v=${videos?.results[0]?.key}`}>
                            <button className="btn btn-sm bg-transparent ml-2">
                                <i className="fa fa-play" aria-hidden="true"></i>
                                <span className="ml-2">Play Trailer</span>
                            </button>
                        </a>
                    </div>

                    <div className="film-detail-section">
                        <h4>Overview</h4>
                        <p>{overview}</p>
                    </div>

                    <div className="film-detail-section">
                        <h4>Production Companies</h4>
                        <div className="container">
                            <ul>
                                {
                                    production_companies?.map(({ id, name, origin_country }) => {
                                        return <li key={id}>{name} ({origin_country})</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="film-detail-section">
                <h4>Video</h4>
                <div className="d-flex overflow-x pb-3">
                    {
                        videos?.results?.map(({ id, key, name, site, type }) => {
                            return <div key={id} className="film-detail-card shadow-sm col-4">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-4 p-0">
                                        <a target="_blank" rel="noreferrer" href={`https://www.youtube.com/watch?v=${key}`}>
                                            <img className="w-100 h-100" src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                                                alt={name} />
                                        </a>
                                    </div>
                                    <div className="col-sm-12 col-lg-8 p-3 d-flex flex-column">
                                        <h6 className="f-bold">{name}</h6>
                                        <div className="mt-auto">
                                            <p className="w-100">
                                                <span>
                                                    <span className="mr-1"><i className="fa fa-youtube-play" aria-hidden="true"></i></span>
                                                    {site}
                                                </span> | <span>{type}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="film-detail-section">
                <h4>Reviews</h4>
                <div className="overflow-y mt-2" style={{ maxHeight: 400 }}>
                    {
                        loading_get_review ? <Shimmer /> : review?.results?.map(({
                            author_details: {
                                username, avatar_path, rating
                            }, content, url, created_at
                        }) => {
                            return <div className="film-review-card mb-3 shadow-sm">
                                <div className="row mx-0">
                                    <div className="d-flex justify-content-center px-3 py-2">
                                        <img src={avatar_path?.slice(1)} alt={username} className="film-review-avatar" />
                                    </div>
                                    <div className="col-sm-12 col-lg-9 p-2">
                                        <div className="d-flex">
                                            <h5 className="f-bold">A review by {username}</h5>
                                            <div className="rounded bg-black p-1 film-detail-review-rating text-white f-bold">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <span>{rating ?? 0}</span>
                                            </div>
                                        </div>
                                        <p>Written by <b>{username}</b> on  {format(new Date(created_at), 'dd MMM yyyy')}</p>

                                        <p className="mb-1">
                                            {content.slice(0, 100)}... <a href={url} target="_blank" rel="noreferrer" ><u>see more</u></a>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="film-detail-section">
                <h4>Recommendations</h4>
                <div className="d-flex overflow-x">
                    {
                        loading_get_recommendations ? <Shimmer /> : recommendations?.results?.map(({
                            poster_path,
                            id,
                            title, vote_average
                        }) => {
                            return <Link
                                key={id}
                                to={`/film/${id}-${title.replace(/ /g, '-')}`}
                                className="col-3 px-0 mr-3 filter-detail-recommendations"
                            >
                                <img className={"rounded"}
                                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                                    alt={original_title} />
                                <div className="d-flex justify-content-between p-3">
                                    <span>{title}</span>
                                    <span>{Math.round(vote_average) * 10}%</span>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    </section>
}