import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
    const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
    const store = createStore(reducer, preloadedState, composeEnhancers(
        applyMiddleware(thunk)
    ));
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default)
        });
    }
    return store;
}