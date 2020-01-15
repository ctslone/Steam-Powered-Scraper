var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchmea = new Schema({
    body: String
});

var Comment = mongoose.model("Comment", CommentSchmea);

module.export = Comment;