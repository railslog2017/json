const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const _ = require('underscore');
const pjson = require('../package.json');

const sCities = require('./0_simpleCities.json');
const sStations = require('./1_simpleStations.json');

let cities = [];
let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "city - LatLong",
  "content" : [
    /*
    {
      city,city_ascii,lat,lng,pop,country,iso2,iso3,province
    },
    */
  ]
};

_.each(sStations.content, function(station) {
  let findCities = _.where(sCities.content, { city: station.city_ascii});
  cities =  cities.concat( findCities );
});

result.content = cities;

jsonfile.writeFile('./stations/2_selectedCities.json', result, {spaces: 2}, function(err) {
  console.error(err)
});
