import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IChatsProps, IChatProps } from './types';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['IChatProps'],
  endpoints: (builder) => ({
    getAllChats: builder.query<IChatsProps, string>({
      query: () => ({
        url: '/chats',
      }),
      providesTags: ['IChatProps'],
    }),
    saveChat: builder.mutation<IChatProps, Omit<IChatProps, 'id'>>({
      query: (chat: IChatProps) => ({
        url: '/chats',
        method: 'POST',
        body: chat,
      }),
      invalidatesTags: ['IChatProps'],
    }),
    removeChat: builder.mutation({
      query: (id: string) => ({
        url: `/chats/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['IChatProps'],
    }),
  }),
});

export const {
  useGetAllChatsQuery,
  useSaveChatMutation,
  useRemoveChatMutation,
} = chatApi;
