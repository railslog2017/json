const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');

let stations = [];
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

csv()
.fromFile('./csv/simplemaps-worldcities-basic.csv')
.on('json', (row) => {

  let tempCity = {
    city: row['city'],
    lat: parseFloat(row['lat']),
    lng: parseFloat(row['lng']),
    country: row['country'],
    iso2: row['iso2'],
    iso3: row['iso3'],
    province: row['province']
  };

  stations.push(tempCity);
})
.on('done', () => {

  result.content = stations;

  jsonfile.writeFile('./stations/0_simpleCities.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
