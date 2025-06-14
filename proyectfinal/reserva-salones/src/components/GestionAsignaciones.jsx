import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function GestionAsignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [salones, setSalones] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [filtroSalon, setFiltroSalon] = useState("");

  const [editandoQuitar, setEditandoQuitar] = useState(null);
  const [cantidadQuitar, setCantidadQuitar] = useState(0);

  const [editandoMover, setEditandoMover] = useState(null);
  const [nuevoSalon, setNuevoSalon] = useState("");
  const [cantidadMover, setCantidadMover] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data: asignData } = await supabase
        .from("asignacion_equipos")
        .select(`
          id_equipo,
          id_salon,
          cantidad_asignada,
          estado,
          equipos (nombre),
          salones (nombre)
        `);

      const { data: salonesData } = await supabase.from("salones").select("*");
      const { data: equiposData } = await supabase.from("equipos").select("*");

      setAsignaciones(asignData || []);
      setSalones(salonesData || []);
      setEquipos(equiposData || []);
    }
    fetchData();
  }, []);

  function abrirFormularioQuitar(asignacion) {
    setEditandoQuitar(asignacion);
    setCantidadQuitar(asignacion.cantidad_asignada);
  }

  function abrirFormularioMover(asignacion) {
    setEditandoMover(asignacion);
    setNuevoSalon("");
    setCantidadMover(asignacion.cantidad_asignada);
  }

  async function handleQuitarSubmit(e) {
    e.preventDefault();

    if (cantidadQuitar <= 0 || cantidadQuitar > editandoQuitar.cantidad_asignada) {
      alert("Cantidad inválida.");
      return;
    }

    const equipo = equipos.find(e => e.id_equipo === editandoQuitar.id_equipo);
    const nuevoStock = equipo.stock_disponible + cantidadQuitar;
    const nuevaCantidadAsignada = editandoQuitar.cantidad_asignada - cantidadQuitar;

    const { error: errorStock } = await supabase
      .from("equipos")
      .update({ stock_disponible: nuevoStock })
      .eq("id_equipo", editandoQuitar.id_equipo);

    if (errorStock) {
      alert("Error actualizando stock: " + errorStock.message);
      return;
    }

    if (nuevaCantidadAsignada === 0) {
      const { error: errorDelete } = await supabase
        .from("asignacion_equipos")
        .delete()
        .eq("id_equipo", editandoQuitar.id_equipo)
        .eq("id_salon", editandoQuitar.id_salon);

      if (errorDelete) {
        alert("Error eliminando asignación: " + errorDelete.message);
        return;
      }
    } else {
      const { error: errorUpdate } = await supabase
        .from("asignacion_equipos")
        .update({ cantidad_asignada: nuevaCantidadAsignada })
        .eq("id_equipo", editandoQuitar.id_equipo)
        .eq("id_salon", editandoQuitar.id_salon);

      if (errorUpdate) {
        alert("Error actualizando asignación: " + errorUpdate.message);
        return;
      }
    }

    alert("Cantidad quitada correctamente.");

    // Actualiza el estado local para refrescar la tabla y mostrar el cambio visualmente
    setAsignaciones(prev =>
      prev
        .map(a => {
          if (a.id_equipo === editandoQuitar.id_equipo && a.id_salon === editandoQuitar.id_salon) {
            if (nuevaCantidadAsignada === 0) return null; // elimina asignación localmente
            return { ...a, cantidad_asignada: nuevaCantidadAsignada };
          }
          return a;
        })
        .filter(Boolean)
    );

    // Si no quedan asignaciones en el salón filtrado, limpia filtro
    const quedanEnSalon = asignaciones.some(
      (a) =>
        a.id_salon === editandoQuitar.id_salon &&
        !(
          a.id_equipo === editandoQuitar.id_equipo &&
          a.id_salon === editandoQuitar.id_salon &&
          nuevaCantidadAsignada === 0
        )
    );
    if (!quedanEnSalon && filtroSalon === String(editandoQuitar.id_salon)) {
      setFiltroSalon("");
    }

    setEditandoQuitar(null);
    setCantidadQuitar(0);
  }

  async function handleMoverSubmit(e) {
    e.preventDefault();

    if (!nuevoSalon) {
      alert("Selecciona un salón.");
      return;
    }
    if (nuevoSalon === editandoMover.id_salon) {
      alert("Selecciona un salón diferente al actual.");
      return;
    }
    if (cantidadMover <= 0 || cantidadMover > editandoMover.cantidad_asignada) {
      alert("Cantidad inválida para mover.");
      return;
    }

    const nuevaCantidadAsignadaOrigen = editandoMover.cantidad_asignada - cantidadMover;

    const asignacionDestino = asignaciones.find(
      a => a.id_equipo === editandoMover.id_equipo && a.id_salon === Number(nuevoSalon)
    );

    try {
      if (nuevaCantidadAsignadaOrigen === 0) {
        const { error: errorDelete } = await supabase
          .from("asignacion_equipos")
          .delete()
          .eq("id_equipo", editandoMover.id_equipo)
          .eq("id_salon", editandoMover.id_salon);

        if (errorDelete) throw errorDelete;
      } else {
        const { error: errorUpdateOrigen } = await supabase
          .from("asignacion_equipos")
          .update({ cantidad_asignada: nuevaCantidadAsignadaOrigen })
          .eq("id_equipo", editandoMover.id_equipo)
          .eq("id_salon", editandoMover.id_salon);

        if (errorUpdateOrigen) throw errorUpdateOrigen;
      }

      if (asignacionDestino) {
        const nuevaCantidadAsignadaDestino = asignacionDestino.cantidad_asignada + cantidadMover;

        const { error: errorUpdateDestino } = await supabase
          .from("asignacion_equipos")
          .update({ cantidad_asignada: nuevaCantidadAsignadaDestino })
          .eq("id_equipo", editandoMover.id_equipo)
          .eq("id_salon", Number(nuevoSalon));

        if (errorUpdateDestino) throw errorUpdateDestino;
      } else {
        const { error: errorInsertDestino } = await supabase
          .from("asignacion_equipos")
          .insert({
            id_equipo: editandoMover.id_equipo,
            id_salon: Number(nuevoSalon),
            cantidad_asignada: cantidadMover,
            estado: "activo",
          });

        if (errorInsertDestino) throw errorInsertDestino;
      }

      alert("Movimiento realizado correctamente.");

      // Actualiza estado local para refrescar la tabla y mostrar la nueva asignación
      setAsignaciones(prev => {
        let nuevaLista = prev
          .map(a => {
            if (a.id_equipo === editandoMover.id_equipo && a.id_salon === editandoMover.id_salon) {
              if (nuevaCantidadAsignadaOrigen === 0) return null; // elimina asignación origen si quedó 0
              return { ...a, cantidad_asignada: nuevaCantidadAsignadaOrigen };
            }
            return a;
          })
          .filter(Boolean);

        if (asignacionDestino) {
          nuevaLista = nuevaLista.map(a => {
            if (a.id_equipo === editandoMover.id_equipo && a.id_salon === Number(nuevoSalon)) {
              return { ...a, cantidad_asignada: a.cantidad_asignada + cantidadMover };
            }
            return a;
          });
        } else {
          const salonNombre = salones.find(s => s.id_salon === Number(nuevoSalon))?.nombre || "";
          const equipoNombre = equipos.find(e => e.id_equipo === editandoMover.id_equipo)?.nombre || "";

          nuevaLista.push({
            id_equipo: editandoMover.id_equipo,
            id_salon: Number(nuevoSalon),
            cantidad_asignada: cantidadMover,
            estado: "activo",
            equipos: { nombre: equipoNombre },
            salones: { nombre: salonNombre },
          });
        }

        // Si no quedan asignaciones en el salón origen filtrado, limpia filtro
        const quedanEnSalonOrigen = nuevaLista.some(
          (a) => a.id_salon === editandoMover.id_salon
        );
        if (!quedanEnSalonOrigen && filtroSalon === String(editandoMover.id_salon)) {
          setFiltroSalon("");
        }

        return nuevaLista;
      });

      setEditandoMover(null);
      setNuevoSalon("");
      setCantidadMover(0);
    } catch (error) {
      alert("Error al mover asignación: " + error.message);
    }
  }

  const asignacionesFiltradas = filtroSalon
    ? asignaciones.filter(a => a.id_salon === Number(filtroSalon))
    : asignaciones;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gestión de Asignaciones</h2>

      <div className="mb-4">
        <label htmlFor="filtroSalon" className="block mb-1 font-semibold">
          Filtrar por salón:
        </label>
        <select
          id="filtroSalon"
          className="p-2 border rounded w-full max-w-xs"
          value={filtroSalon}
          onChange={(e) => setFiltroSalon(e.target.value)}
        >
          <option value="">Todos</option>
          {salones.map((s) => (
            <option key={s.id_salon} value={s.id_salon}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th>Equipo</th>
            <th>Salón</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignacionesFiltradas.map((a, i) => (
            <tr key={`${a.id_equipo}-${a.id_salon}-${i}`} className="text-center">
              <td>{a.equipos?.nombre}</td>
              <td>{a.salones?.nombre}</td>
              <td>{a.cantidad_asignada}</td>
              <td className="space-x-2">
                <button
                  onClick={() => abrirFormularioQuitar(a)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Quitar
                </button>
                <button
                  onClick={() => abrirFormularioMover(a)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Mover
                </button>
              </td>
            </tr>
          ))}
          {asignacionesFiltradas.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No hay asignaciones para este salón.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editandoQuitar && (
        <form
          onSubmit={handleQuitarSubmit}
          className="mt-4 border-t pt-4 bg-red-50 p-4 rounded"
        >
          <h3 className="text-lg font-bold mb-2">
            Quitar equipo: {editandoQuitar.equipos?.nombre} del salón{" "}
            {editandoQuitar.salones?.nombre}
          </h3>

          <label className="block mb-2">
            Cantidad a quitar (máx {editandoQuitar.cantidad_asignada}):
          </label>
          <input
            type="number"
            min="1"
            max={editandoQuitar.cantidad_asignada}
            value={cantidadQuitar}
            onChange={(e) => setCantidadQuitar(Number(e.target.value))}
            className="p-2 border rounded w-full mb-4"
            required
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Confirmar quitar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditandoQuitar(null);
                setCantidadQuitar(0);
              }}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {editandoMover && (
        <form onSubmit={handleMoverSubmit} className="mt-4 border-t pt-4">
          <h3 className="text-lg font-bold mb-2">
            Mover equipo: {editandoMover.equipos?.nombre} del salón{" "}
            {editandoMover.salones?.nombre}
          </h3>

          <label className="block mb-2">Nuevo salón:</label>
          <select
            className="p-2 border rounded w-full mb-4"
            value={nuevoSalon}
            onChange={(e) => setNuevoSalon(e.target.value)}
            required
          >
            <option value="">Selecciona</option>
            {salones.map((s) => (
              <option key={s.id_salon} value={s.id_salon}>
                {s.nombre}
              </option>
            ))}
          </select>

          <label className="block mb-2">
            Cantidad a mover (máx {editandoMover.cantidad_asignada}):
          </label>
          <input
            type="number"
            min="1"
            max={editandoMover.cantidad_asignada}
            value={cantidadMover}
            onChange={(e) => setCantidadMover(Number(e.target.value))}
            className="p-2 border rounded w-full mb-4"
            required
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Confirmar mover
            </button>
            <button
              type="button"
              onClick={() => {
                setEditandoMover(null);
                setNuevoSalon("");
                setCantidadMover(0);
              }}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function GestionAsignaciones() {
//   const [asignaciones, setAsignaciones] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [equipos, setEquipos] = useState([]);

//   const [editando, setEditando] = useState(null); // Para mover
//   const [nuevoSalon, setNuevoSalon] = useState("");

//   const [editandoQuitar, setEditandoQuitar] = useState(null); // Para quitar
//   const [cantidadQuitar, setCantidadQuitar] = useState(0);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   async function fetchAllData() {
//     const { data: asignData } = await supabase
//       .from("asignacion_equipos")
//       .select(`
//         id_equipo,
//         id_salon,
//         cantidad_asignada,
//         estado,
//         equipos (nombre, stock_disponible),
//         salones (nombre)
//       `);

//     const { data: salonesData } = await supabase.from("salones").select("*");
//     const { data: equiposData } = await supabase.from("equipos").select("*");

//     setAsignaciones(asignData || []);
//     setSalones(salonesData || []);
//     setEquipos(equiposData || []);
//   }

//   async function actualizarAsignaciones() {
//     await fetchAllData();
//   }

//   function abrirFormularioMover(asignacion) {
//     setEditando(asignacion);
//     setNuevoSalon(asignacion.id_salon);
//   }

//   function abrirFormularioQuitar(asignacion) {
//     setEditandoQuitar(asignacion);
//     setCantidadQuitar(asignacion.cantidad_asignada);
//   }

//   async function handleMoverSubmit(e) {
//     e.preventDefault();

//     if (!nuevoSalon) {
//       alert("Selecciona un salón.");
//       return;
//     }
//     if (nuevoSalon === editando.id_salon) {
//       alert("Selecciona un salón diferente.");
//       return;
//     }

//     const { error } = await supabase
//       .from("asignacion_equipos")
//       .update({ id_salon: Number(nuevoSalon) })
//       .eq("id_equipo", editando.id_equipo)
//       .eq("id_salon", editando.id_salon);

//     if (error) {
//       alert("Error moviendo asignación: " + error.message);
//       return;
//     }

//     alert("Equipo movido exitosamente.");
//     await actualizarAsignaciones();

//     setEditando(null);
//     setNuevoSalon("");
//   }

//   async function handleQuitarSubmit(e) {
//     e.preventDefault();

//     if (
//       cantidadQuitar <= 0 ||
//       cantidadQuitar > editandoQuitar.cantidad_asignada
//     ) {
//       alert("Cantidad inválida.");
//       return;
//     }

//     const equipo = equipos.find(
//       (e) => e.id_equipo === editandoQuitar.id_equipo
//     );
//     const nuevoStock = equipo.stock_disponible + cantidadQuitar;
//     const nuevaCantidadAsignada =
//       editandoQuitar.cantidad_asignada - cantidadQuitar;

//     const { error: errorStock } = await supabase
//       .from("equipos")
//       .update({ stock_disponible: nuevoStock })
//       .eq("id_equipo", editandoQuitar.id_equipo);

//     if (errorStock) {
//       alert("Error actualizando stock: " + errorStock.message);
//       return;
//     }

//     if (nuevaCantidadAsignada === 0) {
//       const { error: errorDelete } = await supabase
//         .from("asignacion_equipos")
//         .delete()
//         .eq("id_equipo", editandoQuitar.id_equipo)
//         .eq("id_salon", editandoQuitar.id_salon);

//       if (errorDelete) {
//         alert("Error eliminando asignación: " + errorDelete.message);
//         return;
//       }
//     } else {
//       const { error: errorUpdate } = await supabase
//         .from("asignacion_equipos")
//         .update({ cantidad_asignada: nuevaCantidadAsignada })
//         .eq("id_equipo", editandoQuitar.id_equipo)
//         .eq("id_salon", editandoQuitar.id_salon);

//       if (errorUpdate) {
//         alert("Error actualizando asignación: " + errorUpdate.message);
//         return;
//       }
//     }

//     alert("Cantidad quitada correctamente.");
//     await actualizarAsignaciones();

//     setEditandoQuitar(null);
//     setCantidadQuitar(0);
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Gestión de Asignaciones</h2>

//       <table className="w-full table-auto border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Equipo</th>
//             <th>Salón</th>
//             <th>Cantidad Asignada</th>
//             <th>Stock Disponible</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {asignaciones.map((a, i) => (
//             <tr key={`${a.id_equipo}-${a.id_salon}-${i}`} className="text-center">
//               <td>{a.equipos?.nombre}</td>
//               <td>{a.salones?.nombre}</td>
//               <td>{a.cantidad_asignada}</td>
//               <td>{a.equipos?.stock_disponible}</td>
//               <td className="space-x-2">
//                 <button
//                   onClick={() => abrirFormularioQuitar(a)}
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Quitar
//                 </button>
//                 <button
//                   onClick={() => abrirFormularioMover(a)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Mover
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editando && (
//         <form onSubmit={handleMoverSubmit} className="mt-4 border-t pt-4">
//           <h3 className="text-lg font-bold mb-2">Mover equipo a otro salón</h3>
//           <label className="block mb-2">Nuevo salón:</label>
//           <select
//             className="p-2 border rounded w-full mb-4"
//             value={nuevoSalon}
//             onChange={(e) => setNuevoSalon(e.target.value)}
//           >
//             <option value="">Selecciona</option>
//             {salones.map((s) => (
//               <option key={s.id_salon} value={s.id_salon}>
//                 {s.nombre}
//               </option>
//             ))}
//           </select>

//           <div className="flex space-x-2">
//             <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
//               Guardar
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditando(null);
//                 setNuevoSalon("");
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       )}

//       {editandoQuitar && (
//         <form
//           onSubmit={handleQuitarSubmit}
//           className="mt-4 border-t pt-4 bg-red-50 p-4 rounded"
//         >
//           <h3 className="text-lg font-bold mb-2">
//             Quitar equipo: {editandoQuitar.equipos?.nombre} del salón{" "}
//             {editandoQuitar.salones?.nombre}
//           </h3>

//           <label className="block mb-2">
//             Cantidad a quitar (máx {editandoQuitar.cantidad_asignada}):
//           </label>
//           <input
//             type="number"
//             min="1"
//             max={editandoQuitar.cantidad_asignada}
//             value={cantidadQuitar}
//             onChange={(e) => setCantidadQuitar(Number(e.target.value))}
//             className="p-2 border rounded w-full mb-4"
//             required
//           />

//           <div className="flex space-x-2">
//             <button type="submit" className="bg-red-600 text-white px-4 py-1 rounded">
//               Confirmar quitar
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditandoQuitar(null);
//                 setCantidadQuitar(0);
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }


















// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function GestionAsignaciones() {
//   const [asignaciones, setAsignaciones] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [equipos, setEquipos] = useState([]);

//   const [editando, setEditando] = useState(null); // Para mover
//   const [nuevoSalon, setNuevoSalon] = useState("");

//   const [editandoQuitar, setEditandoQuitar] = useState(null); // Para quitar
//   const [cantidadQuitar, setCantidadQuitar] = useState(0);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: asignData } = await supabase
//         .from("asignacion_equipos")
//         .select(`
//           id_equipo,
//           id_salon,
//           cantidad_asignada,
//           estado,
//           equipos (nombre),
//           salones (nombre)
//         `);

//       const { data: salonesData } = await supabase.from("salones").select("*");
//       const { data: equiposData } = await supabase.from("equipos").select("*");

//       setAsignaciones(asignData || []);
//       setSalones(salonesData || []);
//       setEquipos(equiposData || []);
//     }

//     fetchData();
//   }, []);

//   // Abrir formulario para mover
//   function abrirFormularioMover(asignacion) {
//     setEditando(asignacion);
//     setNuevoSalon(asignacion.id_salon);
//   }

//   // Abrir formulario para quitar cantidad
//   function abrirFormularioQuitar(asignacion) {
//     setEditandoQuitar(asignacion);
//     setCantidadQuitar(asignacion.cantidad_asignada);
//   }

//   // Manejar movimiento
//   async function handleMoverSubmit(e) {
//     e.preventDefault();

//     if (!nuevoSalon) {
//       alert("Selecciona un salón.");
//       return;
//     }
//     if (nuevoSalon === editando.id_salon) {
//       alert("Selecciona un salón diferente.");
//       return;
//     }

//     const { error } = await supabase
//       .from("asignacion_equipos")
//       .update({ id_salon: Number(nuevoSalon) })
//       .eq("id_equipo", editando.id_equipo)
//       .eq("id_salon", editando.id_salon);

//     if (error) {
//       alert("Error moviendo asignación: " + error.message);
//       return;
//     }

//     alert("Equipo movido exitosamente.");

//     // Actualizar localmente
//     setAsignaciones((prev) =>
//       prev.map((a) =>
//         a.id_equipo === editando.id_equipo && a.id_salon === editando.id_salon
//           ? { ...a, id_salon: Number(nuevoSalon), salones: { nombre: salones.find(s => s.id_salon == nuevoSalon)?.nombre } }
//           : a
//       )
//     );

//     setEditando(null);
//     setNuevoSalon("");
//   }

//   // Manejar quitar
//   async function handleQuitarSubmit(e) {
//     e.preventDefault();

//     if (
//       cantidadQuitar <= 0 ||
//       cantidadQuitar > editandoQuitar.cantidad_asignada
//     ) {
//       alert("Cantidad inválida.");
//       return;
//     }

//     const equipo = equipos.find(
//       (e) => e.id_equipo === editandoQuitar.id_equipo
//     );
//     const nuevoStock = equipo.stock_disponible + cantidadQuitar;
//     const nuevaCantidadAsignada =
//       editandoQuitar.cantidad_asignada - cantidadQuitar;

//     // Actualiza stock
//     const { error: errorStock } = await supabase
//       .from("equipos")
//       .update({ stock_disponible: nuevoStock })
//       .eq("id_equipo", editandoQuitar.id_equipo);

//     if (errorStock) {
//       alert("Error actualizando stock: " + errorStock.message);
//       return;
//     }

//     if (nuevaCantidadAsignada === 0) {
//       // Eliminar asignación
//       const { error: errorDelete } = await supabase
//         .from("asignacion_equipos")
//         .delete()
//         .eq("id_equipo", editandoQuitar.id_equipo)
//         .eq("id_salon", editandoQuitar.id_salon);

//       if (errorDelete) {
//         alert("Error eliminando asignación: " + errorDelete.message);
//         return;
//       }
//     } else {
//       // Actualizar cantidad asignada
//       const { error: errorUpdate } = await supabase
//         .from("asignacion_equipos")
//         .update({ cantidad_asignada: nuevaCantidadAsignada })
//         .eq("id_equipo", editandoQuitar.id_equipo)
//         .eq("id_salon", editandoQuitar.id_salon);

//       if (errorUpdate) {
//         alert("Error actualizando asignación: " + errorUpdate.message);
//         return;
//       }
//     }

//     alert("Cantidad quitada correctamente.");

//     // Actualizar localmente
//     setAsignaciones((prev) =>
//       prev
//         .map((a) => {
//           if (
//             a.id_equipo === editandoQuitar.id_equipo &&
//             a.id_salon === editandoQuitar.id_salon
//           ) {
//             if (nuevaCantidadAsignada === 0) return null;
//             return { ...a, cantidad_asignada: nuevaCantidadAsignada };
//           }
//           return a;
//         })
//         .filter(Boolean)
//     );

//     setEditandoQuitar(null);
//     setCantidadQuitar(0);
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Gestión de Asignaciones</h2>

//       <table className="w-full table-auto border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Equipo</th>
//             <th>Salón</th>
//             <th>Cantidad</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {asignaciones.map((a, i) => (
//             <tr
//               key={`${a.id_equipo}-${a.id_salon}-${i}`}
//               className="text-center"
//             >
//               <td>{a.equipos?.nombre}</td>
//               <td>{a.salones?.nombre}</td>
//               <td>{a.cantidad_asignada}</td>
//               <td className="space-x-2">
//                 <button
//                   onClick={() => abrirFormularioQuitar(a)}
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Quitar
//                 </button>
//                 <button
//                   onClick={() => abrirFormularioMover(a)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Mover
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Formulario para mover */}
//       {editando && (
//         <form onSubmit={handleMoverSubmit} className="mt-4 border-t pt-4">
//           <h3 className="text-lg font-bold mb-2">Mover equipo a otro salón</h3>
//           <label className="block mb-2">Nuevo salón:</label>
//           <select
//             className="p-2 border rounded w-full mb-4"
//             value={nuevoSalon}
//             onChange={(e) => setNuevoSalon(e.target.value)}
//           >
//             <option value="">Selecciona</option>
//             {salones.map((s) => (
//               <option key={s.id_salon} value={s.id_salon}>
//                 {s.nombre}
//               </option>
//             ))}
//           </select>

//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-1 rounded"
//             >
//               Guardar
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditando(null);
//                 setNuevoSalon("");
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Formulario para quitar cantidad */}
//       {editandoQuitar && (
//         <form
//           onSubmit={handleQuitarSubmit}
//           className="mt-4 border-t pt-4 bg-red-50 p-4 rounded"
//         >
//           <h3 className="text-lg font-bold mb-2">
//             Quitar equipo: {editandoQuitar.equipos?.nombre} del salón{" "}
//             {editandoQuitar.salones?.nombre}
//           </h3>

//           <label className="block mb-2">
//             Cantidad a quitar (máx {editandoQuitar.cantidad_asignada}):
//           </label>
//           <input
//             type="number"
//             min="1"
//             max={editandoQuitar.cantidad_asignada}
//             value={cantidadQuitar}
//             onChange={(e) => setCantidadQuitar(Number(e.target.value))}
//             className="p-2 border rounded w-full mb-4"
//             required
//           />

//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               className="bg-red-600 text-white px-4 py-1 rounded"
//             >
//               Confirmar quitar
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditandoQuitar(null);
//                 setCantidadQuitar(0);
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }


































// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// export default function GestionAsignaciones() {
//   const [asignaciones, setAsignaciones] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [equipos, setEquipos] = useState([]);
//   const [editando, setEditando] = useState(null); // Aquí guardamos la asignación seleccionada
//   const [nuevoSalon, setNuevoSalon] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const { data: asignData } = await supabase
//         .from("asignacion_equipos")
//         .select(`
//           id_equipo,
//           id_salon,
//           cantidad_asignada,
//           estado,
//           equipos (nombre),
//           salones (nombre)
//         `);

//       const { data: salonesData } = await supabase.from("salones").select("*");
//       const { data: equiposData } = await supabase.from("equipos").select("*");

//       setAsignaciones(asignData || []);
//       setSalones(salonesData || []);
//       setEquipos(equiposData || []);
//     }

//     fetchData();
//   }, []);

//   // Quitar asignación (devolver equipo)
//   async function quitarAsignacion(asignacion) {
//     const equipo = equipos.find((e) => e.id_equipo === asignacion.id_equipo);
//     const nuevoStock = equipo.stock_disponible + asignacion.cantidad_asignada;

//     // Actualiza stock
//     await supabase
//       .from("equipos")
//       .update({ stock_disponible: nuevoStock })
//       .eq("id_equipo", asignacion.id_equipo);

//     // Borra asignación usando id_equipo y id_salon
//     await supabase
//       .from("asignacion_equipos")
//       .delete()
//       .eq("id_equipo", asignacion.id_equipo)
//       .eq("id_salon", asignacion.id_salon);

//     alert("Equipo devuelto al inventario.");

//     location.reload();
//   }

//   // Guardar movimiento a otro salón
//   async function handleMoverSubmit(e) {
//     e.preventDefault();

//     if (!nuevoSalon) {
//       alert("Selecciona un salón.");
//       return;
//     }
//     if (nuevoSalon === editando.id_salon) {
//       alert("Selecciona un salón diferente al actual.");
//       return;
//     }

//     // Actualiza la asignación (mover equipo) usando id_equipo y id_salon original
//     const { error } = await supabase
//       .from("asignacion_equipos")
//       .update({ id_salon: Number(nuevoSalon) })
//       .eq("id_equipo", editando.id_equipo)
//       .eq("id_salon", editando.id_salon);

//     if (error) {
//       alert("Error moviendo asignación: " + error.message);
//       return;
//     }

//     alert("Equipo movido a otro salón.");
//     setEditando(null);
//     setNuevoSalon("");
//     location.reload();
//   }

//   // Abrir formulario y asignar estado local
//   function abrirFormularioMover(asignacion) {
//     setEditando(asignacion);
//     setNuevoSalon(asignacion.id_salon);
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Gestión de Asignaciones</h2>

//       <table className="w-full table-auto border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Equipo</th>
//             <th>Salón</th>
//             <th>Cantidad</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {asignaciones.map((a) => (
//             <tr key={`${a.id_equipo}-${a.id_salon}`} className="text-center">
//               <td>{a.equipos?.nombre}</td>
//               <td>{a.salones?.nombre}</td>
//               <td>{a.cantidad_asignada}</td>
//               <td className="space-x-2">
//                 <button
//                   onClick={() => quitarAsignacion(a)}
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Quitar
//                 </button>
//                 <button
//                   onClick={() => abrirFormularioMover(a)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Mover
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editando && (
//         <form onSubmit={handleMoverSubmit} className="mt-4 border-t pt-4">
//           <h3 className="text-lg font-bold mb-2">Mover equipo a otro salón</h3>

//           <label className="block mb-2">Nuevo salón:</label>
//           <select
//             className="p-2 border rounded w-full mb-4"
//             value={nuevoSalon}
//             onChange={(e) => setNuevoSalon(e.target.value)}
//           >
//             <option value="">Selecciona</option>
//             {salones.map((s) => (
//               <option key={s.id_salon} value={s.id_salon}>
//                 {s.nombre}
//               </option>
//             ))}
//           </select>

//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-1 rounded"
//             >
//               Guardar
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditando(null);
//                 setNuevoSalon("");
//               }}
//               className="bg-gray-400 text-white px-4 py-1 rounded"
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
