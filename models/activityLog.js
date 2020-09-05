const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
    {
        updatedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        updatedByName: String,
        action: String,
        company: String,
        model: String,
        color: String,
        quantity: Number,
        updatedValue: Number,
        createdAt: Date,
        updatedAt: Date
    },
    {
        id: true,
        timestamps: true
    }
);

Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
