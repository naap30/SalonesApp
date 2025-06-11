import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';   //import base de datos



export default function Register() {
  const [equipos, setEquipos] = useState([]);

  async function getEquipos() {
    const { data } = await supabase.from("equipos").select();
    setEquipos(data);
  }

    useEffect(() => {
    getEquipos();
  }, []);
  
  return (
    <>
  
    <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Equipos</h1>
        <div > 
      <table className="table-auto border-collapse"> 
        <thead>
          <tr className="bg-gray-200"> 
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
            <th className="px-4 py-2 border-b">Marca</th>
            <th className="px-4 py-2 border-b">Modelo</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Ubicación</th>
            <th className="px-4 py-2 border-b">Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
    
      {equipos.map((equipos) => (
        
        
            <tr key={equipos.id_equipo} className="hover:bg-gray-100"> 
              <td className="px-4 py-2 border-b">{equipos.id_equipo}</td>
              <td className="px-4 py-2 border-b">{equipos.nombre}</td>
                <td className="px-4 py-2 border-b">{equipos.cantidad}</td>
              <td className="px-4 py-2 border-b">{equipos.marca}</td>
              <td className="px-4 py-2 border-b">{equipos.modelo}</td>
              <td className="px-4 py-2 border-b">{equipos.estado}</td>
              <td className="px-4 py-2 border-b">{equipos.ubicacion}</td>
                <td className="px-4 py-2 border-b">{equipos.stock_disponible}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}