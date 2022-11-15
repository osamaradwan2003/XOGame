import React from 'react'
import ReactDOM from 'react-dom/client'
import "./css/index.css"
import {Home} from "./pages"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home currPlayer={{name: "X", isCPU: false}}/>
  </React.StrictMode>
)
