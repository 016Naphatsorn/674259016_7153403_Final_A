import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BookForm from "../component/BookForm";
import BookHeader from "../component/BookHeader";
import { showError, showSuccess } from "../service/alertService";
import { createBook, getBook, updateBook } from "../service/bookService";

function BookFormPage({ isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadBook = async () => {
      try {
        const book = await getBook(id);

        setName(book.name ?? "");
        setDescription(book.description ?? "");
        setImage(book.image ?? "");
        setAuthor(book.author ?? "");
        setPublishedDate(book.publishedDate ?? "");
      } catch (requestError) {
        setError(requestError.message);
        showError(requestError);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !author.trim()) {
      showError("กรุณากรอกชื่อหนังสือและชื่อผู้แต่ง");
      return;
    }

    setIsSubmitting(true);

    try {
      const book = {
        name: name.trim(),
        author: author.trim(),
        description: description.trim() || null,
        image: image.trim() || null,
        publishedDate: publishedDate || null,
      };

      if (isEditing) {
        await updateBook(id, book);
      } else {
        await createBook(book);
      }

      await showSuccess(
        isEditing ? "แก้ไขหนังสือสำเร็จ" : "เพิ่มหนังสือสำเร็จ",
      );

      navigate("/books");
    } catch (requestError) {
      showError(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <BookHeader />

        {loading && <p>กำลังโหลดข้อมูลหนังสือ...</p>}

        {!loading && error && <p role="alert">โหลดข้อมูลไม่สำเร็จ: {error}</p>}

        {!loading && !error && (
          <BookForm
            editingId={isEditing ? id : null}
            name={name}
            description={description}
            image={image}
            author={author}
            publishedDate={publishedDate}
            isSubmitting={isSubmitting}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onImageChange={setImage}
            onAuthorChange={setAuthor}
            onPublishedDateChange={setPublishedDate}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/books")}
          />
        )}
      </div>
    </main>
  );
}

export default BookFormPage;
