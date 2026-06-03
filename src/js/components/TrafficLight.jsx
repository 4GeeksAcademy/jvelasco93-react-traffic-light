import React, { useEffect, useRef, useState } from "react";
import "./TrafficLight.css";

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lights, setLights] = useState(["red", "yellow", "green"]);
  const lightsRef = useRef(lights);
  const intervalId = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    lightsRef.current = lights;
  }, [lights]);

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

      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={addPurpleLight}
          className="btn btn-outline-primary"
          disabled={lights.includes("purple")}
        >
          Add purple light
        </button>

        <button
          type="button"
          onClick={removePurpleLight}
          className="btn btn-outline-primary"
          disabled={!lights.includes("purple")}
        >
          Remove purple light
        </button>
      </div>
    </div>
  );

  function removePurpleLight() {
    setLights((prevLights) => prevLights.filter((light) => light !== "purple"));
    setActiveLight((prevLight) => (prevLight === "purple" ? null : prevLight));
  }

  function addPurpleLight() {
    setLights((prevLights) => {
      if (prevLights.includes("purple")) return prevLights;
      return [...prevLights, "purple"];
    });
  }

  function handleChangeLight() {
    setActiveLight((prevLight) => {
      const nextIndex =
        (lightsRef.current.indexOf(prevLight) + 1) % lightsRef.current.length;
      return lightsRef.current[nextIndex];
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
