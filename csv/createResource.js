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
      "resource": "Apple"
      "Total Amound": 150,
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
