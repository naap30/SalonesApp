import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';   //import base de datos


export default function Register() {
  const [reservas, setReservas] = useState([]);

  async function getReservas() {
    const { data } = await supabase.from("reservas").select();
    setReservas(data);
  }

    useEffect(() => {
    getReservas();
  }, []);
  
  return (
    <>
  
    <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Reservas</h1>
        <div > 
      <table className="table-auto border-collapse"> 
        <thead>
          <tr className="bg-gray-200"> 
            <th className="px-4 py-2 border-b">ID Reserva</th>
            <th className="px-4 py-2 border-b">ID Salón</th>
            <th className="px-4 py-2 border-b">ID Persona</th>
            <th className="px-4 py-2 border-b">Cantidad de Personas</th>
            <th className="px-4 py-2 border-b">Hora de Inicio</th>
            <th className="px-4 py-2 border-b">Hora de Fin</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Descripción</th>
          </tr>
        </thead>
        <tbody>
    
      {reservas.map((reservas) => (
        
        
            <tr key={reservas.id_reserva} className="hover:bg-gray-100"> 
              <td className="px-4 py-2 border-b">{reservas.id_reserva}</td>
              <td className="px-4 py-2 border-b">{reservas.id_salon}</td>
              <td className="px-4 py-2 border-b">{reservas.id_persona}</td>
              <td className="px-4 py-2 border-b">{reservas.cantidad}</td>
              <td className="px-4 py-2 border-b">{reservas.hora_inicio}</td>
              <td className="px-4 py-2 border-b">{reservas.hora_fin}</td>
              <td className="px-4 py-2 border-b">{reservas.estado}</td>
              <td className="px-4 py-2 border-b">{reservas.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}