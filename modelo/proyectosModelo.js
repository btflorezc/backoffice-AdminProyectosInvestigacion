const {Schema, model} = require('mongoose')

const proyecto = new Schema ({
    Id_proyecto: {
        type: String,
        unique: true
    },
    nombre: String,
    objetivos_generales: String,
    objetivos_especificos: String,
    presupuesto: Number,
    fecha_inicio: {
        type: Date,
        default: new Date ()
    },
    fecha_terminacion: {
        type: Date,
        default: new Date ()
    },
    documento: Number,
    lider: String,
    estado_creacion: {
        type: String,
        default: "No aprobado"
    },
    estado_proyecto: {
        type: String,
        default: "Inactivo"
    },
    fase: {
        type: String,
        default: "Nula"
    }
})
module.exports = model('proyectos', proyecto)