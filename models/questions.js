import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    text: String,
    options: [String],
    correctOptionIndex: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    correctedByUser: { type: Boolean, default: false },
    level: { type: Number, required: true }
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;