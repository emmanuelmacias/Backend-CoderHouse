import CartsDaoMongo from "../daos/mongodb/carts.dao.js";
const cartsDao = new CartsDaoMongo();

//import CartDaoFs from "../daos/filesystem/carts.dao.js";
//const cartsDao = new CartDaoFs();

export const getCartsAllService = async () => {
  try {
    const docs = await cartsDao.getAllCart();
    return docs;
  } catch (error) {
        console.log(error);
  }
};

export const getCartByIdService = async (cid) => {
  try {
    const doc = await cartsDao.getCartById(cid);
    //const doc = await cartsDao.getCartById(Number(cid));
    if (!doc)
      return `The cart you are searching width ID ${cid} could not be found!`;
    else return doc;
  } catch (error) {
        console.log(error);
  }
};

export const createCartService = async () =>{
    try {
        const doc = await cartsDao.createCart();
        return doc;
    } catch (error) {
        console.log(error);
    }
};

export const addProductToCartService = async (cid, pid) =>{
    try {
        const doc = await cartsDao.addProductToCart(cid, pid);
        //const doc = await cartsDao.addProductToCart(Number(cid), Number(pid)); //FileSystem
        return doc;
    } catch (error) {
        console.log(error);
    }
};