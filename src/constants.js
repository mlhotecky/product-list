import Cookies from "js-cookie";
const lang = Cookies.get("lang");

export const API_PREFIX = "http://localhost:3000/api/products";

// types of actions
export const GET_PRODUCT_STATUS = "GET_PRODUCT_STATUS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// status of api call
export const PENDING = "PENDING";
export const SUCCEEDED = "SUCCEEDED";
export const REJECTED = "REJECTED";

// messages for responses
export const NO_DATA = "No data.";
export const ERROR = "Error occurred:";
export const ERROR_FETCHING = "Error occurred while fetching data.";
export const PRODUCT_UPDATED = "Product has been updated!";

// validation of invalid values

export const invalidValues = [undefined, null, "", NaN];
export const numberValidation = (val) =>
  !invalidValues.includes(val) && val <= 0;
export const localeCurrency = (val) =>
  lang === "cs" ? `${val?.toLocaleString()},-` : `${val?.toLocaleString()} CZK`;
