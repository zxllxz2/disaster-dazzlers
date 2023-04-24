import define1 from "./73b81e912ffcd59e@155.js";
import define2 from "./91007ee9d5fd152b@231.js";
import define3 from "./357f1a71f976f173@1092.js";

function _1(md){return(
md`## Access data from Amazon S3`
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

function _AWS(require){return(
require('aws-sdk@2.794.0/dist/aws-sdk-react-native.js')
)}

function _9(AWS,localStorage){return(
AWS.config.credentials = new AWS.Credentials(localStorage["accessKeyId"], localStorage["secretAccessKey"], localStorage['sessionToken'])
)}

function _10(AWS){return(
AWS.config.region = "us-east-1"
)}

function _auth_AWS(AWS)
{
  AWS.config.credentials;
  AWS.config.region;
  return AWS;
}


function _s3(auth_AWS){return(
new auth_AWS.S3({apiVersion: '2006-03-01'})
)}

function _bucketParams(){return(
{
    Bucket : 'wwu-incidents',
    Delimiter : '/', 
    Prefix : ''
  }
)}

function _objectParams(){return(
{
    Bucket : 'wwu-incidents',
    Key : 'incident_census_join'
  }
)}

function _loaded_S3_object(s3,objectParams){return(
s3.getObject(objectParams).promise()
)}

function _available_objects(s3,bucketParams){return(
s3.listObjects(bucketParams).promise().then((object) => object.Contents)
)}

function _17(md){return(
md`# Visualization`
)}

function _18(md){return(
md`## Prepare Data`
)}

async function _davidson(FileAttachment)
{
  let data = await FileAttachment("google://incident_census_join_draw").json()
  data.features = data.features.filter(d => d.properties.Incident_ID)
  data.features.forEach(d => d.properties.time_local = new Date(d.properties.time_local))
  return data
}


function _davidson_clean(d3,davidson,all_days){return(
d3.groups(davidson.features, d => d.properties.GEOID)
    .map(d => [d[1][0], d[1].length, d[1].length/all_days, d3.mean(d[1], x => x.properties.response_time_sec)])
    .map(d => {
      d[0].properties.incident_cnt = d[1]
      d[0].properties.incident_frq = d[2]
      d[0].properties.incident_resp = d[3]
      return d[0]
    })
)}

function _date_separate(){return(
new Date('2018-01-01')
)}

function _all_days(time_domain){return(
(time_domain[1]-time_domain[0])/86400000 + 1
)}

function _db(DuckDBClient,FileAttachment){return(
DuckDBClient.of({ 
  incident: FileAttachment("nfd_incidents_xd_seg.parquet")
})
)}

function _incident_data(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select CAST(strftime('%Y-%m-%d', time_local) AS DATETIME) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt FROM incident group by dates order by dates`
)}

function _incident_month(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select CAST(CONCAT(strftime('%Y-%m', time_local),'-01') AS DATETIME) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt 
  FROM incident group by dates order by dates`
)}

function _incident_month_only(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select MONTH(time_local) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt FROM incident group by dates order by dates`
)}

function _incident_week_only(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select day_of_week as dates, cast(count(*) as INT) as incident_cnt from incident group by dates order by dates`
)}

function _resp_month(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select MONTH(time_local) as dates, AVG(response_time_sec) as incident_resp from incident group by dates order by dates`
)}

function _resp_week(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select day_of_week as dates, AVG(response_time_sec) as incident_resp from incident group by dates order by dates`
)}

function _first_incident(incident_data,date_separate){return(
incident_data.filter(d => d.dates < date_separate)
)}

function _late_incident(incident_data,date_separate){return(
incident_data.filter(d => d.dates >= date_separate)
)}

function _first_incident_month(incident_month,date_separate)
{
  // incident_month.forEach(d => d.dates = new Date(d.dates))
  return incident_month.filter(d => d.dates < date_separate)
}


function _second_incident_month(incident_month,date_separate){return(
incident_month.filter(d => d.dates >= date_separate)
)}

function _34(md){return(
md`## Parameters`
)}

function _margins(){return(
{left:40, right:40, top:30, bottom:40, plot_space_horizontal:60, plot_space_vertical:40}
)}

function _height(){return(
800
)}

function _map_height(){return(
450
)}

function _temporal_height(){return(
240
)}

function _bar_width(){return(
520
)}

function _bar_height(){return(
300
)}

function _41(md){return(
md`## Scales and domains`
)}

function _incident_domain(d3,davidson_clean){return(
d3.extent(davidson_clean, d => d.properties.incident_cnt)
)}

function _incident_frq_domain(){return(
[0,2.5]
)}

function _incident_resp_domain(d3,davidson_clean){return(
d3.extent(davidson_clean, d => d.properties.incident_resp)
)}

function _choose_data_domain(map_entry,incident_domain,incident_frq_domain,incident_resp_domain)
{
  if (map_entry === 'Incident count') {
    return incident_domain
  } else if (map_entry === 'Incident frequency') {
    return incident_frq_domain
  } else {
    return incident_resp_domain
  }
}


