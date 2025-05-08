import { 
    deleteStudent, 
    getStudents, 
    getOneStudent, 
    createStudent, 
    updateStudent 
} from "@/api";
import { MutationFunctions, Student } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useStudents() {
    return useQuery({
        queryFn: getStudents,
        queryKey: ["students"]
    })
}

export function useOneStudent(params: any) {
    return useQuery({
        queryFn: () => getOneStudent(params?.id),
        queryKey: ["one-student"],
        enabled: !!params?.id,
    })
}

export function createStudentMutation({
    onSuccess,
    onError,
}: MutationFunctions) {
    return useMutation({
        mutationFn: (data: Student) => createStudent(data),
        onSuccess,
        onError
    })
}

export function updateStudentMutation({
    onSuccess,
    onError,
}: MutationFunctions) {
    return useMutation({
        mutationFn: (data: Student) => updateStudent(data),
        onSuccess,
        onError
    })
}

export function deleteStudentMutation({onSuccess, onError}: MutationFunctions) {
    return useMutation({
        mutationFn: (id: string | number) => deleteStudent(id),
        onSuccess,
        onError,
    })
}