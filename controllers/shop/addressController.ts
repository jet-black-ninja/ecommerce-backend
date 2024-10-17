import { Request, Response } from 'express';
import Address, { IAddress, IAddressModel } from '../../models/Address';

const addAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      res.status(400).json({
        success: false,
        message: 'Please provide all the details',
      });
      return;
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
const fetchAllAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json({
        success: false,
        message: 'User ID is required',
      });
      return;
    }
    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const editAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: 'User Id and address Id is required',
      });
      return;
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      {
        formData,
      }
    );
    if (!address) {
      res.status(404).json({
        success: false,
        message: 'Address not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: 'User Id and address Id is required',
      });
      return;
    }
    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    if (!address) {
      res.status(404).json({
        success: false,
        message: 'Address not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
