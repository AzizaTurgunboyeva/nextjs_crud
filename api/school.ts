import { School } from "../types";
import instance from "./instance"

export const getSchool = async () => {
    try {
        const res = await instance.get<School[]>('/school');
        return res.data;
    } catch (e) {
        console.log("getSchool",e);
        
    }
}
