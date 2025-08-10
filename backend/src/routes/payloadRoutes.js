const express = require("express");
const { ProcessPayLoad, UpdateStatus, getAllConversations, getMessagesByWaId, sendMessage } = require("../controllers/payloadController");
const router = express.Router();

router.post("/process", ProcessPayLoad);
router.post("/status", UpdateStatus);
router.get("/conversations", getAllConversations);
router.get("/chat/:wa_id", getMessagesByWaId);
router.post("/send", sendMessage);  

module.exports = router;