const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const getFavoriteRecipe = async (req, res) => {
  const { favorite } = req.user;
  res.status(200).json({ favorite });
};

const removeFavoriteRecipe = async (req, res) => {
  const { _id } = req.user;
  const { recipesId } = req.body;
  const data = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { favorite: recipesId },
    },
    { new: true }
  );
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Recepi deleted" });
};

module.exports = {
  getFavoriteRecipe: ctrlWrapper(getFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};