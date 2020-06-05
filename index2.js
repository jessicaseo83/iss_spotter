const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimeForMyLocation } = require('./iss_promised');
const printTime = require('./index')

nextISSTimeForMyLocation()
  .then((flyovertime) => {
    printTime(flyovertime);
  })
  .catch((error) => {
    console.log("It didn't work!", error.message);
  })
 



// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))
  