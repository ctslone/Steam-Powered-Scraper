// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
var mongoose = require("mongoose")

// Database configuration
var databaseUrl = "steamdb";
var collections = ["steamData"];

// setting up static folder for public html and css
app.use(express.static("public"));

// setting up handlebars main view
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// root route
app.get("/", function (req, res) {
    res.render("index")
})

// new free games
app.get("/scrape", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/").then(function (response) {
        var $ = cheerio.load(response.data);

        var games = [];
        // grabbing all new games
        $("div#NewReleasesRows").children("a.tab_item").each(function (i, element) {

            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            var tags = $(element).find("span.top_tag").text();
            // insert into games array
            games.push({
                title: title,
                link: link,
                photo: photo,
                tags: tags,
                type: "new"
            })
        });

        $("div#TopSellersRows").children("a.tab_item").each(function (i, element) {

            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            var tags = $(element).find("span.top_tag").text();
            // insert into test array
            games.push({
                title: title,
                link: link,
                photo: photo,
                tags: tags,
                type: "top"
            })
        });
        
        $("div#ConcurrentUsersRows").children("a.tab_item").each(function (i, element) {

            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            var tags = $(element).find("span.top_tag").text();
            // insert into test array
            currentResults.push({
                title: title,
                link: link,
                photo: photo,
                tags: tags,
                type: "current"
            })
        });

        $("div#ComingSoonRows").children("a.tab_item").each(function (i, element) {

            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            var tags = $(element).find("span.top_tag").text();
            // insert into test array
            upcomingResults.push({
                title: title,
                link: link,
                photo: photo,
                tags: tags,
                type: "upcoming"
            })
        });

        res.json(games)

    });    
})

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});