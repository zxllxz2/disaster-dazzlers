import define1 from "./73b81e912ffcd59e@155.js";
import define2 from "./357f1a71f976f173@1092.js";

function _1(md){return(
md`# Emergency Response: Geographical & Temporal Analysis`
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

function _week_or_month(Inputs){return(
Inputs.select(['Week','Month'], {label: "Box plot time distribution (left)"})
)}

function _demographic(Inputs){return(
Inputs.select(['Median household income', 'Median family income', 'Ethnicity', 'Gender'], {label: "Demographic choice (right)"})
)}

function _time_series(Inputs){return(
Inputs.select(['Exact time','Month'], {label: "Time series granularity"})
)}

function _map_entry(Inputs){return(
Inputs.select(['Incident count', 'Incident frequency', 'Incident average response time (s)'], {label: "Map color representation"})
)}

function _linked_and_coordinated_views(map_entry,d3,width,height,bar_height,margins,map_height,bar_width,week_or_month,draw_week,draw_month,show_bar_width,demographic,draw_income,household_income,family_income,draw_map,temporal_height,time_series,draw_time_series2,draw_time_series,format_text,draw_pie,gender_dist,radius,ethnicity_group,ethnicity_dist,state_hover_interaction,series_brush_interaction)
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

  let map_g = g.append('g')
    .attr('transform', `translate(0,${bar_height + 2*margins.bottom})`)

  let time_series_g = g.append('g')
    .attr('transform', `translate(${margins.left/3},${margins.plot_space_vertical/1.5+map_height+bar_height + 2*margins.bottom})`)

  g.append('line')
    .attr('y1', -20).attr('y2', bar_height+margins.bottom)
    .attr('x1', bar_width+margins.top).attr('x2', bar_width+margins.top)
    .attr('stroke', d3.hcl(0,0,80))

  g.append('line')
    .attr('y1', bar_height + margins.bottom*1.3).attr('y2', bar_height + margins.bottom*1.3)
    .attr('x1', 0).attr('x2', width-(margins.left+margins.right))
    .attr('stroke', d3.hcl(0,0,80))
  
  g.append('line')
    .attr('y1', map_height+bar_height + 1.7*margins.bottom).attr('y2', map_height+bar_height + 1.7*margins.bottom)
    .attr('x1', 0).attr('x2', width-(margins.left+margins.right))
    .attr('stroke', d3.hcl(0,0,80))

  let week_g = g.append('g').attr('transform', `translate(26, 0)`)

  let income_g = g.append('g').attr('transform', `translate(${bar_width+2*margins.left},0)`)

  let pie_g = g.append('g').attr('transform', `translate(${bar_width/2*3},${bar_height/2+margins.top})`)

  if (week_or_month === 'Week') {
    draw_week(week_g, choice)
  } else {
    draw_month(week_g, choice)
  }

  show_bar_width(week_g, choice, null)

  if (demographic === 'Median household income') {
    draw_income(income_g, household_income, choice)
    show_bar_width(income_g, choice, choice)
  } else if (demographic === 'Median family income') {
    draw_income(income_g, family_income, choice)
    show_bar_width(income_g, choice, choice)
  }

  // format the axes
  g.selectAll('.yaxis').selectAll('path').remove()
  let tick_g = g.selectAll('.tick')
  tick_g.selectAll('line')
    .attr('stroke', d3.hcl(0,0,50))
  tick_g.selectAll('text')
    .attr('fill', d3.hcl(0,0,50))
    .attr('font-weight', 'bold')

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

  let color = d3.scaleOrdinal().range(d3.schemeSet2)

  if (demographic === 'Ethnicity' || demographic === 'Gender') {
    let xxxx = null

    if (demographic === 'Gender') {
      xxxx = ['Male(25-29)', 'Female(25-29)']
      draw_pie(pie_g, color, gender_dist[0], radius, gender_dist[1])
    } else {
      xxxx = ethnicity_group
      draw_pie(pie_g, color, ethnicity_dist[0], radius, ethnicity_dist[1])
    }
     
    let legend_scale = d3.scaleBand().domain(xxxx).range([0, bar_height/2]).padding(0.1)
    let legend_g = pie_g.append('g')
      .attr('transform', `translate(${bar_width/2-50},-80)`)
      .classed('legend_g', true)
    legend_g.selectAll()
      .data(xxxx)
      .join('rect')
        .attr('y', d => legend_scale(d))
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d => color(d))
    legend_g.selectAll()
      .data(xxxx)
      .join('text')
        .attr('x', 20)
        .attr('y', d => legend_scale(d)+11)
        .call(format_text, d => d, '13px')
          .attr("text-anchor", "left")
    pie_g.append('text')
      .attr('transform', `translate(0, ${-bar_height/1.5+10})`)
      .call(format_text, "Demographic distribution at each tract, 2017-2021", '15px')
  }

  // link the views together via interaction
  state_hover_interaction(map_g, week_g, choice, week_or_month, pie_g, color)
  series_brush_interaction(map_g,time_series_g,choice)

  return svg.node()
}


