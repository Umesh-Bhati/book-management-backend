import express from 'express';
import { publishBook, searchBooks, unpublishBook, getUserBooks, getAllPublishedBooks } from '../controllers/book.controller';

const router = express.Router();
router.post('/publish', publishBook);
router.get('/search', searchBooks);
router.put('/unpublish/:bookId', unpublishBook);
router.put('/publish/:bookId', publishBook);
router.get('/user', getUserBooks);
router.get('/published', getAllPublishedBooks);

export default router;
