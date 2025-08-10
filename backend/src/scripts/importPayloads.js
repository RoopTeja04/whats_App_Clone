const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Message = require("../models/Message");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection failed:", err));

const payloadsDir = path.join(__dirname, "../sample_payloads");

fs.readdir(payloadsDir, async (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        process.exit(1);
    }

    for (const file of files) {
        if (file.endsWith(".json")) {
            const filePath = path.join(payloadsDir, file);
            const rawData = fs.readFileSync(filePath);
            const payload = JSON.parse(rawData);

            try {

                const changes = payload?.metaData?.entry?.[0]?.changes?.[0];
                const value = changes?.value;

                if (value?.messages && Array.isArray(value.messages)) {
                    const wa_id = value.contacts?.[0]?.wa_id || "unknown";
                    const name = value.contacts?.[0]?.profile?.name || "Unknown";

                    for (const msg of value.messages) {
                        const newMessage = new Message({
                            wa_id,
                            name,
                            message: msg.text?.body || "",
                            timestamp: new Date(msg.timestamp * 1000),
                            status: "sent",
                            meta_msg_id: msg.id
                        });

                        await newMessage.save();
                        console.log(`Inserted message from ${wa_id}: ${msg.text?.body}`);
                    }

                } else if (value?.statuses && Array.isArray(value.statuses)) {
                    for (const statusObj of value.statuses) {
                        await Message.findOneAndUpdate(
                            { meta_msg_id: statusObj.id },
                            { status: statusObj.status },
                            { new: true }
                        );
                        console.log(`Updated status to ${statusObj.status} for message ID ${statusObj.id}`);
                    }
                } else {
                    console.log(`Skipped file ${file} (no messages or statuses found)`);
                }

            } catch (error) {
                console.error(`Error processing file ${file}:`, error.message);
            }
        }
    }

    console.log("Import completed");
    process.exit();
});