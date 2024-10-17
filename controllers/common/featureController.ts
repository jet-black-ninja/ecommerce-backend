import Feature from '../../models/Feature';
import { Request, Response } from 'express';

const addFeatureImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image } = req.body;
    console.log(image, 'image');
    const featureImage = new Feature({
      image,
    });

    await featureImage.save();

    res.status(201).json({
      success: true,
      data: featureImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getFeatureImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await Feature.find({});
    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { addFeatureImage, getFeatureImage };
