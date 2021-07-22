import {
  GET_PRODUCT_STATUS,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../constants";

const initialState = {
  productList: [],
  productStatus: null,
};

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_STATUS:
      return {
        ...state,
        productStatus: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    case UPDATE_PRODUCT:
      let newProducts = state.productList.filter((i) => i.id !== payload.id);
      newProducts.push(payload);

      return {
        ...state,
        productList: newProducts,
      };

    default:
      return state;
  }
};
