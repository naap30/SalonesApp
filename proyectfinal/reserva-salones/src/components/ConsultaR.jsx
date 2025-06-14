import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [reservas, setReservas] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [salones, setSalones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nuevoSalon, setNuevoSalon] = useState("");
  const [nuevaHoraInicio, setNuevaHoraInicio] = useState("");
  const [nuevaHoraFin, setNuevaHoraFin] = useState("");

  async function getReservas() {
    const { data, error } = await supabase
      .from("reservas")
      .select("*, salones(nombre)")
      .order("hora_inicio", { ascending: false });

    if (error) {
      alert("Error al cargar reservas: " + error.message);
      return;
    }

    setReservas(data || []);
  }

  async function getSalones() {
    const { data, error } = await supabase.from("salones").select("*");
    if (error) {
      alert("Error al cargar salones: " + error.message);
      return;
    }
    setSalones(data || []);
  }

  useEffect(() => {
    getReservas();
    getSalones();
  }, []);

  const reservasFiltradas = reservas.filter((r) =>
    filtroId === "" ? true : r.id_reserva.toString().includes(filtroId)
  );

  async function cancelarReserva(id_reserva) {
    const { data, error } = await supabase
      .from("reservas")
      .update({ estado: "cancelada" })
      .eq("id_reserva", id_reserva);

    console.log("Resultado al cancelar:", { data, error });

    if (error) {
      alert("Error al cancelar: " + error.message);
    } else {
      setReservas((prev) =>
        prev.map((r) =>
          r.id_reserva === id_reserva ? { ...r, estado: "cancelada" } : r
        )
      );
      alert("Reserva cancelada correctamente");
    }
  }

  async function guardarCambios(e) {
    e.preventDefault();

    if (!nuevaHoraInicio || !nuevaHoraFin) {
      alert("Debes seleccionar fecha y hora de inicio y fin.");
      return;
    }
    if (!nuevoSalon) {
      alert("Debes seleccionar un salón.");
      return;
    }
    if (nuevaHoraFin <= nuevaHoraInicio) {
      alert("La hora de fin debe ser posterior a la hora de inicio.");
      return;
    }

    const { data, error } = await supabase
      .from("reservas")
      .update({
        id_salon: Number(nuevoSalon),
        hora_inicio: nuevaHoraInicio,
        hora_fin: nuevaHoraFin,
      })
      .eq("id_reserva", editando.id_reserva);

    console.log("Resultado al editar:", { data, error });

    if (error) {
      alert("Error al actualizar reserva: " + error.message);
      return;
    }

    setReservas((prev) =>
      prev.map((r) =>
        r.id_reserva === editando.id_reserva
          ? {
              ...r,
              id_salon: Number(nuevoSalon),
              hora_inicio: nuevaHoraInicio,
              hora_fin: nuevaHoraFin,
              salones: {
                nombre:
                  salones.find((s) => s.id_salon === Number(nuevoSalon))?.nombre ||
                  r.salones?.nombre,
              },
            }
          : r
      )
    );

    alert("Reserva actualizada");
    setEditando(null);
    setNuevoSalon("");
    setNuevaHoraInicio("");
    setNuevaHoraFin("");
  }

  function abrirEdicion(reserva) {
    setEditando(reserva);
    setNuevoSalon(reserva.id_salon);
    setNuevaHoraInicio(reserva.hora_inicio.slice(0, 16));
    setNuevaHoraFin(reserva.hora_fin.slice(0, 16));
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Reservas
      </h1>

      <div className="mb-4">
        <label htmlFor="filtroId" className="font-semibold mr-2">
          Buscar por ID Reserva:
        </label>
        <input
          type="text"
          id="filtroId"
          value={filtroId}
          onChange={(e) => setFiltroId(e.target.value)}
          placeholder="Escribe ID reserva"
          className="border p-1 rounded"
        />
      </div>

      <div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b">ID Reserva</th>
              <th className="px-4 py-2 border-b">Salón</th>
              <th className="px-4 py-2 border-b">ID Persona</th>
              <th className="px-4 py-2 border-b">Cantidad</th>
              <th className="px-4 py-2 border-b">Hora Inicio</th>
              <th className="px-4 py-2 border-b">Hora Fin</th>
              <th className="px-4 py-2 border-b">Estado</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-4 font-semibold text-gray-600"
                >
                  No hay reservas que coincidan.
                </td>
              </tr>
            ) : (
              reservasFiltradas.map((reserva) => (
                <tr
                  key={reserva.id_reserva}
                  className="hover:bg-gray-100 text-center"
                >
                  <td className="px-4 py-2 border-b">{reserva.id_reserva}</td>
                  <td className="px-4 py-2 border-b">
                    {reserva.salones?.nombre || reserva.id_salon}
                  </td>
                  <td className="px-4 py-2 border-b">{reserva.id_persona}</td>
                  <td className="px-4 py-2 border-b">{reserva.cantidad}</td>
                  <td className="px-4 py-2 border-b">{reserva.hora_inicio}</td>
                  <td className="px-4 py-2 border-b">{reserva.hora_fin}</td>
                  <td className="px-4 py-2 border-b">{reserva.estado}</td>
                  <td className="px-4 py-2 border-b">{reserva.descripcion}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    {reserva.estado !== "cancelada" && (
                      <>
                        <button
                          onClick={() => cancelarReserva(reserva.id_reserva)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => abrirEdicion(reserva)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editando && (
        <form
          onSubmit={guardarCambios}
          className="mt-6 border p-4 rounded max-w-md bg-gray-50"
        >
          <h3 className="text-xl font-bold mb-4">
            Editar reserva ID: {editando.id_reserva}
          </h3>

          <label className="block mb-2 font-semibold">
            Salón:
            <select
              value={nuevoSalon}
              onChange={(e) => setNuevoSalon(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
              required
            >
              <option value="">Selecciona salón</option>
              {salones.map((s) => (
                <option key={s.id_salon} value={s.id_salon}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-2 font-semibold">
            Hora Inicio:
            <input
              type="datetime-local"
              value={nuevaHoraInicio}
              onChange={(e) => setNuevaHoraInicio(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
              required
            />
          </label>

          <label className="block mb-2 font-semibold">
            Hora Fin:
            <input
              type="datetime-local"
              value={nuevaHoraFin}
              onChange={(e) => setNuevaHoraFin(e.target.value)}
              className="block w-full p-2 border rounded mt-1"
              required
            />
          </label>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditando(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </>
  );
}




































// import { useState, useEffect } from 'react';
// import { supabase } from '../supabaseClient';   //import base de datos


// export default function Register() {
//   const [reservas, setReservas] = useState([]);

//   async function getReservas() {
//     const { data } = await supabase.from("reservas").select();
//     setReservas(data);
//   }

//     useEffect(() => {
//     getReservas();
//   }, []);
  
//   return (
//     <>
  
//     <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
//         Lista de Reservas</h1>
//         <div > 
//       <table className="table-auto border-collapse"> 
//         <thead>
//           <tr className="bg-gray-200"> 
//             <th className="px-4 py-2 border-b">ID Reserva</th>
//             <th className="px-4 py-2 border-b">ID Salón</th>
//             <th className="px-4 py-2 border-b">ID Persona</th>
//             <th className="px-4 py-2 border-b">Cantidad de Personas</th>
//             <th className="px-4 py-2 border-b">Hora de Inicio</th>
//             <th className="px-4 py-2 border-b">Hora de Fin</th>
//             <th className="px-4 py-2 border-b">Estado</th>
//             <th className="px-4 py-2 border-b">Descripción</th>
//           </tr>
//         </thead>
//         <tbody>
    
//       {reservas.map((reservas) => (
        
        
//             <tr key={reservas.id_reserva} className="hover:bg-gray-100"> 
//               <td className="px-4 py-2 border-b">{reservas.id_reserva}</td>
//               <td className="px-4 py-2 border-b">{reservas.id_salon}</td>
//               <td className="px-4 py-2 border-b">{reservas.id_persona}</td>
//               <td className="px-4 py-2 border-b">{reservas.cantidad}</td>
//               <td className="px-4 py-2 border-b">{reservas.hora_inicio}</td>
//               <td className="px-4 py-2 border-b">{reservas.hora_fin}</td>
//               <td className="px-4 py-2 border-b">{reservas.estado}</td>
//               <td className="px-4 py-2 border-b">{reservas.descripcion}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }