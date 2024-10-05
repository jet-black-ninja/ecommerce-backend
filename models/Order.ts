import mongoose,{Schema, Document} from "mongoose";

interface ICartItem{
    productId:string;
    title: string;
    image: string;
    price: Number;
    quantity: Number
}
interface IAddress {
    addressId: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
}
export interface IOrder {
    userId: string;
    cartId: string;
    cartItems: ICartItem[];
    addressInfo: IAddress;
    OrderStatus:string;
    paymentMethod: string;
    paymentStatus: string;
    totalAmount: number;
    orderDate: Date;
    orderUpdateDate: Date;
    paymentId: string;
    payerId: string;
}

export interface IOrderModel extends IOrder , Document{};

const OrderSchema: Schema = new Schema({
    userId: String,
    cartId: String,
    cartItems:[
        {
            productId: String,
            title: String,
            image: String,
            price: Number,
            quantity: Number
        },
    ],
    addressInfo:{
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    OrderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String
})

export default mongoose.model<IOrderModel>("Order", OrderSchema);