const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');

let stations = [];
let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "stations",
  "content" : [
    /*
    {
      "city": "Albany",
      "state": "NY",
      "passengers": 10,
      "upgradeCosts": "1,000/5,000/10,000",
      "resourceDemanded": "Lemon",
      "amountDemanded": 50,
      "connectsTo": "Kingston, Montpelier, Harrisburg",
      "region": "USA East",
      "currentAmountDemanded": 0,
      "currentResourceDemanded": false,
      "currentLevel": 0,
      "latitude": 42.67001691,
      "longitude": 73.81994918
    },
    */
  ]
};

csv()
.fromFile('./csv/rails - stations.csv')
.on('json', (row) => {

  let tempStation = {
    city: row['City'],
    state: row['State'],
    passengers: parseInt(row['Passengers']),
    upgradeCosts: row['Upgrade Costs'],
    resourceDemanded: row['Resource Demanded'],
    amountDemanded: parseInt(row['Amount Demanded']),
    connectsTo: row['Connects To'],
    region: row['Region'],
    // 추가
    currentAmountDemanded: 0,
    currentResourceDemanded: false,
    currentLevel: 0,
    //
    latitude: parseFloat(row['latitude']),
    longitude: parseFloat(row['longitude'])
  };

  stations.push(tempStation);
})
.on('done', () => {

  result.content = stations;

  jsonfile.writeFile('./data/stations.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
