import axios from "axios";
import { API_URL } from "../../config";

const createAPI = (accessToken="") => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` 
        }
    })
}

export default createAPI