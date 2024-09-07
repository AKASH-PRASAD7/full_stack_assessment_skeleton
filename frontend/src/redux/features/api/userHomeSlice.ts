import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface User {
  user_id: number;
  username: string;
}
interface GetAllUsersResponse {
  data: User[];
}
interface Data {
  homeId: number;
  userIds: number[];
}
export const userHomeSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000/api/" }),
  endpoints: (builder) => ({
    getUsersHome: builder.query({
      query: ({ userId, page = 1 }: { userId: number; page?: number }) =>
        `home/find-by-user/${userId}?page=${page}&limit=50`,
    }),
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => "user/find-all",
    }),
    getHomeUsers: builder.query({
      query: (homeId: number) => `user/find-by-home/${homeId}`,
    }),

    updateHomeUsers: builder.mutation({
      query: (data: Data) => ({
        url: `home/update-users`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersHomeQuery,
  useGetAllUsersQuery,
  useGetHomeUsersQuery,
  useUpdateHomeUsersMutation,
} = userHomeSlice;
