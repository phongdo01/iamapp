const version = require("../models/version");

module.exports = {
    save: function () {
        try {
          const timestamp = new Date().getTime();
          const newTheme = await version({
            version: timestamp
          });
          return await version.save();
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
}