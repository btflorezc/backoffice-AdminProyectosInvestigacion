const proyecto = require('./modelo/proyectosModelo')

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
  
  const resolvers = {
      Query:{
          usuarios: () => listUsuarios,
          usuario: (parent, args, context, info) => {
              return listUsuarios.find( user=> user.identificacion == args.identificacion)
          },
          proyectos: async () => await proyecto.find({})
      }
  }
  
  module.exports = resolvers