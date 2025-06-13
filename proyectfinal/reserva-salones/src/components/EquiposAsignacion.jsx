import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function FormAsignacionEquipos() {
  const [equipos, setEquipos] = useState([]);
  const [salones, setSalones] = useState([]);
  const [idEquipo, setIdEquipo] = useState('');
  const [idSalon, setIdSalon] = useState('');
  const [cantidadAsignada, setCantidadAsignada] = useState('');
  const [estado, setEstado] = useState('activo');
  const [stockDisponible, setStockDisponible] = useState(null);

  //  Cargar los equipos y salones al iniciar
  useEffect(() => {
    async function fetchData() {
      const { data: equiposData, error: equiposError } = await supabase
        .from('equipos')
        .select('id_equipo, nombre, stock_disponible'); // <-- nos aseguramos de traer stock_disponible

      const { data: salonesData, error: salonesError } = await supabase
        .from('salones')
        .select('id_salon, nombre');

      if (equiposError) {
        alert('Error cargando equipos: ' + equiposError.message);
        return;
      }
      if (salonesError) {
        alert('Error cargando salones: ' + salonesError.message);
        return;
      }

      setEquipos(equiposData || []);
      setSalones(salonesData || []);
    }

    fetchData();
  }, []);

  //  Cuando el usuario seleccione un equipo, mostramos su stock disponible
  useEffect(() => {
    if (!idEquipo) {
      setStockDisponible(null);
      return;
    }

    const equipoSeleccionado = equipos.find(
      (eq) => eq.id_equipo === Number(idEquipo)
    );

    // Aquí corregimos para que use stock_disponible
    setStockDisponible(
      equipoSeleccionado && equipoSeleccionado.stock_disponible !== null
        ? equipoSeleccionado.stock_disponible
        : 0
    );
  }, [idEquipo, equipos]);

  //  Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stockDisponible === null) {
      alert('Selecciona un equipo válido.');
      return;
    }

    const cantidadNum = parseInt(cantidadAsignada);

    if (cantidadNum <= 0) {
      alert('La cantidad asignada debe ser mayor que cero.');
      return;
    }

    // Bajamos el stock sin validarlo (ya no comparamos con el máximo)
    const nuevoStock = stockDisponible - cantidadNum;

    // Actualizar el stock en la base de datos
    const { error: updateError } = await supabase
      .from('equipos')
      .update({ stock_disponible: nuevoStock })
      .eq('id_equipo', Number(idEquipo));

    if (updateError) {
      alert('Error al actualizar el stock: ' + updateError.message);
      return;
    }

    //  Insertar la asignación en la tabla asignacion_equipos
    const { error: insertError } = await supabase.from('asignacion_equipos').insert({
      id_equipo: Number(idEquipo),
      id_salon: Number(idSalon),
      cantidad_asignada: cantidadNum,
      estado,
    });

    if (insertError) {
      alert('Error al guardar la asignación: ' + insertError.message);
      return;
    }

    alert('¡Asignación registrada correctamente!');

    //  Limpiar formulario
    setIdEquipo('');
    setIdSalon('');
    setCantidadAsignada('');
    setEstado('activo');
    setStockDisponible(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Asignar Equipos</h2>

      {/* Selector de Equipo */}
      <label className="block mb-2">Equipo:</label>
      <select
        value={idEquipo}
        onChange={(e) => setIdEquipo(e.target.value)}
        required
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="">Seleccione un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo.id_equipo} value={equipo.id_equipo}>
            {equipo.nombre} (Stock: {equipo.stock_disponible})
          </option>
        ))}
      </select>

      {/* Selector de Salón */}
      <label className="block mb-2">Salón:</label>
      <select
        value={idSalon}
        onChange={(e) => setIdSalon(e.target.value)}
        required
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="">Seleccione un salón</option>
        {salones.map((salon) => (
          <option key={salon.id_salon} value={salon.id_salon}>
            {salon.nombre}
          </option>
        ))}
      </select>

      {/* Cantidad */}
      <label className="block mb-2">Cantidad Asignada:</label>
      <input
        type="number"
        value={cantidadAsignada}
        onChange={(e) => setCantidadAsignada(e.target.value)}
        min="1"
        required
        className="w-full p-2 border mb-4 rounded"
      />

      {/* Estado */}
      <label className="block mb-2">Estado:</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="w-full p-2 border mb-4 rounded"
      >
        <option value="activo">Activo</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Asignar
      </button>
    </form>
  );
}












































































