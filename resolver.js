const proyecto = require('./modelo/proyectosModelo')
const User = require('./modelo/usuariosModelo')
var aes256 = require('aes256'); /* Para encriptar contraseñas se instala npm install aes256 */

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
      /*usuarios: () => listUsuarios,
      /*usuario: (parent, args, context, info) => {
        return listUsuarios.find( user=> user.identificacion == args.identificacion)
        },*/
      
      usuarios: async () => await User.find({}),
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
      },
      /*activeUser: async (parent, args, context, info) => {
        const resp = await User.updateOne({identificacion:args.identificacion}, {estado:"Autorizado"});
        console.log(resp);
      }*/
      activeUser: (parent, args, context, info) => {
        return User.updateOne({identificacion:args.identificacion}, {estado:"Autorizado"})
          .then(u => "Se realizó la activación del usuario.")
          .catch(err => "Fallo la activación del usuario.");
      },
      aprobarcrearProyecto: (parent, args, context, info) => {
        return proyecto.updateOne({Id_proyecto:args.Id_proyecto}, {estado_creacion:"Aprobado"})
          .then(u => "Se realizó la aprobación para creación del proyecto")
          .catch(err => "Fallo la aprobación para creación del proyecto");
      }
      /*aprobarcrearProyecto: async (parent, args, context, info) => {
        const resp = await proyecto.updateOne({Id_proyecto:args.Id_proyecto}, {estado_creacion:"Aprobado"})
        console.log(resp);
      }*/
    }
  }
  module.exports = resolvers