const Message = require("../models/Message");

exports.ProcessPayLoad = async (req, res) => {
    try {

        const { wa_id, name, text, timestamp, status, meta_msg_id } = req.body;

        const newMessage = new Message({
            wa_id,
            name,
            message: text,
            timestamp: new Date(timestamp),
            status,
            meta_msg_id
        })

        await newMessage.save();
        res.status(201).json({ success: true, message: "Payload Processed", data: newMessage });
    }
    catch (err) {
        console.error("Error Processing Payload:", err);
        res.status(500).json({ success: false, err: err.message });
    }
}

exports.UpdateStatus = async (req, res) => {
    try {

        const { meta_msg_id, status } = req.body;

        const updatedMessage = await Message.findOneAndUpdate(
            { meta_msg_id },
            { status },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.json({ success: true, message: "Status updated", data: updatedMessage });
    } catch (err) {
        console.error("Error Updating Status:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await Message.aggregate([

            { $sort: { timestamp: -1 } },

            {
                $group: {
                    _id: "$wa_id",
                    name: { $first: "$name" },
                    lastMessage: { $first: "$message" },
                    lastMessageTime: { $first: "$timestamp" },
                    status: { $first: "$status" }
                }
            },

            {
                $project: {
                    _id: 0,
                    wa_id: "$_id",
                    name: 1,
                    lastMessage: 1,
                    lastMessageTime: 1,
                    status: 1
                }
            },

            { $sort: { lastMessageTime: -1 } }
        ]);

        res.json({ success: true, conversations });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getMessagesByWaId = async (req, res) => {
    try {
        const { wa_id } = req.params;

        const messages = await Message.find({ wa_id })
            .sort({ timestamp: 1 });

        res.json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { wa_id, name, message } = req.body;

        if (!wa_id || !message) {
            return res.status(400).json({ success: false, message: "wa_id and message are required" });
        }

        const newMessage = new Message({
            wa_id,
            name: name || "Unknown",
            message,
            timestamp: new Date(),
            status: "sent",
            meta_msg_id: `local-${Date.now()}` 
        });

        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent", data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};