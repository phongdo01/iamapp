const quote = require("../models/quote");
const category = require("../models/category");
const version = require("./versionHandler");
const ObjectId = require("mongodb").ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;

module.exports = {
  save: async function (body) {
    try {
      const { category_id, content } = body;
      const newQuote = await quote({ category_id, content });
      version.save();
      return await newQuote.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getQuotes: async function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const quotes = await quote
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 });
    const listQuote = await Promise.all(
      quotes.map(async (item) => {
        const cate = await category
          .findById(item.category_id)
          .lean();
        return {
          ...item,
          category_name: cate.title,
        };
      })
    );
    return listQuote;
  },
  deleteQuote: async function(id) {
    version.save();
    return await quote.deleteOne({_id: ObjectId(id)});
  },
  updateQuote: async function (id, body) {
    try {
      const { category_id, content } = body;
      const updatedQuote = await quote.findById(id);
      if (!updatedQuote) {
        return 'NOT_FOUND';
      }
      if (quote.category_id === category_id && quote.content === content) {
        return 'NO_CHANGE'
      }
      version.save();
      return await updatedQuote.updateOne({ category_id, content });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
