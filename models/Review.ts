import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  productId: string;
  userId: string;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
}

export interface IReviewModel extends IReview, Document {}

const ProductReviewSchema: Schema = new Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IReviewModel>(
  'ProductReview',
  ProductReviewSchema
);
