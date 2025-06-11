import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos


export default function Register() {
  const [personas, setPersonas] = useState([]);

  async function getPersonas() {
    const { data } = await supabase.from("personas").select();
    setPersonas(data);
  }

    useEffect(() => {
    getPersonas();
  }, []);
  
  return (
    <>
  
    <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de personas Registradas en la base de datos</h1>
        <div > 
      <table className="table-auto border-collapse"> 
        <thead>
          <tr className="bg-gray-200"> 
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Apellido</th>
            <th className="px-4 py-2 border-b">Correo</th>
            <th className="px-4 py-2 border-b">Dirección</th>
          </tr>
        </thead>
        <tbody>
    
      {personas.map((personas) => (
        
        
            <tr key={personas.id_persona} className="hover:bg-gray-100"> 
              <td className="px-4 py-2 border-b">{personas.id_persona}</td>
              <td className="px-4 py-2 border-b">{personas.nombre}</td>
              <td className="px-4 py-2 border-b">{personas.apellido}</td>
              <td className="px-4 py-2 border-b">{personas.correo}</td>
              <td className="px-4 py-2 border-b">{personas.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}