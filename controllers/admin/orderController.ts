import Order from  '../../models/Order';
import {Response, Request} from "express";

const getAllOrdersOfAllUsers = async (req:Request, res:Response):Promise<void> => {
    try{
        const orders = await Order.find({});

        if(!orders.length){
            res.status(404).json({
                success: false,
                message: 'No orders found'
            });
            return;
        }
        res.status(200).json({
            success:true,
            data: orders,
        })
    
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to get Orders'
        })
    }
    
}

const getOrderDetailsForAdmin = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params;

        const order = await Order.findById(id);
        if(!order){
            res.status(404).json({
                success: false,
                message: "Order Not found/ Doesn't Exist",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to get Order Details',
        });
    }
};

const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;
        
        const order = await Order.findById(id);

        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        return;
        } 
        await Order.findByIdAndUpdate(id, { orderStatus });

        res.status(200).json({
        success: true,
        message: "Order status is updated successfully!",
    });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update Order Status',
        });
    }
}

export { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus} ;