const paginate = (model, sort, selector) => {
  return async (req, res, next) => {
    const category = req.params.category;
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await model
      .find({ [selector]: category })
      .sort(sort)
      .skip(page * limit)
      .limit(limit)
      .exec();
    const totalItemCount = await model.countDocuments({ [selector]: category });
    const maxPages = Math.ceil(totalItemCount / limit);
    res.result = { result, maxPages };
    next();
  };
};

module.exports = paginate;
