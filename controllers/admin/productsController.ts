import  {imageUploadUtil} from '../../helpers/cloudinary';
import Product from '../../models/Product';
import { Request, Response } from 'express';

const handleImageUpload = async (req:Request, res: Response):Promise<void> => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        
        res.status(201).json({
            success: true,
            result,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Could not upload Image'
        })
    }
}

//add new product
const addProduct  = async (req:Request, res: Response): Promise<void> => {
    try{
        const{
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        } = req.body;
        
        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        });

        await newProduct.save();
        res.status(201).json({
            success:true,
            data: newProduct,
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: 'Error in creating product',
        })
    }
}
//fetch all products
const fetchAllProducts  = async (req:Request, res: Response): Promise<void> => {
    try{
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Fetching Products"
        })
    }
}
//edit a product
const editProduct  = async (req:Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        } = req.body;

        let findProduct = await Product.findById(id);
        if(!findProduct){
            res.status(404).json({
                status: false,
                message: 'Product not found',
            });
        }
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
        salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Updating Product"
        })
    }
}
//delete a product
const deleteProduct = async (req:Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({
                success: false,
                message: "product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted Successfully',
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Deleting Product"
        })
    }
}

export {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
};