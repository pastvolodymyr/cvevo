import { RootState } from '@/store/store';
import { createSelector } from 'reselect';

const selectSelf = (state: RootState): RootState['user'] => state.user;

export const userSelector = createSelector([ selectSelf ], user => ({
    ...user,
    ...(user.data ? {
        ...user.data,
        isFree: !!user.data.isFree,
    } : user.data),
}));
