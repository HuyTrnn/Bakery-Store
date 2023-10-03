import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:81/api/product-detail/",
  }),
  endpoints: (builder) => {
    return {
      getProduct: builder.query({
        query: (id) => {
          return {
            url: `${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetProductQuery } = productApi;
export { productApi };
