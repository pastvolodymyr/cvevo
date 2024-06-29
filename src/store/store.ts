import { configureStore } from '@reduxjs/toolkit'
import { cvAnalyserSlice } from '@/store/slices/cvAnalyserSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [cvAnalyserSlice.name]: cvAnalyserSlice.reducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
