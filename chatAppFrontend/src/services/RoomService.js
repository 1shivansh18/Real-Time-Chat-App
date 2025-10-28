import { httpClient } from "../config/AxiosHealper";

export const createRoomApi = async (roomDetail) =>{  
    const response = await httpClient.post(`api/v1/rooms` , roomDetail , 
        {
            headers :{
                "Content-Type" : "text/plain",
            },
        }
    );
    return response.data;
}

export const joinRoomApi = async (roomId) =>{
   const response = await httpClient.get(`api/v1/rooms/${roomId}`)
    return response.data;
}

export const getMessagess = async (roomId , size = 50 , page = 0 ) => {
    const response = await httpClient.get(
        `/api/v1/rooms/${roomId}/message?size=${size}&page=${page}`
    );
    return response.data;
}