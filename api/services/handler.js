const quote = require('../models/quote');
const group = require('../models/group');
const theme = require('../models/theme');
const category = require('../models/category');
const ObjectId = require('mongodb').ObjectId;
const DEFAULT_CURRENT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

module.exports = {
    getQuotes:  function(query) {
        let { currentPage, pageSize } = query;
        currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
        pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const quotes = quote.find({})
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort({ createdAt: -1 });
        return quotes;
    },
    getGroups: async function(query) {
        let { currentPage, pageSize } = query;
        currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
        pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const listGroups = await group.find({})
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort({ createdAt: -1 });
        const groups = await listGroups.reduce(async (list, item) => {
            const listClone = await list;
            const categories = await item.categories.reduce(async (rs, it) => {
                const arr = await rs;
                const categoryDetail = await category.findById(it);
                arr.push(categoryDetail);
                return arr;
            }, []);
            const obj = {
                ...item.toJSON(), categories
            }
            listClone.push(obj);
            return listClone;
        }, []);
        return groups;
    },
    getThemes: function(query) {
        let { currentPage, pageSize } = query;
        currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
        pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const themes = theme.find({})
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort({ createdAt: -1 });
        return themes;
    },
    getCategories: function(query) {
        let { currentPage, pageSize } = query;
        currentPage = parseInt(currentPage) || DEFAULT_CURRENT_PAGE;
        pageSize = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const categories = category.find({})
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort({ createdAt: -1 });
        return categories;
    }
}