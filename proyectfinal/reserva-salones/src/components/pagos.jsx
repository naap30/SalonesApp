import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Register() {
  const [id_reserva,          setReserva]         = useState('');
  const [precio_total,       setPrecioTotal]       = useState('');
  const [fecha_pago, setFechaPago] = useState(new Date());
  
 
 
 
    const [metodo_de_pago, setMetodo_de_pago] = useState(undefined);

    const options = [
        "efectivo",
        "transferencia",
        "tarjeta",
        
    ];
    const onOptionChangeHandler = (event) => {
        setMetodo_de_pago(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };

  const handleRegister = async (e) => {
    e.preventDefault();

   

    const nuevoPago = {
      id_reserva,
      precio_total,
     metodo_de_pago,
      fecha_pago,
      estado: 'pagado',
   
    };


    const { error } = await supabase.from('pago').insert([nuevoPago]);
   
    if (error) {
      console.error('Error al registrar:', error);
      toast.error(`Error: ${error.message}`);
      return;
    }

    toast.success('Pago registrado correctamente');


    // Limpiar campos
    setReserva('');
    setPrecioTotal('');
    setFechaPago('');

    
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nuevo Pago </h2>

        <label>Número de la Reserva</label>
        <input type="int"     placeholder="Reserva"           className="form-input" value={id_reserva}      onChange={(e) => setReserva(e.target.value)}       required />
        <label>Precio Total</label>
         <input type="numeric"      placeholder="PrecioTotal"               className="form-input" value={precio_total}           onChange={(e) => setPrecioTotal(e.target.value)}  required/> 
        
         <label>Metodo de Pago</label>
         <select onChange={onOptionChangeHandler}>
                <option>Selecciona el Metodo de Pago</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>

          
            
               <label>Fecha Pago</label>
             <DatePicker selected={fecha_pago} onChange={(fecha_pago) => setFechaPago(fecha_pago)} />
           
            
         
               

         
        
        
        <button type="submit" className="form-button">Registrar Pago</button>
      </form>
    </div>
  );
}
