const Activity = require("../models/activityLog");

module.exports = {
    logData: (data) => {
        Activity.create(data, (err, obj) => {
            return err;
        });
    }
};