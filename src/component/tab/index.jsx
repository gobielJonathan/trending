import { useState } from "react";
import "./index.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
export default function Tab({ menu = [] }) {
  const [active, setActive] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [widthBg, setwidthBg] = useState(0);

  return (
    <div className="tab">
      <div className="bg" style={{ width: widthBg, left: positionX }}></div>

      {menu.map(({title, path}, idx) => {
        return (
          <Link to={path}>
          <div
            key={idx}
            onClick={(e) => {
              setwidthBg(e.currentTarget.clientWidth);
              setPositionX(e.currentTarget.offsetLeft);
              setActive(idx);
            }}
            className={classNames("tab-menu", {
                'active' : idx === active
            })}
          >
            <span>{title}</span>
          </div>
          </Link>
        );
      })}
    </div>
  );
}
