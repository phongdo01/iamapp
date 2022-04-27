const quote = require("../models/quote");
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

module.exports = {
  save: async function (body) {
    try {
      const { category_id, content } = body;
      const newQuote = await quote({ category_id, content });
      return await newQuote.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
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
};
