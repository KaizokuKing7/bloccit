const express = require("express");
const router = express.Router();
const flairController = require("../controllers/flairController")


//router.get("/topics/:topicId/posts/:postId/flairs/id", flairController.show);
router.get("/topics/:topicId/posts/:id/flair/new", flairController.new);
router.post("/topics/:topicId/posts/:id/flairs/create", flairController.create);
//router.post("/posts/:postId/flairs/:id/destroy", flairController.destroy);
//router.get("/posts/:postId/flairs/:id/edit", flairController.edit);
//router.post("/posts/:postId/flairs/:id/update", flairController.update);

 module.exports = router; 