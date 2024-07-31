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
  filteredProducts: [],
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

  const applyFiltersAndSorting = (state) => {
    console.log(state);
    let filteredProducts = state?.products;
    // Apply search filter
    if (state.searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      dispatch({ type: "filter/product", payload: filteredProducts });
    }

    // Apply category filter
    // if (category) {
    //     filteredProducts = filteredProducts.filter(product =>
    //         product.main_category === category
    //     );
    // }

    // Apply sorting
    // if (sortModel.length > 0) {
    //     const sortField = sortModel[0].field;
    //     const sortDirection = sortModel[0].sort === 'asc' ? 1 : -1;
    //     filteredProducts = filteredProducts.sort((a, b) => {
    //         if (a.mrp?.mrp < b.mrp?.mrp) return -1 * sortDirection;
    //         if (a.mrp?.mrp > b.mrp?.mrp) return 1 * sortDirection;
    //         return 0;
    //     });
    // }

    // // Apply pagination
    // const start = (page - 1) * pageSize;
    // const end = start + pageSize;
    // setDisplayProducts(filteredProducts.slice(start, end));
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
