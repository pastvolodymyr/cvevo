import { createSlice } from '@reduxjs/toolkit';
import { getUserData } from '@/store/thunks/user.thunks';
import { IUser } from '@/store/types/user.types';

const initialState: IUser = {
    data: null,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUserData.pending, state => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                };
            })
    },
})

export const { updateUserData } = userSlice.actions;
