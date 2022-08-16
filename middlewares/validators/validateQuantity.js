const validateQuantity = (req, res, next) => {
  const isQuantityValid = req.body.every(({ quantity }) => quantity || quantity >= 0);

  if (!isQuantityValid) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const validateQuantityValue = (req, res, next) => {
  const isQuantityValueValid = req.body.every(({ quantity }) => quantity >= 1);

  if (!isQuantityValueValid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  next();
};

module.exports = {
  validateQuantity,
  validateQuantityValue,
};