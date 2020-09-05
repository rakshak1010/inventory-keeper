const Inventory = require("../models/inventory");
const Activity = require("../models/activityLog");
const activityHelper = require("../helpers/activityLog");

module.exports = {

    showGraph: (req, res) => {
        res.render('graph');
    },

    showActivity: (req, res) => {
        Activity.find({}).sort([['createdAt', -1]]).exec((err, activity) => {
            if (err) {
                req.flash("error", "Error Loading Page. Please try again.");
                res.redirect('/graph');
            }
            res.render('activity', { activity: activity });
        });
    },

    showUpdate: (req, res) => {
        Inventory.find({}).sort([['companyName', 1]]).exec((err, inventory) => {
            if (err) {
                req.flash("error", "Error Loading Page. Please try again.");
                res.redirect('/graph');
            }
            res.render('update', { inventory: inventory });
        });
    },

    showAdd: (req, res) => {
        Inventory.find({}).sort([['companyName', 1]]).exec((err, inventory) => {
            if (err) {
                req.flash("error", "Error Loading Page. Please try again.");
                res.redirect('/graph');
            }
            res.render('add', { inventory: inventory });
        });
    },

    addItem: (req, res) => {
        let action = req.query["item"];
        data = {
            "action": "CREATE",
            "updatedById": res.locals.currentuser._id,
            "updatedByName": res.locals.currentuser.username
        }
        if (action === "company") {
            let company = req.body.companyname.toUpperCase();
            Inventory.create({ companyName: company }, (err) => {
                if (err) {
                    req.flash("error", "Invalid Company Name");
                    console.log(err);
                    res.redirect('/create');
                } else {
                    data["company"] = company;
                    let activity_err = activityHelper.logData(data);
                    if (activity_err) {
                        req.flash("error", "Some error occured, This activity could not be logged.");
                        console.log(err);
                        res.redirect('/create');
                    } else {
                        req.flash("success", "New Company added Successfully");
                        res.redirect('/create');
                    }
                }
            });
        } else if (action === "model") {
            let query = { '_id': req.body.companyId };
            let model = { modelNo: req.body.modelname.toUpperCase() };

            Inventory.findOneAndUpdate(query, { $push: { models: model } }, (err, obj) => {
                if (err) {
                    req.flash("error", "Model Could not be created. Please try again.");
                    console.log(err);
                    res.redirect('/create');
                } else {
                    data["company"] = obj.companyName;
                    data["model"] = model.modelNo;
                    let activity_err = activityHelper.logData(data);
                    if (activity_err) {
                        req.flash("error", "Some error occured, This activity could not be logged.");
                        console.log(err);
                        res.redirect('/create');
                    } else {
                        req.flash("success", "New Model added Successfully");
                        res.redirect('/create');
                    }
                }
            });
        } else if (action === "color") {
            let query = { '_id': req.body.companyId, 'models._id': req.body.modelId };
            let color = { colorName: req.body.colorname.toUpperCase() };

            Inventory.findOneAndUpdate(query, { $push: { 'models.$.colors': color } }, (err, obj) => {
                if (err) {
                    req.flash("error", "Color Could not be added. Please try again.");
                    console.log(err);
                    res.redirect('/create');
                } else {
                    data["company"] = obj.companyName;
                    let models = obj.models;
                    console.log(models);
                    data["model"] = models.find((ob) => {
                        return ob._id == query['models._id'];
                    }).modelNo;
                    data["color"] = color.colorName;
                    let activity_err = activityHelper.logData(data);
                    if (activity_err) {
                        req.flash("error", "Some error occured, This activity could not be logged.");
                        console.log(err);
                        res.redirect('/create');
                    } else {
                        req.flash("success", "New Color added Successfully");
                        res.redirect('/create');
                    }
                }
            });
        }
    },

    updateItem: (req, res) => {
        let action = req.query["action"];
        let query = { '_id': req.body.companyId, 'models._id': req.body.modelId, 'models.colors._id': req.body.colorId };
        data = {
            "updatedById": res.locals.currentuser._id,
            "updatedByName": res.locals.currentuser.username
        }
        res.redirect("/update");
    }

};