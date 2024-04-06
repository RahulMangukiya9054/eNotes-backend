import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    mainUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date() },
    updatedAt: { type: Date, default: Date() }
}, { timestamps: true })

export default mongoose.model("notes", noteSchema)