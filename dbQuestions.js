import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    question: {
        type: String, 
        required: true
    },
    A: {
        type: String, 
        required: true
    }, 
    B: {
        type: String, 
        required: true
    },
    C: {
        type: String, 
        required: true
    },
    D: {
        type: String, 
        required: true
    },
    correctAnswer: {
        type: String, 
        required: true
    },
    difficulty: {
        type: Number, 
        required: true
    }, 
    episode: {
        type: String, 
        required: false
    }, 
    season: {
        type: Number, 
        required: false
    }
})

export default mongoose.model('questions', questionSchema)