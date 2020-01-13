// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "steamdb";
var collections = ["steamData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// root route
app.get("/", function (req, res) {
    res.send("welcome to steam scraper")
})

// new free games
app.get("/new", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/").then(function (response) {
        var $ = cheerio.load(response.data);

        var newResults = [];

        $("div#tab_content_NewReleases").each(function (i, element) {
            // var title = $(element).find("div.tab_item_name").text();
            // console.log(element)
            var link = $(element).find("div#NewReleasesRows").children().attr("href")
            // var photo = $(element).find("img.tab_item_cap_img").attr("src");
            // insert into DB
            newResults.push({
                // title: title,
                link: link,
                // photo: photo
            })
        });
        res.json(newResults)
        console.log(newResults)
    })
})

// tpo free games
app.get("/top", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/#p=0&tab=TopSellers").then(function (response) {
        var $ = cheerio.load(response.data);

        var topResults = [];

        $("a.tab_item").each(function (i, element) {
            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            // insert into DB
            topResults.push({
                title: title,
                link: link,
                photo: photo
            })
        });
        res.json(topResults)
        // console.log(results)
    })
})

// current free games
app.get("/current", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/#p=0&tab=ConcurrentUsers").then(function (response) {
        var $ = cheerio.load(response.data);

        var currentResults = [];

        $("a.tab_item").each(function (i, element) {
            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            // insert into DB
            currentResults.push({
                title: title,
                link: link,
                photo: photo
            })
        });
        res.json(currentResults)
        // console.log(results)
    })
})

// upcoming
app.get("/upcoming", function (req, res) {
    axios.get("https://store.steampowered.com/genre/Free%20to%20Play/#p=0&tab=ComingSoon").then(function (response) {
        var $ = cheerio.load(response.data);

        var upcomingResults = [];

        $("a.tab_item").each(function (i, element) {
            var title = $(element).find("div.tab_item_name").text();
            var link = $(element).attr("href");
            var photo = $(element).find("img.tab_item_cap_img").attr("src");
            // insert into DB
            upcomingResults.push({
                title: title,
                link: link,
                photo: photo
            })
        });
        res.json(upcomingResults)
        // console.log(results)
    })
})
// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});