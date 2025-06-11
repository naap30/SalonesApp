import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';   //import base de datos



export default function Register() {
  const [salones, setSalones] = useState([]);

  async function getSalones() {
    const { data } = await supabase.from("salones").select();
    setSalones(data);
  }

    useEffect(() => {
    getSalones();
  }, []);
  
  return (
    <>
  
    <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Salones</h1>
        <div > 
      <table className="table-auto border-collapse"> 
        <thead>
          <tr className="bg-gray-200"> 
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Capacidad</th>
            <th className="px-4 py-2 border-b">Piso</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Tipo de Salón</th>
          
          </tr>
        </thead>
        <tbody>
    
      {salones.map((salones) => (
        
        
            <tr key={salones.id_equipo} className="hover:bg-gray-100"> 
              <td className="px-4 py-2 border-b">{salones.id_salon}</td>
              <td className="px-4 py-2 border-b">{salones.nombre}</td>
                <td className="px-4 py-2 border-b">{salones.capacidad}</td>
              <td className="px-4 py-2 border-b">{salones.piso}</td>
              <td className="px-4 py-2 border-b">{salones.estado}</td>
              <td className="px-4 py-2 border-b">{salones.tipo_salon}</td>
            

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}