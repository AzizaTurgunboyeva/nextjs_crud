import { Student } from "@/types";
import instance from "./instance"

export const getStudents = async () => {
    try {
        const res = await instance.get<Student[]>('/students');
        return res.data;
    } catch (e) {
             console.log("getstu",e);

    }
}

export const getOneStudent = async (id: string | number) => {
    try {
        const res = await instance.get<Student>(`/students/${id}`);
        return res.data;
    } catch (e) {
             console.log("getstuOne",e);

    }
}

export const createStudent = async (data: Student) => {
    try {
        const res = await instance.post('/students', data);
        return res.data;
    } catch (e) {
             console.log("postSt",e);

    }
}

export const updateStudent = async (data: Student) => {
    try {
        const res = await instance.put(`/students/${data.id}`, data);
        return res.data;
    } catch (e) {
             console.log("uptSt",e);

    }
}

export const deleteStudent = async (studentId: number | string) => {
    try {
        const res = await instance.delete(`/students/${studentId}`);
        return res.data;
    } catch (e) {
             console.log("deltSt",e);

    }
}
