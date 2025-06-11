import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';   //import base de datos


export default function Register() {
  const [pagos, setPagos] = useState([]);

  async function getPagos() {
    const { data } = await supabase.from("pago").select();
    setPagos(data);
  }

    useEffect(() => {
    getPagos();
  }, []);
  
  return (
    <>
  
    <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Pagos</h1>
        <div > 
      <table className="table-auto border-collapse"> 
        <thead>
          <tr className="bg-gray-200"> 
            <th className="px-4 py-2 border-b">ID Pago</th>
            <th className="px-4 py-2 border-b">ID Reserva</th>
            <th className="px-4 py-2 border-b">Precio Total</th>
            <th className="px-4 py-2 border-b">Metodo de Pago</th>
            <th className="px-4 py-2 border-b">Fecha de Pago</th>
            <th className="px-4 py-2 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
    
      {pagos.map((pagos) => (
        
        
            <tr key={pagos.id_pago} className="hover:bg-gray-100"> 
              <td className="px-4 py-2 border-b">{pagos.id_pago}</td>
              <td className="px-4 py-2 border-b">{pagos.id_reserva}</td>
              <td className="px-4 py-2 border-b">{pagos.precio_total}</td>
              <td className="px-4 py-2 border-b">{pagos.metodo_de_pago}</td>
              <td className="px-4 py-2 border-b">{pagos.fecha_pago}</td>
              <td className="px-4 py-2 border-b">{pagos.estado}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}