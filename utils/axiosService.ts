import axios from "axios";

const axiosService = (url: string, method: string = "GET", data?: any, token?: string) => {
    let urlRequest = process.env.NEXT_PUBLIC_API_URL + url;
    if (url === "/auth/login" || url === "/auth/register") {
        urlRequest = "/api" + url;
    }

    return axios({
        url: urlRequest,
        method: method,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default axiosService;