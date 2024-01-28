import * as d3 from 'd3';

// Plot constants
const MARGIN = {LEFT: 0, RIGHT: 0, TOP: 0, BOTTOM: 30};
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
const OUTERRADIUS = Math.min(WIDTH, HEIGHT, 500) / 2;
const INNERRADIUS = OUTERRADIUS * 0.1;

let svg,
  g,
  colorScale,
  distScale,
  radialScale,
  title,
  yearText,
  line,
  barWrapper,
  pathWrapper;

let currYear = 1901;

// Domain data
const domLow = -1.5, //-15, low end of data
  domHigh = 1.25, //30, high end of data
  axisTicks = [-1, 0, 1]; //[-20,-10,0,10,20,30];  [-2,-1,0,1,2,3];  [-1.5,-0.5,0.5,1.5];

function initChart(canvasElement) {
  // Visualization canvas
  d3.select(canvasElement).html(""); // Clear the content before re-rendering
  svg = d3
    .select(canvasElement)
    .append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

  g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + WIDTH / 2 + "," + (HEIGHT / 2 + 20) + ")"
    );

  //Base the color scale on average temperature extremes
  colorScale = d3
    .scaleLinear()
    .domain([domLow, (domLow + domHigh) / 2, domHigh])
    .range(["#1788de", "#ffff8c", "#CE241C"]);

  //Scale for the heights of the bar, not starting at zero to give the bars an initial offset outward
  distScale = d3
    .scaleLinear()
    .range([INNERRADIUS, OUTERRADIUS])
    .domain([domLow, domHigh]);

  radialScale = d3
    .scaleLinear()
    .range([0, Math.PI * 2])
    .domain([1, 12]); // for 12 months

  // Title
  //Append title to the top
  title = g
    .append("g")
    .attr("class", "title")
    .append("text")
    .attr("dy", HEIGHT / 2)
    .attr("text-anchor", "middle")
    .text("World Temperature Anomaly");

  // Add axes
  //Wrapper for the bars and to position it downward
  barWrapper = svg
    .append("g")
    .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");

  pathWrapper = barWrapper.append("g").attr("id", "pathWrapper");

  //Draw gridlines below the bars
  const axes = barWrapper
    .selectAll(".gridCircles")
    .data(axisTicks)
    .enter()
    .append("g");
  //Draw the circles
  axes
    .append("circle")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("opacity", 0.2)
    .attr("class", "axisCircles")
    .attr("r", function (d) {
      return distScale(d);
    });
  //Draw the axis labels
  axes
    .append("text")
    .attr("class", "axisText")
    .attr("y", function (d) {
      return distScale(d) - 8;
    })
    .attr("dy", "0.3em")
    .text(function (d) {
      return d + "°C";
    });

  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //Add a line to split the year
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180; // Convert degrees to radians
    const lineLength = OUTERRADIUS * 1;

    barWrapper
      .append("line")
      .attr("class", "yearLine")
      .attr("stroke", "black")
      .attr("opacity", 0.2)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", lineLength * Math.sin(angle))
      .attr("y2", -lineLength * Math.cos(angle));

    // Add month names to each line
    barWrapper
      .append("text")
      .attr("class", "monthText")
      .attr("x", lineLength * 0.95 * Math.sin(angle)) // Adjust the position for better visibility
      .attr("y", -lineLength * 0.95 * Math.cos(angle)) // Adjust the position for better visibility
      .attr("dy", "0.9em")
      .text(monthNames[i]);
  }

  //Add year in center
  yearText = barWrapper
    .append("text")
    .attr("class", "yearText")
    .attr("text-anchor", "middle")
    .attr("y", 8);

  line = d3
    .lineRadial()
    .angle(function (d) {
      return radialScale(d.Month);
    })
    .radius(function (d) {
      return distScale(d.Anomaly);
    });
}

function updateChart(data, nextYear) {
  const trans = d3.transition().duration(400).ease(d3.easeCubicIn);

  if (nextYear < currYear) {
    const paths = document.getElementById("pathWrapper").children;
    const removeRange = paths.length - (currYear - nextYear);
    const removeElems = [];
    for (let i = removeRange; i < paths.length; i++) {
      removeElems.push(paths[i]);
    }
    removeElems.forEach((elem) => elem.parentNode.removeChild(elem));
  } else if (nextYear > currYear) {
    for (let year = currYear; year < nextYear; year++) {
      const yearData = data.get(String(year));
      //Create path using line function
      const path = pathWrapper
            .append("path")
            .attr("class", "line")
            .attr("stroke-width", 5)
            .attr("fill", "none")
            .attr("d", line(yearData))
            .attr("x", -0.75)
            .style("stroke", colorScale(yearData[0].Anomaly));

      const totalLength = path.node().getTotalLength();

      if ((nextYear-currYear) == 1) {
        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition(trans)
          .attr("stroke-dashoffset", 0);
      }
    }
  }
  yearText.text(nextYear);
  currYear = nextYear;
}

export {initChart, updateChart};
