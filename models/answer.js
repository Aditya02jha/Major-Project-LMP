import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptionIndex: Number,
    createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.models.Answer || mongoose.model("Answer", answerSchema);

export default Answer;