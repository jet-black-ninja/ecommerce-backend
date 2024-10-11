import mongoose,{Schema, Types, Document} from "mongoose";

export interface ICartItem{
    productId: Types.ObjectId;
    quantity: number;
}
export interface ICart {
    userId:Types.ObjectId[];
    items: ICartItem[];
}

export interface ICartModel extends ICart , Document{};
const CartSchema:Schema = new Schema(
    {
        userId:{
            type: Types.ObjectId,
            ref:"User",
            required: true,
        },
        items:[
            {
                productId:{
                    type:Types.ObjectId,
                    ref:"Product",
                    required: true,
                },
                quantity:{
                    type:Number,
                    required: true,
                    min:1
                },
            },
        ],
    },{
        timestamps: true,
    }
)

export default mongoose.model<ICartModel>("Cart", CartSchema);