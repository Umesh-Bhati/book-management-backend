import { NextFunction, Response } from 'express';
import Book from '../models/Book';
import { CustomRequest } from '../middlewares/verifyToken';
import ErrorHandler from '../middlewares/error';

export const publishBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { title, author, bookId } = req.body;
    const userId = req.userId
    let book
    if (bookId) {
      book = await Book.findById(bookId);
      if (!book) return next(new ErrorHandler("Book not fount", 404))
      book.published = true;
      await book.save();
    } else {
      const newBook = new Book({
        title,
        author,
        userId,
      });
      book = await newBook.save();
    }
    res.status(201).json({ success: true, message: 'Book published successfully', data: book });
  } catch (error) {
    console.error(error);
    next(error)
  }
};

export const searchBooks = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const searchQuery = req.query.title as string;
    const books = await Book.find({ title: { $regex: searchQuery, $options: 'i' } });

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    next(error)
  }
};

export const unpublishBook = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId

    const book = await Book.findOne({ _id: bookId, userId });
    if (!book) {
      return next(new ErrorHandler("Book not found", 404))
    }

    book.published = false;
    await book.save();

    res.status(200).json({ message: 'Book unpublished successfully' });
  } catch (error) {
    next(error)
  }
};


export const getUserBooks = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const userBooks = await Book.find({ userId });

    res.status(200).json({ success: true, data: userBooks });
  } catch (error) {
    next(error)
  }
};

export const getAllPublishedBooks = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const publishedBooks = await Book.find({ published: true, userId });

    res.status(200).json({ success: true, data: publishedBooks });
  } catch (error) {
    console.error(error);
    next(error)
  }
};
