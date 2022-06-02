import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import { PageHome } from "./subPages/PageHome";
import { PageTransactions } from "./subPages/PageTransactions";
import { PageTransactionForm } from './subPages/PageTransactionForm';
function App() {
  return (
    <div className="App">
      <h1 className="AppTitle">My Smart Wallet</h1>
      <Navbar />
      <Routes>
        <Route index element={<PageHome/>} />
        <Route path="home" element={<PageHome />} />
        <Route path="transactions" element={<PageTransactions />} />
        <Route path="transactionForm" element={<PageTransactionForm/>} />
        <Route path="*" element={<p>There is nothing here, 404!</p>}/>
      </Routes>
    </div>
  );
}

export default App;
