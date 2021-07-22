import React, { useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import "./App.scss";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";
import { REJECTED, SUCCEEDED } from "./constants";

export default function App() {
  const productStatus = useSelector((state) => state.products.productStatus);

  useEffect(() => {
    if (productStatus?.message) {
      switch (productStatus?.status) {
        case SUCCEEDED:
          toastr.success(productStatus.message);
          break;
        case REJECTED:
          toastr.error(productStatus.message);
          break;
        default:
          return;
      }
    }
  }, [productStatus]);
  return (
    <div className="app-layout">
      <Header />
      <div className="app-content">
        <ProductList />
      </div>
    </div>
  );
}
