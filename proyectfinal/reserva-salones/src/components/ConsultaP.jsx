import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

export default function ListaPersonas() {
  const [personas, setPersonas] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Función para obtener personas con filtro
  async function getPersonas(filtroTexto = '') {
    let query = supabase.from('personas').select();

    if (filtroTexto.trim() !== '') {
      // Buscar en nombre, apellido o correo
      query = query.or(
        `nombre.ilike.%${filtroTexto}%,apellido.ilike.%${filtroTexto}%,correo.ilike.%${filtroTexto}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error al obtener personas:', error);
      setPersonas([]);
    } else {
      setPersonas(data);
    }
  }

  // Cargar personas al iniciar y cuando cambie el filtro
  useEffect(() => {
    getPersonas(filtro);
  }, [filtro]);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Personas Registradas
      </h1>

      <div className="mb-4">
         <label className="block mb-2 text-lg font-semibold text-gray-700">
         Filtrar personas: 
         </label>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o correo..."
          className="p-2 border border-gray-300 rounded w-80"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div>
        <table className="table-auto border-collapse w-full max-w-4xl">
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
            {personas.length > 0 ? (
              personas.map((persona) => (
                <tr key={persona.id_persona} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{persona.id_persona}</td>
                  <td className="px-4 py-2 border-b">{persona.nombre}</td>
                  <td className="px-4 py-2 border-b">{persona.apellido}</td>
                  <td className="px-4 py-2 border-b">{persona.correo}</td>
                  <td className="px-4 py-2 border-b">{persona.direccion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">No se encontraron personas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
