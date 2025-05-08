import { Button, Table } from "@/components";
import { Container, Title } from "./Home.styled";

export default function Home() {

  const handleClick = async () => {
    await fetch("http://localhost:3001/students/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Hoshim",
        lastName: "Mirzayev",
        birthDate: "11-11-2011",
        classId: 2
      }),
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Age",
      dataIndex: "age"
    }
  ];

  const users = [
    {
      name: "Ahror",
      age: 20
    },
    {
      name: "Abror",
      age: 23
    },
    {
      name: "Asror",
      age: 30
    }
  ]

  return (
    <Container>
      <Title>Hello World!</Title>
      <Button onClick={handleClick} >Change User</Button>

      <Table columns={columns} dataSrc={users} />
    </Container>
  );
}



