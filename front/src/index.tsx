import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/LayoutArea/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import interceptorsService from './Services/InterceptorsService';
import React from 'react';
import {store} from "./Redux/Store"
import { Provider } from "react-redux";
import { ReactNotifications, Store } from 'react-notifications-component';

interceptorsService.createInterceptors();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <ReactNotifications />
      <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);
