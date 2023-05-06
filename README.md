# Disaster Dazzlers
**William Wu, Toby Zhu**

This project aims to analyze the relationship between emergency incidents, demographics, weather, and traffic in Davidson County using an interactive visualization interface.

Read the [project report](./emr-project-report.pdf) for further details and insights.

## File Description

### incident-join.ipynb
This is the Jupyter notebook used to join the datasets of census tract, demographics/economics, and incidents.

### Visualization Files
#### demographics
Files in this folder are the source codes of the demographic interface. Follow the instruction in the ```README.md``` in the ```visualization``` folder to access and run the interface.

#### weather-and-traffic
Files in this folder are the source codes of the weather and traffic interface. Follow the instruction in the ```README.md``` in the ```visualization``` folder to access and run the interface.

### Data Processing Files
#### incidents-weather-traffic-join
Files in this folder are used to join ```incidents```, ```weather```, and ```traffic``` on spatial and temporal domains.
#### insights-queries
Files in this folder are used to group specific weather or traffic conditions for easier visualization in order to draw insights.
Specifically:
- ```*_occur.sql``` records all occurances of a specific condition, used for calculating frequency.
- ```*_bracket.sql``` retrives only data that caused incidents, used for incidents count.
- ```*_rt.sql``` is the average response times given a condition.
