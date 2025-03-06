

import { toast } from "react-toastify";

export const notify = (message, type = "info") => {
    if (typeof toast[type] === "function") {
        toast[type](message);
    } else {
        console.error(`Invalid toast type: ${type}`);
        toast.info(message);
    }
};


export const API_URL = 'http://localhost:3000';
