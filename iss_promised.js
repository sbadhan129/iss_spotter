
const request = require('request-promise-native');

const fetchMyIP = function() {
 return request('https://api64.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request (`https://ipwho.is/${ip}?format=json`)
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
 };

 const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => JSON.parse(body).response);
    
};



module.exports = { nextISSTimesForMyLocation };



