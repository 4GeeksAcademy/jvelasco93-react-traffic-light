import { React, useState } from "react";
import "./TrafficLight.css";

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState(null);

  const lights = ["red", "yellow", "green"];

  function handleChangeLight() {
    const currentIndex = lights.lastIndexOf(activeLight);
    const nextIndex = (currentIndex + 1) % lights.length;
    setActiveLight(lights[nextIndex]);
  }

  return (
    <div className="d-flex flex-column gap-2">
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
    </div>
  );
}

// DEJO ESTA IMPLEMENTACION COMO WIP PARA ESTUDIAR LOS EXTRAS DEL EJERCICIO.
// export default function TrafficLight() {
//     const [activeLight, setActiveLight] = useState(null);

//     return (
//       <div className="traffic-light">
//         <div
//           className={`light red ${activeLight === "red" ? "active" : ""}`}
//           onClick={() =>
//             setActiveLight(activeLight === "red" ? null : "red")
//           }
//         ></div>

//         <div
//           className={`light yellow ${activeLight === "yellow" ? "active" : ""}`}
//           onClick={() =>
//             setActiveLight(activeLight === "yellow" ? null : "yellow")
//           }
//         ></div>

//         <div
//           className={`light green ${activeLight === "green" ? "active" : ""}`}
//           onClick={() =>
//             setActiveLight(activeLight === "green" ? null : "green")
//           }
//         ></div>
//       </div>
//     );
//   }
