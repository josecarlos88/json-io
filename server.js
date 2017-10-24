// hooking up all the server cables, letting the server know what dependencies we have and how to use them
var express = require('express'); // requires express
var app = express();
var server = require('http').Server(app);
var jsonfile = require('jsonfile');
const uuidv4 = require('uuid/v4')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true})) // attach bodyParser to 'express' aka 'app'
// end of dependencies

// serves out everything in public folder as static files, not dynamically changing
app.use(express.static('public'));


// start of POST
app.post('/', function(request, response){

  jsonfile.readFile('storage.json', // open the json file
  function(err, fileContents){

      //style the entry
      // request.body.timestamp = Date.now() // generate timestamp
      // request.body.guid = uuidv4(); // global or universal unique identifier

      fileContents.entries.push(request.body) // 'push' enables you to append an item with proper syntax, a new entry.

      jsonfile.writeFile('storage.json', // re-saves the file with the new content
      fileContents, function(err){
        console.error(err);
        console.log('success writing file!') // print the success to terminal
      })
  })

})
// end of POST



// start of GET
// when we run the app, by going to localhost:3000/fetch, it runs this program
// the response will be a random entry from our 'storage.json' file
app.get('/fetch', function(request, response){

  // The Arguments: 1) error just in case 2) the object
  jsonfile.readFile("storage.json", function(err, fileContents){

    console.error(err)
    console.log(fileContents);

    // get array length, use random numbers to access a random item in "entries"
    var totalEntries = fileContents.entries.length
    var randomInt = Math.floor(Math.random()* totalEntries)
    var randomEntry = fileContents.entries[randomInt]

    response.send(randomEntry.postedText) // we could send back the whole file and deal with it on the client side, or parse it out and package it up. low CPU high bandwidth? then send the whole file. high CPU low bandwidth? process server-side and send the result.
})})
// end of GET

// set up the server into action //
server.listen(3000, function(){
  console.log("server is running u better go catch it")
})
