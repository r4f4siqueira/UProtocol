import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

export const store = configureStore({
    reducer: {
        ...reducers,
    },
});
