import { Class } from "../types";
import instance from "./instance";

export const getClasss = async () => {
  try {
    const res = await instance.get<Class[]>("/classes");
    return res.data;
  } catch (e) {
    console.log("getclass",e);
  }
};

export const getOneClass = async (id: string | number) => {
  try {
    const res = await instance.get<Class>(`/classes/${id}`);
    return res.data;
  } catch (e) {
    console.log("getoneclass",e);
  }
};

export const createClass = async (data: Class) => {
  try {
    const res = await instance.post("/classes", data);
    return res.data;
  } catch (e) {
    console.log(e,"createclass");
  }
};

export const updateClass = async (data: Class) => {
  try {
    const res = await instance.put(`/classes/${data.id}`, data);
    return res.data;
  } catch (e) {
    console.log("uptclass",e);
  
  }
};

export const deleteClass = async (studentId: number | string) => {
  try {
    const res = await instance.delete(`/classes/${studentId}`);
    return res.data;
  } catch (e) {
    console.log("delclass",e);
  }
};
