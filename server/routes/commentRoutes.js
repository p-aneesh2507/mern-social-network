const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {

    createComment,

    getComments,

    deleteComment

}=require("../controllers/commentController");



router.post(
    "/:postId",
    authMiddleware,
    createComment
);



router.get(
    "/:postId",
    getComments
);



router.delete(
    "/:id",
    authMiddleware,
    deleteComment
);



module.exports = router;