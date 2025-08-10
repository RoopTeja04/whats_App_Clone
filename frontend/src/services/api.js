import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/messages",
});


export const getConversations = () => API.get("/conversations");
export const getMessagesByWaId = (wa_id) => API.get(`/chat/${wa_id}`);
export const sendMessage = (data) => API.post("/send", data);

export default API;