const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');

let regions = [];
let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "regions",
  "content" : [
    /*
    {
      "continent": "North America",
      "regionName": "USA East",
      "stations": 21,
      "totalDistance": 11054,
      "resourcesSold": "Honey, Paper, Pizza, Salmon, Steel, Strawberry, Wood, Onion"
    },
    */
  ]
};

csv()
.fromFile('./csv/rails - regions.csv')
.on('json', (row) => {

  let tempRegion = {
    continent: row['continent'],
    name: row['region'],
    stations: parseInt(row['Stations']),
    totalDistance: parseInt(row['total distance']),
    resourcesSold: row['Resources Sold']
  };

  regions.push(tempRegion);
})
.on('done', () => {

  result.content = regions;

  jsonfile.writeFile('./data/regions.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
