import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import './App.css'
import Tabla from './components/Tabla/Tabla'

function App() {

  return (
    <>
           <BrowserRouter>
           <Routes>
           <Route path="/" element={<Tabla/>}>
           </Route>
           </Routes>
           </BrowserRouter>
      
    </>
  )
}

export default App
