const group = require("../models/group");
const category = require("../models/category");
const version = require("../models/version");
const ObjectId = require("mongodb").ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1000;

module.exports = {
  save: async function (body) {
    try {
      const {title} = body;
      const categories = body["categories[]"];
      const newGroup = await group({categories, title});
      version.save();
      return await newGroup.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
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
  deleteGroup: async function(id) {
    version.save();
    return await group.deleteOne({_id: ObjectId(id)});
  }
};
