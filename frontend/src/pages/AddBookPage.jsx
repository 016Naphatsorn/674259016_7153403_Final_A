import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../service/bookService";
import { showError, showSuccess } from "../service/alertService";
import BookForm from "../component/BookFormPage";

const AddBookPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !author.trim()) {
      showError("กรุณากรอกชื่อหนังสือและชื่อผู้แต่ง");
      return;
    }

    try {
      setIsSubmitting(true);

      await createBook({
        name: name.trim(),
        description: description.trim(),
        image: image.trim(),
        author: author.trim(),
        publishedDate: publishedDate || null,
      });

      await showSuccess("เพิ่มสำเร็จ", "เพิ่มหนังสือเรียบร้อยแล้ว");
      navigate("/books");
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">เพิ่มหนังสือ</h1>

      <BookForm
        editingId={null}
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
    </main>
  );
};

export default AddBookPage;
