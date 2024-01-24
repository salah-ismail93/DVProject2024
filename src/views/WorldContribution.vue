<template>
    <div class="mx-auto max-w-5xl py-3">
      <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl text-center">Contribution to CLimate action initiatives</p>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
        A line chart showcasing Yearly contribution trends over past specific years, and a temperature chart specific to
        selected USA state.
      </p>
    </div>
    <div class="line-chart flex items-center justify-center">
      <div id="selector-container" style="clear: left; display: flex; align-items: center; margin-left: 10px;">
        <div id="dataset-selector">
          <label for="dataset-dropdown" style="margin-left: 10px;">Select State:</label>
          <select v-model="selectedDataset" class="selectpicker" id="dataset-dropdown" @change="updateTitle"
            data-style="btn-primary" data-live-search="true">
            <option v-for="option in datasetOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
  
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="year-dropdown" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" style="margin-left: 30px;">
            Select Year
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 250px; overflow-y: auto;">
            <form id="year-checkbox-form" style="padding: 5px;">
              <div v-for="year in years" :key="year">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :value="year" :id="'Checkme' + year"
                    v-model="selectedYears" @change="handleCheckboxChange" />
                  <label :for="'Checkme' + year" class="form-check-label">{{ year }}</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br>
    </div>
    <div class="flex items-center justify-center">
      <div v-if="!isLoading" id="linechart_1">
      </div>
      <div v-if="isLoading">
        <div class="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-32 w-32"></div>
      </div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    name: 'LineChart',
    data() {
      return {
        years: [],
        datasetOptions: [],
        selectedYears: [], // To store the selected years
        selectedDataset: "", // To store the selected dataset
        selectState: null,
        stateName: null,
        isLoading: true,
      };
    },
    methods: {
      updateTitle() {
        this.selectState = document.getElementById("dataset-dropdown");
        this.stateName = this.selectState.options[this.selectState.selectedIndex].innerHTML;
      },
      handleCheckboxChange() {
        // Access the selected years using this.selectedYears
        // You can perform filtering or other actions here
        let checkedCheckboxes = document.querySelectorAll('.form-check-input:checked');
        if (checkedCheckboxes.length > 10) {
          alert('Maximum 10 checkboxes allowed!');
          // Uncheck the last checkbox
          event.target.checked = false;
        }
      }
    },
    // Add your component logic here
    mounted() {
      // Set the dimensions and margins of the graph
      let margin = { top: 60, right: 40, bottom: 70, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
  
      const distinctColors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
        '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5',
        '#c49c94', '#f7b6d2', '#c7c7c7', '#dbdb8d', '#9edae5',
        '#393b79', '#e57171', '#4caf50', '#d32f2f', '#2196f3',
        '#ff5722', '#795548', '#9c27b0', '#607d8b', '#3f51b5',
        '#009688', '#8bc34a', '#ff4081', '#00bcd4', '#e91e63',
        '#ffc107', '#03a9f4', '#673ab7', '#ffeb3b', '#8d6e63',
        '#ff5252', '#8e24aa', '#ff9800', '#00e676', '#18ffff',
        '#304ffe', '#f50057', '#dd2c00', '#ff3d00', '#00b8d4'
      ];
  
      // Append the svg object to the body of the page
      let svg;
  
      // Create a tooltip
      let tooltip = d3.select("#linechart_1")
        .append("section")
        .attr("id", "linechart_tooltip")
        .style("opacity", 0)
        .style("background-color", "lightgray")
        .style("border", "2px solid black")
        .attr("class", "tooltip");
  
  
      function drawLinesAndCircles(position, data, year, color, minTemperature, maxTemperature, type) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
        const x = d3.scaleBand()
          .domain(months)
          .range([0, width])
          .padding(1);
  
        const y = d3.scaleLinear()
          .domain([minTemperature, maxTemperature])
          .range([height, 0]);
  
        if (type == "both") {
          let line = d3.line()
            .defined(function (d) { return !isNaN(d[1]); })
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); });
  
          let filteredData = months.map(function (month) {
            return [month, +data[0][month]];
          }).filter(function (d) {
            return !isNaN(d[1]);
          });
          svg.append("path")
            .datum(filteredData)
            .attr("class", "path-line")
            .attr("id", "path" + year)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 7)
            .attr("d", line);
        }
  
  
  
  
        // Create circles for average
        function createCircles(data, className, temperatureAccessor, fill) {
          svg.selectAll("." + className)
            .data(months.filter(function (month) {
              return !isNaN(data[0][month]); // Filter out NaN values
            }))
            .enter().append("circle")
            .attr("class", className)
            .attr("class", "circle-line")
            .attr("id", "circle" + year)
            .attr("temperatureCelsius", function (d) { return data[0][d]; })
            .attr("year", function () { return data[0].year; })
            .attr("cx", function (d) { return x(d); })
            .attr("cy", function (d) { return y(temperatureAccessor(data[0][d])); })
            .attr("r", 6)
            .style("fill", fill)
            .attr('stroke', "white")
            .attr("stroke-width", 2)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
        }
  
        switch (position) {
          case "Avg":
            createCircles(data, "circle-avg-" + year, function (d) { return d; }, color);
            break;
          case "Max":
            createCircles(data, "circle-max-" + year, function (d) { return d; }, color);
            break;
          case "Min":
            createCircles(data, "circle-min-" + year, function (d) { return d; }, color);
            break
        }
      }
  
      function handleMouseOver(event) {
        // Show the tooltip
        tooltip.transition()
          .duration(200)
          .style("opacity", 1);
  
        // Tooltip content
        const temperatureCelsius = d3.select(this).attr("temperatureCelsius") + "°C";
        const year = d3.select(this).attr("year");
        tooltip.html(`Temperature: ${temperatureCelsius} in year: ${year}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      }
  
      function handleMouseOut() {
        // Hide the tooltip
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      }
  
      function getColorForYear(year) {
        // You can use modulo to cycle through the colors
        const index = year % 50;
        return distinctColors[index];
      }
  
      // Function to update the line chart
      let updateLineChart = (selectedDataset, selectedYears) => {
        if (selectedDataset && selectedYears.length > 0) {
          tooltip = d3.select("#linechart_1")
            .append("section")
            .attr("id", "linechart_tooltip")
            .style("opacity", 0)
            .style("background-color", "lightgray")
            .style("border", "2px solid black")
            .attr("class", "tooltip");
          svg = d3.select("#linechart_1").append("svg")
            .attr("id", "linechart_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
  
          // Read the data
          d3.csv("/all_data_c.csv").then((data) => {
            this.datasetOptions = [...new Set(data.map((d) => d.state))];
            this.years = [...new Set(data.map((d) => d.year))];
            if (selectedDataset && selectedYears) {
              data = data.filter(item => {
                // Specify the desired years and state
                const desiredYears = selectedYears;
                const desiredState = selectedDataset;
                // Check if the item's year and state match the desired values
                return desiredYears.includes(item.year) && item.state === desiredState;
              });
            }
            const dataAvg = data.filter(obj => obj.type === "avg");
            const dataMax = data.filter(obj => obj.type === "max");
            const dataMin = data.filter(obj => obj.type === "min");
            // Extract months
            const allMonths = Object.keys(data[0]).slice(0, 12);
            const months = allMonths.slice(0, allMonths.length);
  
            // Set up scales
            const x = d3.scaleBand()
              .domain(months)
              .range([0, width])
              .padding(1);
  
            let minTemperature = d3.min(data, (d) => {
              return d3.min(months, (month) => {
                return +d[month] - 5;
              });
            });
  
            let maxTemperature = d3.max(data, (d) => {
              return d3.max(months, (month) => {
                return +d[month] + 5;
              });
            });
  
            const y = d3.scaleLinear()
              .domain([minTemperature, maxTemperature])
              .range([height, 0]);
  
            // Add axes
            svg.append("g")
              .attr("transform", `translate(0,${height})`)
              .call(d3.axisBottom(x));
  
            svg.append("g")
              .call(d3.axisLeft(y));
  
            // Add y-axis label
            svg.append("text")
              .attr("text-anchor", "end")
              .attr("x", 50)
              .attr("y", -10)
              .text("Temperature (°C)")
              .style('font-size', '14px');
  
            // Append a title to the SVG
            svg.append("text")
              .attr("x", width / 2)
              .attr("y", 0 - margin.top / 3)
              .attr("text-anchor", "middle")
              .style("font-size", "20px")
              .text(`Temperatures for ${this.stateName || 'Alabama'} in years (${selectedYears.join(', ')})`);
  
            // Iterate through selected years
            selectedYears.forEach((selectedYear, j) => {
              let yearDataAvg = dataAvg.filter(function (d) { return +d.year === +selectedYear && d.type === 'avg'; });
              let yearDataMax = dataMax.filter(function (d) { return +d.year === +selectedYear && d.type === 'max'; });
              let yearDataMin = dataMin.filter(function (d) { return +d.year === +selectedYear && d.type === 'min'; });
  
              // Assume color is a value representing a color in a scale
              const color = d3.color(getColorForYear(selectedYear));
              const colorForAvg = d3.color(color).darker(0.5).toString();
              const colorForMin = d3.color(color).darker(0.1).toString();
              const colorForMax = d3.color(color).darker(1).toString();
  
              drawLinesAndCircles("Avg", yearDataAvg, selectedYear, colorForAvg, minTemperature, maxTemperature, "only_circles");
              drawLinesAndCircles("Max", yearDataMax, selectedYear, colorForMax, minTemperature, maxTemperature, "both");
              drawLinesAndCircles("Min", yearDataMin, selectedYear, colorForMin, minTemperature, maxTemperature, "both");
  
              var highlight = (e, d) => {
                // reduce opacity of all groups
                d3.selectAll(".path-line").style("opacity", .01)
                d3.selectAll(`.circle-line`).style("opacity", .01)
  
                // expect the one that is hovered
                // console.log(e, d,selectedYear)
                d3.selectAll(`#circle${selectedYear}`).style("opacity", 1)
                d3.selectAll(`#path${selectedYear}`).style("opacity", 1)
              }
  
              // And when it is not hovered anymore
              var noHighlight = (e, d) => {
                // console.log(e, d)
                d3.selectAll(".path-line").style("opacity", 1)
                d3.selectAll(`.circle-line`).style("opacity", 1)
              }
  
              var linechart_legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", "translate(20,20)");
  
              linechart_legend.append("rect")
                .attr("class", `legend-rect-${selectedYear}`)
                .attr("x", width - 30)
                .attr("y", j * 20)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", colorForMax)
                .style("cursor", "pointer")
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight);
  
              linechart_legend.append("rect")
                .attr("class", `legend-rect-${selectedYear}`)
                .attr("x", width - 55)
                .attr("y", j * 20)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", colorForAvg)
                .style("cursor", "pointer")
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight);
  
  
              linechart_legend.append("rect")
                .attr("class", `legend-rect-${selectedYear}`)
                .attr("x", width - 80)
                .attr("y", j * 20)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", colorForMin)
                .style("cursor", "pointer")
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight);
  
              linechart_legend.append("text")
                .attr("x", width - 35)
                .attr("y", -10)
                .attr("class", "legend-text-" + selectedYear)
                .text("Max") // Display the key associated with the color
                .style("font-size", "12px")
  
              linechart_legend.append("text")
                .attr("x", width - 60)
                .attr("y", -10)
                .attr("class", "legend-text-" + selectedYear)
                .text("Avg") // Display the key associated with the color
                .style("font-size", "12px")
  
              linechart_legend.append("text")
                .attr("x", width - 85)
                .attr("y", -10)
                .attr("class", "legend-text-" + selectedYear)
                .text("Min") // Display the key associated with the color
                .style("font-size", "12px")
  
              linechart_legend.append("text")
                .attr("x", width - 15)
                .attr("y", j * 20 + 9)
                .attr("class", "legend-text-" + selectedYear)
                .text(selectedYear) // Display the key associated with the color
                .style("font-size", "12px")
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight);
              // Toggle loading state when the chart is fully rendered
              this.isLoading = false;
            });
  
          });
        }
      }
  
      // Initial chart creation with the default dataset
      updateLineChart('Alabama', ['1895']);
  
      // Listen for changes in the dropdown selection
      document.getElementById("dataset-dropdown").addEventListener("change", function () {
        const selectedDataset = this.value;
  
        // Select all checked checkboxes
        const checkedCheckboxes = document.querySelectorAll("#year-checkbox-form input:checked");
  
        // Extract values of checked checkboxes
        const selectedYears = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
  
        d3.select("#linechart_svg").remove();
        updateLineChart(selectedDataset, selectedYears);
        scrollToDiv();
      });
  
      // Add an event listener for changes in the year dropdown
      document.getElementById("year-checkbox-form").addEventListener("change", function () {
        const selectedValue = document.getElementById("dataset-dropdown").value;
  
        // Select all checked checkboxes
        const checkedCheckboxes = document.querySelectorAll("#year-checkbox-form input:checked");
  
        // Extract values of checked checkboxes
        const selectedYears = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
  
        const selectedDataset = selectedValue;
  
        d3.select("#linechart_svg").remove();
        updateLineChart(selectedDataset, selectedYears);
        scrollToDiv();
      });
  
      function scrollToDiv() {
        // Access the target div using its id
        const targetDiv = document.getElementById('linechart_1');
  
        if (targetDiv) {
          // Scroll to the target div
          targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  
  }
  </script>
  
  <style scoped></style>
  