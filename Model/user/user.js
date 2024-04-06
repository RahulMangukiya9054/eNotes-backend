import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    loginToken: [
        {
            token: {
                type: String,
            },
        },
    ],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date() },
    updatedAt: { type: Date, default: Date() }

},{ timestamps: true })

export default mongoose.model("user", userSchema)