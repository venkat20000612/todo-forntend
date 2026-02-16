import axios from "axios";

const API = axios.create({
    baseURL: "https://simple-curd-operations.onrender.com/curdoperations/"
});

export default API;