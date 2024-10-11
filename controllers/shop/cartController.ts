import Cart, { ICartModel } from "../../models/Cart";
import Product, { IProductModel, IProduct } from "../../models/Product";
import { Request, Response } from "express";
import { Types, Document } from "mongoose";
import { ICartItem, ICart } from "../../models/Cart";

const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            res.status(400).json({
                success: false,
                message: "Invalid request. userId, productId, and quantity are required."
            });
            return;
        }

        const product: IProduct | null = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found."
            });
            return;
        }

        let cart: ICartModel | null = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item: ICartItem) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        res.status(201).json({
            success: true,
            message: "Product added to cart successfully.",
            data: cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server error."
        });
    }
};


const fetchCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({
                success: false,
                message: "Invalid request. userId is required."
            });
            return;
        }

        const cart: ICartModel | null = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found",
            });
            return;
        }

        const validItems = cart.items.filter(
            (productItem) => productItem.productId
        );

        const populateCartItems = validItems.map((item) => {
            const product = item.productId as unknown as IProductModel;
            return {
                productId: product._id,
                image: product.image,
                title: product.title,
                price: product.price,
                salePrice: product.salePrice,
                quantity: item.quantity,
            };
        });

        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

const updateCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            res.status(400).json({
                success: false,
                message: "Invalid request. userId, productId, and quantity are required."
            });
            return;
        }

        const cart: ICartModel | null = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found."
            });
            return;
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Product not found in cart."
            });
            return;
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        });

        const populateCartItems = cart.items.map((item) => {
            const product = item.productId as unknown as IProductModel | null;
            return {
                productId: product ? product._id : null,
                image: product ? product.image : null,
                title: product ? product.title : "Product not found",
                price: product ? product.price : null,
                salePrice: product ? product.salePrice : null,
                quantity: item.quantity,
            };
        });

        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
        });
    }
};

const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            res.status(400).json({
                success: false,
                message: "Invalid request. userId and productId are required."
            });
            return;
        }

        const cart: ICartModel | null = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found."
            });
            return;
        }

        cart.items = cart.items.filter(
            (item: ICartItem) => (item.productId )._id.toString() !== productId
        );

        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => {
            const product = item.productId as unknown as IProductModel | null;
            return {
                productId: product ? product._id : null,
                image: product ? product.image : null,
                title: product ? product.title : "Product not found",
                price: product ? product.price : null,
                salePrice: product ? product.salePrice : null,
                quantity: item.quantity,
            };
        });
        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

export { addToCart, fetchCartItems, updateCartItems, deleteCartItem };