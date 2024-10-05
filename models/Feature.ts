import mongoose,{Schema, Document} from 'mongoose';


export interface IFeature{
    image:string
}

export interface IFeatureModel extends IFeature, Document{}
const FeatureSchema:Schema = new Schema(
    {
        image:String,
    },{
        timestamps: true,
    }
)

export default mongoose.model<IFeatureModel>("Feature", FeatureSchema);