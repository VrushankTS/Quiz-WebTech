import mongoose from 'mongoose';
const { Schema } = mongoose; 

const QuizSchema = mongoose.Schema(
    {
        mustBeSignedIn: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        questions: [{
            type: Object,
            contains: {
                answers: {type: Array},
                correctAnswer: String,
                questionName: String
            }
        }],
        category: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: false
        },
        comments: [{
            type: Object,
            contains: {
                sentFromId: {type: Schema.Types.ObjectID},
                message: {type: String}
            }
        }],
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: Schema.Types.ObjectID,
            required: true
        },
        scores: {
            type: Array, 
            default: []
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    { 
        collection: 'quizzes' 
    }
);

const Quizzes = mongoose.model('Quizzes', QuizSchema);
export default Quizzes;
