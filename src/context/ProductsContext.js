import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const ProductsContext = createContext();

const intialState = {
  isLoading: false,
  error: null,
  products: [],
  searchQuery: "",
  page: 1,
  totalItems: 0,
  productDetails: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "products/loading":
      return { ...state, isLoading: true };
    case "products/error":
      return { ...state, error: action.payload };
    case "products/loaded":
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalItems: Number(action.payload.totalResults),
      };
    case "products/page":
      return {
        ...state,
        page: action.payload,
      };
    case "search/product":
      return { ...state, searchQuery: action.payload };
    case "details/product":
      return { ...state, productDetails: action.payload };
    default:
      throw new Error("Unknown case");
  }
}

function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "products/loading" });
      dispatch({ type: "products/error", payload: null });

      try {
        const products = await axios.get(
          "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products",
          {
            params: { page: state.page },
          }
        );
        dispatch({ type: "products/loaded", payload: products.data });
      } catch (error) {
        dispatch({ type: "products/error", payload: error.message });
      }
    }
    fetchData();
  }, [state.page]);

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
