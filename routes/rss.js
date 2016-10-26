var express = require('express');
var router = express.Router();
var rssParser = require('rss-parser');

/* GET users listing. */

router.get('/feed/:feedId/hub/:hubId/', function(req, res, next) {
    // console.log(req.query);

    //https://www.sitepoint.com/html-css/feed/


    var feeds = {
            habr: 'https://habrahabr.ru/rss/hub/{{hubId}}/',
            smash: 'https://www.smashingmagazine.com/tag/{{hubId}}/feed/'
        },
        reqParams = req.params,
        hubId = reqParams.hubId,
        feedId = reqParams.feedId;

    var rssFeedUrl = feeds[feedId].replace('{{hubId}}', hubId);

    getRss(rssFeedUrl, res);
});

router.get('/url/', function(req, res, next) {
    var feedUrl = decodeURIComponent(req.query.feedUrl);

    getRss(feedUrl, res);
});


function getRss(rssFeedUrl, res) {
    rssParser.parseURL(rssFeedUrl, function(err, parsed) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'feed problems' });
        }
        res.json(parsed.feed);
    });
}

module.exports = router;
