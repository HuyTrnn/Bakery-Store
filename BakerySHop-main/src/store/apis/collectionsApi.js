import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const collectionsApi = createApi({
  reducerPath: "collections",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:81/api" }),
  endpoints: (builder) => {
    return {
      fetchCollections: builder.query({
        query: () => {
          return {
            url: "/products_type",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchCollectionsQuery } = collectionsApi;
export { collectionsApi };
