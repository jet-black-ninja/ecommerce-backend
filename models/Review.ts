import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  userName: string;
  reviewMessage: string;
  reviewValue: number;
}

export interface IReviewModel extends IReview, Document {}

const ProductReviewSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    reviewMessage: {
      type: String,
      required: [true, 'Review message is required'],
      trim: true,
      minlength: [10, 'Review must be at least 10 characters long'],
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
    reviewValue: {
      type: Number,
      required: [true, 'Review rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be a whole number',
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IReviewModel>(
  'ProductReview',
  ProductReviewSchema
);
