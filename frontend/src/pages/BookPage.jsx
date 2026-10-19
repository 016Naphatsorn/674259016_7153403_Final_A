import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import BookHeader from "../component/BookHeader";
import BookList from "../component/BookList";
import { deleteBook, getBooks } from "../service/bookService";
import { confirmDelete, showError, showSuccess } from "../service/alertService";

const BookPage = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError("");

      try {
        setBooks(await getBooks());
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!(await confirmDelete())) return;

    try {
      await deleteBook(id);

      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));

      await showSuccess("ลบหนังสือสำเร็จ", "ลบหนังสือเรียบร้อยแล้ว");
    } catch (requestError) {
      showError(requestError);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <BookHeader />

        <div className="flex justify-end">
          <Link className="btn btn-primary" to="/books/new">
            เพิ่มหนังสือ
          </Link>
        </div>

        {loading && <p>กำลังโหลดรายการหนังสือ...</p>}

        {!loading && error && (
          <p role="alert">โหลดรายการหนังสือไม่สำเร็จ: {error}</p>
        )}

        {!loading && !error && (
          <BookList
            books={books}
            onEdit={(book) => navigate(`/books/${book.id}/edit`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default BookPage;
