import axios from "axios";
import credenciais from "./credenciais";

const api = axios.create({
    baseURL: credenciais.rota
})

export default api;