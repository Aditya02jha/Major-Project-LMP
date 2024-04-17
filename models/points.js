import mongoose, { Schema } from "mongoose";

const userPointsSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    points: { type: Number, default: 0 }
});

// const UserPoints = mongoose.models.UserPoints || mongoose.model("UserPoints", userPointsSchema);


const Point = mongoose.models.Point || mongoose.model("Point", userPointsSchema);

export default Point;