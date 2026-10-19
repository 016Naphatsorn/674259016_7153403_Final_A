import { BookOpen, Pencil, Trash2 } from "lucide-react";
import React from "react";

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="card border border-dashed border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center py-14 text-center">
          <BookOpen className="size-12 text-base-content/25" />
          <h2 className="card-title mt-2">ยังไม่มีข้อมูลหนังสือ</h2>
          <p className="text-sm text-base-content/60">
            เริ่มต้นด้วยการเพิ่มหนังสือใหม่ด้านบน
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">รายการหนังสือทั้งหมด</h2>
          <p className="text-sm text-base-content/60">
            มีหนังสือ {books.length} รายการ
          </p>
        </div>

        <span className="badge badge-primary badge-lg">{books.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article
            className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
            key={book.id}
          >
            <figure className="aspect-[4/3] bg-base-200">
              {book.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={book.image}
                  alt={book.name}
                />
              ) : (
                <BookOpen className="size-14 text-base-content/25" />
              )}
            </figure>

            <div className="card-body gap-3 p-5">
              <div className="min-w-0">
                <p className="font-mono text-xs text-base-content/50">
                  #{book.id}
                </p>

                <h3 className="mt-1 text-lg font-bold">{book.name}</h3>

                <p className="mt-1 text-sm text-primary">
                  ผู้แต่ง: {book.author}
                </p>
              </div>

              <p className="text-sm text-base-content/70">
                {book.description || "ไม่มีรายละเอียดหนังสือ"}
              </p>

              <p className="text-sm text-base-content/60">
                วันที่เผยแพร่: {book.publishedDate || "ไม่ระบุ"}
              </p>

              <div className="card-actions justify-end border-t border-base-200 pt-3">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                  onClick={() => onEdit(book)}
                  aria-label={`แก้ไขหนังสือ ${book.name}`}
                >
                  <Pencil className="size-4" />
                  แก้ไข
                </button>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                  onClick={() => onDelete(book.id)}
                  aria-label={`ลบหนังสือ ${book.name}`}
                >
                  <Trash2 className="size-4" />
                  ลบ
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BookList;
