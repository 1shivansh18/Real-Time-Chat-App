import { httpClient } from "../config/AxiosHealper"

export const registerUser = async (FormData) => {
    const responese = await httpClient.post(`auth/signup` , FormData , {
        headers :{
            "Content-Type" : "application/json",
        },
    });
    return responese.data;
}

export const loginUser = async (loginData) => {
    const responese = await httpClient.post(`auth/login`, loginData,{
        headers :{
            "Content-Type" : "application/json",
        },
    });
    console.log("Login response data:", responese.data.jwt);    
    localStorage.setItem("jwt",responese.data.jwt);

    return responese.data;  
}