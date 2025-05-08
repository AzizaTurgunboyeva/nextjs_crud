import { Button, Table } from "@/components";
import React from "react";
import { studentTableCols } from "./columns";
import {
  deleteStudentMutation,
  updateStudentMutation,
  useStudents,
} from "@/hooks";
import { ActionsWrapper } from "./StTable.styles";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const StudentsTable = () => {
  const { data: users } = useStudents();
  const queryClient = useQueryClient();

  const deleteMutation = deleteStudentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("User removed!");
    },
    onError: (err: any) => {
      toast.error(`Something went wrong! ${err?.status}`);
    },
  });
  const updateMutation = updateStudentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("User updated!");
    },
    onError: (err: any) => {
      toast.error(`Something went wrong! ${err?.status}`);
    },
  });
  const handleDelete = (student: any) => {
    deleteMutation.mutate(student.id);
  };
  const handleUpdate = (student: any) => {
    updateMutation.mutate(student.id);
  };

  return (
    <div>
      <Table
        actionsCol={(student) => {
          return (
            <ActionsWrapper>
              <Button onClick={() => handleDelete(student)}>Delete</Button>
              <Button
                href={`/students/edit/${student.id}`}
                onClick={() => handleUpdate(student)}
              >
                Update
              </Button>
            </ActionsWrapper>
          );
        }}
        columns={studentTableCols}
        dataSrc={users}
      />
    </div>
  );
};

export default StudentsTable;
