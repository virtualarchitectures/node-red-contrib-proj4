module.exports = function(RED) {

	"use strict";
	const proj4 = require("proj4");

    function Proj4Node(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        
        node.on('input', function(msg) {

        	msg.payload.latitude = msg.payload.lat;
        	msg.payload.longitude = msg.payload.lon;
            
            node.send(msg);
        });
    }
    RED.nodes.registerType("proj4",Proj4Node);
}