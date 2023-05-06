import define1 from "./73b81e912ffcd59e@155.js";

function _1(md){return(
md`# Emergency Response: Weather and Traffic`
)}

function _2(md){return(
md`## Set Credentials for Amazon S3`
)}

function _accessKeyId(secret){return(
secret('accessKeyId', {title: "AWS Access Key ID", submit: "Set", description: "localStorage[\"accessKeyId\"]"})
)}

function _secretAccessKey(secret){return(
secret('secretAccessKey', {title: "AWS Secret Access Key", submit: "Set", description: "localStorage[\"secretAccessKey\"]"})
)}

function _sessionToken(secret){return(
secret('sessionToken', {title: "AWS Session Token", submit: "Set", description: "localStorage[\"sessionToken\"]"})
)}

function _6(AWS,localStorage){return(
AWS.config.credentials = new AWS.Credentials(localStorage["accessKeyId"], localStorage["secretAccessKey"], localStorage['sessionToken'])
)}

function _auth_AWS(AWS)
{
  AWS.config.credentials;
  AWS.config.region;
  return AWS;
}


function _8(md){return(
md`## Visualization`
)}

function _weather(Inputs){return(
Inputs.select(['Humidity', 'Rain', 'Snow', 'Temperature', 'Wind'], {label: "Weather condition"})
)}

function _10(selector,htl){return(
htl.html`<html>
 <head>
 </head>
 <body>
    <div class='title' style="display: flex; height: 35px">
      <div style="width: 50%; text-align: center">
          Number of incidents under different levels of weather conditions
      </div>
      <div style="width: 50%; text-align: center">
          Number of incidents per 1000 occurrences of specific weather conditions
      </div>
    </div>
    <div class="container" style="display: flex; height: 300px;">
        <div style="width: 50%; height: 50%;">
            ${selector[0]}
        </div>
        <div style="width: 50%; height: 50%">
            ${selector[1]}
        </div>
    </div>
    <div style="display: flex; text-align: center; justify-content:center; margin-top:20px">
      Response time under different levels of weather conditions
    </div>
   <div style="display: flex; height: 330px; justify-content:center;">
       ${selector[2]}
   </div>
 </body>
</html>`
)}

function _11(md){return(
md`---`
)}

function _traffic(Inputs){return(
Inputs.select(['Average Speed', 'Current Speed during Incident', 'Congestion'], {label: "Traffic condition"})
)}

function _13(selector_t,htl){return(
htl.html`<html>
 <head>
 </head>
 <body>
    <div class='title' style="display: flex; height: 35px">
      <div style="width: 50%; text-align: center">
          Number of incidents under different levels of traffic conditions
      </div>
      <div style="width: 50%; text-align: center">
          Number of incidents per 100000 records of specific traffic conditions
      </div>
    </div>
    <div class="container" style="display: flex; height: 300px;">
        <div style="width: 50%; height: 50%;">
            ${selector_t[0]}
        </div>
        <div style="width: 50%; height: 50%">
            ${selector_t[1]}
        </div>
    </div>
    <div style="display: flex; text-align: center; justify-content:center; margin-top:20px">
      Response time under different levels of traffic conditions
    </div>
   <div style="display: flex; height: 330px; justify-content:center;">
       ${selector_t[2]}
   </div>
 </body>
</html>`
)}

function _14(md){return(
md`### Data preparation`
)}

function _selector(weather,plt_h,plt_h2,plt_h3,plt_t,plt_t2,plt_t3,plt_w,plt_w2,plt_w3,plt_r,plt_r2,plt_r3,plt_s,plt_s2,plt_s3)
{
  switch(weather) {
    case 'Humidity':
      return [plt_h, plt_h2, plt_h3]
    case 'Temperature':
      return [plt_t, plt_t2, plt_t3]
    case 'Wind':
      return [plt_w, plt_w2, plt_w3]
    case 'Rain':
      return [plt_r, plt_r2, plt_r3]
    case 'Snow':
      return [plt_s, plt_s2, plt_s3]
    default:
  }
}


