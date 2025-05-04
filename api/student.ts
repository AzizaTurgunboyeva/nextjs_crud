import { Student } from "@/types";
import instance from "./instance"

export const getStudents = async () => {
    try {
        const res = await instance.get<Student[]>('/students');
        return res.data;
    } catch(e) {
        alert("Failed to fetch students!");
    }
}

export const createStudent = async (data: Student) => {
    try {
        const res = await instance.post('/students', data);
        return res.data;
    } catch(e) {
        alert("Failed to post data!");
    }
}
