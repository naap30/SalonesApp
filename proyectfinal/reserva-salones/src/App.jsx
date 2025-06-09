import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner"; // shadcn toast

// // Páginas existentes
import Navbar from "./components/Navbar";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Salones from "./components/salones.jsx"
import Equipos from "./components/equipos.jsx"
import Reserva from "./components/reserva.jsx"
import SobreNosotros from "./components/sobrenosotros.jsx";
import Pagos from "./components/pagos.jsx"
import consulta1 from "./components/consultare.jsx"
export default function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          {/* Nuevas rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/salones" element={<Salones/>} />
          <Route path="/equipos" element={<Equipos/>} />
          <Route path="/reservas" element={<Reserva/>} />
          <Route path="/sobrenosotros" element={<SobreNosotros/>} />
          <Route path="/pagos" element={<Pagos/>} />
          <Route path="/reservas" element={<consulta1/>} />
          
           
        
      
      
       
        </Routes>
      </main>

      <Toaster position="top-right" richColors />
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Reserva de Salones
      </footer>
    </>
  );
}




























// import { Route, Routes } from "react-router-dom";
// import { Toaster } from "sonner";

// import ReservaNueva from "./Pages/ReservaNueva.jsx";
// import Navbar from "./components/Navbar";
// import Login from "./components/login.jsx";
// import Register from "./components/register.jsx";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <main className="container mx-auto px-4 py-6">
//         <Routes>
//           {/* Rutas de autenticación */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Solo la ruta que quieres probar */}
//           <Route path="/salones/:id/crear-reserva" element={<ReservaNueva />} />
//         </Routes>
//       </main>

//       <Toaster position="top-right" richColors />
//       <footer className="text-center text-sm text-gray-500 py-4">
//         © {new Date().getFullYear()} Reserva de Salones
//       </footer>
//     </>
//   );
// }








// import { Route, Routes, Navigate } from "react-router-dom";
// import { Toaster } from "sonner"; // shadcn toast

// // Páginas existentes
// import Salones from "./pages/Salones.jsx";
// import ReservaNueva from "./pages/ReservaNueva.jsx";
// import Reservas from "./pages/Reservas";
// import Pagos from "./pages/Pagos";
// import Facturas from "./pages/Facturas";
// import Equipos from "./pages/Equipos.jsx";
// import Navbar from "./components/Navbar";
// import Login from "./components/login.jsx";
// import Register from "./components/register.jsx";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <main className="container mx-auto px-4 py-6">
//         <Routes>
//           {/* Nuevas rutas de autenticación */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
// {/*            
//           {/* Rutas existentes */}
//           <Route path="/" element={<Navigate to="/salones" replace />} />
//           <Route path="/salones" element={<Salones />} />
//           <Route path="/salones/:id/crear-reserva" element={<ReservaNueva />} />
//           <Route path="/reservas" element={<Reservas />} />
//           <Route path="/equipos" element={<Equipos />} />
//           <Route path="/pagos" element={<Pagos />} />
//           <Route path="/facturas" element={<Facturas />} /> */}
//         </Routes>
//       </main>

//       <Toaster position="top-right" richColors />
//       <footer className="text-center text-sm text-gray-500 py-4">
//         © {new Date().getFullYear()} Reserva de Salones
//       </footer>
//     </>
//   );
// }





































// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// // import env from "dotenv";

// //env.config();
// // const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
//  console.log(import.meta.env.VITE_SUPABASE_URL);
// console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);

// function App() {
//   const [personas, setPersonas] = useState([]);

//   useEffect(() => {
//     getPersonas();
//   }, []);

//   async function getPersonas() {
//     const { data } = await supabase.from("personas").select();
//     setPersonas(data);
//   }

//   return (
//     <> 
//     <h1>Lista de personas registradas</h1>
//     <ul>
//       {personas.map((personas) => (
//         <li key={personas.name}>{personas.name}</li>
//       ))}
//     </ul>
// </>
//   );
// }

// export default App;







