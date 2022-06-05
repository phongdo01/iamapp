const category = require("../models/category");
const version = require("./versionHandler");
const themeHandler = require("../services/themeHandler");
const ObjectId = require("mongodb").ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;

module.exports = {
  save: async function (body) {
    try {
      const {
        title,
        is_lock,
        is_default,
        theme
      } = body;
      const newCategory = await category({
        title,
        is_lock,
        is_default,
        theme
      });
      version.save();
      return await newCategory.save().then(newCategory => {
        themeHandler.update(theme, {is_customer: true});
        return newCategory;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCategories: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const categories = category
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 })
      .then((datas) =>
        datas.map((data, index) => ({
          ...data,
          order: index,
        }))
      );
    return categories;
  },
  deleteCategory: async function(id) {
    version.save();
    const deleteCategory = await category.findById(id).lean();
    themeHandler.update(deleteCategory.theme, {is_customer: false});
    return await category.deleteOne({_id: ObjectId(id)});
  },
  updateCategory: async function (id, body) {
    try {
      const {
        title,
        is_lock,
        is_default,
        theme
      } = body;
      const updatedCategory = await category.findById(id);
      if (!updatedCategory) {
        return 'NOT_FOUND';
      }
      if (category.title === title && category.is_lock === is_lock && category.is_default === is_default && category.theme === theme) {
        return 'NO_CHANGE'
      }
      version.save();
      return await updatedCategory.updateOne({
        title,
        is_lock,
        is_default,
        theme
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
