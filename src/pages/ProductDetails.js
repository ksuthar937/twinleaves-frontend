import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { updateProductImageUrl } from "../utils/helper";
import { useProucts } from "../context/ProductsContext";
import { useParams } from "react-router";
import { ShoppingBasket } from "@mui/icons-material";

const ProductDetails = () => {
  const { state } = useProucts();

  const { sku_code } = useParams();

  const product = state.products.find(
    (product) => String(product.sku_code) === String(sku_code)
  );

  const {
    name = "",
    images = {},
    description = "",
    main_category = "",
    mrp = {},
  } = product || {};

  if (!product) {
    return (
      <Box>
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      mx={4}
      my={8}
      p={2}
      align="center"
      sx={{
        boxShadow: "0.3em 0.3em 2em rgba(110, 105, 105, 0.4)",
        borderRadius: "0.5em",
        maxWidth: 900,
      }}
    >
      <Typography variant="h6" component="p" mb={2}>
        {name}
      </Typography>
      {images && images.front ? (
        <img src={updateProductImageUrl(images.front)} alt={name} width={300} />
      ) : (
        <Typography variant="h6" component="p">
          No Image Available
        </Typography>
      )}
      <hr style={{ marginTop: 20 }} />
      <Box my={2}>
        <Typography variant="subtitle2" component="p" align="left" gutterBottom>
          {description}
        </Typography>
        <Typography
          variant="overline"
          component="p"
          align="left"
          sx={{ fontWeight: 300 }}
        >
          Category: {main_category}
        </Typography>

        <Button color="warning" variant="outlined" fullWidth>
          Price: INR {mrp.mrp}
        </Button>
      </Box>
      <Button
        color="success"
        variant="contained"
        fullWidth
        startIcon={<ShoppingBasket />}
      >
        Add to cart
      </Button>
    </Box>
  );
};

export default ProductDetails;
