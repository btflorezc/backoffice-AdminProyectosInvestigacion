const {gql} = require ('apollo-server-express')

/*type Proyecto {
        nombre: String
        lider: String
    }*/

const typeDefs = gql`
    
    type Usuario {
        correo: String
        estado: String
        identificacion: Int
        nombre_completo: String
        tipo_usuario: String
    }

    type Proyecto {
        Id_proyecto: String
        nombre: String
        objetivos_generales: String
        objetivos_especificos: String
        presupuesto: Int
        fecha_inicio: String
        fecha_terminacion: String
        documento: Int
        lider: String
        estado_proyecto: String
        fase: String
    }

    type Query{
        usuarios : [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos : [Proyecto]
        getProyecto (nombre: String) : Proyecto 
    }

    input UserInput{
        nombre_completo: String
        identificacion: Int
        correo: String
        tipo_usuario: String
        contrasena: String
    }

    type Mutation{
        createUser(user:UserInput):String
        activeUser(identificacion:Int):String
    }

`
module.exports = typeDefs