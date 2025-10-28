import axios from "axios";

export const baseURL = "http://localhost:8080";  // baseURL is variable that holds the base URL of the API. You can change it to your API's base URL.

export const httpClient = axios.create({  // httpClient is a variable that holds the axios instance with the base URL. You can use this instance to make API calls.
    baseURL :baseURL  // baseURL is the base URL of the API. You can change it to your API's base URL.
});