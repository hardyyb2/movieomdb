import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";



export default function configureStore(persistedState) {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunkMiddleware),
        // other store enhancers if any
    );

    const store = createStore(
        rootReducer,
        persistedState,
        enhancer
    );
    store.dispatch(verifyAuth());
    return store;
}