function _incident_time_domain(d3,incident_data){return(
d3.extent(incident_data, d => d.incident_cnt)
)}

function _incident_month_domain(d3,incident_month){return(
d3.extent(incident_month, d => d.incident_cnt)
)}

function _time_domain(d3,incident_data){return(
d3.extent(incident_data, d => d.dates)
)}

function _month_domain(d3,incident_month){return(
d3.extent(incident_month, d => d.dates)
)}

function _linear_scale(d3,choose_data_domain){return(
d3.scaleSequential().domain(choose_data_domain).range([102, 0])
)}

function _color_scale(d3,linear_scale){return(
input => d3.hcl(289, 34, linear_scale(input))
)}

function _incident_scale(d3,incident_time_domain,temporal_height){return(
d3.scaleLinear().domain(incident_time_domain).range([temporal_height, 0])
)}

function _incident_month_scale(d3,incident_month_domain,temporal_height){return(
d3.scaleLinear().domain(incident_month_domain).range([temporal_height, 0])
)}

function _time_scale(d3,time_domain,width,margins){return(
d3.scaleTime().domain(time_domain).range([0, width-margins.right])
)}

function _month_scale(d3,month_domain,width,margins){return(
d3.scaleTime().domain(month_domain).range([0, width-margins.right])
)}

function _week_scale(d3,week,bar_height){return(
d3.scaleBand().domain(week).range([bar_height, 0]).padding(0.2)
)}

function _57(d3,incident_month_only){return(
d3.extent(incident_month_only, d => d.incident_cnt)
)}

function _week_incident_scale(d3,bar_width,margins){return(
d3.scaleLinear().domain([0, 5100]).range([0,bar_width-margins.right])
)}

function _month12_scale(d3,month,bar_height){return(
d3.scaleBand().domain(month.slice(1)).range([bar_height, 0]).padding(0.2)
)}

function _month12_incident_scale(d3,bar_width){return(
d3.scaleLinear().domain([0, 3100]).range([0,bar_width])
)}

function _week_resp_scale(d3,bar_width,margins){return(
d3.scaleLinear().domain([280, 410]).range([0,bar_width-margins.right])
)}

function _month_resp_scale(d3,bar_width){return(
d3.scaleLinear().domain([260, 410]).range([0,bar_width])
)}

function _region_resp_scale(d3,bar_width){return(
d3.scaleLinear().domain([0, 1200]).range([0,bar_width/3*2])
)}

function _show_bar_width(d3,format_text){return(
(g,choice) => {
  if (choice !== 'incident_resp') choice = 'incident_cnt'
  g.selectAll('rect').on('mouseover', function(e,data_bind) {
    g.append('text')
      .classed('note', true)
      .attr('x', d3.select(this).attr('width'))
      .attr('y', d3.select(this).attr('y'))
      .attr('transform', `translate(5,${d3.select(this).attr('height')/2})`)
      .call(format_text, Math.round(data_bind[choice]), '13px')
  })

  // when hovering out of a state
  g.selectAll('rect').on('mouseout', function(e,data_bind) {
    g.selectAll('.note').remove()
  })
}
)}

function _draw_week(resp_week,week_scale,week,week_resp_scale,bar_height,d3,incident_week_only,week_incident_scale,bar_width,margins,format_text,map_entry){return(
(week_g, choice) => {
  if (choice === 'incident_resp') {
    week_g.selectAll()
      .data(resp_week)
      .join("rect")
        .attr("x", 0)
        .attr("y", d => week_scale(week[d.dates]))
        .attr("width", d => week_resp_scale(d[choice]))
        .attr("height", week_scale.bandwidth() )
        .attr("fill", "#69b3a2")

    week_g.append('g')
      .classed('xaxis', true)
      .attr('transform', `translate(0, ${bar_height})`)
      .call(d3.axisBottom(week_resp_scale))
  } else {
    week_g.selectAll()
      .data(incident_week_only)
      .join("rect")
        .attr("x", 0)
        .attr("y", d => week_scale(week[d.dates]))
        .attr("width", d => week_incident_scale(d.incident_cnt))
        .attr("height", week_scale.bandwidth() )
        .attr("fill", "#69b3a2")
  
    week_g.append('g')
      .classed('xaxis', true)
      .attr('transform', `translate(0, ${bar_height})`)
      .call(d3.axisBottom(week_incident_scale))
  }

  // draw the y-axis
  week_g.append('g')
    .classed('yaxis', true)
    .call(d3.axisLeft(week_scale).ticks(7))

  week_g.append('text')
    .attr('transform', `translate(${bar_width/2-20}, ${bar_height + margins.bottom})`)
    .call(format_text, map_entry+" (day of week)", '14px')

  // add the title
  week_g.append('text')
    .attr('transform', `translate(${bar_width/2-20}, ${-margins.top/3})`)
    .call(format_text, map_entry+" across Nashville, 2017-2021", '15px')
}
)}

