module.exports = function(RED) {

	"use strict";
	const proj4 = require("proj4");

    function Proj4Node(n) {
        RED.nodes.createNode(this,n);
        var node = this;

		//OGC WKT Projection strings via spatialreference.org
		//WGS84 (EPSG:4326)
		var WGS84 = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';
		//British National Grid (EPSG:27700) 
		var OSGB = 'PROJCS["OSGB 1936 / British National Grid",GEOGCS["OSGB 1936",DATUM["OSGB_1936",SPHEROID["Airy 1830",6377563.396,299.3249646,AUTHORITY["EPSG","7001"]],AUTHORITY["EPSG","6277"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4277"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",49],PARAMETER["central_meridian",-2],PARAMETER["scale_factor",0.9996012717],PARAMETER["false_easting",400000],PARAMETER["false_northing",-100000],AUTHORITY["EPSG","27700"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';
		//Irish Transverse Mercator (EPSG:2157)
		var IRENET = 'PROJCS["IRENET95 / Irish Transverse Mercator",GEOGCS["IRENET95",DATUM["IRENET95",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6173"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4173"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",53.5],PARAMETER["central_meridian",-8],PARAMETER["scale_factor",0.99982],PARAMETER["false_easting",600000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","2157"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';
		//Irish Grid (EPSG:29903)
		var TM75 = 'PROJCS["TM75 / Irish Grid",GEOGCS["TM75",DATUM["Geodetic_Datum_of_1965",SPHEROID["Airy Modified 1849",6377340.189,299.3249646,AUTHORITY["EPSG","7002"]],AUTHORITY["EPSG","6300"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4300"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",53.5],PARAMETER["central_meridian",-8],PARAMETER["scale_factor",1.000035],PARAMETER["false_easting",200000],PARAMETER["false_northing",250000],AUTHORITY["EPSG","29903"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';

        node.on('input', function(msg) {

        	node.firstProjection = n.firstProjection;
			node.secondProjection = n.secondProjection;

        	console.log('Converting from ' + node.firstProjection + ' to ' + node.secondProjection);

			node.x = msg.payload.lon;
			node.y = msg.payload.lat;
        	
        	//var output_coords = proj4(node.firstProjection,node.secondProjection,[node.x,node.y]);
			var output_coords = proj4(WGS84, OSGB, [node.x, node.y]);

        	msg.payload.latitude = msg.payload.lat;
        	msg.payload.longitude = msg.payload.lon;

        	msg.payload.conversion = output_coords;
            	
            node.send(msg);
        });
    }
    RED.nodes.registerType("proj4",Proj4Node);
}