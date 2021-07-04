import "./index.css";
import { Link, useHistory } from "react-router-dom";
import Tab from "../../component/tab";
import { useFilm } from "../../hooks/useFilm";
import Shimmer from '../../component/shimmer'
import Pagination from '../../component/pagination'
import Rating from '../../component/rating'
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Film() {
  const {
    location: { search },
  } = useHistory();

  const url = new URLSearchParams(search)

  const [paginate, setPaginate] = useState({})

  const { data, isLoading } = useFilm({
    time: url.get("time") || "day",
    type: url.get("type"),
    page: url.get("page") || 0
  });

  useEffect(() => {
    setPaginate({ page: data?.page, total_pages: data?.total_pages })
  }, [data])

  return (
    <section className="film">
      <div className="film-header">
        <h4 className="title">What's Popular</h4>
        <Tab
          menu={[
            {
              title: "All",
              path: "?type=all",
            },
            {
              title: "Movie",
              path: "?type=movie",
            },
            {
              title: "TV",
              path: "?type=tv",
            },
          ]}
        />
      </div>
      <section className="film-container row mt-4">
        {
          isLoading ? <>
            {
              new Array(4).fill(0).map((_, idx) => {
                return <div key={idx} className="film-card-shimmer film-card col-sm-12 col-lg-3">
                  <div className="img">
                    <Shimmer length={0} />
                  </div>
                  <h5 className="mt-2">
                    <Shimmer length={0} />
                  </h5>
                  <div className="mt-1">
                    <Shimmer length={0} />
                  </div>
                </div>
              })
            }
          </> :
            data?.results?.map(
              ({
                id,
                vote_average,
                original_title,
                poster_path,
                release_date,
                original_name,
                first_air_date
              }) => {
                return (
                  <div key={id} className="film-card col-sm-12 col-lg-3">
                    <div className="film-card thumbnail position-relative">
                      <img
                        className={"img"}
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={original_title || original_name}
                      />
                      <div className="film-card-rating">
                        <Rating text={
                          Math.round(vote_average) * 10
                        } />
                      </div>
                    </div>
                    <Link to={`/film/${id}-${(original_title || original_name).replace(/ /g, '-')}`}>
                    <h5 className="f-bold mt-4">{original_title || original_name}</h5>
                    </Link>
                    <p>{format(new Date(release_date || first_air_date || new Date().toString()), 'MMM dd, yyyy')}</p>
                  </div>
                );
              }
            )
        }
      </section>
      <div className="w-100 d-flex justify-content-end">
        <Pagination page={paginate?.page} total_page={paginate?.total_pages} />
      </div>
    </section>
  );
}
