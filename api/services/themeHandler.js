const theme = require("../models/theme");
const version = require("./versionHandler");
const ObjectId = require("mongodb").ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;

module.exports = {
  save: async function (body) {
    try {
      const { color, font_name, font_size, background } = body;
      const newTheme = await theme({
        color,
        font_name,
        font_size,
        background,
      });
      version.save();
      return await newTheme.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getThemes: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const themes = theme
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 });
    return themes;
  },
  deleteTheme: async function (id) {
    version.save();
    return await theme.deleteOne({ _id: ObjectId(id) });
  },
  updateTheme: async function (id, body) {
    const { color, font_name, font_size, background } = body;
    const updatedTheme = await theme.findById(id);
    if (!updatedTheme) {
      return "NOT_FOUND";
    }
    if (
      color === updatedTheme.color &&
      font_name === updatedTheme.font_name &&
      font_size === updatedTheme.font_size &&
      background === updatedTheme.background
    ) {
      return "NO_CHANGE";
    }
    version.save();
    return await updatedTheme.updateOne({
      color,
      font_name,
      font_size,
      background,
    });
  },
};
