import axios from "axios";

export const axiosJsonph = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com/",
});

