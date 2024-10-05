import mongoose, {Schema, Document} from "mongoose";

export interface IProduct {
    image: string;
    title: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    salePrice: number;
    totalStock: number;
    averageReview: number;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
    {
        image: String,
        title: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        salePrice: Number,
        totalStock: Number,
        averageReview: Number
    },{
        timestamps: true,
    }
)

export default mongoose.model<IProductModel>("Product", ProductSchema);