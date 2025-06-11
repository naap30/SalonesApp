import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '../supabaseClient'   
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', email)
      .single()

    if (error || !usuario) {
      toast.error('Correo no encontrado')
      return
    }

    if (usuario.contrasena !== password) {
      toast.error('Contraseña incorrecta')
      return
    }

    toast.success(`Bienvenido, ${usuario.nombre}`);
    navigate('/sobrenosotros');
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="login-footer">
          <p>¿Aún no tienes una cuenta?</p>
          <button
            type="button"
            className="login-register-btn"
            onClick={() => window.location.href = '/register'}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}




















// import { useState } from 'react'
// import { toast } from 'sonner'
// import { supabase } from '../supabaseClient' // Asegúrate que el path esté bien

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Buscar el usuario con el correo
//     const { data: usuario, error } = await supabase
//       .from('usuarios')
//       .select('*')
//       .eq('correo', email)
//       .single()

//     if (error || !usuario) {
//       toast.error('Correo no encontrado')
//       return
//     }

//     // Comparar contraseñas (solo para pruebas)
//     if (usuario.contrasena !== password) {
//       toast.error('Contraseña incorrecta')
//       return
//     }

//     toast.success(`Bienvenido, ${usuario.nombre}`)
//     // Aquí puedes guardar sesión o redirigir
//   }

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="login-title">Iniciar sesión</h2>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Iniciar sesión</button>
//       </form>

//       <div>
//         <p>¿Aún no tienes una cuenta? ¡Regístrate aquí!</p>
//         <button
//           type="button"
//           onClick={() => window.location.href = '/register'}
//         >
//           Registrarse
//         </button>
//       </div>
//     </div>
//   )
// }





















// import { useState } from 'react'
// import { toast } from 'sonner'
// import { supabase } from '../supabaseClient' // Asegúrate que el path esté bien

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Buscar el usuario con el correo
//     const { data: usuario, error } = await supabase
//       .from('usuarios')
//       .select('*')
//       .eq('correo', email)
//       .single()

//     if (error || !usuario) {
//       toast.error('Correo no encontrado')
//       return
//     }

//     // Comparar contraseñas (solo para pruebas)
//     if (usuario.contrasena !== password) {
//       toast.error('Contraseña incorrecta')
//       return
//     }

//     toast.success(`Bienvenid@, ${usuario.nombre}`)
//     // Aquí puedes guardar sesión o redirigir
//   }

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="login-title">Iniciar sesión</h2>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Iniciar sesión</button>
        
//       </form>
//     </div>
//   )
// }



  








// import { useState } from 'react'
// import { toast } from 'sonner'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Aquí iría la integración con Supabase o API
//     toast.success("Inicio de sesión simulado")
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Iniciar sesión</h2>
        
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
        
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
        
//         <button type="submit">Iniciar sesión</button>
        
        // <div>
        //   <p>¿Aún no tienes una cuenta? ¡Regístrate aquí!</p>
        //   <button
        //     type="button"
        //     onClick={() => window.location.href = '/register.jsx'}
        //   >
        //     Registrarse
        //   </button>
        // </div>
//       </form>
//     </div>
//   )
// }






















// import { useState } from 'react'
// import { toast } from 'sonner'


// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Aquí iría la integración con Supabase o API
//     toast.success("Inicio de sesión simulado")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           className="w-full p-3 border rounded-lg mb-6"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
//           Iniciar sesión
//         </button>
//         <div className="mt-6 text-center">
//           <p className="text-sm mb-2">¿Aún no tienes una cuenta? ¡Regístrate aquí!</p>
//           <button
//             type="button"
//             onClick={() => navigate('/register.jsx')}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Registrarse
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
