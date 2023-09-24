import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GroupedImagesList, InitialPage } from "./pages/InitialPage";
import { Header } from "./components/Header";
import { useHttp } from "./hooks/useHttp";
import { groupImagesByDate } from "./utils/groupImagesByDate";

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);

  return (
    <div className="App">
      <Header
        isUploadModalOpened={isUploadModalOpened}
        setIsUploadModalOpened={setIsUploadModalOpened}
      />
      <div className="container">
        <InitialPage
          isUploadModalOpened={isUploadModalOpened}
          setIsUploadModalOpened={setIsUploadModalOpened}
        />
      </div>
    </div>
  );
}

export default App;
