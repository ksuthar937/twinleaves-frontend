import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useProucts } from "../context/ProductsContext";

const FormInput = () => {
  const { state, dispatch } = useProucts();

  return (
    <Box sx={{ minWidth: 120, maxWidth: 420 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={state.selectedCategory}
          label="Category"
          onChange={(e) =>
            dispatch({
              type: "products/category",
              payload: e.target.value,
            })
          }
        >
          {state.categories.map((category, index) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormInput;
