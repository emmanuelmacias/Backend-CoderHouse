import {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,
  } from "../services/products.services.js";
  
  export const getAllController = async (req, res, next) => {
    try {
      const { page, limit, sort, query } = req.query;
      const response = await getAllService(page, limit, sort, query);
      const next = response.hasNextPage ? `http://localhost:8080/users?page=${response.nextPage}` : null
      const prev = response.hasPrevPage ? `http://localhost:8080/users?page=${response.prevPage}` : null
      //res.json(response);
      res.json({
        payload: response.docs,
        info: {
          count: response.totalDocs,
          pages: response.totalPages,
          page: response.page,
          hasNextPage: response.hasNextPage,
          hasPrevPage: response.hasPrevPage,
          next,
          prev
        }
      });
    } catch (error) {
      next(error);
    }
  };

  
  
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getByIdService(id);
      res.json(doc);
    } catch (error) {
      next(error);
    }
  };
  
  export const createController = async (req, res, next) => {
    try {
      const { title, description, code, price, stock, category, thumbnail } = req.body;
      const newDoc = await createService({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
      });
      res.json(newDoc);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, code, price, stock, category, thumbnail } = req.body;
      await getByIdService(id); // Si lo encuetra actualiza, sino ejecuta el error del Servicio
      const docUpd = await updateService(id, {
        title, description, code, price, stock, category, thumbnail
      });
      res.json(docUpd);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteController = async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteService(id);
      res.json({message: 'Product deleted successfully!'})
    } catch (error) {
      next(error);
    }
  };