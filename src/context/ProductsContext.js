import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const ProductsContext = createContext();

const intialState = {
  isLoading: false,
  error: null,
  products: [],
  searchQuery: "",
  page: 0,
  totalItems: 0,
  productDetails: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "products/loading":
      return { ...state, isLoading: true };
    case "products/error":
      return { ...state, error: action.payload };
    case "products/loaded":
      const categories = [
        ...new Set(action.payload.products.map((item) => item.main_category)),
      ];
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalItems: Number(action.payload.totalResults),
        categories: categories,
      };
    case "products/page":
      console.log(action.payload);
      return {
        ...state,
        page: action.payload,
      };
    case "products/category":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "search/product":
      return { ...state, searchQuery: action.payload };
    case "filter/product":
      return { ...state, filteredProducts: action.payload };
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
            params: { page: state.page + 1 },
          }
        );
        dispatch({ type: "products/loaded", payload: products.data });
      } catch (error) {
        dispatch({ type: "products/error", payload: error.message });
      }
    }
    fetchData();
  }, [state.page]);

  const applyFiltersAndSorting = (state) => {
    let filteredProducts = state?.products;

    if (state.searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      dispatch({ type: "filter/product", payload: filteredProducts });
    }

    if (state.selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.main_category === state.selectedCategory
      );
      dispatch({ type: "filter/product", payload: filteredProducts });
    }
  };

  useEffect(() => {
    applyFiltersAndSorting(state);
  }, [state]);

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
