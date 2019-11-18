# node-red-contrib-proj4
A [Node-Red](https://nodered.org/) node for performing conversions between different geographic [coordinate reference systems](https://en.wikipedia.org/wiki/Spatial_reference_system) based on the [Proj4js JavaScript](http://proj4js.org/) library.

## Purpose
This node is primarily intended from converting between coordinates provided in global coordinate reference systems such as [World Geodetic System (WGS84)](https://en.wikipedia.org/wiki/World_Geodetic_System) which is used by GPS, or [WGS84 Psuedo-Mercator](https://en.wikipedia.org/wiki/Web_Mercator_projection) which is commonly used by web mapping platforms, and the local coordinate systems maintained by national mapping agencies to ensure optimal accuracy for applications in civil enginnering and contruction.

## Usage
The user specifies a first coordinate reference system to 'Convert from' and specifies a second to 'Convert to' from associated dropdown menus. When the node receives coordinate pairs in one of the specified formats (below), it will transform the values from the first coordinate system to the second, and return the results as an array of the form `[x,y]`.

As with proj4.js library, coordinates can be provided as an object of the form `{x:x,y:y}` or an array of the form `[x,y]`. Additionally the node will parse the message payload for coordinate pairs identified by the following keywords:
- x,y: `msg.payload.x && msg.payload.y`
- lat,lon: `msg.payload.lon && msg.payload.lat`
- latitude,longitude: `msg.payload.longitude && msg.payload.latitude`
- eastings,northings: `msg.payload.eastings && msg.payload.northings`

## Supported Coordinate Reference Systems
Currently the Proj4 node supports the following coordinate systems:
- OSGB (EPSG:27700)
- ITM (EPSG:2157)
- Irish Grid (EPSG:29903)
- NAD83 (EPSG:4269)
- WGS84 / GPS (EPSG:4326)
- WGS84 / Psuedo-Mercator (EPSG:3857)

Further details of different coordinate reference systems can be found on [epsg.io](https://epsg.io/).

## Further Development 
If you are interested in suggesting enhancements please raise an issue for review via [GitHub](https://github.com/virtualarchitectures/node-red-contrib-proj4).
