var faker = require("faker");
var animeEncylopedia = require("../api/animenewsnetwork.js")

var appRouter = function (app) {
  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to api.anime.miyata.moe!' });
  });

  app.get("/animes/:page", function (req, res) {
    animeEncylopedia.getAllAnime(req.params.page).then((data) => {
      res.status(200).send(data);
    })
  });

  app.get("/anime/:id", function (req, res) {
    animeEncylopedia.getAnime(req.params.id).then((data) => {
      res.status(200).send(data);
    })
  });
}

module.exports = appRouter;
