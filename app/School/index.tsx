// src/app/School/School.tsx

import React from "react";
import Link from "next/link";
import { Table } from "../../components";
import { SchoolWrapper } from "./SchoolWrapper.styled";
import { useStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useClasses } from "@/hooks/useClasses";

interface SchoolRow {
  key: string;
  name: string;
  location: string;
  overallStudentCount: number;
  overallStaffCount: number;
  overallClassCount: number;
  about: string;
  phoneNumber: string;
}

const School: React.FC = () => {
  const { data: students = [] } = useStudents();
  const { data: teachers = [] } = useTeachers();
  const { data: classes = [] } = useClasses();

  const rows: SchoolRow[] = [
    {
      key: "144",
      name: "144-maktab",
      location: "Muqimiy ko'chasi 100-uy",
      overallStudentCount: students.length,
      overallStaffCount: teachers.length,
      overallClassCount: classes.length,
      about: "Yaxshi maktab",
      phoneNumber: "+998900123456",
    },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Students",
      dataIndex: "overallStudentCount",
      key: "overallStudentCount",
      render: (n: number) => <Link href="/students">{n}</Link>,
    },
    {
      title: "Teachers",
      dataIndex: "overallStaffCount",
      key: "overallStaffCount",
      render: (n: number) => <Link href="/teachers">{n}</Link>,
    },
    {
      title: "Classes",
      dataIndex: "overallClassCount",
      key: "overallClassCount",
      render: (n: number) => <Link href="/classes">{n}</Link>,
    },
    { title: "About", dataIndex: "about", key: "about" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
  ];

  return (
    <SchoolWrapper>
      <h1>School</h1>
      <Table columns={columns} dataSrc={rows} />
    </SchoolWrapper>
  );
};

export default School;
