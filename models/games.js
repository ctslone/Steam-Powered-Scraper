// requiring mongoose
var mongoose = require("mongoose");
// 
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    note: {
        type: Array,
    },
    saved: {
        type: Boolean,
        required: true
    }

});

var Game = mongoose.model("Game", GameSchema);

module.exports = Game;