// import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function FormAsignacionEquipos() {
//   const [equipos, setEquipos] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [idEquipo, setIdEquipo] = useState('');
//   const [idSalon, setIdSalon] = useState('');
//   const [cantidadAsignada, setCantidadAsignada] = useState('');
//   const [estado, setEstado] = useState('activo');
//   const [stockDisponible, setStockDisponible] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: equiposData, error: equiposError } = await supabase
//         .from('equipos')
//         .select('id_equipo, nombre, stock_disponible');
//       const { data: salonesData, error: salonesError } = await supabase
//         .from('salones')
//         .select('id_salon, nombre');

//       if (equiposError) {
//         alert('Error cargando equipos: ' + equiposError.message);
//         return;
//       }
//       if (salonesError) {
//         alert('Error cargando salones: ' + salonesError.message);
//         return;
//       }

//       setEquipos(equiposData || []);
//       setSalones(salonesData || []);
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!idEquipo) {
//       setStockDisponible(null);
//       return;
//     }

//     // Convertimos idEquipo a número para comparar
//     const equipoSeleccionado = equipos.find(
//       (eq) => eq.id_equipo === Number(idEquipo)
//     );

//     setStockDisponible(equipoSeleccionado ? equipoSeleccionado.cantidad : null);
//   }, [idEquipo, equipos]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (stockDisponible === null) {
//       alert('Selecciona un equipo válido.');
//       return;
//     }

//     const cantidadNum = parseInt(cantidadAsignada);

//     if (cantidadNum <= 0) {
//       alert('La cantidad asignada debe ser mayor que cero.');
//       return;
//     }

//     // No validamos stock máximo, solo bajamos el stock
//     const nuevoStock = stockDisponible - cantidadNum;

//     // Actualizar stock en tabla equipos
//     const { error: updateError } = await supabase
//       .from('equipos')
//       .update({ stock_disponible: nuevoStock })
//       .eq('id_equipo', Number(idEquipo));

//     if (updateError) {
//       alert('Error al actualizar el stock: ' + updateError.message);
//       return;
//     }

//     // Insertar asignación
//     const { error: insertError } = await supabase.from('asignacion_equipos').insert({
//       id_equipo: Number(idEquipo),
//       id_salon: Number(idSalon),
//       cantidad_asignada: cantidadNum,
//       estado,
//     });

//     if (insertError) {
//       alert('Error al guardar la asignación: ' + insertError.message);
//       return;
//     }

//     alert('¡Asignación registrada correctamente!');

//     // Limpiar formulario y stock
//     setIdEquipo('');
//     setIdSalon('');
//     setCantidadAsignada('');
//     setEstado('activo');
//     setStockDisponible(null);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4 text-center">Asignar Equipos</h2>

//       {/* Selector de Equipo */}
//       <label className="block mb-2">Equipo:</label>
//       <select
//         value={idEquipo}
//         onChange={(e) => setIdEquipo(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="">Seleccione un equipo</option>
//         {equipos.map((equipo) => (
//           <option key={equipo.id_equipo} value={equipo.id_equipo}>
//             {equipo.nombre} (Stock: {equipo.stock_disponible})
//           </option>
//         ))}
//       </select>

//       {/* Selector de Salón */}
//       <label className="block mb-2">Salón:</label>
//       <select
//         value={idSalon}
//         onChange={(e) => setIdSalon(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="">Seleccione un salón</option>
//         {salones.map((salon) => (
//           <option key={salon.id_salon} value={salon.id_salon}>
//             {salon.nombre}
//           </option>
//         ))}
//       </select>

//       {/* Cantidad */}
//       <label className="block mb-2">Cantidad Asignada:</label>
//       <input
//         type="number"
//         value={cantidadAsignada}
//         onChange={(e) => setCantidadAsignada(e.target.value)}
//         min="1"
//         required
//         className="w-full p-2 border mb-4 rounded"
//       />

//       {/* Estado */}
//       <label className="block mb-2">Estado:</label>
//       <select
//         value={estado}
//         onChange={(e) => setEstado(e.target.value)}
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="activo">Activo</option>
//         {/*<option value="inactivo">Inactivo</option>*/}
//       </select>

//       <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//         Asignar
//       </button>
//     </form>
//   );
// }





































// import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function FormAsignacionEquipos() {
//   const [equipos, setEquipos] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [idEquipo, setIdEquipo] = useState('');
//   const [idSalon, setIdSalon] = useState('');
//   const [cantidadAsignada, setCantidadAsignada] = useState('');
//   const [estado, setEstado] = useState('activo');
//   const [stockDisponible, setStockDisponible] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: equiposData, error: equiposError } = await supabase
//         .from('equipos')
//         .select('id_equipo, nombre, cantidad');
//       const { data: salonesData, error: salonesError } = await supabase
//         .from('salones')
//         .select('id_salon, nombre');

//       if (equiposError) {
//         alert('Error al cargar equipos: ' + equiposError.message);
//       } else {
//         setEquipos(equiposData || []);
//       }

//       if (salonesError) {
//         alert('Error al cargar salones: ' + salonesError.message);
//       } else {
//         setSalones(salonesData || []);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!idEquipo) {
//       setStockDisponible(null);
//       return;
//     }
//     const equipoSeleccionado = equipos.find((eq) => eq.id_equipo === idEquipo);
//     setStockDisponible(equipoSeleccionado ? equipoSeleccionado.cantidad : null);
//   }, [idEquipo, equipos]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const cantidadNum = parseInt(cantidadAsignada);

//     if (!idEquipo || !idSalon || !cantidadNum || cantidadNum <= 0) {
//       alert('Por favor completa todos los campos correctamente.');
//       return;
//     }

//     if (stockDisponible === null) {
//       alert('Selecciona un equipo válido.');
//       return;
//     }

//     if (cantidadNum > stockDisponible) {
//       alert(`No hay suficiente stock disponible. Stock actual: ${stockDisponible}`);
//       return;
//     }

//     const { error: insertError } = await supabase.from('asignacion_equipos').insert({
//       id_equipo: idEquipo,
//       id_salon: idSalon,
//       cantidad_asignada: cantidadNum,
//       estado,
//     });

//     if (insertError) {
//       alert('Error al guardar la asignación: ' + insertError.message);
//       return;
//     }

//     const nuevoStock = stockDisponible - cantidadNum;

//     const { error: updateError } = await supabase
//       .from('equipos')
//       .update({ cantidad: nuevoStock })
//       .eq('id_equipo', idEquipo);

//     if (updateError) {
//       alert('Error al actualizar el stock: ' + updateError.message);
//       return;
//     }

//     alert('¡Asignación registrada y stock actualizado correctamente!');

//     setIdEquipo('');
//     setIdSalon('');
//     setCantidadAsignada('');
//     setEstado('activo');
//     setStockDisponible(null);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4 text-center">Asignar Equipos</h2>

//       {/* Selector de Equipo */}
//       <label className="block mb-2">Equipo:</label>
//       <select
//         value={idEquipo}
//         onChange={(e) => setIdEquipo(e.target.value)}
//         required
//         className="w-full p-2 border mb-1 rounded"
//       >
//         <option value="">Seleccione un equipo</option>
//         {equipos.map((equipo) => (
//           <option key={equipo.id_equipo} value={equipo.id_equipo}>
//             {equipo.nombre}
//           </option>
//         ))}
//       </select>

//       {/* Mostrar stock disponible si hay equipo seleccionado */}
//       {stockDisponible !== null && (
//         <p className="mb-4 text-sm text-gray-600">Stock disponible: {stockDisponible}</p>
//       )}

//       {/* Selector de Salón */}
//       <label className="block mb-2">Salón:</label>
//       <select
//         value={idSalon}
//         onChange={(e) => setIdSalon(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="">Seleccione un salón</option>
//         {salones.map((salon) => (
//           <option key={salon.id_salon} value={salon.id_salon}>
//             {salon.nombre}
//           </option>
//         ))}
//       </select>

//       {/* Cantidad */}
//       <label className="block mb-2">Cantidad Asignada:</label>
//       <input
//         type="number"
//         value={cantidadAsignada}
//         onChange={(e) => setCantidadAsignada(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//         placeholder="Ingrese cantidad"
//       />

//       {/* Estado */}
//       <label className="block mb-2">Estado:</label>
//       <select
//         value={estado}
//         onChange={(e) => setEstado(e.target.value)}
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="activo">Activo</option>
//         {/* <option value="inactivo">Inactivo</option> */}
//       </select>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         Asignar
//       </button>
//     </form>
//   );
// }

































// import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function FormAsignacionEquipos() {
//   const [equipos, setEquipos] = useState([]);
//   const [salones, setSalones] = useState([]);
//   const [idEquipo, setIdEquipo] = useState('');
//   const [idSalon, setIdSalon] = useState('');
//   const [cantidadAsignada, setCantidadAsignada] = useState('');
//   const [estado, setEstado] = useState('activo');

//   useEffect(() => {
//     async function fetchData() {
//       const { data: equiposData } = await supabase.from('equipos').select('id_equipo, nombre');
//       const { data: salonesData } = await supabase.from('salones').select('id_salon, nombre');
//       setEquipos(equiposData || []);
//       setSalones(salonesData || []);
//     }

//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase.from('asignacion_equipos').insert({
//       id_equipo: idEquipo,
//       id_salon: idSalon,
//       cantidad_asignada: parseInt(cantidadAsignada),
//       estado,
//     });

//     if (error) {
//       alert('Error al guardar: ' + error.message);
//     } else {
//       alert('¡Asignación registrada correctamente!');
//       // Limpia el formulario
//       setIdEquipo('');
//       setIdSalon('');
//       setCantidadAsignada('');
//       setEstado('activo');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4 text-center">Asignar Equipos</h2>

//       {/* Selector de Equipo */}
//       <label className="block mb-2">Equipo:</label>
//       <select
//         value={idEquipo}
//         onChange={(e) => setIdEquipo(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="">Seleccione un equipo</option>
//         {equipos.map((equipo) => (
//           <option key={equipo.id_equipo} value={equipo.id_equipo}>
//             {equipo.nombre}
//           </option>
//         ))}
//       </select>

//       {/* Selector de Salón */}
//       <label className="block mb-2">Salón:</label>
//       <select
//         value={idSalon}
//         onChange={(e) => setIdSalon(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="">Seleccione un salón</option>
//         {salones.map((salon) => (
//           <option key={salon.id_salon} value={salon.id_salon}>
//             {salon.nombre}
//           </option>
//         ))}
//       </select>

//       {/* Cantidad */}
//       <label className="block mb-2">Cantidad Asignada:</label>
//       <input
//         type="number"
//         value={cantidadAsignada}
//         onChange={(e) => setCantidadAsignada(e.target.value)}
//         required
//         className="w-full p-2 border mb-4 rounded"
//       />

//       {/* Estado */}
//       <label className="block mb-2">Estado:</label>
//       <select
//         value={estado}
//         onChange={(e) => setEstado(e.target.value)}
//         className="w-full p-2 border mb-4 rounded"
//       >
//         <option value="activo">Activo</option>
//        {/*<option value="inactivo">Inactivo</option> */}
//       </select>

//       <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//         Asignar
//       </button>
//     </form>
//   );
// }























//CONSULTA

// import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// export default function Asignaciones() {
//   const [asignaciones, setAsignaciones] = useState([]);

//   useEffect(() => {
//     async function fetchAsignaciones() {
//       const { data, error } = await supabase
//         .from('asignacion_equipos')
//         .select(`
//           id_equipo,
//           id_salon,
//           cantidad_asignada,
//           estado,
//           equipos (
//             nombre
//           )
//         `);

//       if (error) {
//         console.error('Error al obtener asignaciones:', error.message);
//       } else {
//         setAsignaciones(data);
//       }
//     }

//     fetchAsignaciones();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Asignaciones de Equipos</h2>
//       <table className="table-auto border-collapse w-full">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2 border">ID Equipo</th>
//             <th className="px-4 py-2 border">Nombre Equipo</th>
//             <th className="px-4 py-2 border">ID Salón</th>
//             <th className="px-4 py-2 border">Cantidad Asignada</th>
//             <th className="px-4 py-2 border">Estado</th>
//           </tr>
//         </thead>
//         <tbody>
//           {asignaciones.map((item, index) => (
//             <tr key={index} className="text-center">
//               <td className="border px-4 py-2">{item.id_equipo}</td>
//               <td className="border px-4 py-2">{item.equipos?.nombre}</td>
//               <td className="border px-4 py-2">{item.id_salon}</td>
//               <td className="border px-4 py-2">{item.cantidad_asignada}</td>
//               <td className="border px-4 py-2">{item.estado}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
