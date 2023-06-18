import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({

  products: [
    {
      quantity: { type: Number },
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products',
        //default: []  Tuve que sacar este default, ya que me generaba un error al eliminar un producto en particular
        // Se estaba definiendo el valor por defecto como un array vacío ("[]"), lo cual estaba causando problemas al intentar convertirlo en un ObjectId válido.
       }
    }
  ]
},
{ timestamps: true, versionKey: false }
);

cartsSchema.pre('find', function(next) {
  this.populate('products');
  next();
});

export const CartsModel = mongoose.model(cartsCollection, cartsSchema);