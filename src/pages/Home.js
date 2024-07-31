import React from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Box } from "@mui/material";
import { useProucts } from "../context/ProductsContext";
import { DataGrid } from "@mui/x-data-grid";

const Home = () => {
  const { state } = useProucts();

  const columns = [
    { field: "sku_code", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 350 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.images.front}
          alt={params.row.name}
          width="50"
          height="50"
        />
      ),
    },
    { field: "main_category", headerName: "Category", width: 250 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      // valueGetter: (params) => params.row.mrp?.mrp,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <a href={`/details/${params.row.sku_code}`}>View Details</a>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {state.isLoading && <Loader />}
      {state.error && <Error />}

      <DataGrid
        rows={state.products}
        columns={columns}
        pageSize={5}
        rowCount={state.products.length}
        getRowId={(row) => row.sku_code + Math.random()}
      />
    </Box>
  );
};

export default Home;
