import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';   //import base de datos
//import { CloudCog } from 'lucide-react';

export default function Register() {
  const [nombre,         setNombre]         = useState('');
  const [apellido,       setApellido]       = useState('');
  const [correo,         setCorreo]         = useState('');
  const [telefono,       setTelefono]       = useState('');
  const [direccion,      setDireccion]      = useState('');
  const [ciudad,         setCiudad]         = useState('');
  const [pais,           setPais]           = useState('');
  const [nombreUsuario,  setNombreUsuario]  = useState('');
  const [contrasena,     setContrasena]     = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
 

  const handleRegister = async (e) => {
    e.preventDefault();

   if (contrasena !== confirmarContrasena) {
    toast.error('Las contraseñas no coinciden');
    return;
  }

    const nuevaPersona = {
      nombre,
      apellido,
      correo,
      telefono,
      direccion,
      ciudad,
      pais,
      nombre_usuario: nombreUsuario,
      contrasena, 
    };


    const { error } = await supabase.from('personas').insert([nuevaPersona]);


     const data=await supabase.from('ultimo').select('*')
 
     //const {id} = await supabase.from('usuarios').select();
     //console.log(data.data[0].id_persona)
     
    const idp=data.data[0].id_persona;
      //console.log(data.id_persona);
      const usuarios={
      id_persona: idp,
      nombre,
      correo,
      contrasena,
      tipo:'usuario',
     }
     console.log(usuarios);
    const {error2} = await supabase.from('usuarios').insert([usuarios]);
   
    if (error2) {
      console.error('Error al registrar:', error2);
      toast.error(`Error: ${error2.message}`);
      return;
    }

    toast.success('Registro guardado correctamente');


    // Limpiar campos
    setNombre('');
    setApellido('');
    setCorreo('');
    setTelefono('');
    setDireccion('');
    setCiudad('');
    setPais('');
    setNombreUsuario('');
    setContrasena('');
    setConfirmarContrasena(''); 
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Crear cuenta</h2>

        <input type="text"     placeholder="Nombre"             className="form-input" value={nombre}        onChange={(e) => setNombre(e.target.value)}         required />
        <input type="text"     placeholder="Apellido"           className="form-input" value={apellido}      onChange={(e) => setApellido(e.target.value)}       required />
        <input type="email"    placeholder="Correo electrónico" className="form-input" value={correo}        onChange={(e) => setCorreo(e.target.value)}         required />
        <input type="tel"      placeholder="Teléfono"           className="form-input" value={telefono}      onChange={(e) => setTelefono(e.target.value)}       required />
        <input type="text"     placeholder="Dirección"          className="form-input" value={direccion}     onChange={(e) => setDireccion(e.target.value)}      required />
        <input type="text"     placeholder="Ciudad"             className="form-input" value={ciudad}        onChange={(e) => setCiudad(e.target.value)}         required />
        <input type="text"     placeholder="País"               className="form-input" value={pais}          onChange={(e) => setPais(e.target.value)}           required />
        <input type="text"     placeholder="Nombre de usuario"  className="form-input" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}  required />
        <input type="password" placeholder="Contraseña"         className="form-input" value={contrasena}    onChange={(e) => setContrasena(e.target.value)}     required />
       <input type="password" placeholder="Confirmar contraseña" className="form-input" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)}required/>
        <button type="submit" className="form-button">Registrarse</button>
      </form>
    </div>
  );
}




// import { useState } from 'react'
// import { toast } from 'sonner'
// import { supabase } from '../supabaseClient';
// console.log(supabase);

// export default function Register() {
//   const [nombre, setNombre] = useState('')
//   const [apellido, setApellido] = useState('')
//   const [correo, setCorreo] = useState('')
//   const [telefono, setTelefono] = useState('')
//   const [direccion, setDireccion] = useState('')
//   const [ciudad, setCiudad] = useState('')
//   const [pais, setPais] = useState('')
//   const [nombreUsuario, setNombreUsuario] = useState('')
//   const [contrasena, setContrasena] = useState('')

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     toast.success("Registro guardado")
//   }

//   return (
//     <div className="register-container">
//       <form onSubmit={handleRegister} className="register-form">
//         <h2 className="register-title">Crear cuenta</h2>

//         <input type="text" placeholder="Nombre" className="form-input" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
//         <input type="text" placeholder="Apellido" className="form-input" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
//         <input type="email" placeholder="Correo electrónico" className="form-input" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
//         <input type="tel" placeholder="Teléfono" className="form-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
//         <input type="text" placeholder="Dirección" className="form-input" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
//         <input type="text" placeholder="Ciudad" className="form-input" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
//         <input type="text" placeholder="País" className="form-input" value={pais} onChange={(e) => setPais(e.target.value)} required />
//         <input type="text" placeholder="Nombre de usuario" className="form-input" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
//         <input type="password" placeholder="Contraseña" className="form-input" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />

//         <button type="submit" className="form-button">Registrarse</button>
//       </form>
//     </div>
//   )
// }












// import { useState } from 'react'
// import { toast } from 'sonner'
// //import './index.css'

// export default function Register() {
//   const [nombre, setNombre] = useState('')
//   const [apellido, setApellido] = useState('')
//   const [correo, setCorreo] = useState('')
//   const [telefono, setTelefono] = useState('')
//   const [direccion, setDireccion] = useState('')
//   const [ciudad, setCiudad] = useState('')
//   const [pais, setPais] = useState('')
//   const [nombreUsuario, setNombreUsuario] = useState('')
//   const [contrasena, setContrasena] = useState('')

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     // Aquí puedes hacer la llamada a Supabase para registrar el usuario
//     toast.success("Registro simulado")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

//         <input
//           type="text"
//           placeholder="Nombre"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={nombre}
//           onChange={(e) => setNombre(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Apellido"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={apellido}
//           onChange={(e) => setApellido(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={correo}
//           onChange={(e) => setCorreo(e.target.value)}
//           required
//         />

//         <input
//           type="tel"
//           placeholder="Teléfono"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={telefono}
//           onChange={(e) => setTelefono(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Dirección"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={direccion}
//           onChange={(e) => setDireccion(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Ciudad"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={ciudad}
//           onChange={(e) => setCiudad(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="País"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={pais}
//           onChange={(e) => setPais(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Nombre de usuario"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={nombreUsuario}
//           onChange={(e) => setNombreUsuario(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Contraseña"
//           className="w-full p-3 border rounded-lg mb-6"
//           value={contrasena}
//           onChange={(e) => setContrasena(e.target.value)}
//           required
//         />

//         <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
//           Registrarse
//         </button>
//       </form>
//     </div>
//   )
// }
