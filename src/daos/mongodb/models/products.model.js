import mongoose from "mongoose";

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
},
{ timestamps: true, versionKey: false }
);

export const ProductsModel = mongoose.model(productsCollection, ProductsSchema);
