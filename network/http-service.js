import axios from "axios";
import Request from "./Request";
import AppConfig from "../shared/app-config";
import AuthService from "./auth-service";

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        const loginedUser = AuthService.getUserData();
        if (loginedUser && loginedUser.token) {
            config.headers.authorization = `Bearer ${loginedUser.token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        const exceptionToThrow = {};
        if (error.response) {
            // error has response.
            exceptionToThrow.message = error.response.data.message;
            exceptionToThrow.statusCode = error.response.data.statusCode;
            exceptionToThrow.serverCode = error.response.status;
        } else {
            // error not has response , error in server or timeout.
            exceptionToThrow.message = "Error in server , try again later";
            exceptionToThrow.statusCode = "";
            exceptionToThrow.serverCode = 500;
        }

        return Promise.reject(exceptionToThrow);
    }
);

export default class Http {
    /**
     * @param {Request} request
     */
    static send(request) {
        debugger; 
        const url = Http.getConnectionUrl(request);
        switch (request.method) {
            case "POST" :
                return axios.post(url, request.body, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "GET" :
                return axios.get(url, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "PUT" :
                return axios.put(url, request.body, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "DELETE":
                return axios.delete(url, {
                    headers: request.headers,
                    params: request.queryParams,
                });
        }
    }

    /**
     * @param {Request} request
     */
    static getConnectionUrl(request) {
        const baseUrl =
            request.baseUrl != null && request.baseUrl !== ""
                ? request.baseUrl
                : AppConfig.getBaseUrl();
        let apiUrl = request.url;
        if (!apiUrl.startsWith("/")) {
            apiUrl = "/" + apiUrl;
        }
        return baseUrl + apiUrl;
    }
}
