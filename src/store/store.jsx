import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combine from './reducers/combine';


const store = createStore(combine, composeWithDevTools(applyMiddleware(thunk)));


export default store;