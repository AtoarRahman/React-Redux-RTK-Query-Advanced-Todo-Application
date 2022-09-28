import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:9000",
        baseUrl: "https://lwsjsonserver.herokuapp.com",
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/todos",
            keepUnusedDataFor: 600,
            providesTags: ["Todos"],
        }),
        getTodo: builder.query({
            query: (todoId) => `/todos/${todoId}`,
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const {
useGetTodosQuery,
useGetTodoQuery,
useAddTodoMutation,
useEditTodoMutation,
useDeleteTodoMutation,
} = apiSlice;
