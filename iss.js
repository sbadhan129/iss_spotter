const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};
const fetchCoordsByIP = function(ip,callback){
const url = 'http://ipwho.is/165.225.37.95';

request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

 
  try{
    const data = JSON.parse(body);
   if(data.success ===false){
    const msg ="Error in fetching. ${data.message}";
    callback(Error(msg), null);
    return;
   }
   
    const coords ={
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(null, coords);
  } catch(parseError){

    callback(parseError, null);
  }
});
};

const fetchISSFlyOverTimes =function(coords, callback){
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};






const nextISSTimesForMyLocation = function(callback) {
fetchMyIP((error,ip)=> {
if (error) {
  callback(error, null);
  return;
}
fetchCoordsByIP(ip, (error, coords) => {
  if (error) {
    callback(error, null);
    return;
  }

  fetchISSFlyOverTimes(coords, (error, passTimes) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, passTimes);

  });  
});
});
};


module.exports = { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation };