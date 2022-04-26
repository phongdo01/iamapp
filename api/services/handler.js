const quote = require("../models/quote");
const group = require("../models/group");
const theme = require("../models/theme");
const category = require("../models/category");
const version = require("../models/version");
const ObjectId = require("mongodb").ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

module.exports = {
  getQuotes: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const quotes = quote
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 });
    return quotes;
  },
  getGroups: async function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const listGroups = await group
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 });
    const groups = await Promise.all(
      listGroups.map(async (item, index) => {
        const categories = await Promise.all(
          item.categories.map(async (it) => {
            const rs = await category.findOne({ id: new ObjectId(it) });
            return rs;
          })
        );
        return {
          ...item,
          categories,
          order: index,
        };
      })
    );
    return groups;
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
  getVersions: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const versions = version
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ version: -1 });
    return versions;
  },
};
