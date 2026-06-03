import React, { useEffect, useRef, useState } from "react";
import "./TrafficLight.css";

export default function TrafficLight() {
  const intervalId = useRef(null);

  const [activeLight, setActiveLight] = useState(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  const lights = ["red", "yellow", "green"];

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <div className="traffic-light">
        {lights.map((light) => (
          <div
            key={light}
            className={`light ${light} ${activeLight === light ? "active" : ""}`}
            onClick={() =>
              setActiveLight((prevLight) =>
                prevLight === light ? null : light,
              )
            }
          ></div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleChangeLight}
        className="btn btn-outline-secondary"
      >
        Change light
      </button>

      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={startAutoChange}
          className="btn btn-outline-warning"
          disabled={isAutoRunning}
        >
          Go Berserk
        </button>

        <button
          type="button"
          onClick={stopAutoChange}
          className="btn btn-outline-danger"
          disabled={!isAutoRunning}
        >
          Stop
        </button>
      </div>
    </div>
  );

  function handleChangeLight() {
    setActiveLight((prevLight) => {
      const nextIndex = (lights.indexOf(prevLight) + 1) % lights.length;
      return lights[nextIndex];
    });
  }

  function startAutoChange() {
    if (intervalId.current !== null) return;

    intervalId.current = setInterval(() => {
      handleChangeLight();
    }, 200);

    setIsAutoRunning(true);
  }

  function stopAutoChange() {
    if (intervalId.current === null) return;

    clearInterval(intervalId.current);
    intervalId.current = null;

    setIsAutoRunning(false);
  }
}
