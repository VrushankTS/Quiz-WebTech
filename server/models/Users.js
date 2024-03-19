import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type : String,
            required: true
        },
        lastName: {
            type : String,
            required: true
        },
        email: {
            type : String,
            required: true,
            unique: true
        },
        password: {
            type : String,
            required: true
        },
        likedQuizzes: {
            type: Array,
            default: []
        },
        avatar: {
            type: Object,
            required: false,
            contains: {
                url: {type: String},
                publicId: {type: String}
            }
        }
    },
    {
        timestamps: true,
    }    
);

const User = mongoose.model('User', UserSchema);
export default User;