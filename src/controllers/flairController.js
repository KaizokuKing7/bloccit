const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req,res,next){
        res.render("flairs/new", {postId: req.params.id,topicId: req.params.topicId})
    },
    create(req,res,next){
        let newFlair = {
            name: req.body.name,
            color: req.body.color,
            postId: req.params.id
        };
        flairQueries.addFlair(newFlair, (err) => {
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}/flairs/new`);
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.id}`);
            }
        })
    },
    edit(req,res,next){

    },
    update(req,res,next){

    },
    delete(req,res,next){

    },
}