import { Teacher } from "../types";
import instance from "./instance"

export const getTeachers = async () => {
    try {
        const res = await instance.get<Teacher[]>('/teachers');
        return res.data;
    } catch (e) {
             console.log("fetchTeach",e);

    }
}

export const getOneTeacher = async (id: string | number) => {
    try {
        const res = await instance.get<Teacher>(`/teachers/${id}`);
        return res.data;
    } catch (e) {
             console.log("fetchTeachOne",e);

    }
}

export const createTeacher = async (data: Teacher) => {
    try {
        const res = await instance.post('/teachers', data);
        return res.data;
    } catch (e) {
             console.log("postTeach",e);

    }
}

export const updateTeacher = async (data: Teacher) => {
    try {
        const res = await instance.put(`/teachers/${data.id}`, data);
        return res.data;
    } catch (e) {
             console.log("uptTeach",e);

    }
}

export const deleteTeacher = async (teacherId: number | string) => {
    try {
        const res = await instance.delete(`/teachers/${teacherId}`);
        return res.data;
    } catch (e) {
             console.log("delTeach",e);

    }
}
