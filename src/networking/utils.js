
import axios from "axios";
import { LocalStorage } from "../constants";
import { getData } from "../utils/network/commonFunction";

// HELPERS ===================================
export function isStringEmpty(text) {
    return text !== undefined && text !== null && text !== '';
}

export const setAuthorization = async () => {
    // Apply authorization token to every request if logged in
    const token = await getData(LocalStorage.AUTH_TOKEN)
    console.log("234--", token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthorization = () => {
    // Remove authorization token to every request if logged Out
    console.log("123234--", token)
    //delete axios.defaults.headers.common.Authorization;
} 