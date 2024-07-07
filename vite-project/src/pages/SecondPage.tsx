// src/pages/SecondPage.tsx
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import DepartmentList from "../components/DepartmentList";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "userId", headerName: "User ID", width: 150 },
  { field: "id", headerName: "ID", width: 150 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 400 },
];

const SecondPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setData(response.data));
  }, []);

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
