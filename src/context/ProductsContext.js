import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const ProductsContext = createContext();

const intialState = {
  isLoading: false,
  products: [],
  searchQuery: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "products/loading":
      return { ...state, isLoading: true };
    case "products/loaded":
      return { ...state, isLoading: false, products: action.payload };
    case "search/product":
      return { ...state, searchQuery: action.payload };
    default:
      throw new Error("Unknown case");
  }
}

function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    dispatch({ type: "products/loading" });
    async function fetchData() {
      const products = await axios.get(
        "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products"
      );
      dispatch({ type: "products/loaded", payload: products.data.products });
    }
    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProucts() {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("Context has been used outside the provider!");
  }

  return context;
}

export { ProductsProvider, useProucts };
