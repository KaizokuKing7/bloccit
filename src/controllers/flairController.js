const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req,res,next){
        res.render("flairs/new", {postId: req.params.postId, topicId: req.params.topicId})
    },
    create(req,res,next){
        let newFlair = {
            name: req.body.name,
            color: req.body.color,
            postId: req.params.postId
        };
        flairQueries.addFlair(newFlair, (err) => {
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}/flairs/new`);
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`);
            }
        })
    },
    edit(req,res,next){
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if (err || flair == null) {
                res.redirect(404, "/");
            } else {
                flair.getPost()
                .then((post)=> {
                    res.render("flairs/edit", { post, flair})})
                ;
            }
        });
        
    },
    update(req,res,next){
        flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
            if (err || flair == null) {
                res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/edit/flairs/${req.params.id}/edit`);
            } else {
                res.redirect(`/topics/${req.params.topicId}/posts/${req.params.postId}`);
            }
        });
    },
    destroy(req,res,next){
        flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
            if (err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}/edit/flairs/${req.params.id}`)
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.id}`)
            }
        });
    },
}