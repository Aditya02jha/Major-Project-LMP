import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        badge: { type: String, default: "Noob" },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.updateBadge = function () {
    if (this.points >= 10 && this.points < 50) {
        this.badge = "Beginner";
    } else if (this.points >= 50 && this.points < 100) {
        this.badge = "Intermediate";
    } else {
        // Default to "Noob" if points don't meet any badge criteria
        this.badge = "Noob";
    }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;