  
import "./index.css";
import cn from "classnames";

export default function Shimmer({ length = 3}) {
  return (
    <>
      <div className={"wrapper"}>
        <div
          className={cn("bar", "rounded", "animate") }
        ></div>
        {new Array(length).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={cn("bar", "rounded", "animate")}
          ></div>
        ))}
      </div>
    </>
  );
}