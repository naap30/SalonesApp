import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos
//import { CloudCog } from 'lucide-react';

export default function Register() {
  const [nombre,          setNombre]         = useState('');
  const [cantidad,       setCantidad]       = useState('');
  const [marca,            setMarca]       = useState('');
  const [modelo,      setModelo]       = useState('');
  const [ubicacion,   setUbicacion] =useState ('');
  const [stock_disponible, setStock_disponible] =useState('');
 

  const handleRegister = async (e) => {
    e.preventDefault();

   

    const nuevoEquipo = {
      nombre,
      cantidad,
      marca,
      modelo,
      estado: 'disponible',
      ubicacion,
      stock_disponible,
      
    };


    const { error } = await supabase.from('equipos').insert([nuevoEquipo]);
   
    if (error) {
      console.error('Error al registrar:', error);
      toast.error(`Error: ${error.message}`);
      return;
    }

    toast.success('Equipo registrado correctamente');


    // Limpiar campos
    setNombre('');
    setCantidad('');
    setMarca('');
    setModelo('');
    setUbicacion('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nuevo Equipo</h2>
        <label>Nombre del Equipo</label>
        <input type="text"     placeholder="Nombre"             className="form-input" value={nombre}        onChange={(e) => setNombre(e.target.value)}         required />
        <label>Cantidad</label>
        <input type="int"     placeholder="Cantidad"           className="form-input" value={cantidad}      onChange={(e) => setCantidad(e.target.value)}       required />
         <label>Cantidad en Stock</label>
         <input type="int"      placeholder="Stock"               className="form-input" value={stock_disponible}           onChange={(e) => setStock_disponible(e.target.value)}  required/> 
          <label>Marca del Dispositivo</label>
        <input type="text"      placeholder="Marca"               className="form-input" value={marca}           onChange={(e) => setMarca(e.target.value)}  required/>
         <label>Marca del Modelo</label> 
        <input type="text"      placeholder="Modelo"        className="form-input" value={modelo}           onChange={(e) => setModelo(e.target.value)}  required/> 
        <label> Ubicación del Dispositivo</label> 
        <input type="text"      placeholder="Ubicacion"        className="form-input" value={ubicacion}           onChange={(e) => setUbicacion(e.target.value)}  required/> 

        <button type="submit" className="form-button">Registrar Equipo</button>
      </form>
    </div>
  );
}
