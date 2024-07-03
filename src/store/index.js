import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  authReducer,
  collectionsReducer,
  productsByCollectionReducer,
  productReducer,
  cartReducer,
  newProductsReducer,
  sellingProductsReducer,
  faqsReducer,
  noNastiesReducer,
  branchReducer,
  forteReducer,
  positionReducer,
  aboutBakerReducer,
  aboutKitchenReducer,
  slideBannerReducer,
  hiringReducer,
  orderReducer,
  languageReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    productsByCollection: productsByCollectionReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    newProducts: newProductsReducer,
    sellingProducts: sellingProductsReducer,
    fags: faqsReducer,
    noNasties: noNastiesReducer,
    branch: branchReducer,
    forte: forteReducer,
    position: positionReducer,
    aboutBaker: aboutBakerReducer,
    aboutKitchen: aboutKitchenReducer,
    slideBanner: slideBannerReducer,
    hiring: hiringReducer,
    language: languageReducer,
  },
});

export { store };
setupListeners(store.dispatch);

export * from "./thunks";
export * from "./slices";
