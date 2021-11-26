const {Schema, model} = require('mongoose')

const proyecto = new Schema ({
    Id_proyecto: Number,
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
    estado_proyecto: {
        type: Boolean,
        default: true
    },
    fase: {
        type: Boolean,
        default: true
    }
})
module.exports = model('proyectos', proyecto)