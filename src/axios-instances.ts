import axios from "axios";

export const axiosJsonph = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

export const axiosFirebase = axios.create({
    baseURL:
        "https://t-flex--todo-default-rtdb.europe-west1.firebasedatabase.app/",
});
