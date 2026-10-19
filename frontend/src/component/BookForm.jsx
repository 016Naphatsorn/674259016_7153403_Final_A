import { Pencil, PlusCircle, X } from "lucide-react";

function BookForm({
  editingId,
  name,
  description,
  image,
  author,
  publishedDate,
  isSubmitting,
  onNameChange,
  onDescriptionChange,
  onImageChange,
  onAuthorChange,
  onPublishedDateChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <PlusCircle className="size-5" />
          </div>

          <div>
            <h2 className="card-title text-xl">
              {editingId ? "แก้ไขหนังสือ" : "เพิ่มหนังสือใหม่"}
            </h2>
            <p className="text-sm text-base-content/60">
              {editingId
                ? "แก้ไขข้อมูลหนังสือในระบบ"
                : "กรอกข้อมูลเพื่อเพิ่มหนังสือ"}
            </p>
          </div>
        </div>

        <form
          className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={onSubmit}
        >
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">ชื่อหนังสือ</span>
            <input
              className="input input-bordered w-full"
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="เช่น Harry Potter"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">ผู้แต่ง</span>
            <input
              className="input input-bordered w-full"
              type="text"
              value={author}
              onChange={(event) => onAuthorChange(event.target.value)}
              placeholder="ชื่อผู้แต่ง"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">วันที่เผยแพร่</span>
            <input
              className="input input-bordered w-full"
              type="date"
              value={publishedDate}
              onChange={(event) => onPublishedDateChange(event.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">URL รูปภาพ</span>
            <input
              className="input input-bordered w-full"
              type="url"
              value={image}
              onChange={(event) => onImageChange(event.target.value)}
              placeholder="https://example.com/book.jpg"
            />
          </label>

          <label className="form-control w-full md:col-span-2">
            <span className="label-text mb-2 font-medium">รายละเอียด</span>
            <textarea
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="รายละเอียดหนังสือ"
              rows={3}
            />
          </label>

          <div className="flex flex-col gap-2 md:col-span-2 md:flex-row md:justify-end">
            <button
              className="btn btn-primary w-full md:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : editingId ? (
                <Pencil className="size-4" />
              ) : (
                <PlusCircle className="size-4" />
              )}

              {isSubmitting
                ? "กำลังบันทึก..."
                : editingId
                  ? "บันทึกการแก้ไข"
                  : "บันทึกหนังสือ"}
            </button>

            <button
              className="btn btn-ghost w-full md:w-auto"
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="size-4" />
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BookForm;
