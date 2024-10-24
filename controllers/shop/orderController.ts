import paypal from '../../helpers/paypal';
import Order from '../../models/Order';
import Cart from '../../models/Cart';
import Product from '../../models/Product';
import { Request, Response } from 'express';

const frontendUrl = process.env.FRONTEND_URL;
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${frontendUrl}/shop/paypal-return`,
        cancel_url: `${frontendUrl}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toString(),
              currency: 'USD',
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2),
          },
          description: 'description',
        },
      ],
    };
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment creation error' });
        return;
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newlyCreatedOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === 'approval_url'
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Payment error',
    });
  }
};

const capturePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    order.paymentStatus = 'paid';
    order.orderStatus = 'pending';
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }
      product.totalStock -= item.quantity;
      await product.save();
    }
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();
    res.status(200).json({
      success: true,
      message: 'Order Confirmed',
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getAllOrderByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    if (!orders.length) {
      res.status(404).json({
        success: false,
        message: 'No Orders Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: 'Order Not Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export { createOrder, capturePayment, getAllOrderByUser, getOrderDetails };
