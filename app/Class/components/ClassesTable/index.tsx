import { Button, Table } from "@/components";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteClassMutation, useClasses } from "../../../../hooks";
import { classTableCols } from "./columns";
import { ActionsWrapper } from "./ClassTable.styles";

const ClassesTable = () => {
  const { data: classes = [] } = useClasses();
  const queryClient = useQueryClient();

  const deleteMutation = deleteClassMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Class removed!");
    },
    onError: (err: any) => {
      toast.error(`Something went wrong! ${err?.message || err}`);
    },
  });

  // 2) rename `class` → `cls`
  const handleDelete = (cls: any) => {
    deleteMutation.mutate(cls.id);
  };

  return (
    <div>
      <Table
        actionsCol={(cls) => {
          return (
            <ActionsWrapper>
              <Button onClick={() => handleDelete(cls)}>Delete</Button>
              <Button href={`/classes/edit/${cls.id}`}>Update</Button>
            </ActionsWrapper>
          );
        }}
        columns={classTableCols}
        dataSrc={classes}
      />
    </div>
  );
};

export default ClassesTable;
