import React from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Box } from "@mui/material";
import { useProucts } from "../context/ProductsContext";
import { DataGrid } from "@mui/x-data-grid";
import { updateProductImageUrl } from "../utils/helper";
import { Link } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useProucts();

  const columns = [
    { field: "sku_code", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 350 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={updateProductImageUrl(params.row.images.front)}
          alt={params.row.name}
          width="50"
          height="50"
        />
      ),
    },
    { field: "main_category", headerName: "Category", width: 250 },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Link to={`/details/${params.row.sku_code}`}>View Details</Link>
      ),
    },
  ];

  if (state.error) {
    return <Error />;
  }

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={
          state.searchQuery.length > 0 ? state.filteredProducts : state.products
        }
        columns={columns}
        paginationMode="server"
        rowCount={state.totalItems}
        getRowId={(row) => row.sku_code + Math.random(1)}
        onPageChange={(newPage) =>
          dispatch({ type: "products/page", payload: newPage + 1 })
        }
      />
    </Box>
  );
};

export default Home;