function _14(md){return(
md`### Data preparation`
)}

async function _davidson(d3,s3)
{
  let objectParams = ({
    Bucket: 'wwu-incidents',
    Key: 'incident_census_join_econ',
    Expires: 60*5
  })
  let data = await d3.json(s3.getSignedUrl('getObject', objectParams))
  data.features.forEach(d => d.properties.time_utc = new Date(d.properties.time_utc))
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

function _incident_obj(){return(
{
  Bucket: 'wwu-incidents',
  Key: 'nfd_incidents_xd_seg.parquet',
  Expires: 60*5
}
)}

function _db(DuckDBClient,getRemoteFile,s3,incident_obj){return(
DuckDBClient.of({ 
  incident: getRemoteFile(s3.getSignedUrl('getObject', incident_obj))
})
)}

function _incident_data(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select CAST(strftime('%Y-%m-%d', time_utc) AS DATETIME) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt 
  FROM incident group by dates order by dates`
)}

function _incident_month(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select CAST(CONCAT(strftime('%Y-%m', time_utc),'-01') AS DATETIME) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt 
  FROM incident group by dates order by dates`
)}

function _incident_month_only(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select MONTH(time_utc) AS dates, CAST(COUNT(*) AS INT) AS incident_cnt FROM incident group by dates order by dates`
)}

function _incident_week_only(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select day_of_week as dates, cast(count(*) as INT) as incident_cnt from incident group by dates order by dates`
)}

