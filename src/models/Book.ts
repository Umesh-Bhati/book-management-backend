import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Boolean, default: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Book', bookSchema);
