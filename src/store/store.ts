import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/store/slices/user';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [userSlice.name]: userSlice.reducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
