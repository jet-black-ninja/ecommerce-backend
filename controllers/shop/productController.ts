import { Request, Response } from 'express';
import Product from '../../models/Product';
import { SortOrder } from 'mongoose';
import { IProductModel } from '../../models/Product';

interface FilterQuery {
  category?: { $in: string[] };
  brand?: { $in: string[] };
}

type SortOption =
  | 'price-lowtohigh'
  | 'price-hightolow'
  | 'title-atoz'
  | 'title-ztoa';

type SortProps = { [key: string]: SortOrder };

const getFilteredProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      category = '',
      brand = '',
      sortBy = 'price-lowtohigh',
    } = req.query as {
      category?: string;
      brand?: string;
      sortBy?: SortOption;
    };

    const filters: FilterQuery = {};

    if (category.length) {
      filters.category = { $in: category.split(',') };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(',') };
    }

    const sort: SortProps = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1;
        break;
      case 'price-hightolow':
        sort.price = -1;
        break;
      case 'title-atoz':
        sort.title = 1;
        break;
      case 'title-ztoa':
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products: IProductModel[] = await Product.find(filters).sort(sort);

    if (!products.length) {
      res.status(404).json({
        success: false,
        message: 'No products found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: product,
    });
    1;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { getFilteredProducts, getProductDetails };
