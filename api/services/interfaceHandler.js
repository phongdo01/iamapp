const interface = require("../models/interface");
const { getIconById } = require("./iconHandler");
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;
module.exports = {
  save: async function () {
    try {
      const timestamp = new Date().getTime();
      const newVersion = await interface({
        interface: timestamp,
      });
      return newVersion.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getInterfaces: function (query) {
    let { currentPage, pageSize } = query;
    currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
    pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    return interface
      .find({})
      .lean()
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort({ createdAt: -1 });
  },
  getInterfaceById: function (id) {
    return interface
      .findById(id)
      .lean();
  },
  getIconsByCategoryAndFolder: async function({categoryName, folder}) {
    const interfaces = await interface.find({category: categoryName}).lean();
    if (!interfaces) {
      return 404;
    }
    const foundInterface = interfaces[0].data.find(item => item.folder === folder);
    if (!foundInterface) {
      return 404;
    }
    const icons = await Promise.all(foundInterface.appIcons.map(item => getIconById(item)))
    return icons;
  }
};
