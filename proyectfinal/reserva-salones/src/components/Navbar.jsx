import { Link, NavLink } from "react-router-dom";
import { Menu, Navigation } from "lucide-react";
import { useState } from "react";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/salones" className="navbar-brand">
          SalonesApp
        </Link>
        <button onClick={() => setOpen(!open)} className="menu-button">
          <Menu size={24} />
        </button>
        <nav className={`navbar-links ${open ? "show" : ""}`}>
         <NavLink to="/sobrenosotros" className="nav-link">
            Sobre Nosotros
          </NavLink>
          <NavLink to="/salones" className="nav-link" end>
            Salones
          </NavLink>
          <NavLink to="/reservas" className="nav-link">
            Reservas
          </NavLink>
          <NavLink to="/equipos" className="nav-link">
            Equipos
          </NavLink>
          <NavLink to="/asignar" className="nav-link">
          Asignar Equipos
          </NavLink>
          <NavLink to="/pagos" className="nav-link">
            Pagos
          </NavLink>
          <NavLink to="/consultas" className="nav-link">
           Consultas
          </NavLink> 
       

           <NavLink to="/login" className="nav-link">
          Iniciar Sesión
          </NavLink>
        </nav>
      </div>
    </header>
  );
}















// import { Link, NavLink } from "react-router-dom";
// import { Menu } from "lucide-react";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const common =
//     "px-3 py-2 rounded-lg hover:bg-primary/10 data-[active=true]:bg-primary/20";
//   return (
//     <header className="border-b sticky top-0 bg-white/90 backdrop-blur z-40">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">
//         <Link to="/salones" className="font-bold text-lg">
//           SalonesApp
//         </Link>
//         <button onClick={() => setOpen(!open)} className="md:hidden">
//           <Menu className="size-6" />
//         </button>
//         <nav
//           className={`flex-col md:flex-row md:flex gap-2 md:gap-4 items-center${
//             open ? " flex" : " hidden md:flex"
//           }`}
//         >
//           <NavLink to="/salones" className={common} end>
//             Salones
//           </NavLink>
//           <NavLink to="/reservas" className={common}>
//             Reservas
//           </NavLink>
//           <NavLink to="/equipos" className={common}>
//             Equipos
//           </NavLink>
//           <NavLink to="/pagos" className={common}>
//             Pagos
//           </NavLink>
//           <NavLink to="/facturas" className={common}>
//             Facturas
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//   );
// }