function _selector_t(traffic,plt_as,plt_as2,plt_as3,plt_c,plt_c2,plt_c3,plt_sp,plt_sp2,plt_sp3)
{
  switch(traffic) {
    case 'Average Speed':
      return [plt_as, plt_as2, plt_as3]
    case 'Congestion':
      return [plt_c, plt_c2, plt_c3]    
    default:
      return [plt_sp, plt_sp2, plt_sp3]
  }
}


function _17(md){return(
md`#### Weather`
)}

async function _humidity_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/humidity_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data
}


async function _humidity_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/humidity_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


function _humidity_per(humidity_occurs,humidity_incidents)
{
  return humidity_occurs.map((d,i) => {
    if (i === 0) return {hum_group:d.wind_group, num_entries:0}
    return {hum_group:d.wind_group, num_entries:humidity_incidents[i-1].num_entries / d.num_entries * 1000}
  })
}


async function _humidity_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/humidity_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data
}


async function _rain_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/rain_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  data[10].snow_group = '> 9'
  return data
}


async function _rain_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/rain_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  data[10].precip_group = '> 9'
  return data
}


function _rain_per(rain_occurs,rain_incidents){return(
rain_occurs.map((d,i) => ({precip_group:d.precip_group, num_entries:rain_incidents[i].num_entries / d.num_entries * 1000}))
)}

async function _rain_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/rain_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.response_time = Number(d.response_time))
  return data
}


async function _snow_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/snow_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  data[8].snow_group = '> 9'
  return data
}


async function _snow_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/snow_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  data[10].snow_group = '> 9'
  return data
}


function _snow_per(snow_occurs,snow_incidents)
{
  return snow_occurs.map((d,i) => {
    if (i < 7) {
      return {snow_group:d.snow_group, num_entries:snow_incidents[i].num_entries / d.num_entries * 1000}
    } else if (i === 7 || i === 9) {
      return {snow_group:d.snow_group, num_entries:0}
    } else if (i === 8) {
      return {snow_group:d.snow_group, num_entries:snow_incidents[i-1].num_entries / d.num_entries * 1000}
    } else {
      return {snow_group:d.snow_group, num_entries:snow_incidents[i-2].num_entries / d.num_entries * 1000}
    }
  })
}


async function _snow_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/snow_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data
}


async function _temp_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/temp_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data
}


async function _temp_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/temp_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(1)
}


function _temp_per(temp_occurs,temp_incidents){return(
temp_occurs.map((d,i) => ({temperature_group:d.temperature_group, num_entries:temp_incidents[i].num_entries / d.num_entries * 1000}))
)}

async function _temp_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/temp_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data
}


async function _wind_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/wind_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data
}


async function _wind_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/wind_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


function _wind_per(wind_occurs,wind_incidents){return(
wind_occurs.map((d,i) => ({wind_group:d.wind_group, num_entries:wind_incidents[i].num_entries / d.num_entries * 1000}))
)}

async function _wind_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/wind_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data
}


function _38(md){return(
md`#### Traffic`
)}

async function _avg_speed_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/avg_speed_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


async function _avg_speed_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/avg_speed_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


function _avg_speed_per(avg_speed_occurs,avg_speed_incidents){return(
avg_speed_occurs.map((d,i) => ({average_speed_group:d.average_speed_group, num_entries:avg_speed_incidents[i].num_entries / d.num_entries * 100000}))
)}

async function _avg_speed_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/avg_speed_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data.slice(0,-1)
}


async function _speed_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/speed_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


async function _speed_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/speed_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data
}


function _speed_per(speed_occurs,speed_incidents){return(
speed_occurs.map((d,i) => ({speed_group:d.speed_group, num_entries:speed_incidents[i].num_entries / d.num_entries * 100000}))
)}

async function _speed_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/speed_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data.slice(0,-1)
}


async function _cong_incidents(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/cong_bracket.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data.slice(0,-1)
}


async function _cong_occurs(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/cong_occur.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = parseInt(d.num_entries))
  return data
}


function _cong_per(cong_occurs,cong_incidents){return(
cong_occurs.map((d,i) => ({congestion_group:d.congestion_group, num_entries:cong_incidents[i].num_entries / d.num_entries * 100000}))
)}

