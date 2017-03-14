const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const pjson = require('../package.json');
const _ = require('underscore');

let now = new Date();
let result = {
  "game": "tiny rails",
  "update": now.toISOString().slice(0,10),
  "version": pjson.version,
  "info": "resources",
  "content": [
    /*
    {
      "resource": "Honey"
      "regions": [
        "USA East",
        "USA West",
        "Canada Center"
      ]
    }
    */
  ]
};

csv()
.fromFile('./csv/regions.csv')
.on('json', (row) => {

  let regionName = row['region'];
  let resourcesSold = row['Resources Sold'].split(', ');
  let content = result['content'];

  _.each(resourcesSold, (resource) => {

    let temp = _.find(content, (obj) => {
      return obj.resource == resource;
    });

    if (!temp) {
      temp = {
        resource: resource,
        regions: [regionName]
      };
      content.push(temp)
    } else {
      temp.regions.push(regionName);
    }
  });

  result['content'] = _.sortBy(content, 'resource');
})
.on('done', () => {

  jsonfile.writeFile('./data/resources.json', result, {spaces: 2}, function(err) {
    console.error(err)
  });

});
