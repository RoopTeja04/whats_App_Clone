const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    wa_id: { type: String, required: true },
    name: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
    meta_msg_id: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);