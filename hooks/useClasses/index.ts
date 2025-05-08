
import { useMutation, useQuery } from "@tanstack/react-query";
import { createClass, deleteClass, getClasss, getOneClass, updateClass } from "../../api/class";
import { Class, MutationFunctions } from "../../types";

export function useClasses() {
    return useQuery({
        queryFn: getClasss,
        queryKey: ["classes"]
    })
}

export function useOneClass(params: any) {
    return useQuery({
        queryFn: () => getOneClass(params?.id),
        queryKey: ["one-class"],
        enabled: !!params?.id,
    })
}

export function createClassMutation({
    onSuccess,
    onError,
}: MutationFunctions) {
    return useMutation({
        mutationFn: (data: Class) => createClass(data),
        onSuccess,
        onError
    })
}

export function updateClassMutation({
    onSuccess,
    onError,
}: MutationFunctions) {
    return useMutation({
        mutationFn: (data: Class) => updateClass(data),
        onSuccess,
        onError
    })
}

export function deleteClassMutation({onSuccess, onError}: MutationFunctions) {
    return useMutation({
        mutationFn: (id: string | number) => deleteClass(id),
        onSuccess,
        onError,
    })
}