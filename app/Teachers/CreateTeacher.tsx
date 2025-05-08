import React, { FormEvent, useEffect, useState } from "react";
import { Button, Input, Select } from "@/components";
import { getOptionFromDataAdapter } from "@/utils";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import {
  createTeacherMutation,
  updateTeacherMutation,
  useOneTeacher,
} from "../../hooks/useTeachers";
import { TeacherCreateWrapper } from "./Teachers.styles";
import { useClasses } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CreateUpdateTeacher = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [teacherValues, setTeacherValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classes: [] as string[],
  });

  const handleChange = (e: any) => {
    setTeacherValues({
      ...teacherValues,
      [e.target.name]: e.target.value,
    });
  };

  const isEditMode = !!params?.id;

  const { data: teacher } = useOneTeacher({
    id: params?.id,
  });

  useEffect(() => {
    if (teacher) {
      setTeacherValues({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        birthDate: teacher.birthDate,
        classes: teacher.classes as string[],
      });
    }
  }, [params?.id, teacher]);

  const { data: classes = [] } = useClasses();

  const teacherMutation = createTeacherMutation({
    onSuccess: (teacher) => {
      router.push("/teachers");
    },
    onError: (err) => {
      // alert("Failed to create!");
      console.error(err);
    },
  });

  const teacherUpdateMutation = updateTeacherMutation({
    onSuccess: (teacher) => {
      router.push("/teachers");
    },
    onError: (err) => {
      // alert("Failed to create!");
      console.error(err);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTeacher = {
      id: `${Date.now()}`,
      firstName: teacherValues.firstName,
      lastName: teacherValues.lastName,
      birthDate: teacherValues.birthDate,
      classes: teacherValues.classes,
    };

    if (isEditMode) newTeacher.id = params?.id as string;

    isEditMode
      ? teacherUpdateMutation.mutate(newTeacher)
      : teacherMutation.mutate(newTeacher);
  };
  const updateMutation = updateTeacherMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("User removed!");
    },
    onError: (err: any) => {
      toast.error(`Something went wrong! ${err?.status}`);
    },
  });
  const handleUpdate = (teacher: any) => {
    updateMutation.mutate(teacher.id);
  };
  return (
    <TeacherCreateWrapper>
      <h1>{isEditMode ? "Update" : "New"} Teacher</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={teacherValues.firstName}
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="First name"
        />
        <Input
          value={teacherValues.lastName}
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Last name"
        />
        <Input
          value={teacherValues.birthDate}
          name="birthDate"
          type="date"
          onChange={handleChange}
        />
        <Select
          value={teacherValues.classes}
          name="classes"
          onChange={handleChange}
          options={getOptionFromDataAdapter(classes, "name")}
        />
        <Button onClick={() => handleUpdate(teacher)}>Save</Button>
      </form>
    </TeacherCreateWrapper>
  );
};

export default CreateUpdateTeacher;
