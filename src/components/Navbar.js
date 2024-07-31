import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useProucts } from "../context/ProductsContext";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useProucts();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <LocalShippingIcon />
        </IconButton>
        <TextField
          size="small"
          value={state.searchQuery}
          onChange={(e) =>
            dispatch({ type: "search/product", payload: e.target.value })
          }
          InputProps={{
            sx: { width: 380 },
            endAdornment: (
              <InputAdornment position="end">
                <Search color="dark" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for product"
          sx={{
            backgroundColor: "var(--color-white)",
            borderRadius: "5px",
          }}
          name="search"
        />
      </Toolbar>
    </AppBar>
  );
}
