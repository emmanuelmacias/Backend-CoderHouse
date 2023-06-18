import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100, index: true},
    description: { type: String, required: true },
    code: { type: Number, required: true, unique: true},
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
},
{ timestamps: true, versionKey: false }
);

ProductsSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model(productsCollection, ProductsSchema);
