import { appConstants } from "../constants/appConstants";
import apiKit from "./apiKit";

// Headers
const jsonHeader = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json"
};
const formDataHeader = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    "Accept": "application/json"
};

// Navigation handler
let navigate = null;
export const getNavigate = (data) => {
    navigate = data;
};

// Common API handler
const apiHandlerFunction = async (handler) => {
    try {
        const result = await handler;
        return {
            success: true,
            status: result.status,
            message: result.data.message,
            data: result?.data
        };
    } catch (err) {
        const status = err?.response?.status;
        const errorMessage = err?.response?.data?.message || "Something went wrong.";

        if (status >= 400 && status < 500) {
            if (status === 401 || status === 403) {
                // localStorage.removeItem("access-token");
                // sessionStorage.clear();
                // navigate && navigate("/"); // Check if navigate is set
            }
            return { success: false, status, message: errorMessage };
        }
        return { success: false, status: 500, message: appConstants?.offlineMessage };
    }
};

// API Methods
export const Method = {
    post: (url, body, formData = false) =>
        window.navigator.onLine
            ? apiHandlerFunction(apiKit.post(url, body, { headers: formData ? formDataHeader : jsonHeader }))
            : { success: false, status: 500, message: appConstants?.offlineMessage },

    get: (url) =>
        window.navigator.onLine
            ? apiHandlerFunction(apiKit.get(url, { headers: jsonHeader }))
            : { success: false, status: 500, message: appConstants?.offlineMessage },

    put: (url, body, formData = false) =>
        window.navigator.onLine
            ? apiHandlerFunction(apiKit.put(url, body, { headers: formData ? formDataHeader : jsonHeader }))
            : { success: false, status: 500, message: appConstants?.offlineMessage },

    delete: (url) =>
        window.navigator.onLine
            ? apiHandlerFunction(apiKit.delete(url, { headers: jsonHeader }))
            : { success: false, status: 500, message: appConstants?.offlineMessage },
};

export default Method;
