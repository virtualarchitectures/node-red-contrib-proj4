module.exports = function(RED) {

  "use strict";
	const proj4 = require("proj4");

  function Proj4Node(n) {
    RED.nodes.createNode(this,n);
    var node = this;

    node.on('input', function(msg) {

      proj4.defs([
        [
        'EPSG:4326', 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'],
  		  [
        'EPSG:27700', 'PROJCS["OSGB 1936 / British National Grid",GEOGCS["OSGB 1936",DATUM["OSGB_1936",SPHEROID["Airy 1830",6377563.396,299.3249646,AUTHORITY["EPSG","7001"]],AUTHORITY["EPSG","6277"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4277"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",49],PARAMETER["central_meridian",-2],PARAMETER["scale_factor",0.9996012717],PARAMETER["false_easting",400000],PARAMETER["false_northing",-100000],AUTHORITY["EPSG","27700"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]'],
			  [
        'EPSG:2157', 'PROJCS["IRENET95 / Irish Transverse Mercator",GEOGCS["IRENET95",DATUM["IRENET95",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6173"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4173"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",53.5],PARAMETER["central_meridian",-8],PARAMETER["scale_factor",0.99982],PARAMETER["false_easting",600000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","2157"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]'],
			  [
        'EPSG:29903', 'PROJCS["TM75 / Irish Grid",GEOGCS["TM75",DATUM["Geodetic_Datum_of_1965",SPHEROID["Airy Modified 1849",6377340.189,299.3249646,AUTHORITY["EPSG","7002"]],AUTHORITY["EPSG","6300"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4300"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",53.5],PARAMETER["central_meridian",-8],PARAMETER["scale_factor",1.000035],PARAMETER["false_easting",200000],PARAMETER["false_northing",250000],AUTHORITY["EPSG","29903"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]'
        ]
      ]);

      node.firstProjection = n.firstProjection;
      node.secondProjection = n.secondProjection;
        
      var output_coords;

      console.log('Converting from ' + node.firstProjection + ' to ' + node.secondProjection);
      //console.log(proj4.defs[node.firstProjection]);
      //console.log(proj4.defs[node.secondProjection]);

      if (msg.payload.x && msg.payload.y) {
        node.x = msg.payload.x;
        node.y = msg.payload.y;
        console.log(node.x + ' / ' + node.y);
        output_coords = proj4(proj4.defs[node.firstProjection],proj4.defs[node.secondProjection],[node.x,node.y]);
        console.log(output_coords);
        msg.payload.conversion = output_coords;
      } else if (msg.payload.lon && msg.payload.lat) {
        node.x = msg.payload.lon;
        node.y = msg.payload.lat;
        console.log(node.x + ' / ' + node.y);
        output_coords = proj4(proj4.defs[node.firstProjection],proj4.defs[node.secondProjection],[node.x,node.y]);
        console.log(output_coords);
        msg.payload.conversion = output_coords;
      } else if (msg.payload.longitude && msg.payload.latitude) {
        node.x = msg.payload.longitude;
        node.y = msg.payload.latitude;
        console.log(node.x + ' / ' + node.y);
        output_coords = proj4(proj4.defs[node.firstProjection],proj4.defs[node.secondProjection],[node.x,node.y]);
        console.log(output_coords);
        msg.payload.conversion = output_coords;
      } else if (msg.payload.eastings && msg.payload.northings) {
        node.x = msg.payload.eastings;
        node.y = msg.payload.northings;
        console.log(node.x + ' / ' + node.y);
        output_coords = proj4(proj4.defs[node.firstProjection],proj4.defs[node.secondProjection],[node.x,node.y]);
        console.log(output_coords);
        msg.payload.conversion = output_coords;
      }
            	
      node.send(msg);
    });
  }
  RED.nodes.registerType("proj4",Proj4Node);
}