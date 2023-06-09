import {
    getCartsAllService,
    getCartByIdService,
    createCartService,
    addProductToCartService,
  } from "../services/carts.services.js";
  
  export const getCartsController = async (req, res, next) => {
      try {
          const docs = await getCartsAllService();
          res.status(200).send({status: "success", message:"Cart was found", payload: docs})
      } catch (error) {
          next(error);
      }
  }
  
  export const getCartByIdController = async (req, res, next) => {
    try {
       const { cid } = req.params;
       const docs = await getCartByIdService(Number(cid));
       //const docs = await getCartByIdService(cid);
       res.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const createCartController = async (req, res, next) => {
    try {
      const docs = await createCartService();
      res.status(201).send(docs)
    } catch (error) {
      next(error);
    }
  };
  
  export const addProductToCartController = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const product = await addProductToCartService(cid,pid);
      //const product = await addProductToCartService(Number(cid), Number(pid));
      if (product) {
        res.status(201).send({status: "success", message: "Product successfully added to cart!", payload: product});
      } else {
        res.status(404).send({status: "error", message:"The product or cart you are searching for could not be found!"});
      } 
    } catch (error) {
      next(error);
    }
  };