import Book from "../model/bookModules.js";

// POST: เพิ่มหนังสือ
const createbook = async (req, res, next) => {
  try {
    const { name, description, image, author, publishedDate } = req.body;

    if (!name || !author) {
      return res.status(400).json({
        message: "Name and author are required fields",
      });
    }

    const createdBook = await Book.create({
      name,
      description,
      image,
      author,
      publishedDate,
    });

    return res.status(201).json(createdBook);
  } catch (error) {
    return next(error);
  }
};

// GET: ดึงหนังสือทั้งหมด
const getAllbook = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};

// GET: ดึงหนังสือตาม ID
const getbookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};

// PUT: แก้ไขหนังสือ
const updatebook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const { name, description, image, author, publishedDate } = req.body;

    if (name !== undefined && !name) {
      return res.status(400).json({
        message: "Name cannot be empty",
      });
    }

    if (author !== undefined && !author) {
      return res.status(400).json({
        message: "Author cannot be empty",
      });
    }

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (author !== undefined) updates.author = author;
    if (description !== undefined) updates.description = description;
    if (image !== undefined) updates.image = image;
    if (publishedDate !== undefined) {
      updates.publishedDate = publishedDate;
    }

    await book.update(updates);

    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};

// DELETE: ลบหนังสือ
const deletebook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.destroy();

    return res.status(200).json({
      message: "Book deleted successfully",
      deletebook: book,
    });
  } catch (error) {
    return next(error);
  }
};

export { createbook, getAllbook, getbookById, updatebook, deletebook };
