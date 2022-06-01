import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import { PageHome } from "./subPages/PageHome";
import { PageExpenses } from "./subPages/PageExpenses";
function App() {
  return (
    <div className="App">
      <h1>My Smart Wallet</h1>
      <Navbar />
      <Routes>
        <Route index element={<PageHome/>} />
        <Route path="home" element={<PageHome />} />
        <Route path="expenses" element={<PageExpenses />} />
        <Route path="*" element={<p>There is nothing here, 404!</p>}/>
      </Routes>
    </div>
  );
}

export default App;
