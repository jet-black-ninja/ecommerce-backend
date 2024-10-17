import Order from '../../models/Order';
import Product from '../../models/Product';
import Review from '../../models/Review';
import { Response, Request } from 'express';

const addProductReview = async (req: Request, res: Response) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      'cartItems.productId': productId,
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: 'You need to purchase a product to review it',
      });
    }
    const checkExistingReview = await Review.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(200).json({
      success: true,
      message: 'Review added successfully',
      data: newReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const review = await Review.find({ productId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found for this product',
      });
    }
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
export { addProductReview, getProductReviews };
