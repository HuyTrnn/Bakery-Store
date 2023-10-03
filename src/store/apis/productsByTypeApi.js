import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsByTypeApi = createApi({
  reducerPath: "productsByType",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:81/api" }),
  endpoints: (builder) => {
    return {
      fetchProductsByType: builder.query({
        query: (productTypeId) => {
          return {
            url: `/productType/${productTypeId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchProductsByTypeQuery } = productsByTypeApi;
export { productsByTypeApi };
