import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  // Estados para los campos
  const [id_reserva, setReserva] = useState('');
  const [precio_total, setPrecioTotal] = useState('');
  const [fecha_pago, setFechaPago] = useState(new Date());
  const [metodo_de_pago, setMetodo_de_pago] = useState(undefined);

  // Estado para guardar los id_reserva que vienen de la base de datos
  const [reservas, setReservas] = useState([]);

  const options = [
    "efectivo",
    "transferencia",
    "tarjeta",
  ];

  const onOptionChangeHandler = (event) => {
    setMetodo_de_pago(event.target.value);
    console.log("User Selected Value - ", event.target.value);
  };

  // Traer los id_reserva al cargar el componente
  useEffect(() => {
    const fetchReservas = async () => {
      const { data, error } = await supabase
        .from('reservas')      // Cambia 'reservas' por el nombre exacto de tu tabla de reservas
        .select('id_reserva'); // Solo traemos el id_reserva

      if (error) {
        console.error('Error al traer reservas:', error);
        toast.error('Error al cargar reservas');
        return;
      }

      setReservas(data);
    };

    fetchReservas();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!id_reserva) {
      toast.error('Por favor selecciona una reserva');
      return;
    }
    if (!metodo_de_pago) {
      toast.error('Por favor selecciona un método de pago');
      return;
    }

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
    setFechaPago(new Date());
    setMetodo_de_pago(undefined);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Registrar Nuevo Pago </h2>

        <label>Número de la Reserva</label>
        <select
          className="form-input"
          value={id_reserva}
          onChange={(e) => setReserva(e.target.value)}
          required
        >
          <option value="">Selecciona tu reserva</option>
          {reservas.map((reserva) => (
            <option key={reserva.id_reserva} value={reserva.id_reserva}>
              {reserva.id_reserva}
            </option>
          ))}
        </select>

        <label>Precio Total</label>
        <input
          type="number"
          placeholder="Precio Total"
          className="form-input"
          value={precio_total}
          onChange={(e) => setPrecioTotal(e.target.value)}
          required
        />

        <label>Método de Pago</label>
        <select
          className="form-input"
          value={metodo_de_pago || ""}
          onChange={onOptionChangeHandler}
          required
        >
          <option value="">Selecciona el Método de Pago</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Fecha Pago</label>
        <DatePicker selected={fecha_pago} onChange={setFechaPago} />

        <button type="submit" className="form-button">Registrar Pago</button>
      </form>
    </div>
  );
}
