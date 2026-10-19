import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BookPage from "./pages/BookPage.jsx";
import BookFormPage from "./pages/BookFormPage.jsx";
import EditBookPage from "./pages/EditBookPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/books/new" element={<BookFormPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
