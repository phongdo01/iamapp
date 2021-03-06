const version = require("../models/version");
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;
module.exports = {
  save: async function () {
    try {
      const timestamp = new Date().getTime();
      const newVersion = await version({
        version: timestamp,
      });
      return newVersion.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
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