function _resp_month(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select MONTH(time_utc) as dates, AVG(response_time_sec) as incident_resp from incident group by dates order by dates`
)}

function _resp_week(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`select day_of_week as dates, AVG(response_time_sec) as incident_resp from incident group by dates order by dates`
)}

function _month_cnt(d3,incident_month){return(
d3.groups(incident_month, d => d.dates.getMonth()).map(d => d[1].length)
)}

function _incident_month_frq(incident_month_only,month_cnt)
{
  let re = []
  incident_month_only.forEach((d,i) => {
    let x = {dates:i+1, incident_cnt:Math.round(d.incident_cnt/month_cnt[i])}
    re.push(x)
  })
  return re
}


function _household_income_popu(d3,davidson_clean){return(
d3.rollup(
  davidson_clean.map(x => [x.properties['median household income'], x.properties['total population']]),
  v => v.reduce((a,b) => a+b[1], 0),
  d => {
    if (d[0] < 30000) return '0-30k'
    else if (d[0] < 40000) return '30-40k'
    else if (d[0] < 50000) return '40-50k'
    else if (d[0] < 60000) return '50-60k'
    else if (d[0] < 70000) return '60-70k'
    else return '70k +'
  }
)
)}

function _family_income_popu(d3,davidson_clean){return(
d3.rollup(
  davidson_clean.map(x => [x.properties['median family income'], x.properties['total population']]),
  v => v.reduce((a,b) => a+b[1], 0),
  d => {
    if (d[0] < 30000) return '0-30k'
    else if (d[0] < 40000) return '30-40k'
    else if (d[0] < 50000) return '40-50k'
    else if (d[0] < 60000) return '50-60k'
    else if (d[0] < 70000) return '60-70k'
    else return '70k +'
  }
)
)}

function _household_income(d3,davidson,household_income_popu){return(
d3.groups(
  davidson.features.map(d => [d.properties['median household income'], d.properties['response_time_sec']]).filter(d => d[0]>0 && d[1]>0),
  x => {
    let d = x[0]
    if (d < 30000) return '0-30k'
    else if (d < 40000) return '30-40k'
    else if (d < 50000) return '40-50k'
    else if (d < 60000) return '50-60k'
    else if (d < 70000) return '60-70k'
    else return '70k +'
  }
).map(d => [d[0], d[1].length, d3.mean(d[1].map(c => c[1])), d[1].length/household_income_popu.get(d[0])*1000]).sort()
)}

function _family_income(d3,davidson,family_income_popu){return(
d3.groups(
  davidson.features.map(d => [d.properties['median family income'], d.properties['response_time_sec']]).filter(d => d[0]>0 && d[1]>0),
  x => {
    let d = x[0]
    if (d < 30000) return '0-30k'
    else if (d < 40000) return '30-40k'
    else if (d < 50000) return '40-50k'
    else if (d < 60000) return '50-60k'
    else if (d < 70000) return '60-70k'
    else return '70k +'
  }
).map(d => [d[0], d[1].length, d3.mean(d[1].map(c => c[1])), d[1].length/family_income_popu.get(d[0])*1000]).sort()
)}

function _ethnicity_dist(davidson_clean,ethnicity_group)
{
  let result = davidson_clean.map(d => [
    d.properties['white alone'], 
    d.properties['black alone'], 
    d.properties['native alone'], 
    d.properties['asian alone'], 
    d.properties['hawaiin alone'],
    d.properties['hispanic'],
    d.properties['other race alone'],
    d.properties['two or more races'],
    d.properties['total population']
  ]).reduce((acc, cur) => acc.map((x,i) => x+cur[i]), [0,0,0,0,0,0,0,0,0])

  let dict = {}
  ethnicity_group.forEach((d,i) => dict[d] = result[i])
  return [dict, result[result.length-1]]
}


function _gender_dist(davidson_clean)
{
  let result = davidson_clean.map(d => [d.properties['male 25 to 29'], d.properties['female 25 to 29']])
    .reduce((acc, cur) => acc.map((x,i) => x+cur[i]), [0,0])
  return [{'Male(25-29)':result[0], 'Female(25-29)':result[1]}, result[0]+result[1]]
}


function _first_incident(incident_data,date_separate){return(
incident_data.filter(d => d.dates < date_separate)
)}

function _late_incident(incident_data,date_separate){return(
incident_data.filter(d => d.dates >= date_separate)
)}

function _first_incident_month(incident_month,date_separate){return(
incident_month.filter(d => d.dates < date_separate)
)}

function _second_incident_month(incident_month,date_separate){return(
incident_month.filter(d => d.dates >= date_separate)
)}

function _39(md){return(
md`### Parameters`
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

function _radius(bar_width,bar_height){return(
Math.min(bar_width, bar_height) / 2
)}

function _47(md){return(
md`### Scales and domains`
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

function _week_incident_scale(d3,bar_width,margins){return(
d3.scaleLinear().domain([0, 5100]).range([0,bar_width-margins.right])
)}

function _month12_scale(d3,month,bar_height){return(
d3.scaleBand().domain(month.slice(1)).range([bar_height, 0]).padding(0.2)
)}

function _month12_incident_scale(d3,bar_width){return(
d3.scaleLinear().domain([0, 3100]).range([0,bar_width])
)}

function _month12_incident_frq_scale(d3,bar_width){return(
d3.scaleLinear().domain([0, 900]).range([0,bar_width-20])
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

function _income_scale(d3,household_income,bar_height){return(
d3.scaleBand().domain(household_income.map(d=>d[0])).range([bar_height, 0]).padding(0.2)
)}

function _income_incident_frq_scale(d3,bar_width){return(
d3.scaleLinear().domain([0,85]).range([0,bar_width])
)}

function _72(md){return(
md`### Draw pie charts`
)}

function _draw_pie(d3,demographic){return(
(pie_g, color, datap, radius, total) => {
  let pie = d3.pie().value(function(d) {return d[1]})
  let data_ready = pie(Object.entries(datap))
  
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
  
  pie_g.selectAll()
    .data(data_ready)
    .enter()
    .append('path')
      .classed('pie', true)
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  if (demographic !== 'Gender') {
    pie_g.selectAll()
      .data(data_ready.filter(d => d.data[1]/total>=0.05))
      .enter()
      .append('text')
      .text(d => `${Math.round(d.data[1]/total*100)}%`)
      .classed('pie', true)
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
  }
}
)}

function _74(md){return(
md`### Draw demographic bar plots`
)}

function _draw_income(d3,bar_width,margins,income_scale,bar_height,income_incident_frq_scale,format_text,map_entry,demographic){return(
(income_g, datax, choice) => {
   if (choice === 'incident_resp') {
     let width_scale = d3.scaleLinear().domain([0, 500]).range([0, bar_width-margins.right])
     income_g.selectAll()
       .data(datax)
       .join("rect")
       .attr("x", 0)
       .attr("y", d => income_scale(d[0]))
       .attr("width", d => width_scale(d[2]))
       .attr("height", income_scale.bandwidth() )
       .attr("fill", d3.rgb(44, 152, 170))

     // draw the x-axis
     income_g.append('g')
       .classed('xaxis', true)
       .attr('transform', `translate(0, ${bar_height})`)
       .call(d3.axisBottom(width_scale))
  } else if (choice === 'incident_cnt') {
     let width_scale = d3.scaleLinear().domain([1000, 7000]).range([0, bar_width-margins.right])
     income_g.selectAll()
       .data(datax)
       .join("rect")
       .attr("x", 0)
       .attr("y", d => income_scale(d[0]))
       .attr("width", d => width_scale(d[1]))
       .attr("height", income_scale.bandwidth() )
       .attr("fill", d3.rgb(44, 152, 170))

     income_g.append('g')
       .classed('xaxis', true)
       .attr('transform', `translate(0, ${bar_height})`)
       .call(d3.axisBottom(width_scale))
  } else {
     income_g.selectAll()
       .data(datax)
       .join("rect")
       .attr("x", 0)
       .attr("y", d => income_scale(d[0]))
       .attr("width", d => income_incident_frq_scale(d[3]))
       .attr("height", income_scale.bandwidth() )
       .attr("fill", d3.rgb(44, 152, 170))

     income_g.append('g')
       .classed('xaxis', true)
       .attr('transform', `translate(0, ${bar_height})`)
       .call(d3.axisBottom(income_incident_frq_scale))

    income_g.append('text')
      .attr('transform', `translate(${bar_width/2-20}, ${bar_height + margins.bottom})`)
      .call(format_text, 'Incident count per 1000 residents', '14px')
  }
  
  // draw the y-axis
  income_g.append('g')
    .classed('yaxis', true)
    .call(d3.axisLeft(income_scale).ticks(12))

  if (choice !== 'incident_frq') {
    income_g.append('text')
      .attr('transform', `translate(${bar_width/2-20}, ${bar_height + margins.bottom})`)
      .call(format_text, map_entry, '14px')
  }

  // add the title
  income_g.append('text')
    .attr('transform', `translate(${bar_width/2-20}, ${-margins.top/3})`)
    .call(format_text, map_entry+" vs. "+ demographic+" across Nashville, 2017-2021", '15px')
}
)}

function _76(md){return(
md`### Draw week/month bar plots`
)}

function _draw_month(resp_month,month12_scale,month,month_resp_scale,bar_height,d3,incident_month_only,month12_incident_scale,incident_month_frq,month12_incident_frq_scale,bar_width,margins,format_text,map_entry){return(
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
  } else if (choice === 'incident_cnt') {
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
  } else {
    month_g.selectAll()
      .data(incident_month_frq)
      .join("rect")
        .attr("x", 0)
        .attr("y", d => month12_scale(month[d.dates]))
        .attr("width", (d,i) => month12_incident_frq_scale(d.incident_cnt))
        .attr("height", month12_scale.bandwidth() )
        .attr("fill", "#69b3a2")
  
    month_g.append('g')
      .classed('xaxis', true)
      .attr('transform', `translate(0, ${bar_height})`)
      .call(d3.axisBottom(month12_incident_frq_scale))
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

function _show_bar_width(d3,format_text){return(
(g,choice,income) => {
  if (income === null) {
    if (choice !== 'incident_resp') choice = 'incident_cnt'
  } else {
    if (income === 'incident_resp') {
      choice = 2
    } else if (income === 'incident_cnt') {
      choice = 1
    } else {
      choice = 3
    }
  }
  
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

function _80(md){return(
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

function _state_hover_interaction(d3,width,map_height,format_text,map_entry,demographic,draw_pie,radius,davidson,month12_incident_scale,month12_scale,month,region_resp_scale,week_incident_scale,week_scale,week,month_cnt,gender_dist,ethnicity_dist){return(
(map_g, week_g, choice, week_or_month, pie_g, color) => {
  // when hovering the mouse on a state
  map_g.selectAll('.area').on('mouseover', function(e,data_bind) {
    // highlight the state on the map
    d3.select(this).attr('stroke', d3.hcl(62,89,68)).attr('stroke-width', 4).raise()
    
    let meta = map_g.append('g')
      .classed('meta', true)
      .attr('transform', `translate(${width/7}, ${map_height/2-40})`)

    meta.append('text')
      .call(format_text, map_entry + ': '+ d3.select(this).attr('name'), '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${20})`)
      .call(format_text, 'GEOID: '+data_bind.properties.GEOID, '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${40})`)
      .call(format_text, 'COUNTYFP: '+data_bind.properties.COUNTYFP, '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${60})`)
      .call(format_text, 'Median household income ($): '+data_bind.properties['median household income'], '15px')
    meta.append('text')
      .attr('transform', `translate(0, ${80})`)
      .call(format_text, 'Median family income ($): '+data_bind.properties['median family income'], '15px')

    pie_g.selectAll('.pie').remove()

    if (demographic === 'Ethnicity') {
      let datap = {
        White:data_bind.properties['white alone'],
        Black:data_bind.properties['black alone'],
        Native:data_bind.properties['native alone'],
        Asian:data_bind.properties['asian alone'],
        Hawaiin:data_bind.properties['hawaiin alone'],
        Hispanic:data_bind.properties['hispanic'],
        Others:data_bind.properties['other race alone'],
        Multiple:data_bind.properties['two or more races']
      }
      draw_pie(pie_g, color, datap, radius, data_bind.properties['total population'])
    } else if (demographic === 'Gender') {
      let datap = {
        'Male(25-29)':data_bind.properties['male 25 to 29'],
        'Female(25-29)':data_bind.properties['female 25 to 29']
      }
      draw_pie(pie_g, color, datap, radius, 1)
    }

    let new_data = davidson.features.filter(x => x.properties.GEOID === data_bind.properties.GEOID)
    let xx_g = week_g.append('g').classed('meta', true)

    if (choice === 'incident_resp') {

      if (week_or_month === 'Month') {
        let new_rect = d3.rollups(new_data, v => d3.mean(v, x => x.properties.response_time_sec), d => d.properties.time_utc.getMonth())
                      .filter(d => d[1]>=0)
        
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
      } else {
        let new_rect2 = d3.rollups(new_data, v => d3.mean(v, x => x.properties.response_time_sec), d => d.properties.day_of_week).filter(d => d[1]>=0)
        xx_g.selectAll()
          .data(new_rect2)
          .join("rect")
            .attr("x", d => week_incident_scale(0))
            .attr("y", d => week_scale(week[d[0]])+3)
            .attr("width", d => region_resp_scale(d[1]))
            .attr("height", week_scale.bandwidth()-6)
            .attr("fill", d3.hcl(65,45,90))
    
        xx_g.selectAll()
          .data(new_rect2)
          .join("text")
            .attr('transform', d => `translate(${region_resp_scale(d[1])+7}, ${week_scale(week[d[0]])+18})`)
            .call(format_text, d => Math.round(d[1]), '13px')
            .attr("fill", d3.hcl(0,0,0))
      }
    } else {

      if (week_or_month === 'Month') {
        let new_rect = d3.rollups(new_data, v => v.length, d => d.properties.time_utc.getMonth())
        if (choice === 'incident_cnt') {
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
        } else {
          xx_g.selectAll()
          .data(new_rect)
          .join("rect")
            .attr("x", d => month12_incident_scale(0))
            .attr("y", d => month12_scale(month[d[0]+1])+2)
            .attr("width", (d,i) => month12_incident_scale(d[1]*18/month_cnt[i]))
            .attr("height", month12_scale.bandwidth()-4)
            .attr("fill", d3.hcl(65,45,90))
    
        xx_g.selectAll()
          .data(new_rect)
          .join("text")
            .attr('transform', (d,i) => `translate(${month12_incident_scale(d[1]*18/month_cnt[i])+5}, ${month12_scale(month[d[0]+1])+14})`)
            .call(format_text, (d,i) => Math.round(d[1]/month_cnt[i]), '12px')
            .attr("fill", d3.hcl(0,0,0))
        }
        
      } else {
        let new_rect2 = d3.rollups(new_data, v => v.length, d => d.properties.day_of_week)
        xx_g.selectAll()
          .data(new_rect2)
          .join("rect")
            .attr("x", d => week_incident_scale(0))
            .attr("y", d => week_scale(week[d[0]])+3)
            .attr("width", d => week_incident_scale(d[1]*6))
            .attr("height", week_scale.bandwidth()-6)
            .attr("fill", d3.hcl(65,45,90))
    
        xx_g.selectAll()
          .data(new_rect2)
          .join("text")
            .attr('transform', d => `translate(${week_incident_scale(d[1]*6)+7}, ${week_scale(week[d[0]])+18})`)
            .call(format_text, d => d[1], '13px')
            .attr("fill", d3.hcl(0,0,0))  
      }
    }
  })

  // when hovering out of a state
  map_g.selectAll('.area').on('mouseout', function(e,data_bind) {
    // revert map color display
    d3.select(this).attr('stroke', d3.hcl(0,0,30)).attr('stroke-width', 0.5).lower()
    // remove the line of this state on the line plot
    map_g.selectAll('.meta').remove()
    week_g.selectAll('.meta').remove()
    pie_g.selectAll('.pie').remove()

    if (demographic === 'Gender') {
      draw_pie(pie_g, color, gender_dist[0], radius, gender_dist[1])
    } else if (demographic === 'Ethnicity') {
      draw_pie(pie_g, color, ethnicity_dist[0], radius, ethnicity_dist[1])
    }
  })
}
)}

function _85(md){return(
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
    .call(d3.axisBottom(month_scale).ticks(20))

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
          v => v.filter(d => d.properties.time_utc >= brushed_time[0] && d.properties.time_utc <= brushed_time[1]),
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

function _91(md){return(
md`### Helper Functions`
)}

function _getRemoteFile(){return(
function getRemoteFile(url) {
  const baseURL = new URL(url);
  return {
    file: {
      name: baseURL.pathname,
      url: function () {
        return url;
      }
    }
  };
}
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

function _ethnicity_group(){return(
['White','Black','Native','Asian','Hawaiin','Hispanic','Others','Multiple']
)}

function _98(md){return(
md`### Imports`
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
  main.variable(observer("viewof week_or_month")).define("viewof week_or_month", ["Inputs"], _week_or_month);
  main.variable(observer("week_or_month")).define("week_or_month", ["Generators", "viewof week_or_month"], (G, _) => G.input(_));
  main.variable(observer("viewof demographic")).define("viewof demographic", ["Inputs"], _demographic);
  main.variable(observer("demographic")).define("demographic", ["Generators", "viewof demographic"], (G, _) => G.input(_));
  main.variable(observer("viewof time_series")).define("viewof time_series", ["Inputs"], _time_series);
  main.variable(observer("time_series")).define("time_series", ["Generators", "viewof time_series"], (G, _) => G.input(_));
  main.variable(observer("viewof map_entry")).define("viewof map_entry", ["Inputs"], _map_entry);
  main.variable(observer("map_entry")).define("map_entry", ["Generators", "viewof map_entry"], (G, _) => G.input(_));
  main.variable(observer("linked_and_coordinated_views")).define("linked_and_coordinated_views", ["map_entry","d3","width","height","bar_height","margins","map_height","bar_width","week_or_month","draw_week","draw_month","show_bar_width","demographic","draw_income","household_income","family_income","draw_map","temporal_height","time_series","draw_time_series2","draw_time_series","format_text","draw_pie","gender_dist","radius","ethnicity_group","ethnicity_dist","state_hover_interaction","series_brush_interaction"], _linked_and_coordinated_views);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("davidson")).define("davidson", ["d3","s3"], _davidson);
  main.variable(observer("davidson_clean")).define("davidson_clean", ["d3","davidson","all_days"], _davidson_clean);
  main.variable(observer("date_separate")).define("date_separate", _date_separate);
  main.variable(observer("all_days")).define("all_days", ["time_domain"], _all_days);
  main.variable(observer("incident_obj")).define("incident_obj", _incident_obj);
  main.variable(observer("db")).define("db", ["DuckDBClient","getRemoteFile","s3","incident_obj"], _db);
  main.variable(observer("incident_data")).define("incident_data", ["__query","db","invalidation"], _incident_data);
  main.variable(observer("incident_month")).define("incident_month", ["__query","db","invalidation"], _incident_month);
  main.variable(observer("incident_month_only")).define("incident_month_only", ["__query","db","invalidation"], _incident_month_only);
  main.variable(observer("incident_week_only")).define("incident_week_only", ["__query","db","invalidation"], _incident_week_only);
  main.variable(observer("resp_month")).define("resp_month", ["__query","db","invalidation"], _resp_month);
  main.variable(observer("resp_week")).define("resp_week", ["__query","db","invalidation"], _resp_week);
  main.variable(observer("month_cnt")).define("month_cnt", ["d3","incident_month"], _month_cnt);
  main.variable(observer("incident_month_frq")).define("incident_month_frq", ["incident_month_only","month_cnt"], _incident_month_frq);
  main.variable(observer("household_income_popu")).define("household_income_popu", ["d3","davidson_clean"], _household_income_popu);
  main.variable(observer("family_income_popu")).define("family_income_popu", ["d3","davidson_clean"], _family_income_popu);
  main.variable(observer("household_income")).define("household_income", ["d3","davidson","household_income_popu"], _household_income);
  main.variable(observer("family_income")).define("family_income", ["d3","davidson","family_income_popu"], _family_income);
  main.variable(observer("ethnicity_dist")).define("ethnicity_dist", ["davidson_clean","ethnicity_group"], _ethnicity_dist);
  main.variable(observer("gender_dist")).define("gender_dist", ["davidson_clean"], _gender_dist);
  main.variable(observer("first_incident")).define("first_incident", ["incident_data","date_separate"], _first_incident);
  main.variable(observer("late_incident")).define("late_incident", ["incident_data","date_separate"], _late_incident);
  main.variable(observer("first_incident_month")).define("first_incident_month", ["incident_month","date_separate"], _first_incident_month);
  main.variable(observer("second_incident_month")).define("second_incident_month", ["incident_month","date_separate"], _second_incident_month);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("margins")).define("margins", _margins);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("map_height")).define("map_height", _map_height);
  main.variable(observer("temporal_height")).define("temporal_height", _temporal_height);
  main.variable(observer("bar_width")).define("bar_width", _bar_width);
  main.variable(observer("bar_height")).define("bar_height", _bar_height);
  main.variable(observer("radius")).define("radius", ["bar_width","bar_height"], _radius);
  main.variable(observer()).define(["md"], _47);
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
  main.variable(observer("week_incident_scale")).define("week_incident_scale", ["d3","bar_width","margins"], _week_incident_scale);
  main.variable(observer("month12_scale")).define("month12_scale", ["d3","month","bar_height"], _month12_scale);
  main.variable(observer("month12_incident_scale")).define("month12_incident_scale", ["d3","bar_width"], _month12_incident_scale);
  main.variable(observer("month12_incident_frq_scale")).define("month12_incident_frq_scale", ["d3","bar_width"], _month12_incident_frq_scale);
  main.variable(observer("week_resp_scale")).define("week_resp_scale", ["d3","bar_width","margins"], _week_resp_scale);
  main.variable(observer("month_resp_scale")).define("month_resp_scale", ["d3","bar_width"], _month_resp_scale);
  main.variable(observer("region_resp_scale")).define("region_resp_scale", ["d3","bar_width"], _region_resp_scale);
  main.variable(observer("income_scale")).define("income_scale", ["d3","household_income","bar_height"], _income_scale);
  main.variable(observer("income_incident_frq_scale")).define("income_incident_frq_scale", ["d3","bar_width"], _income_incident_frq_scale);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("draw_pie")).define("draw_pie", ["d3","demographic"], _draw_pie);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("draw_income")).define("draw_income", ["d3","bar_width","margins","income_scale","bar_height","income_incident_frq_scale","format_text","map_entry","demographic"], _draw_income);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("draw_month")).define("draw_month", ["resp_month","month12_scale","month","month_resp_scale","bar_height","d3","incident_month_only","month12_incident_scale","incident_month_frq","month12_incident_frq_scale","bar_width","margins","format_text","map_entry"], _draw_month);
  main.variable(observer("draw_week")).define("draw_week", ["resp_week","week_scale","week","week_resp_scale","bar_height","d3","incident_week_only","week_incident_scale","bar_width","margins","format_text","map_entry"], _draw_week);
  main.variable(observer("show_bar_width")).define("show_bar_width", ["d3","format_text"], _show_bar_width);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("map_projection")).define("map_projection", ["d3","width","map_height","davidson"], _map_projection);
  main.variable(observer("path")).define("path", ["d3","map_projection"], _path);
  main.variable(observer("draw_map")).define("draw_map", ["davidson_clean","path","color_scale","d3","color_legend","choose_data_domain","margins","width","map_height","format_text"], _draw_map);
  main.variable(observer("state_hover_interaction")).define("state_hover_interaction", ["d3","width","map_height","format_text","map_entry","demographic","draw_pie","radius","davidson","month12_incident_scale","month12_scale","month","region_resp_scale","week_incident_scale","week_scale","week","month_cnt","gender_dist","ethnicity_dist"], _state_hover_interaction);
  main.variable(observer()).define(["md"], _85);
  main.variable(observer("line_shape")).define("line_shape", ["d3","time_scale","incident_scale"], _line_shape);
  main.variable(observer("draw_time_series")).define("draw_time_series", ["temporal_height","d3","time_scale","incident_scale","width","first_incident","late_incident","line_shape","margins","format_text"], _draw_time_series);
  main.variable(observer("line_shape2")).define("line_shape2", ["d3","month_scale","incident_month_scale"], _line_shape2);
  main.variable(observer("draw_time_series2")).define("draw_time_series2", ["temporal_height","d3","month_scale","incident_month_scale","width","first_incident_month","second_incident_month","line_shape2","format_text","margins"], _draw_time_series2);
  main.variable(observer("series_brush_interaction")).define("series_brush_interaction", ["d3","width","temporal_height","color_scale","time_scale","davidson"], _series_brush_interaction);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("getRemoteFile")).define("getRemoteFile", _getRemoteFile);
  main.variable(observer("format_text")).define("format_text", ["d3"], _format_text);
  main.variable(observer("color_legend")).define("color_legend", ["d3"], _color_legend);
  main.variable(observer("week")).define("week", _week);
  main.variable(observer("month")).define("month", _month);
  main.variable(observer("ethnicity_group")).define("ethnicity_group", _ethnicity_group);
  main.variable(observer()).define(["md"], _98);
  const child1 = runtime.module(define1);
  main.import("secret", child1);
  const child2 = runtime.module(define2);
  main.import("DuckDBClient", child2);
  main.variable(observer("AWS")).define("AWS", ["require"], _AWS);
  main.variable(observer("s3")).define("s3", ["auth_AWS"], _s3);
  return main;
}
