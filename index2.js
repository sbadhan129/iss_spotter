/*const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');

fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(body => console.log(body));
 /*/

 const { nextISSTimesForMyLocation } = require('./iss_promised');


 nextISSTimesForMyLocation()
 .then((passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
 })

 .catch((error) => {
  console.log("It didn't work: ", error.message);
});