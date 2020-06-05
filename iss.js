/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, flyovertime) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyovertime);
      });
    });
  });
  
};

const fetchMyIP = (callback) => {

  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      const ip = JSON.parse(body).ip;

      callback(null, ip);
    }
   
  });
};


// Fetch Geo Coordinates by IP

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const latitudeValue = JSON.parse(body).data.latitude;
    const longitudeValue = JSON.parse(body).data.longitude;
    const geoData = {};
    geoData.latitude = latitudeValue;
    geoData.longitude = longitudeValue;
    callback(null, geoData);

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const responseKey = JSON.parse(body).response;
    callback(null, responseKey);
  });
  
};



// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = {nextISSTimesForMyLocation};
