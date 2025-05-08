import React, { FormEvent, useEffect, useState } from 'react'
import { StudentCreateWrapper } from './Students.styles'
import { Button, Input, Select } from '@/components'
import { createStudentMutation, useClasses, useOneStudent, updateStudentMutation } from '@/hooks'
import { getOptionFromDataAdapter } from '@/utils'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { TeacherCreateWrapper } from '../Teachers/Teachers.styles'

const CreateUpdateStudent = () => {
    const router = useRouter();
    const params = useParams();

    const [studentValues, setStudentValues] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        classId: ""
    });

    const handleChange = (e: any) => {
        setStudentValues({
            ...studentValues,
            [e.target.name]: e.target.value
        });
    };

    const isEditMode = !!params?.id;

    const { data: student } = useOneStudent({
        id: params?.id,
    });

    useEffect(() => {
        if (student) {
            setStudentValues({
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate,
                classId: student.classId as string
            });
        }
    }, [params?.id, student]);

    const { data: classes = [] } = useClasses();

    const studentMutation = createStudentMutation({
        onSuccess: (student) => {
            router.push('/students');
        },
        onError: (err) => {
            alert("Failed to create!");
            console.error(err);
        }
    });

    const studentUpdateMutation = updateStudentMutation({
        onSuccess: (student) => {
            router.push('/students');
        },
        onError: (err) => {
            alert("Failed to create!");
            console.error(err);
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newStudent = {
            id: `${Date.now()}`,
            firstName: studentValues.firstName,
            lastName: studentValues.lastName,
            birthDate: studentValues.birthDate,
            classId: studentValues.classId
        }

        if (isEditMode)
            newStudent.id = params?.id as string;

        isEditMode
            ? studentUpdateMutation.mutate(newStudent)
            : studentMutation.mutate(newStudent);
    }

    return (
        <TeacherCreateWrapper>
            <h1>{isEditMode ? "Update" : "New"} Teacher</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    value={studentValues.firstName}
                    name='firstName'
                    type='text'
                    onChange={handleChange}
                    placeholder='First name'
                />
                <Input
                    value={studentValues.lastName}
                    name='lastName'
                    type='text'
                    onChange={handleChange}
                    placeholder='Last name'
                />
                <Input
                    value={studentValues.birthDate}
                    name='birthDate'
                    type='date'
                    onChange={handleChange}
                />
                <Select
                    value={studentValues.classId}
                    name='classId'
                    onChange={handleChange}
                    options={getOptionFromDataAdapter(classes, "name")}
                />
                <Button>Save</Button>
            </form>
        </TeacherCreateWrapper>
    )
}

export default CreateUpdateStudent