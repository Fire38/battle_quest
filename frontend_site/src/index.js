import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./components/reducers/rootReducer";


const store = createStore(rootReducer, applyMiddleware(thunk));

class RenderApp extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

ReactDOM.render(<RenderApp/>, document.getElementById("app"));

