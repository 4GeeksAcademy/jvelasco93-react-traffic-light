import React, { useEffect, useRef, useState } from "react";
import "./TrafficLight.css";

const PURPLE_LIGHT = "purple";
const AUTO_CHANGE_INTERVAL = 200;

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lights, setLights] = useState(["red", "yellow", "green"]);

  const lightsRef = useRef(lights); // Mantiene las luces actualizadas dentro del setInterval.
  const intervalId = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current); // Evita que el setInterval siga ejecutándose tras desmontar el componente.
    };
  }, []);

  useEffect(() => {
    lightsRef.current = lights;
  }, [lights]);

  function toggleLight(light) {
    setActiveLight((prevLight) => (prevLight === light ? null : light));
  }

  function activateNextLight() {
    setActiveLight((prevLight) => {
      const currentLights = lightsRef.current;
      const nextIndex =
        (currentLights.indexOf(prevLight) + 1) % currentLights.length;

      return currentLights[nextIndex];
    });
  }

  function startAutoChange() {
    if (intervalId.current !== null) return; // Evita iniciar múltiples intervalos.

    intervalId.current = setInterval(() => {
      activateNextLight();
    }, AUTO_CHANGE_INTERVAL);

    setIsAutoRunning(true);
  }

  function stopAutoChange() {
    if (intervalId.current === null) return; // Evita intentar detener un intervalo que no está corriendo.

    clearInterval(intervalId.current);
    intervalId.current = null;

    setIsAutoRunning(false);
  }

  function addPurpleLight() {
    setLights((prevLights) => {
      if (prevLights.includes(PURPLE_LIGHT)) return prevLights;

      return [...prevLights, PURPLE_LIGHT];
    });
  }

  function removePurpleLight() {
    setLights((prevLights) =>
      prevLights.filter((light) => light !== PURPLE_LIGHT),
    );

    setActiveLight((prevLight) =>
      prevLight === PURPLE_LIGHT ? "red" : prevLight,
    );
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <div className="traffic-light">
        {lights.map((light) => (
          <div
            key={light}
            className={`light ${light} ${activeLight === light ? "active" : ""}`}
            onClick={() => toggleLight(light)}
          ></div>
        ))}
      </div>

      <button
        type="button"
        onClick={activateNextLight}
        className="btn btn-outline-secondary"
      >
        Change light
      </button>

      <div className="d-flex gap-2">
        {/* Auto change controls */}
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
        {/* Purple light controls */}
        <button
          type="button"
          onClick={addPurpleLight}
          className="btn btn-outline-primary"
          disabled={lights.includes(PURPLE_LIGHT)}
        >
          Add purple light
        </button>

        <button
          type="button"
          onClick={removePurpleLight}
          className="btn btn-outline-primary"
          disabled={!lights.includes(PURPLE_LIGHT)}
        >
          Remove purple light
        </button>
      </div>
    </div>
  );
}
