import api from "./api/axios";

const token = localStorage.getItem("auth");

if (token) {
  api.defaults.headers.common["Authorization"] =
    "Basic " + token;
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
