import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import {ThemeProvider} from "@teishi/bulma_theme";
import { Router } from './routes/Router.jsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={Router} />
);
