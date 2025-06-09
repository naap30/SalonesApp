import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos
//import { CloudCog } from 'lucide-react';

export default function Register() {
  const [nombre,          setNombre]         = useState('');
  const [capacidad,       setCapacidad]       = useState('');
 const [piso,            setPiso]       = useState('');
  
  
 const [tipo_salon, setTipoSalon] = useState(undefined);

    const options = [
        "Salon de Conferencias",
        "Aula Creativa",
        "Aula de Informática",
        "Oficina de Videollamadas",
        "Aula Virtual",
        
    ];
    const onOptionChangeHandler = (event) => {
        setTipoSalon(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };

  const handleRegister = async (e) => {
    e.preventDefault();

   

    const nuevoSalon = {
      nombre,
      capacidad,
      piso,
      estado: 'disponible',
      tipo_salon,
      
    };


    const { error } = await supabase.from('salones').insert([nuevoSalon]);
   
    if (error) {
      console.error('Error al registrar:', error);
      toast.error(`Error: ${error.message}`);
      return;
    }

    toast.success('Salon registrado correctamente');


    // Limpiar campos
    setNombre('');
    setCapacidad('');
    setPiso('');
    setTipoSalon('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nuevo Salón</h2>
        <label>Nombre del Salón</label>
        <input type="text"     placeholder="Nombre"             className="form-input" value={nombre}        onChange={(e) => setNombre(e.target.value)}         required />
         <label>Capacidad del Salón</label>
        <input type="int"     placeholder="Capacidad"           className="form-input" value={capacidad}      onChange={(e) => setCapacidad(e.target.value)}       required />
         <label>Nivel del Salón</label>
        <input type="int"      placeholder="Piso"               className="form-input" value={piso}           onChange={(e) => setPiso(e.target.value)}  required/> 
    
          <label>Tipo de Salón</label>
         <select onChange={onOptionChangeHandler}>
                <option>Selecciona el Tipo de Salón</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>



         {/* <label>Tipo de Salón</label>
        <input type="text"      placeholder="TipoSalon"        className="form-input" value={tipo_salon}           onChange={(e) => setTipoSalon(e.target.value)}  required/>  */}
        

        <button type="submit" className="form-button">Registrar Salón</button>
      </form>
    </div>
  );
}

