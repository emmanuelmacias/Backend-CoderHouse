import { ProductsModel } from "./models/products.model.js";

export default class ProductsDaoMongoDB {


  async getAllProducts(page = 1, limit = 10, sort, query) {
    try {
    const filter = query && { category: query };
    const sortOptions = sort === "asc" || sort === "desc" ? { price: sort } : {};
    const response = await ProductsModel.paginate(filter || {}, {
      page,
      limit,
      sort: sortOptions
    });
    
    return response;
    } catch (error) {
    console.log(error);
    }
    }

/*   async getAllProducts(page = 1, limit = 10) {
    try {
     const response = await ProductsModel.paginate({}, { page, limit });
     return response;
    } catch (error) {
      console.log(error);
    }
  } */

  async getProductById(id) {
    try {
      const response = await ProductsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductsModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}