const proyecto = require('./modelo/proyectosModelo')
const User = require('./modelo/usuariosModelo')
var aes256 = require('aes256');

const listUsuarios=[
    {
      correo: 'btflorezc@gmail.com',
      estado: 'Autorizado',
      identificacion: 37393237,
      nombre_completo: 'Betsy Tatiana Flórez Carrillo',
      tipo_usuario: 'Estudiante'
    },
    {
      correo: 'wilmerunal@gmail.com',
      estado: 'Autorizado',
      identificacion: 80378556,
      nombre_completo: 'Wilmer Manuel Amezquita Obando',
      tipo_usuario: 'Lider'
    },
    {
      correo: 'marcarflo52@hotmail.com',
      estado: 'No autorizado',
      identificacion: 37249945,
      nombre_completo: 'Mary Carrillo de Flórez',
      tipo_usuario: 'Estudiante'
    }
  ]
  
  const key = 'CLAVECOMPLICADA';

  const resolvers = {
    Query:{
      usuarios: () => listUsuarios,
      usuario: (parent, args, context, info) => {
        return listUsuarios.find( user=> user.identificacion == args.identificacion)
        },
      proyectos: async () => await proyecto.find({}),
      getProyecto: async (parent, args, context, info) => await proyecto.findOne({nombre: args.nombre})
      },
    Mutation:{
      /*createUser:(parent, args, context, info) => {
        const { nombre_completo, identificacion, correo, tipo_usuario, contrasena } = args.user;
        const nuevoUsuario = new User(args.user);
        nuevoUsuario.save();
        return "Usuario ha sido creado."
      },*/
      createUser: async(parent, args, context, info) => {
        const {contrasena} = args.user;
        const nuevoUsuario = new User(args.user);
        const encryptedPlainText = aes256.encrypt(key, contrasena);
        nuevoUsuario.contrasena = encryptedPlainText;
        return nuevoUsuario.save()
          .then(u => "Usuario ha sido creado.")
          .catch(err => "Fallo la creación del usuario.");
      }
    }

/* Para encriptar contraseñas se instala npm install aes256 */

  }
  module.exports = resolvers