import { React, useState } from "react";
import "./TrafficLight.css";

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState(null);

  const lights = ["red", "yellow", "green"];

  return (
    <div className="traffic-light">
      {lights.map((light) => (
        <div
          key={light}
          className={`light ${light} ${activeLight === light ? "active" : ""}`}
          onClick={() =>
            setActiveLight((prevLight) => (prevLight === light ? null : light))
          }
          // Uso la palabra prevLight para asegurarme de que estoy utilizando el valor más reciente del estado, evitando posibles problemas de asincronía al actualizar el estado.
          // Si bien, aun estudio si es realmente necesario en este caso, ya que el estado se actualiza de forma síncrona al hacer clic en un elemento, lo que significa que el valor de activeLight se actualizará inmediatamente después de la llamada a setActiveLight.
        ></div>
      ))}
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
