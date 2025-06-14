import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [salones, setSalones] = useState([]);
  const [filtroPiso, setFiltroPiso] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  async function getSalones() {
    const { data } = await supabase.from("salones").select();
    setSalones(data);
  }

  useEffect(() => {
    getSalones();
  }, []);

  const salonesFiltrados = salones.filter((salon) => {
    const coincidePiso = filtroPiso === '' || salon.piso === Number(filtroPiso);
    const coincideTipo = filtroTipo === '' || salon.tipo_salon === filtroTipo;
    return coincidePiso && coincideTipo;
  });

  const pisosUnicos = [...new Set(salones.map((s) => s.piso))];
  const tiposUnicos = [...new Set(salones.map((s) => s.tipo_salon))];

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Salones
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 px-4 mb-6">
        <div>
          <label className="block text-lg font-semibold mb-1 text-gray-700">Filtrar por Piso</label>
          <select
            className="border p-2 rounded w-48"
            value={filtroPiso}
            onChange={(e) => setFiltroPiso(e.target.value)}
          >
            <option value="">Todos los pisos</option>
            {pisosUnicos.map((piso) => (
              <option key={piso} value={piso}>
                {piso}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1 text-gray-700">Filtrar por Tipo de Salón</label>
          <select
            className="border p-2 rounded w-48"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-4">
        <table className="table-auto border-collapse w-full">
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
            {salonesFiltrados.map((salon) => (
              <tr key={salon.id_salon} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{salon.id_salon}</td>
                <td className="px-4 py-2 border-b">{salon.nombre}</td>
                <td className="px-4 py-2 border-b">{salon.capacidad}</td>
                <td className="px-4 py-2 border-b">{salon.piso}</td>
                <td className="px-4 py-2 border-b">{salon.estado}</td>
                <td className="px-4 py-2 border-b">{salon.tipo_salon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
