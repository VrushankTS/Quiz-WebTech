import mongoose from 'mongoose';
const { Schema } = mongoose; 

const ScoreSchema = mongoose.Schema(
    {
    quizId: {
        type: Schema.Types.ObjectID,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Scores = mongoose.model('Scores', ScoreSchema);
export default Scores;
