const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation  } = require('./iss');
const coords = { latitude: '49.27670', longitude: '-123.13000' }
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

let ipAddress = '165.225.37.95';

fetchCoordsByIP(ipAddress, (error, data)=>{
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }


  fetchISSFlyOverTimes(coords, (error, pastime) =>{

    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  console.log('It worked! Returned data:' , pastime);

});
});

 
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});