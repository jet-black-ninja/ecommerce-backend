import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
  userId: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}
export interface IAddressModel extends IAddress, Document {}

const AddressSchema: Schema = new Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
