import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [pagos, setPagos] = useState([]);
  const [mesFiltro, setMesFiltro] = useState(''); // mes seleccionado (formato 'YYYY-MM')

  // Función para traer pagos, opcionalmente filtrando por mes
  async function getPagos(mes = '') {
    let query = supabase.from("pago").select().order('fecha_pago', { ascending: false });

    if (mes) {
      // Filtrar pagos donde fecha_pago esté entre el primer día y último día del mes seleccionado
      const inicioMes = new Date(mes + '-01');
      const finMes = new Date(inicioMes);
      finMes.setMonth(finMes.getMonth() + 1);

      query = query
        .gte('fecha_pago', inicioMes.toISOString())
        .lt('fecha_pago', finMes.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error al obtener pagos:', error);
      setPagos([]);
      return;
    }

    setPagos(data);
  }

  // Cuando cambia el filtro de mes
  const handleChangeMes = (e) => {
    const mesSeleccionado = e.target.value;
    setMesFiltro(mesSeleccionado);
    getPagos(mesSeleccionado);
  };

  // Cargar pagos al inicio (sin filtro)
  useEffect(() => {
    getPagos();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-pink-400 bg-sky-100 px-4 py-2 rounded-lg my-4 mx-0 m:text-center w-80">
        Lista de Pagos
      </h1>

      <div className="mb-4">
        <label htmlFor="mesFiltro" className="mr-2 font-semibold">Filtrar por mes:</label>
        <input
          type="month"
          id="mesFiltro"
          value={mesFiltro}
          onChange={handleChangeMes}
          className="border border-gray-300 rounded px-2 py-1"
        />
        {mesFiltro && (
          <button
            onClick={() => {
              setMesFiltro('');
              getPagos('');
            }}
            className="ml-2 px-2 py-1 bg-red-400 text-white rounded"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      <div>
        <table className="table-auto border-collapse w-full">
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
            {pagos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No hay pagos para mostrar</td>
              </tr>
            ) : (
              pagos.map((pago) => (
                <tr key={pago.id_pago} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{pago.id_pago}</td>
                  <td className="px-4 py-2 border-b">{pago.id_reserva}</td>
                  <td className="px-4 py-2 border-b">{pago.precio_total}</td>
                  <td className="px-4 py-2 border-b">{pago.metodo_de_pago}</td>
                  <td className="px-4 py-2 border-b">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{pago.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
