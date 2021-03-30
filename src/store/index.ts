import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import {reducer} from './reducer'

const configureAppStore = () => {
    return configureStore({
        reducer,
        devTools: true,
    })
}

export const store = configureAppStore();