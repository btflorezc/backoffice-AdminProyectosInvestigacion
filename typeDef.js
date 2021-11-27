const {gql} = require ('apollo-server-express')

const typeDefs = gql`
    
    type Usuario {
        correo: String
        estado: String
        identificacion: Int
        nombre_completo: String
        tipo_usuario: String
    }

    type Proyecto {
        nombre: String
        lider: String
    }

    type Query{
        usuarios : [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos : [Proyecto]
    }
`
module.exports = typeDefs