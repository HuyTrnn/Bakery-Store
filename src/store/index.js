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
} from "./slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    productsByCollection: productsByCollectionReducer,
    product: productReducer,
    cart: cartReducer,
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
  },
});

export { store };
setupListeners(store.dispatch);

export * from "./thunks";
export * from "./slices";
