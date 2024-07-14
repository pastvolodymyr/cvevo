import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUserData } from '@/store/types/user.types';

export const getUserData = createAsyncThunk<TUserData>('user/getUserData', async () => {
    const response = await fetch('/api/user');
    const data: TUserData = await response.json();

    return data;
});

// export const buyTokens = createAsyncThunk<TUserData>('user/buyTokens', async () => {
//     const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create',{
//         headers: {
//             'X-Token': process.env.MONOBANK_API || '',
//             amount: 2.95,
//             ccy: 840,
//             redirectUrl: 'http://localhost:3000/pricing'
//         },
//     });
//     const data: TUserData = await response.json();
//
//     return data;
// });