function _draw_month(resp_month,month12_scale,month,month_resp_scale,bar_height,d3,incident_month_only,month12_incident_scale,bar_width,margins,format_text,map_entry){return(
(month_g,choice) => {

  if (choice === 'incident_resp') {
    month_g.selectAll()
      .data(resp_month)
      .join("rect")
        .attr("x", 0)
        .attr("y", d => month12_scale(month[d.dates]))
        .attr("width", d => month_resp_scale(d[choice]))
        .attr("height", month12_scale.bandwidth() )
        .attr("fill", "#69b3a2")
  
    // draw the x-axis
    month_g.append('g')
      .classed('xaxis', true)
      .attr('transform', `translate(0, ${bar_height})`)
      .call(d3.axisBottom(month_resp_scale))
  } else {
    month_g.selectAll()
      .data(incident_month_only)
      .join("rect")
        .attr("x", 0)
        .attr("y", d => month12_scale(month[d.dates]))
        .attr("width", d => month12_incident_scale(d.incident_cnt))
        .attr("height", month12_scale.bandwidth() )
        .attr("fill", "#69b3a2")
  
    month_g.append('g')
      .classed('xaxis', true)
      .attr('transform', `translate(0, ${bar_height})`)
      .call(d3.axisBottom(month12_incident_scale))
  }
  
  // draw the y-axis
  month_g.append('g')
    .classed('yaxis', true)
    .call(d3.axisLeft(month12_scale).ticks(12))

  month_g.append('text')
    .attr('transform', `translate(${bar_width/2-20}, ${bar_height + margins.bottom})`)
    .call(format_text, map_entry+" (month)", '14px')

  // add the title
  month_g.append('text')
    .attr('transform', `translate(${bar_width/2-20}, ${-margins.top/3})`)
    .call(format_text, map_entry+" across Nashville, 2017-2021", '15px')
}
)}

function _time_series(Inputs){return(
Inputs.select(['Exact time','Month'], {label: "Time series granularity"})
)}

function _map_entry(Inputs){return(
Inputs.select(['Incident count', 'Incident frequency', 'Incident average response time (s)'], {label: "Map color representation"})
)}

function _linked_and_coordinated_views(map_entry,d3,width,height,bar_height,margins,bar_width,map_height,draw_week,draw_month,show_bar_width,draw_map,temporal_height,time_series,draw_time_series2,draw_time_series,format_text,state_hover_interaction,series_brush_interaction)
{

  let choice = 'incident_resp'

  if (map_entry === 'Incident count') {
    choice = 'incident_cnt'
  } else if (map_entry === 'Incident frequency') {
    choice = 'incident_frq'
  }
  
  let svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height+bar_height + 2*margins.bottom)

  let g = svg.append('g')
    .attr('transform', `translate(${margins.left},${margins.top})`)

  let week_g = g.append('g')
    .attr('transform', `translate(26, 0)`)

  let month_g = g.append('g')
    .attr('transform', `translate(${bar_width+1.7*margins.left},0)`)

  let map_g = g.append('g')
    .attr('transform', `translate(${margins.left/3},${bar_height + 2*margins.bottom})`)

  let time_series_g = g.append('g')
    .attr('transform', `translate(${margins.left/3},${margins.plot_space_vertical/1.5+map_height+bar_height + 2*margins.bottom})`)

  g.append('line')
    .attr('y1', -20).attr('y2', bar_height+margins.bottom)
    .attr('x1', bar_width+5).attr('x2', bar_width+5)
    .attr('stroke', d3.hcl(0,0,80))

  g.append('line')
    .attr('y1', bar_height + margins.bottom*1.3).attr('y2', bar_height + margins.bottom*1.3)
    .attr('x1', 0).attr('x2', width-(margins.left+margins.right))
    .attr('stroke', d3.hcl(0,0,80))
  
  g.append('line')
    .attr('y1', map_height+bar_height + 1.7*margins.bottom).attr('y2', map_height+bar_height + 1.7*margins.bottom)
    .attr('x1', 0).attr('x2', width-(margins.left+margins.right))
    .attr('stroke', d3.hcl(0,0,80))

  draw_week(week_g, choice)
  draw_month(month_g, choice)

  // format the axes
  g.selectAll('.yaxis').selectAll('path').remove()
  let tick_g = g.selectAll('.tick')
  tick_g.selectAll('line')
    .attr('stroke', d3.hcl(0,0,50))
  tick_g.selectAll('text')
    .attr('fill', d3.hcl(0,0,50))
    .attr('font-weight', 'bold')

  show_bar_width(week_g, choice)
  show_bar_width(month_g, choice)

  draw_map(map_g, choice)

  // draw the rectangle background
  time_series_g.append('rect')
    .attr('width', width)
    .attr('height', temporal_height)
    .attr('fill', d3.rgb(243,243,243))

  if (time_series === 'Month') {
    draw_time_series2(time_series_g)
  } else {
    draw_time_series(time_series_g)
  }

  // add the title
  time_series_g.append('text')
    .attr('transform', `translate(${width/2}, ${-margins.top/3})`)
    .call(format_text, "Time series of incident count across different regions of Nashville, 2017-2021", '17px')

  // // here we link the views together via interaction
  state_hover_interaction(map_g, month_g, week_g,choice)
  series_brush_interaction(map_g,time_series_g,choice)

  return svg.node()
}