async function _cong_resp(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incidents_weather_insights/cong_rt.csv',
    Expires: 60*5
  })
  let data = await d3.csv(s3.getSignedUrl('getObject', objectParams))
  data.forEach(d => d.num_entries = Number(d.num_entries))
  return data.slice(0,-1)
}


function _51(md){return(
md`### Individual plots`
)}

function _52(md){return(
md`#### Weather`
)}

function _plt_h(Plot,width,humidity_occurs,humidity_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    domain: humidity_occurs.map(d => d.wind_group),
    label: 'Humidity Level',
  },
  y: {
    grid: true, 
    label: 'Incident Count', 
    domain:[0,6000],
    ticks:10
  },
  marks: [
    Plot.barY(humidity_incidents, {x: "hum_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(humidity_incidents, {x: "hum_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_h2(Plot,width,humidity_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Humidity Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 1000 Occurrence',
    domain: [0,3.2]
  },
  marks: [
    Plot.barY(humidity_per, {x: "hum_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(humidity_per, {x: "hum_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_h3(Plot,width,humidity_occurs,humidity_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Humidity Level',
    domain: humidity_occurs.map(d => d.wind_group)
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,450]
  },
  marks: [
    Plot.barY(humidity_resp, {x: "hum_group", y: "num_entries", fill: "#69b3a2"}),
    Plot.text(humidity_resp, {x: "hum_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_r(Plot,width,rain_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Precipitation Level',
  },
  y: {grid: true, label: 'Incident Count', domain:[0,2200]},
  marks: [
    Plot.barY(rain_incidents, {x: "snow_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(rain_incidents, {x: "snow_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_r2(Plot,width,rain_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Precipitation Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 1000 Occurrence',
    domain: [0,3.5]
  },
  marks: [
    Plot.barY(rain_per, {x: "precip_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(rain_per, {x: "precip_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_r3(Plot,width,rain_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Precipitation Level'
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,470]
  },
  marks: [
    Plot.barY(rain_resp, {x: "snow_group", y: "response_time", fill: '#69b3a2'}),
    Plot.text(rain_resp, {x: "snow_group", y: "response_time", text: (d) => (d.response_time), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_s(Plot,width,snow_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Snow Level',
  },
  y: {grid: true, label: 'Incident Count', domain:[0,30]},
  marks: [
    Plot.barY(snow_incidents, {x: "snow_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(snow_incidents, {x: "snow_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_s2(Plot,width,snow_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Snow Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 1000 Occurrence',
    domain:[0,7],
    ticks:10
  },
  marks: [
    Plot.barY(snow_per, {x: "snow_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(snow_per, {x: "snow_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_s3(Plot,width,snow_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Snow Level'
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,680],
    ticks:10
  },
  marks: [
    Plot.barY(snow_resp, {x: "snow_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(snow_resp, {x: "snow_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_t(Plot,width,temp_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    domain: temp_incidents.map(d => d.temperature_group),
    label: 'Temperature Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count',
    domain: [0,5500],
    ticks:10
  },
  marks: [
    Plot.barY(temp_incidents, {x: "temperature_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(temp_incidents, {x: "temperature_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_t2(Plot,width,temp_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    domain: temp_per.map(d => d.temperature_group),
    label: 'Temperature Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 1000 Occurrence',
    domain: [0,3.5]
  },
  marks: [
    Plot.barY(temp_per, {x: "temperature_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(temp_per, {x: "temperature_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_t3(Plot,width,temp_per,temp_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Temperature Level',
    domain: temp_per.map(d => d.temperature_group),
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,850],
    ticks:10
  },
  marks: [
    Plot.barY(temp_resp, {x: "temperature_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(temp_resp, {x: "temperature_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_w(Plot,width,wind_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    domain: wind_incidents.map(d => d.wind_group),
    label: 'Wind Level'
  },
  y: {grid: true, label: 'Incident Count'},
  marks: [
    Plot.barY(wind_incidents, {x: "wind_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(wind_incidents, {x: "wind_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_w2(Plot,width,wind_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    domain: wind_per.map(d => d.wind_group),
    label: 'Wind Level'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 1000 Occurrence',
    domain: [0,3]
  },
  marks: [
    Plot.barY(wind_per, {x: "wind_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(wind_per, {x: "wind_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_w3(Plot,width,wind_per,wind_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Wind Level',
    domain: wind_per.map(d => d.wind_group),
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,450],
    ticks:10
  },
  marks: [
    Plot.barY(wind_resp, {x: "wind_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(wind_resp, {x: "wind_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _68(md){return(
md`#### Traffic`
)}

function _plt_as(Plot,width,avg_speed_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Average Speed Level (mph)'
  },
  y: {
    grid: true, 
    label: 'Incident Count',
    domain: [0,5000]
  },
  marks: [
    Plot.barY(avg_speed_incidents, {x: "average_speed_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(avg_speed_incidents, {x: "average_speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_as2(Plot,width,avg_speed_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Average Speed Level (mph)'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 100000 Records',
    domain: [0,2]
  },
  marks: [
    Plot.barY(avg_speed_per, {x: "average_speed_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(avg_speed_per, {x: "average_speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_as3(Plot,width,avg_speed_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Average Speed Level (mph)'
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,550],
    ticks:10
  },
  marks: [
    Plot.barY(avg_speed_resp, {x: "average_speed_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(avg_speed_resp, {x: "average_speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_sp(Plot,width,speed_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Speed Level When Incident Happened (mph)'
  },
  y: {
    grid: true, 
    label: 'Incident Count',
    domain: [0,5000]
  },
  marks: [
    Plot.barY(speed_incidents, {x: "speed_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(speed_incidents, {x: "speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_sp2(Plot,width,speed_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Speed Level When Incident Happened (mph)'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 100000 Records',
    domain: [0,2.2]
  },
  marks: [
    Plot.barY(speed_per, {x: "speed_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(speed_per, {x: "speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_sp3(Plot,width,speed_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Speed Level When Incident Happened (mph)'
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,550],
    ticks:10
  },
  marks: [
    Plot.barY(speed_resp, {x: "speed_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(speed_resp, {x: "speed_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_c(Plot,width,cong_incidents){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Congestion Level',
    type: 'band'
  },
  y: {
    grid: true, 
    label: 'Incident Count',
    domain: [0,12000],
    ticks: 10
  },
  marks: [
    Plot.barY(cong_incidents, {x: "congestion_group", y: "num_entries", fill: '#65a7ff'}),
    Plot.text(cong_incidents, {x: "congestion_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_c2(Plot,width,cong_per){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Congestion Level',
    type: 'band'
  },
  y: {
    grid: true, 
    label: 'Incident Count per 100000 Records',
    domain: [0,0.8]
  },
  marks: [
    Plot.barY(cong_per, {x: "congestion_group", y: "num_entries", fill: '#b33a52'}),
    Plot.text(cong_per, {x: "congestion_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _plt_c3(Plot,width,cong_resp){return(
Plot.plot({
  width: width/2,
  height: 300,
  x: {
    grid: true,
    label: 'Congestion Level',
    type: 'band'
  },
  y: {
    grid: true, 
    label: 'Average Response Time (sec)',
    domain: [0,450],
    ticks:10
  },
  marks: [
    Plot.barY(cong_resp, {x: "congestion_group", y: "num_entries", fill: '#69b3a2'}),
    Plot.text(cong_resp, {x: "congestion_group", y: "num_entries", text: (d) => (d.num_entries), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
)}

function _78(md){return(
md`### Imports and requiring`
)}

function _AWS(require){return(
require('aws-sdk@2.794.0/dist/aws-sdk-react-native.js')
)}

function _s3(auth_AWS){return(
new auth_AWS.S3({apiVersion: '2006-03-01'})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof accessKeyId")).define("viewof accessKeyId", ["secret"], _accessKeyId);
  main.variable(observer("accessKeyId")).define("accessKeyId", ["Generators", "viewof accessKeyId"], (G, _) => G.input(_));
  main.variable(observer("viewof secretAccessKey")).define("viewof secretAccessKey", ["secret"], _secretAccessKey);
  main.variable(observer("secretAccessKey")).define("secretAccessKey", ["Generators", "viewof secretAccessKey"], (G, _) => G.input(_));
  main.variable(observer("viewof sessionToken")).define("viewof sessionToken", ["secret"], _sessionToken);
  main.variable(observer("sessionToken")).define("sessionToken", ["Generators", "viewof sessionToken"], (G, _) => G.input(_));
  main.variable(observer()).define(["AWS","localStorage"], _6);
  main.variable(observer("auth_AWS")).define("auth_AWS", ["AWS"], _auth_AWS);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof weather")).define("viewof weather", ["Inputs"], _weather);
  main.variable(observer("weather")).define("weather", ["Generators", "viewof weather"], (G, _) => G.input(_));
  main.variable(observer()).define(["selector","htl"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof traffic")).define("viewof traffic", ["Inputs"], _traffic);
  main.variable(observer("traffic")).define("traffic", ["Generators", "viewof traffic"], (G, _) => G.input(_));
  main.variable(observer()).define(["selector_t","htl"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("selector")).define("selector", ["weather","plt_h","plt_h2","plt_h3","plt_t","plt_t2","plt_t3","plt_w","plt_w2","plt_w3","plt_r","plt_r2","plt_r3","plt_s","plt_s2","plt_s3"], _selector);
  main.variable(observer("selector_t")).define("selector_t", ["traffic","plt_as","plt_as2","plt_as3","plt_c","plt_c2","plt_c3","plt_sp","plt_sp2","plt_sp3"], _selector_t);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("humidity_incidents")).define("humidity_incidents", ["d3","s3"], _humidity_incidents);
  main.variable(observer("humidity_occurs")).define("humidity_occurs", ["d3","s3"], _humidity_occurs);
  main.variable(observer("humidity_per")).define("humidity_per", ["humidity_occurs","humidity_incidents"], _humidity_per);
  main.variable(observer("humidity_resp")).define("humidity_resp", ["d3","s3"], _humidity_resp);
  main.variable(observer("rain_incidents")).define("rain_incidents", ["d3","s3"], _rain_incidents);
  main.variable(observer("rain_occurs")).define("rain_occurs", ["d3","s3"], _rain_occurs);
  main.variable(observer("rain_per")).define("rain_per", ["rain_occurs","rain_incidents"], _rain_per);
  main.variable(observer("rain_resp")).define("rain_resp", ["d3","s3"], _rain_resp);
  main.variable(observer("snow_incidents")).define("snow_incidents", ["d3","s3"], _snow_incidents);
  main.variable(observer("snow_occurs")).define("snow_occurs", ["d3","s3"], _snow_occurs);
  main.variable(observer("snow_per")).define("snow_per", ["snow_occurs","snow_incidents"], _snow_per);
  main.variable(observer("snow_resp")).define("snow_resp", ["d3","s3"], _snow_resp);
  main.variable(observer("temp_incidents")).define("temp_incidents", ["d3","s3"], _temp_incidents);
  main.variable(observer("temp_occurs")).define("temp_occurs", ["d3","s3"], _temp_occurs);
  main.variable(observer("temp_per")).define("temp_per", ["temp_occurs","temp_incidents"], _temp_per);
  main.variable(observer("temp_resp")).define("temp_resp", ["d3","s3"], _temp_resp);
  main.variable(observer("wind_incidents")).define("wind_incidents", ["d3","s3"], _wind_incidents);
  main.variable(observer("wind_occurs")).define("wind_occurs", ["d3","s3"], _wind_occurs);
  main.variable(observer("wind_per")).define("wind_per", ["wind_occurs","wind_incidents"], _wind_per);
  main.variable(observer("wind_resp")).define("wind_resp", ["d3","s3"], _wind_resp);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("avg_speed_incidents")).define("avg_speed_incidents", ["d3","s3"], _avg_speed_incidents);
  main.variable(observer("avg_speed_occurs")).define("avg_speed_occurs", ["d3","s3"], _avg_speed_occurs);
  main.variable(observer("avg_speed_per")).define("avg_speed_per", ["avg_speed_occurs","avg_speed_incidents"], _avg_speed_per);
  main.variable(observer("avg_speed_resp")).define("avg_speed_resp", ["d3","s3"], _avg_speed_resp);
  main.variable(observer("speed_incidents")).define("speed_incidents", ["d3","s3"], _speed_incidents);
  main.variable(observer("speed_occurs")).define("speed_occurs", ["d3","s3"], _speed_occurs);
  main.variable(observer("speed_per")).define("speed_per", ["speed_occurs","speed_incidents"], _speed_per);
  main.variable(observer("speed_resp")).define("speed_resp", ["d3","s3"], _speed_resp);
  main.variable(observer("cong_incidents")).define("cong_incidents", ["d3","s3"], _cong_incidents);
  main.variable(observer("cong_occurs")).define("cong_occurs", ["d3","s3"], _cong_occurs);
  main.variable(observer("cong_per")).define("cong_per", ["cong_occurs","cong_incidents"], _cong_per);
  main.variable(observer("cong_resp")).define("cong_resp", ["d3","s3"], _cong_resp);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("plt_h")).define("plt_h", ["Plot","width","humidity_occurs","humidity_incidents"], _plt_h);
  main.variable(observer("plt_h2")).define("plt_h2", ["Plot","width","humidity_per"], _plt_h2);
  main.variable(observer("plt_h3")).define("plt_h3", ["Plot","width","humidity_occurs","humidity_resp"], _plt_h3);
  main.variable(observer("plt_r")).define("plt_r", ["Plot","width","rain_incidents"], _plt_r);
  main.variable(observer("plt_r2")).define("plt_r2", ["Plot","width","rain_per"], _plt_r2);
  main.variable(observer("plt_r3")).define("plt_r3", ["Plot","width","rain_resp"], _plt_r3);
  main.variable(observer("plt_s")).define("plt_s", ["Plot","width","snow_incidents"], _plt_s);
  main.variable(observer("plt_s2")).define("plt_s2", ["Plot","width","snow_per"], _plt_s2);
  main.variable(observer("plt_s3")).define("plt_s3", ["Plot","width","snow_resp"], _plt_s3);
  main.variable(observer("plt_t")).define("plt_t", ["Plot","width","temp_incidents"], _plt_t);
  main.variable(observer("plt_t2")).define("plt_t2", ["Plot","width","temp_per"], _plt_t2);
  main.variable(observer("plt_t3")).define("plt_t3", ["Plot","width","temp_per","temp_resp"], _plt_t3);
  main.variable(observer("plt_w")).define("plt_w", ["Plot","width","wind_incidents"], _plt_w);
  main.variable(observer("plt_w2")).define("plt_w2", ["Plot","width","wind_per"], _plt_w2);
  main.variable(observer("plt_w3")).define("plt_w3", ["Plot","width","wind_per","wind_resp"], _plt_w3);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer("plt_as")).define("plt_as", ["Plot","width","avg_speed_incidents"], _plt_as);
  main.variable(observer("plt_as2")).define("plt_as2", ["Plot","width","avg_speed_per"], _plt_as2);
  main.variable(observer("plt_as3")).define("plt_as3", ["Plot","width","avg_speed_resp"], _plt_as3);
  main.variable(observer("plt_sp")).define("plt_sp", ["Plot","width","speed_incidents"], _plt_sp);
  main.variable(observer("plt_sp2")).define("plt_sp2", ["Plot","width","speed_per"], _plt_sp2);
  main.variable(observer("plt_sp3")).define("plt_sp3", ["Plot","width","speed_resp"], _plt_sp3);
  main.variable(observer("plt_c")).define("plt_c", ["Plot","width","cong_incidents"], _plt_c);
  main.variable(observer("plt_c2")).define("plt_c2", ["Plot","width","cong_per"], _plt_c2);
  main.variable(observer("plt_c3")).define("plt_c3", ["Plot","width","cong_resp"], _plt_c3);
  main.variable(observer()).define(["md"], _78);
  const child1 = runtime.module(define1);
  main.import("secret", child1);
  main.variable(observer("AWS")).define("AWS", ["require"], _AWS);
  main.variable(observer("s3")).define("s3", ["auth_AWS"], _s3);
  return main;
}
