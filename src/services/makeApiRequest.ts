import { AxiosError, AxiosResponse, Method } from "axios";
import {serverApiClient} from "./apiClient";
import { logger } from "../../logger";
import { ApiEndpoint } from "./apiEndpoint";
import { ApiResponse } from "@/types/api";


/**
 * Make an API request to vity server/backend using the apiClient
 * 
 * @param method 
 * @param urlPath 
 * @param data
 * @returns 
 */
export async function makeServerApiRequest(method: Method, urlPath: string | ApiEndpoint, data: any) {

    return serverApiClient({
        method,
        url: urlPath,
        data,
    })
        .then((res: AxiosResponse) => res.data as ApiResponse)
        .catch((err: AxiosError) => {
            if (err.response) {
                /* 
                  The request was made and the server responded with a status code
                  that falls out of the range of 2xx
                */
                logger(`Error making request to ${urlPath} :: ${err.response.data}`, err.response.data, { level: 'error' });
                throw err.response.data;
            } else if (err.request) {
                // Client never received a response, or request never left
                logger(`Error making request to ${urlPath} :: ${err.request}`, err.request, { level: 'error' });
                throw err.request;
            } else {
                // Something happened in setting up the request that triggered an Error
                logger(`Error making request to ${urlPath} :: ${err.message}`, err.message, { level: 'error' });
                throw new Error(`${err.message}`);
            }
        });
}