function _plot_view(drawdoc,linked_and_coordinated_views){return(
drawdoc(linked_and_coordinated_views, 5)
)}

function _71(plot_view){return(
plot_view
)}

function _72(md){return(
md`### Draw Map`
)}

function _map_projection(d3,width,map_height,davidson){return(
d3.geoAlbers()
  .fitExtent([[0, 0],[width, map_height-20]],davidson)
)}

function _path(d3,map_projection){return(
d3.geoPath().projection(map_projection)
)}

function _draw_map(davidson_clean,path,color_scale,d3,color_legend,choose_data_domain,margins,width,map_height,format_text){return(
(map_g, choice) => {
  
  let us_g = map_g.selectAll()	
    .data(davidson_clean)
    .enter()
    .append('path')
      .classed('area', true)
      .attr('name', d => d.properties[choice])
      .attr("d", (feature) => path(feature))
      .attr('fill', d => color_scale(d.properties[choice]))
      .attr('stroke', d3.hcl(0,0,30))
      .attr('stroke-width', 0.5)

  // add the legend
  color_legend(map_g, choose_data_domain, [margins.left, width/4], map_height - margins.plot_space_horizontal, 15, color_scale)

  // add the title
  map_g.append('text')
    .attr('transform', `translate(${width/2}, ${-margins.top/4})`)
    .call(format_text, 'Choropleth map of incidents in Davidson county', '17px')
}
)}

