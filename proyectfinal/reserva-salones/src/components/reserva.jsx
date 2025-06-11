import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos

export default function Register() {
  const [id_salon, setSalon] = useState('');
  const [salones, setSalones] = useState([]);
  const [id_persona, setPersona] = useState('');
  const [personas, setPersonas] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [hora_inicio, setHoraInicio] = useState('');
  const [hora_fin, setHoraFin] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Obtener salones desde Supabase
  async function getSalones() {
    const { data, error } = await supabase.from("salones").select('id_salon, nombre');
    if (error) {
      console.error("Error al obtener salones:", error);
    } else {
      setSalones(data);
    }
  }

  // Obtener personas desde Supabase
  async function getPersonas() {
    const { data, error } = await supabase.from("personas").select('id_persona, nombre, apellido');
    if (error) {
      console.error("Error al obtener personas:", error);
    } else {
      setPersonas(data);
    }
  }

  useEffect(() => {
    getSalones();
    getPersonas();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const nuevaReserva = {
      id_salon,
      id_persona,
      cantidad,
      hora_inicio,
      hora_fin,
      estado: 'pendiente',
      descripcion,
    };

    const { error } = await supabase.from('reservas').insert(nuevaReserva);

    if (error) {
      console.error('Error al registrar:', error);
      toast.error(`Error: ${error.message}`);
      return;
    }

    toast.success('Reserva registrada correctamente');

    // Limpiar campos
    setSalon('');
    setPersona('');
    setCantidad('');
    setHoraInicio('');
    setHoraFin('');
    setDescripcion('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nueva Reserva</h2>

        <label>Persona</label>
        <select
          value={id_persona}
          onChange={(e) => setPersona(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Selecciona una Persona</option>
          {personas.map((persona) => (
            <option key={persona.id_persona} value={persona.id_persona}>
              {persona.nombre} {persona.apellido}
            </option>
          ))}
        </select>

        <label>Cantidad de Personas</label>
        <input
          type="number"
          placeholder="Cantidad"
          className="form-input"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <label>Fecha de Inicio</label>
        <input
          type="datetime-local"
          className="form-input"
          value={hora_inicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />

        <label>Fecha de Fin</label>
        <input
          type="datetime-local"
          className="form-input"
          value={hora_fin}
          onChange={(e) => setHoraFin(e.target.value)}
          required
        />

        <label>Descripción del Evento</label>
        <input
          type="text"
          placeholder="Descripción"
          className="form-input"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Salón</label>
        <select
          value={id_salon}
          onChange={(e) => setSalon(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Selecciona un Salón</option>
          {salones.map((salon) => (
            <option key={salon.id_salon} value={salon.id_salon}>
              {salon.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="form-button">Registrar Reserva</button>
      </form>
    </div>
  );
}

























// import { useState,useEffect } from 'react';
// import { toast } from 'sonner';
// import { supabase } from '../supabaseClient';   //import base de datos


// export default function Register() {
//   const [id_salon, setSalon]         = useState('');
//   const [option, setOption] = useState([]);
//   const [id_persona,       setPersona]       = useState('');
//   const [cantidad,            setCantidad]       = useState('');
//   const [hora_inicio,      setHoraInicio]       = useState('');
//   const [hora_fin,   setHoraFin] =useState ('');
//   const [descripcion, setDescripcion] =useState ('');
  
//   async function getOption() {
     
//    const{option}= await supabase.from("salones").select('nombre');
//     setOption(option.nombre || option.id_salon || option.value);   
//   }
//   useEffect(() => {
//     getOption();
//   }, []);


//   // useEffect(() => {
//   //   const fetchOption = async () => {
//   //     const { option: fetchedOption, error } = await supabase.from("salones").select('nombre');

//   //     if (error) {
//   //       console.error('Error fetching data:', error);
//   //     } else {
//   //       setOption(fetchedOption); // Asigna los datos a la variable de estado
//   //       console.log(option);
//   //     }
//   //   };

//   //   fetchOption();
//   // }, []); 


//  //console.log("Option:", option.nombre);

//   const onOptionChangeHandler = (event) => {
//         setSalon(event.target.value);
//         console.log(
//             "User Selected Value - ",
//             event.target.value
//         );
//     };

//   const handleRegister = async (e) => {
//     e.preventDefault();

   

//     const nuevaReserva = {
//       id_salon,
//       id_persona,
//       cantidad,
//       hora_inicio,
//       hora_fin,
//       estado: 'pendiente',
//       descripcion,
      
//     };



//     const { error } = await supabase.from('reservas').select();
   
//     if (error) {
//       console.error('Error al registrar:', error);
//       toast.error(`Error: ${error.message}`);
//       return;
//     }

//     toast.success('Reserva registrado correctamente');


//     // Limpiar campos
//     setSalon('');
//     setPersona('');
//     setCantidad('');
//     setHoraInicio('');
//     setHoraFin('');
//     setDescripcion('');
//   };

//   return (
//     <div className="register-container">
//       <form onSubmit={handleRegister} className="register-form">
//         <h2 className="register-title">Registrar Nueva Reserva</h2>
         
//         <label>ID de la Persona</label>
//         <input type="int"     placeholder="Persona"           className="form-input" value={id_persona}      onChange={(e) => setPersona(e.target.value)}       required />
//         <label>Cantidad de Personas</label>
//         <input type="int"      placeholder="Cantidad"               className="form-input" value={cantidad}           onChange={(e) => setCantidad(e.target.value)}  required/> 
//         <label>Fecha de Inicio</label>
//         <input type="datetime-local"      placeholder="HoraInicio"        className="form-input" value={hora_inicio}           onChange={(e) => setHoraInicio(e.target.value)}  required/> 
//         <label>Fecha de Fin</label>
//         <input type="datetime-local"      placeholder="HoraFin"        className="form-input" value={hora_fin}           onChange={(e) => setHoraFin(e.target.value)}  required/> 
//         <label>Descripción del Evento</label>
//         <input type="text"      placeholder="Descripcion"        className="form-input" value={descripcion}           onChange={(e) => setDescripcion(e.target.value)}  required/> 
       
//         <label>Salones</label>
//          <select onChange={onOptionChangeHandler}>
//                 <option>Selecciona el Salón</option>
//                 {option.map((option, index) => {
//                     return (
//                         <option key={index}>
//                             {option.value || option.nombre || option.id_salon}
//                         </option>
//                     );
//                 })}
//             </select>


     
//         <button type="submit" className="form-button">Registrar Reserva</button>
//       </form>
//     </div>
//   );
// }



