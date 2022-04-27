const theme = require("../models/theme");
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
    return await theme.deleteOne({ _id: ObjectId(id) });
  },
};
