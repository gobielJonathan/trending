import { useHistory } from "react-router-dom";
import Card from "../../component/card";
import Tab from "../../component/tab";
import { useFilm } from "../../hooks/useFilm";
import "./index.css";

export default function Film() {
  const {
    location: { search },
  } = useHistory();
  const url = new URLSearchParams(search);

  const { data, isLoading } = useFilm({
    time: url.get("time") || "day",
    type: url.get("type"),
  });

  return (
    <section className="film">
      <div className="film-header">
        <h1 className="title">What's Popular</h1>
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
            {
              title: "Person",
              path: "?type=person",
            },
          ]}
        />
      </div>
      <section className="film-container">
        {data?.map(
          ({
            id,
            vote_average,
            original_name,
            poster_path,
            first_air_date,
          }) => {
            return (
              <div className="film-card">
                <img
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt={original_name}
                />
                <h4>{original_name}</h4>
                <p>{first_air_date}</p>
              </div>
            );
          }
        )}
      </section>
    </section>
  );
}
