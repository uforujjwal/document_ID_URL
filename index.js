var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


var id_url_object = {};

function add_data(id, url) {
	id_url_object[id] = url;
}

function get_data(id) {
	return id_url_object[id];
}

app.get('/',function(request, response) {
	response.sendFile(index.html)
})

app.post('/seturl',function(request, response) {
	var request_data = request.body;
	add_data(request_data.id, request_data.url);
	response.redirect('/');
})

app.get('/list', function(request, response) {
	response.send(id_url_object);
})

app.get('/document/:id', function(request, response) {
	var response_to_send = null;
	if(id_url_object[request.params.id] != undefined)
		response_to_send = {"_links": {
      						"autovue": { 
       							"href": get_data(request.params.id)
       						}
       					}
       				}
      else
      	response_to_send = "Id not present";
	response.send(response_to_send);
});

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port
    console.log('Server listening at %s', port)
})