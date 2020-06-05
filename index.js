// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes} = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const printTime = function(flyovertime) {
  for (const time of flyovertime) {
    const dateTime =  new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, flyovertime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printTime(flyovertime);
});


// fetchMyIP ((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error)
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP ('99.230.90.60', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error)
//     return;
//   }

//   console.log('It worked! Returned Coords:', coords);
// });

// fetchISSFlyOverTimes ({ latitude: '44.05800', longitude: '-79.45260' }, (error, flyovertime) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned flyover time:', flyovertime);
// });