function _state_hover_interaction(d3,width,map_height,format_text,map_entry,davidson,month12_incident_scale,month12_scale,month,region_resp_scale,week_incident_scale,week_scale,week){return(
(map_g, month_g, week_g, choice) => {
  // when hovering the mouse on a state
  map_g.selectAll('.area').on('mouseover', function(e,data_bind) {
    // highlight the state on the map
    d3.select(this).attr('stroke', d3.hcl(62,89,68)).attr('stroke-width', 4).raise()

    let meta = map_g.append('g')
      .classed('meta', true)
      .attr('transform', `translate(${width/7}, ${map_height/2})`)

    meta.append('text')
      .call(format_text, map_entry + ': '+ d3.select(this).attr('name'), '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${20})`)
      .call(format_text, 'GEOID: '+data_bind.properties.GEOID, '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${40})`)
      .call(format_text, 'COUNTYFP: '+data_bind.properties.COUNTYFP, '15px')

    let new_data = davidson.features.filter(x => x.properties.GEOID === data_bind.properties.GEOID)
    let xx_g = month_g.append('g').classed('meta', true)
    let xx_g2 = week_g.append('g').classed('meta', true)

    if (choice === 'incident_resp') {
      let new_rect = d3.rollups(new_data, v => d3.mean(v, x => x.properties.response_time_sec), d => d.properties.time_local.getMonth())
                      .filter(d => d[1]>=0)
      let new_rect2 = d3.rollups(new_data, v => d3.mean(v, x => x.properties.response_time_sec), d => d.properties.day_of_week).filter(d => d[1]>=0)
      
      xx_g.selectAll()
        .data(new_rect)
        .join("rect")
          .attr("x", d => month12_incident_scale(0))
          .attr("y", d => month12_scale(month[d[0]+1])+2)
          .attr("width", d => region_resp_scale(d[1]))
          .attr("height", month12_scale.bandwidth()-4)
          .attr("fill", d3.hcl(65,45,90))
  
      xx_g.selectAll()
        .data(new_rect)
        .join("text")
          .attr('transform', d => `translate(${region_resp_scale(d[1])+5}, ${month12_scale(month[d[0]+1])+14})`)
          .call(format_text, d => Math.round(d[1]), '12px')
          .attr("fill", d3.hcl(0,0,0))
  
      xx_g2.selectAll()
        .data(new_rect2)
        .join("rect")
          .attr("x", d => week_incident_scale(0))
          .attr("y", d => week_scale(week[d[0]])+3)
          .attr("width", d => region_resp_scale(d[1]))
          .attr("height", week_scale.bandwidth()-6)
          .attr("fill", d3.hcl(65,45,90))
  
      xx_g2.selectAll()
        .data(new_rect2)
        .join("text")
          .attr('transform', d => `translate(${region_resp_scale(d[1])+7}, ${week_scale(week[d[0]])+18})`)
          .call(format_text, d => Math.round(d[1]), '13px')
          .attr("fill", d3.hcl(0,0,0))
    } else {
      
      let new_rect = d3.rollups(new_data, v => v.length, d => d.properties.time_local.getMonth())
      let new_rect2 = d3.rollups(new_data, v => v.length, d => d.properties.day_of_week)
      
      
      xx_g.selectAll()
        .data(new_rect)
        .join("rect")
          .attr("x", d => month12_incident_scale(0))
          .attr("y", d => month12_scale(month[d[0]+1])+2)
          .attr("width", d => month12_incident_scale(d[1]*5))
          .attr("height", month12_scale.bandwidth()-4)
          .attr("fill", d3.hcl(65,45,90))
  
      xx_g.selectAll()
        .data(new_rect)
        .join("text")
          .attr('transform', d => `translate(${month12_incident_scale(d[1]*5)+5}, ${month12_scale(month[d[0]+1])+14})`)
          .call(format_text, d => d[1], '12px')
          .attr("fill", d3.hcl(0,0,0))
  
      xx_g2.selectAll()
        .data(new_rect2)
        .join("rect")
          .attr("x", d => week_incident_scale(0))
          .attr("y", d => week_scale(week[d[0]])+3)
          .attr("width", d => week_incident_scale(d[1]*6))
          .attr("height", week_scale.bandwidth()-6)
          .attr("fill", d3.hcl(65,45,90))
  
      xx_g2.selectAll()
        .data(new_rect2)
        .join("text")
          .attr('transform', d => `translate(${week_incident_scale(d[1]*6)+7}, ${week_scale(week[d[0]])+18})`)
          .call(format_text, d => d[1], '13px')
          .attr("fill", d3.hcl(0,0,0))
    }
  })

  // when hovering out of a state
  map_g.selectAll('.area').on('mouseout', function(e,data_bind) {
    // revert map color display
    d3.select(this).attr('stroke', d3.hcl(0,0,30)).attr('stroke-width', 0.5).lower()
    // remove the line of this state on the line plot
    map_g.selectAll('.meta').remove()
    month_g.selectAll('.meta').remove()
    week_g.selectAll('.meta').remove()
  })
}
)}

function _77(md){return(
md`### Draw temporal plot`
)}

function _line_shape(d3,time_scale,incident_scale){return(
d3.line()
  .x(d => time_scale(d.dates))
  .y(d => incident_scale(d.incident_cnt))
)}

function _draw_time_series(temporal_height,d3,time_scale,incident_scale,width,first_incident,late_incident,line_shape,margins,format_text){return(
(time_series_g) => {

  // draw the time as the x-axis
  time_series_g.append('g')
    .classed('xaxis', true)
    .attr('transform', `translate(0, ${temporal_height})`)
    .call(d3.axisBottom(time_scale))

  // draw the precipitation as the y-axis
  time_series_g.append('g')
    .classed('yaxis', true)
    .call(d3.axisLeft(incident_scale).ticks(7))

  // format the axes
  time_series_g.selectAll('path').remove()
  let tick_g = time_series_g.selectAll('.tick')
  tick_g.selectAll('line')
    .attr('stroke', d3.hcl(0,0,50))
  tick_g.selectAll('text')
    .attr('fill', d3.hcl(0,0,50))
    .attr('font-weight', 'bold')

  // add x axis grid lines
  time_series_g.select('.xaxis').selectAll('.tick')
    .append('line')
      .attr('y1', 0)
      .attr('y2', -temporal_height)
      .attr('stroke', d3.rgb(255, 255, 255))
      .attr('stroke-width', 2)
  
  // add y axis grid lines
  time_series_g.select('.yaxis').selectAll('.tick')
    .append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('stroke', d3.rgb(255, 255, 255))
      .attr('stroke-width', 2)

  // draw the time series
  time_series_g.selectAll()
    .data([first_incident, late_incident])
    .join('path')
      .attr('lines',true)
      .attr('d', d => line_shape(d))
      .attr('fill', 'none')
      .attr('stroke', d => d3.hcl(20,60,40))
      .attr('stroke-width', 2)

  // add x, y labels
  time_series_g.append('text')
    .attr('transform', `translate(-${margins.left}, ${temporal_height/2}) rotate(270)`)
    .call(format_text, "Incident count", '16px')
  time_series_g.append('text')
    .attr('transform', `translate(${width/2}, ${temporal_height + margins.bottom})`)
    .call(format_text, "Time", '16px')
}
)}

function _line_shape2(d3,month_scale,incident_month_scale){return(
d3.line()
  .x(d => month_scale(d.dates))
  .y(d => incident_month_scale(d.incident_cnt))
)}

function _draw_time_series2(temporal_height,d3,month_scale,incident_month_scale,width,first_incident_month,second_incident_month,line_shape2,format_text,margins){return(
(time_series_g) => {

  // draw the time as the x-axis
  time_series_g.append('g')
    .classed('xaxis', true)
    .attr('transform', `translate(0, ${temporal_height})`)
    .call(d3.axisBottom(month_scale).ticks(25))

  // draw the precipitation as the y-axis
  time_series_g.append('g')
    .classed('yaxis', true)
    .call(d3.axisLeft(incident_month_scale).ticks(7))

  // format the axes
  time_series_g.selectAll('path').remove()
  let tick_g = time_series_g.selectAll('.tick')
  tick_g.selectAll('line')
    .attr('stroke', d3.hcl(0,0,50))
  tick_g.selectAll('text')
    .attr('fill', d3.hcl(0,0,50))
    .attr('font-weight', 'bold')

  // add x axis grid lines
  time_series_g.select('.xaxis').selectAll('.tick')
    .append('line')
      .attr('y1', 0)
      .attr('y2', -temporal_height)
      .attr('stroke', d3.rgb(255, 255, 255))
      .attr('stroke-width', 2)
  
  // add y axis grid lines
  time_series_g.select('.yaxis').selectAll('.tick')
    .append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('stroke', d3.rgb(255, 255, 255))
      .attr('stroke-width', 2)

  // draw the time series
  time_series_g.selectAll()
    .data([first_incident_month, second_incident_month])
    .join('path')
      .attr('lines',true)
      .attr('d', d => line_shape2(d))
      .attr('fill', 'none')
      .attr('stroke', d => d3.hcl(135,25,70))
      .attr('stroke-width', 3)

  // add x, y labels
  time_series_g.append('text')
    .attr('transform', `translate(-38, ${temporal_height/2}) rotate(270)`)
    .call(format_text, "Incident count per month", '16px')
  time_series_g.append('text')
    .attr('transform', `translate(${width/2}, ${temporal_height + margins.bottom})`)
    .call(format_text, "Time (month)", '16px')
}
)}

function _series_brush_interaction(d3,width,temporal_height,color_scale,time_scale,davidson){return(
(map_g,time_series_g,choice) => {
  // define the d3 brush
  let brush = d3.brushX().extent([[0, 0],[width, temporal_height]])
  // when starting the brush
  brush.on('brush end', function(e) {
    // get the selected period
    let rect_select = e.selection

    if (rect_select === null) {
      map_g.selectAll('.area')
        .attr('fill', d => color_scale(d.properties[choice]))
        .attr('name', d => d.properties[choice])
      return
    }
    
    let brushed_time = [time_scale.invert(rect_select[0]), time_scale.invert(rect_select[1])]

    let new_incidents = d3.rollups(davidson.features, 
          v => v.filter(d => d.properties.time_local >= brushed_time[0] && d.properties.time_local <= brushed_time[1]),
          d => d.properties.GEOID
    )

    let helper = new Map()

    if (choice === 'incident_cnt') {
      new_incidents.forEach(d => helper.set(d[0], d[1].length))
    } else if (choice === 'incident_frq') {
      let time_span = Math.floor((brushed_time[1] - brushed_time[0])/86400000)+1
      new_incidents.forEach(d => helper.set(d[0], d[1].length/time_span))
    } else {
      new_incidents.forEach(d => helper.set(d[0], d3.mean(d[1], x => x.properties.response_time_sec)||0))
    }

    // update the map color display
    map_g.selectAll('.area')
      .attr('fill', d => color_scale(helper.get(d.properties.GEOID)))
      .attr('name', d => helper.get(d.properties.GEOID))
  })
  
  time_series_g.call(brush)
}
)}

function _83(md){return(
md`## Helper Functions`
)}

function _format_text(d3){return(
function(selection, texts, size) {
  selection.attr('text-anchor', 'middle')
    .attr('font-size', size)
    .attr('font-weight', 'bold')
    .attr('fill', d3.hcl(0,0,42))
    .text(texts)
}
)}

function _color_legend(d3){return(
(g, domain, x_range, y_translation, legend_height, color_mapping) => {
  let spatial_scale = d3.scaleLinear().domain(domain).range(x_range).nice()
  let the_axis = d3.axisBottom(spatial_scale).ticks(5)
  let proper_offset = y_translation+legend_height
  
  let legend_axis = g.append('g').attr('transform', `translate(0,${y_translation+legend_height})`).call(the_axis)
  legend_axis.selectAll('.tick').select('line').style('stroke', d3.hcl(0,0,52))
  legend_axis.selectAll('.tick').select('text').style('fill', d3.hcl(0,0,52))
  let n_ticks = 0
  legend_axis.selectAll('.tick').each(_ => {n_ticks+=1})
  legend_axis.select('.domain').remove()
  
  let tick_values = []
  legend_axis.selectAll('.tick').each(d => { tick_values.push(d)})
  g.append('defs').append('linearGradient').attr('id', 'cm')
    .selectAll('stop').data(tick_values).enter().append('stop')
    .attr('offset', (_,i) => (100*i/(tick_values.length-1))+'%')
    .attr('stop-color', d => color_mapping(d))
  g.append('rect').attr('x', x_range[0]-1).attr('width', x_range[1]-x_range[0]+2)
    .attr('y', y_translation).attr('height', legend_height).style('fill', 'url(#cm)')
}
)}

function _week(){return(
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
)}

function _month(){return(
['null', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nfd_incidents_xd_seg.parquet", {url: new URL("./files/43e1cb469db40599ca08c2b26328f95b418245743ac3de9f790795a3faf4cbf8c92460dd8586dc61114ef4cd424895dc55518ea3e8115d97e2032e64de72938f.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("secret", child1);
  const child2 = runtime.module(define2);
  main.import("drawdoc", child2);
  const child3 = runtime.module(define3);
  main.import("DuckDBClient", child3);
  main.variable(observer("viewof accessKeyId")).define("viewof accessKeyId", ["secret"], _accessKeyId);
  main.variable(observer("accessKeyId")).define("accessKeyId", ["Generators", "viewof accessKeyId"], (G, _) => G.input(_));
  main.variable(observer("viewof secretAccessKey")).define("viewof secretAccessKey", ["secret"], _secretAccessKey);
  main.variable(observer("secretAccessKey")).define("secretAccessKey", ["Generators", "viewof secretAccessKey"], (G, _) => G.input(_));
  main.variable(observer("viewof sessionToken")).define("viewof sessionToken", ["secret"], _sessionToken);
  main.variable(observer("sessionToken")).define("sessionToken", ["Generators", "viewof sessionToken"], (G, _) => G.input(_));
  main.variable(observer("AWS")).define("AWS", ["require"], _AWS);
  main.variable(observer()).define(["AWS","localStorage"], _9);
  main.variable(observer()).define(["AWS"], _10);
  main.variable(observer("auth_AWS")).define("auth_AWS", ["AWS"], _auth_AWS);
  main.variable(observer("s3")).define("s3", ["auth_AWS"], _s3);
  main.variable(observer("bucketParams")).define("bucketParams", _bucketParams);
  main.variable(observer("objectParams")).define("objectParams", _objectParams);
  main.variable(observer("loaded_S3_object")).define("loaded_S3_object", ["s3","objectParams"], _loaded_S3_object);
  main.variable(observer("available_objects")).define("available_objects", ["s3","bucketParams"], _available_objects);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("davidson")).define("davidson", ["FileAttachment"], _davidson);
  main.variable(observer("davidson_clean")).define("davidson_clean", ["d3","davidson","all_days"], _davidson_clean);
  main.variable(observer("date_separate")).define("date_separate", _date_separate);
  main.variable(observer("all_days")).define("all_days", ["time_domain"], _all_days);
  main.variable(observer("db")).define("db", ["DuckDBClient","FileAttachment"], _db);
  main.variable(observer("incident_data")).define("incident_data", ["__query","db","invalidation"], _incident_data);
  main.variable(observer("incident_month")).define("incident_month", ["__query","db","invalidation"], _incident_month);
  main.variable(observer("incident_month_only")).define("incident_month_only", ["__query","db","invalidation"], _incident_month_only);
  main.variable(observer("incident_week_only")).define("incident_week_only", ["__query","db","invalidation"], _incident_week_only);
  main.variable(observer("resp_month")).define("resp_month", ["__query","db","invalidation"], _resp_month);
  main.variable(observer("resp_week")).define("resp_week", ["__query","db","invalidation"], _resp_week);
  main.variable(observer("first_incident")).define("first_incident", ["incident_data","date_separate"], _first_incident);
  main.variable(observer("late_incident")).define("late_incident", ["incident_data","date_separate"], _late_incident);
  main.variable(observer("first_incident_month")).define("first_incident_month", ["incident_month","date_separate"], _first_incident_month);
  main.variable(observer("second_incident_month")).define("second_incident_month", ["incident_month","date_separate"], _second_incident_month);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("margins")).define("margins", _margins);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("map_height")).define("map_height", _map_height);
  main.variable(observer("temporal_height")).define("temporal_height", _temporal_height);
  main.variable(observer("bar_width")).define("bar_width", _bar_width);
  main.variable(observer("bar_height")).define("bar_height", _bar_height);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("incident_domain")).define("incident_domain", ["d3","davidson_clean"], _incident_domain);
  main.variable(observer("incident_frq_domain")).define("incident_frq_domain", _incident_frq_domain);
  main.variable(observer("incident_resp_domain")).define("incident_resp_domain", ["d3","davidson_clean"], _incident_resp_domain);
  main.variable(observer("choose_data_domain")).define("choose_data_domain", ["map_entry","incident_domain","incident_frq_domain","incident_resp_domain"], _choose_data_domain);
  main.variable(observer("incident_time_domain")).define("incident_time_domain", ["d3","incident_data"], _incident_time_domain);
  main.variable(observer("incident_month_domain")).define("incident_month_domain", ["d3","incident_month"], _incident_month_domain);
  main.variable(observer("time_domain")).define("time_domain", ["d3","incident_data"], _time_domain);
  main.variable(observer("month_domain")).define("month_domain", ["d3","incident_month"], _month_domain);
  main.variable(observer("linear_scale")).define("linear_scale", ["d3","choose_data_domain"], _linear_scale);
  main.variable(observer("color_scale")).define("color_scale", ["d3","linear_scale"], _color_scale);
  main.variable(observer("incident_scale")).define("incident_scale", ["d3","incident_time_domain","temporal_height"], _incident_scale);
  main.variable(observer("incident_month_scale")).define("incident_month_scale", ["d3","incident_month_domain","temporal_height"], _incident_month_scale);
  main.variable(observer("time_scale")).define("time_scale", ["d3","time_domain","width","margins"], _time_scale);
  main.variable(observer("month_scale")).define("month_scale", ["d3","month_domain","width","margins"], _month_scale);
  main.variable(observer("week_scale")).define("week_scale", ["d3","week","bar_height"], _week_scale);
  main.variable(observer()).define(["d3","incident_month_only"], _57);
  main.variable(observer("week_incident_scale")).define("week_incident_scale", ["d3","bar_width","margins"], _week_incident_scale);
  main.variable(observer("month12_scale")).define("month12_scale", ["d3","month","bar_height"], _month12_scale);
  main.variable(observer("month12_incident_scale")).define("month12_incident_scale", ["d3","bar_width"], _month12_incident_scale);
  main.variable(observer("week_resp_scale")).define("week_resp_scale", ["d3","bar_width","margins"], _week_resp_scale);
  main.variable(observer("month_resp_scale")).define("month_resp_scale", ["d3","bar_width"], _month_resp_scale);
  main.variable(observer("region_resp_scale")).define("region_resp_scale", ["d3","bar_width"], _region_resp_scale);
  main.variable(observer("show_bar_width")).define("show_bar_width", ["d3","format_text"], _show_bar_width);
  main.variable(observer("draw_week")).define("draw_week", ["resp_week","week_scale","week","week_resp_scale","bar_height","d3","incident_week_only","week_incident_scale","bar_width","margins","format_text","map_entry"], _draw_week);
  main.variable(observer("draw_month")).define("draw_month", ["resp_month","month12_scale","month","month_resp_scale","bar_height","d3","incident_month_only","month12_incident_scale","bar_width","margins","format_text","map_entry"], _draw_month);
  main.variable(observer("viewof time_series")).define("viewof time_series", ["Inputs"], _time_series);
  main.variable(observer("time_series")).define("time_series", ["Generators", "viewof time_series"], (G, _) => G.input(_));
  main.variable(observer("viewof map_entry")).define("viewof map_entry", ["Inputs"], _map_entry);
  main.variable(observer("map_entry")).define("map_entry", ["Generators", "viewof map_entry"], (G, _) => G.input(_));
  main.variable(observer("linked_and_coordinated_views")).define("linked_and_coordinated_views", ["map_entry","d3","width","height","bar_height","margins","bar_width","map_height","draw_week","draw_month","show_bar_width","draw_map","temporal_height","time_series","draw_time_series2","draw_time_series","format_text","state_hover_interaction","series_brush_interaction"], _linked_and_coordinated_views);
  main.variable(observer("viewof plot_view")).define("viewof plot_view", ["drawdoc","linked_and_coordinated_views"], _plot_view);
  main.variable(observer("plot_view")).define("plot_view", ["Generators", "viewof plot_view"], (G, _) => G.input(_));
  main.variable(observer()).define(["plot_view"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("map_projection")).define("map_projection", ["d3","width","map_height","davidson"], _map_projection);
  main.variable(observer("path")).define("path", ["d3","map_projection"], _path);
  main.variable(observer("draw_map")).define("draw_map", ["davidson_clean","path","color_scale","d3","color_legend","choose_data_domain","margins","width","map_height","format_text"], _draw_map);
  main.variable(observer("state_hover_interaction")).define("state_hover_interaction", ["d3","width","map_height","format_text","map_entry","davidson","month12_incident_scale","month12_scale","month","region_resp_scale","week_incident_scale","week_scale","week"], _state_hover_interaction);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer("line_shape")).define("line_shape", ["d3","time_scale","incident_scale"], _line_shape);
  main.variable(observer("draw_time_series")).define("draw_time_series", ["temporal_height","d3","time_scale","incident_scale","width","first_incident","late_incident","line_shape","margins","format_text"], _draw_time_series);
  main.variable(observer("line_shape2")).define("line_shape2", ["d3","month_scale","incident_month_scale"], _line_shape2);
  main.variable(observer("draw_time_series2")).define("draw_time_series2", ["temporal_height","d3","month_scale","incident_month_scale","width","first_incident_month","second_incident_month","line_shape2","format_text","margins"], _draw_time_series2);
  main.variable(observer("series_brush_interaction")).define("series_brush_interaction", ["d3","width","temporal_height","color_scale","time_scale","davidson"], _series_brush_interaction);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer("format_text")).define("format_text", ["d3"], _format_text);
  main.variable(observer("color_legend")).define("color_legend", ["d3"], _color_legend);
  main.variable(observer("week")).define("week", _week);
  main.variable(observer("month")).define("month", _month);
  return main;
}
