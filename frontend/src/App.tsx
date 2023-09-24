import "./App.css";
import { Routes, Route } from "react-router-dom";
import { InitialPage } from "./pages/InitialPage";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<InitialPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
