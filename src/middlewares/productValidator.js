export const productValidator = (req, res, next) => {
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    if (!requiredFields.every((field) => field in req.body)) {
        res.status(400).json({ message: 'Missing Required Fields' });
      } else{
        next();
      }
}

