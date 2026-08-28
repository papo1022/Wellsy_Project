import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

import './common/styles/Variables.css';

import './index.css'; 

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
        <App />
        </BrowserRouter>
)
 
