const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');
const _ = require('underscore');

let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "resources needed",
  "content": [
    /*
    {
      "name": "Apple"
      "totalAmound": 150,
      "regions": [
        {
          "Amount Needed": 25,
          "City": "Whitehorse, YT",
          "Region": "Canada West"
        },
        {
          "Amount Needed": 25,
          "City": "Yorkton, SK",
          "Region": "Canada Center"
        },
        {
          "Amount Needed": 50,
          "City": "Olympia, WA",
          "Region": "USA West"
        },
        {
          "Amount Needed": 50,
          "City": "Topeka, KS",
          "Region": "USA South"
        }
      ]
    }
    */
  ]
};

let tempContent = [];
let tempResource;
csv()
.fromFile('./csv/rails - resource.csv')
.on('json', (row) => {

  function pushRegion(region) {
    let amount = region['Amount Needed'].replace(',', '');
    tempResource.regions.push({
      'amount': parseInt(amount),
      'city': region['City'],
      'region': region['Region']
    })
  }

  if (!tempResource) {
    tempResource = {
      'name': row['Name'],
      'totalAmound': 0,
      'regions': []
    };
    pushRegion(row);

  } else {

    if (row['City'] !== 'Total Amound') {
      pushRegion(row);
    } else {
      let amount = row['Amount Needed'].replace(',', '');
      console.log(amount);
      tempResource.totalAmound = parseInt(amount);
      tempContent.push(tempResource);
      tempResource = undefined;
    }
  }


})
.on('done', () => {

  result.content = tempContent;

  jsonfile.writeFile('./data/resources.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
