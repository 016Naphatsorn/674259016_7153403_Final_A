const API_URL = `${import.meta.env.VITE_API_URL}/api/books`;

const request = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
  }

  // กรณี API ตอบกลับโดยไม่มีข้อมูล เช่น HTTP 204
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// ดึงหนังสือทั้งหมด
const getBooks = () => request(API_URL);

// ดึงหนังสือตาม ID
const getBook = (id) => request(`${API_URL}/${id}`);

// เพิ่มหนังสือ
const createBook = (book) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

// แก้ไขหนังสือ
const updateBook = (id, book) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

// ลบหนังสือ
const deleteBook = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export { getBook, getBooks, createBook, updateBook, deleteBook };

