const notFound = (req, res, next) => {
  res.status(404).json("The route isn't found");
};
module.exports = notFound;
