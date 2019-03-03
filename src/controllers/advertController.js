const advertQueries = require("../db/queries.advert.js");


module.exports = {
    index(req,res,next){
        advertQueries.getAllAdverts((err,adverts) =>{
            if(err){
                res.redirect(500,"static/index");
            } else {
                res.render("advertisements/index", {adverts})
            }
        })
        
    },
    new(req,res,next){
        res.render("advertisements/new")
    },
    create(req,res,next){
        let newAdvert = {
            title : req.body.title,
            description: req.body.description
        };
        advertQueries.createAdvert(newAdvert, (err,advert) =>{
            if(err || advert == null) {
                res.redirect(500, "/advertisements/new");
            } else {
                res.redirect(303, "/advertisements");
            }
        });
    },

}