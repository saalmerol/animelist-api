var Watcher  = require('feed-watcher')
var feed     = 'http://feeds.feedburner.com/crunchyroll/rss/anime'
var interval = 10 // seconds

// if not interval is passed, 60s would be set as default interval.
var watcher = new Watcher(feed, interval)

// Check for new entries every n seconds.
watcher.on('new entries', function (entries) {
  entries.forEach(function (entry) {
    console.log(entry.title)
    io.sockets.emit('message', entry);
  })
})

// Start watching the feed.
watcher
  .start()
  .then(function (entries) {
    io.on('connection', function(client) {
        console.log('Client connected...');
        client.on('join', function(data) {
            console.log(data);
        });
    });
  })
  .catch(function(error) {
    console.error(error)
  })
