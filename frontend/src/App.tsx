import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GroupedImagesList, InitialPage } from "./pages/InitialPage";
import { Header } from "./components/Header";
import { useHttp } from "./hooks/useHttp";
import { groupImagesByDate } from "./utils/groupImagesByDate";
import { ImagesProvider } from "./providers/ImagesProvider";
import { ImagePage } from "./pages/ImagePage";
import { NotFound } from "./pages/NotFound";

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);

  return (
    <ImagesProvider>
      <div className="App">
        <Header
          isUploadModalOpened={isUploadModalOpened}
          setIsUploadModalOpened={setIsUploadModalOpened}
        />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <InitialPage
                  isUploadModalOpened={isUploadModalOpened}
                  setIsUploadModalOpened={setIsUploadModalOpened}
                />
              }
            ></Route>
            <Route path="/image/:id" element={<ImagePage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </ImagesProvider>
  );
}

export default App;
