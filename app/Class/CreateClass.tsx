// src/app/Class/components/CreateUpdateClass.tsx

import React, { FC, ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button, Input, Select } from "@/components";
import { getOptionFromDataAdapter } from "@/utils";
import { ClassCreateWrapper } from "./Classes.styles";

import {
  useOneClass,
  createClassMutation,
  updateClassMutation,
} from "@/hooks/useClasses";
import { useTeachers } from "@/hooks/useTeachers";
import type { Class, Class as IClass } from "@/types";


const CreateUpdateClass: FC = () => {
  const router = useRouter();
  const params = useParams<{ id?: string }>();
  const queryClient = useQueryClient();

  // 1) Local form state
  const [form, setForm] = useState<Class>({
    name: "",
    studentCount: "",
    teacherId: "",
  });

  // 2) Load existing class when editing
  const { data: classData } = useOneClass({ id: params?.id });
  useEffect(() => {
    if (classData) {
      setForm({
        name: classData.name,
        studentCount: classData.studentCount.toString(),
        teacherId: classData.teacherId.toString(),
      });
    }
  }, [params?.id,classData]);

  const { data: teachers = [] } = useTeachers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
    const isEditMode = !!params?.id;

  const createMut = createClassMutation({
    onSuccess: () => {
      toast.success("Class created!");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      router.push("/classes");
    },
    onError: (err) => {
      toast.error(`Failed to create class: ${err?.message || err}`);
    },
  });

  const updateMut = updateClassMutation({
    onSuccess: () => {
      toast.success("Class updated!");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      router.push("/classes");
    },
    onError: (err) => {
      toast.error(`Failed to update class: ${err?.message || err}`);
    },
  });

  // 6) Submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: IClass = {
      id: isEditMode ? (params.id as string) : Date.now().toString(),
      name: form.name,
      studentCount: form.studentCount,
      teacherId: form.teacherId,
    };

    if (isEditMode) {
      updateMut.mutate(payload);
    } else {
      createMut.mutate(payload);
    }
  };

  return (
    <ClassCreateWrapper>
      <h1>{isEditMode ? "Update" : "New"} Class</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Class name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="studentCount"
          type="number"
          placeholder="Student count"
          value={form.studentCount}
          onChange={handleChange}
        />

        <Select
          name="teacherId"
          value={form.teacherId}
          onChange={handleChange}
          options={getOptionFromDataAdapter(teachers, "name")}
        />

        <Button >Save
        </Button>
      </form>
    </ClassCreateWrapper>
  );
};

export default CreateUpdateClass;
