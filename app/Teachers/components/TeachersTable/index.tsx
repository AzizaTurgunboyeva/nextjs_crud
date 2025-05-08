import { Button, Table } from "@/components";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  deleteTeacherMutation,
  updateTeacherMutation,
  useTeachers,
} from "../../../../hooks/useTeachers";
import { ActionsWrapper } from "./TechTable.styles";
import { teacherTableCols } from "./columns";

const TeachersTable = () => {
  const { data: users } = useTeachers();
  const queryClient = useQueryClient();

  const deleteMutation = deleteTeacherMutation({
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
 
  const handleDelete = (teacher: any) => {
    deleteMutation.mutate(teacher.id);
  };

  return (
    <div>
      <Table
        actionsCol={(teacher) => {
          return (
            <ActionsWrapper>
              <Button onClick={() => handleDelete(teacher)}>Delete</Button>
              <Button
                href={`/teachers/edit/${teacher.id}`}
                
              >
                Update
              </Button>
            </ActionsWrapper>
          );
        }}
        columns={teacherTableCols}
        dataSrc={users}
      />
    </div>
  );
};

export default TeachersTable;
