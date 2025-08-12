import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getConversations = () => API.get("/messages/conversations");
export const getMessagesByWaId = (wa_id) => API.get(`/messages/${wa_id}`);
export const sendMessage = (data) => API.post("/messages/send", data);
