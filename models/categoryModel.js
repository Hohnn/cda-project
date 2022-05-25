import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CategorySchema = new mongoose.Schema({
    name_cat: {
        type: String,
        enum: ['C0', 'C1', 'C2', 'C3', 'C4', 'Testeur']
    },
    description_cat: {
        type: String,
        enum: [
            "Catégorie Ouverte A1/A3. Cette catégorie autorise le survol des personnes (sauf regroupement).",
            "Catégorie Ouverte A1/A3, survol des personnes toléré à condition d’un accord explicite écrit.",
            "Catégorie Ouverte A2/A3, vol a distance des personnes d’un minimum de 5 m en vol lent (slow mode) et de 30 m en vol standard ",
            "Catégorie Ouverte A3, vol a distance minimum de 150 m des zones peuplées, commerciales, industrielles ou récréatives.",
            "Catégorie Ouverte A3, vol a distance minimum de 150 m des zones peuplées, commerciales, industrielles ou récréatives.",
            "Testeur"
        ]
    },
    max_weight: {
        type: Number,
        required: [true, 'Poids maximum requis']
    },
    max_altitude: {
        type: Number,
        required: [true, 'Altitude maximum requise']
    },
    fly_type: {
        type: String,
        required: [true, 'Type de vol requis']
    },
    key: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 99],
        required: [true, 'Clé de la catégorie requise']
    }
}, { versionKey: false, timestamps: true })

const CategoryModel = mongoose.model('Category', CategorySchema)

export default CategoryModel
