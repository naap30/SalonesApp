
import supabase from './supabaseClient.js'
import bcrypt from 'bcrypt'


async function registerUser(personaData, usuarioData) {
  try {
    // Paso 1: Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(usuarioData.contrasena, 10)

    // Paso 2: Insertar en la tabla personas
    const { data: persona, error: errorPersona } = await supabase
      .from('personas')
      .insert([personaData])
      .select('id_persona')
      .single()

    if (errorPersona) throw errorPersona

    const id_persona = persona.id_persona

    // Paso 3: Insertar en la tabla usuarios con el id_persona
    const { error: errorUsuario } = await supabase
      .from('usuarios')
      .insert([{
        id_persona,
        nombre: usuarioData.nombre,
        correo: usuarioData.correo,
        contrasena: hashedPassword,
        tipo: usuarioData.tipo
      }])

    if (errorUsuario) throw errorUsuario

    console.log('✅ Usuario registrado correctamente.')
  } catch (error) {
    console.error('❌ Error registrando usuario:', error.message)
  }
}

//USO EJEMPLO
const personaInfo = {
  nombre: 'Laura',
  apellido: 'García',
  correo: 'laura.garcia@example.com',
  telefono: '3216549870',
  direccion: 'Av. Siempre Viva 742',
  ciudad: 'Lima',
  pais: 'Perú',
  nombre_usuario: 'laurag',
  contrasena: 'secreta123'
}

const usuarioInfo = {
  nombre: 'Laura García',
  correo: 'laura.garcia@example.com',
  contrasena: 'secreta123',
  tipo: 'admin'
}

registerUser(personaInfo, usuarioInfo)
