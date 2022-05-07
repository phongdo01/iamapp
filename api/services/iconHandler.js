const icon = require("../models/icon");
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;
module.exports = {
  save: async function () {
    try {
      const timestamp = new Date().getTime();
      const newVersion = await icon({
        icon: timestamp,
      });
      return newVersion.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getIcons: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const icons = icon
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize);
    return icons;
  },
  getIconById: function(id) {
    return icon.findById(id).lean();
  }
};
