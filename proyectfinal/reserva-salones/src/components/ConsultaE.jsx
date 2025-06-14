import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [equipos, setEquipos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');

  // Obtener equipos desde Supabase
  async function getEquipos() {
    const { data } = await supabase.from("equipos").select();
    setEquipos(data);
  }

  useEffect(() => {
    getEquipos();
  }, []);

  // Filtrar equipos por marca
  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.marca.toLowerCase().includes(filtroMarca.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Equipos
      </h1>

      {/* Filtro por marca */}
      <div className="mb-4 px-4">
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          Filtrar por Marca
        </label>
        <input
          type="text"
          placeholder="Escribe una marca..."
          className="p-2 border border-gray-300 rounded w-80"
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
        />
      </div>

      <div className="px-4">
        <table className="table-auto border-collapse w-full">
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
            {equiposFiltrados.map((equipo) => (
              <tr key={equipo.id_equipo} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{equipo.id_equipo}</td>
                <td className="px-4 py-2 border-b">{equipo.nombre}</td>
                <td className="px-4 py-2 border-b">{equipo.cantidad}</td>
                <td className="px-4 py-2 border-b">{equipo.marca}</td>
                <td className="px-4 py-2 border-b">{equipo.modelo}</td>
                <td className="px-4 py-2 border-b">{equipo.estado}</td>
                <td className="px-4 py-2 border-b">{equipo.ubicacion}</td>
                <td className="px-4 py-2 border-b">{equipo.stock_disponible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
