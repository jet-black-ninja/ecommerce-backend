import Product from '../../models/Product';
import { Request, Response } from 'express';

const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword } = req.params;
    console.log('received Keyword:', keyword);
    if (!keyword || typeof keyword !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Keyword is Required and must be in string format',
      });
      return;
    }
    const regEx = new RegExp(keyword, 'i');

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export default searchProducts;
