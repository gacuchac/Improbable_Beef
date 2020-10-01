// const url = "https://api.spacexdata.com/v2/launchpads";

// d3.json(url).then(receivedData => console.log(receivedData));

// d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

// d3.json(url).then(spaceXResults => console.log(spaceXResults[0].location.latitude));

// console.log("using map")
// d3.json(url).then(result => result.map( launch => console.log(launch.location.latitude)))

// d3.json("static/json/samples.json").then(data => console.log(data));
// d3.json("static/json/samples.json").then(data => data.metadata.map(sample => console.log(sample.wfreq)));

// d3.json("static/json/samples.json").then(function(data){
//     wfreq = data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
//     filteredWfreq = wfreq.filter(element => element !=null);
//     console.log(filteredWfreq);
// });

d3.json("static/json/samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});