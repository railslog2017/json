const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');

let stations = [];
let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "simple stations",
  "content" : [
    /*
    {
      "city": "Albany",
      "state": "NY",
      // "passengers": 10,
      // "upgradeCosts": "1,000/5,000/10,000",
      // "resourceDemanded": "Lemon",
      // "amountDemanded": 50,
      "connectsTo": "Kingston, Montpelier, Harrisburg",
      "region": "USA East",
      // "currentAmountDemanded": 0,
      // "currentResourceDemanded": false,
      // "currentLevel": 0
    },
    */
  ]
};

csv()
.fromFile('./stations/stations.csv')
.on('json', (row) => {

  let tempStation = {
    city: row['City'],
    state: row['State'],
    connectsTo: row['Connects To'],
    region: row['Region']
  };

  stations.push(tempStation);
})
.on('done', () => {

  result.content = stations;

  jsonfile.writeFile('./data/simpleStations.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
