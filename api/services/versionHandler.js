const version = require("../models/version");

module.exports = {
    save: async function () {
        try {
          const timestamp = new Date().getTime();
          const newVersion = await version({
            version: timestamp
          });
          return newVersion.save();
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
}