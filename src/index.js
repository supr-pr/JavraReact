import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./Components/App/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
