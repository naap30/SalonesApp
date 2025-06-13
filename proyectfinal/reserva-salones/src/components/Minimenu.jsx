import { NavLink } from "react-router-dom";

function MiniMenu() {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/ver_personas">Consulta Personas</NavLink>
          </li>
          <li>
            <NavLink to="/consulta2">Consulta Equipos</NavLink>
          </li>
          <li>
            <NavLink to="/consulta3">Consulta Salones</NavLink>
          </li>
          <li>
            <NavLink to="/consulta4">Consulta Reservas</NavLink>
          </li>
          <li>
            <NavLink to="/consulta5">Consulta Pagos</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MiniMenu;






























// import { NavLink } from "react-router-dom";

// function MiniMenu() {
//   return (
//     <div className="w-48 bg-gray-200 h-screen p-4">
//       <h2 className="text-lg font-bold mb-4">Menú</h2>
//       <nav>
//         <ul className="flex flex-col space-y-2">
//           <li>
//             <NavLink to="/ver_personas" className="hover:bg-gray-300 p-2 rounded block">
//               Consulta Personas
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/consulta2" className="hover:bg-gray-300 p-2 rounded block">
//               Consulta Equipos
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/consulta3" className="hover:bg-gray-300 p-2 rounded block">
//               Consulta Salones
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/consulta4" className="hover:bg-gray-300 p-2 rounded block">
//               Consulta Reservas
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/consulta5" className="hover:bg-gray-300 p-2 rounded block">
//               Consulta Pagos
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default MiniMenu;


































// import { NavLink } from "react-router-dom";

// function MiniMenu() {
//   return (
//     <div className="w-48 bg-gray-200 h-screen p-4">
//       <h2 className="text-lg font-bold mb-4">Menú</h2>
//       <nav className="flex flex-col space-y-2">
//         <NavLink to="/consulta1" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Personas
//         </NavLink>
//         <NavLink to="/consulta2" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Equipos
//         </NavLink>
//         <NavLink to="/consulta3" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Salones
//         </NavLink>
//         <NavLink to="/consulta3" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Reservas
//         </NavLink>
//          <NavLink to="/consulta3" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Reservas
//         </NavLink>
//          <NavLink to="/consulta3" className="hover:bg-gray-300 p-2 rounded">
//           Consulta Pagos 
//         </NavLink>
//       </nav>
//     </div>
//   );
// }

// export default MiniMenu;
