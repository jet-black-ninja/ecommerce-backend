import mongoose, { Schema, Document, Types } from 'mongoose';
import { IAddress } from './Address';
import { ICartItem } from './Cart';

export interface IOrder {
  userId: Types.ObjectId;
  cartId: Types.ObjectId;
  cartItems: ICartItem[];
  addressInfo: IAddress;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartId: {
    type: Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

export default mongoose.model<IOrderModel>('Order', OrderSchema);
