import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos


export default function Register() {
  const [id_salon, setSalon]         = useState('');
  const [id_persona,       setPersona]       = useState('');
  const [capacidad,            setCapacidad]       = useState('');
  const [hora_inicio,      setHoraInicio]       = useState('');
  const [hora_fin,   setHoraFin] =useState ('');
  const [descripcion, setDescripcion] =useState ('');
  
 

  const handleRegister = async (e) => {
    e.preventDefault();

   

    const nuevaReserva = {
      id_salon,
      id_persona,
      capacidad,
      hora_inicio,
      hora_fin,
      estado: 'pendiente',
      descripcion,
      
    };


    const { error } = await supabase.from('reservas').insert([nuevaReserva]);
   
    if (error) {
      console.error('Error al registrar:', error);
      toast.error(`Error: ${error.message}`);
      return;
    }

    toast.success('Reserva registrado correctamente');


    // Limpiar campos
    setSalon('');
    setPersona('');
    setCapacidad('');
    setHoraInicio('');
    setHoraFin('');
    setDescripcion('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nueva Reserva</h2>
         <label>Número de Salón</label>
        <input type="int"     placeholder="Salon"             className="form-input" value={id_salon}        onChange={(e) => setSalon(e.target.value)}         required />
        <label>ID de la Persona</label>
        <input type="int"     placeholder="Persona"           className="form-input" value={id_persona}      onChange={(e) => setPersona(e.target.value)}       required />
        <label>Cantidad de Personas</label>
        <input type="int"      placeholder="Capacidad"               className="form-input" value={capacidad}           onChange={(e) => setCapacidad(e.target.value)}  required/> 
        <label>Fecha de Inicio</label>
        <input type="datetime-local"      placeholder="HoraInicio"        className="form-input" value={hora_inicio}           onChange={(e) => setHoraInicio(e.target.value)}  required/> 
        <label>Fecha de Fin</label>
        <input type="datetime-local"      placeholder="HoraFin"        className="form-input" value={hora_fin}           onChange={(e) => setHoraFin(e.target.value)}  required/> 
        <label>Descripción del Evento</label>
        <input type="text"      placeholder="Descripcion"        className="form-input" value={descripcion}           onChange={(e) => setDescripcion(e.target.value)}  required/> 
    
        <button type="submit" className="form-button">Registrar Reserva</button>
      </form>
    </div>
  );
}



