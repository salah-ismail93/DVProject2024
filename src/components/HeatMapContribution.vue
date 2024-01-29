<template>
  <!-- Heatmap -->
  <div class="bg-white px-6 lg:px-8 text-center">
    <div class="mx-auto max-w-5xl">
      <h2 class="title" style=" font-size: 20px; font-weight: 100;"> Who is helping! </h2>
      <p class="mt-3 text-base leading-7 text-indigo-100 sm:text-l" id="texttt">
        The heatmap below illustrates the financial performance of the top 10 countries over the selected years.
         Each cell in the heatmap represents the financial value (in Million od Euros) for a specific country in a given year. Darker shades indicate higher financial values, while lighter shades indicate lower values.
        
         Explore the heatmap to analyze how the financial performance of different countries has evolved over time. 
        Hover over each cell to view detailed information about the financial value for a specific country and year.
      </p>
        <div class="flex justify-center py-3 hidden" id="A1chart2">
        <div class="tooltip A1chart2Inner"></div>
        <!-- Heatmap container -->
        <div id="heatmap-container"></div>
      </div>
      <div ref="legend" id="chart_2_legend"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'HeatMapContribution',
  mounted() {
    // Heatmap
    const heatmapMargin = { top: 10, right: 10, bottom: 30, left: 150 };
    const heatmapWidth = 1000 - heatmapMargin.left - heatmapMargin.right;
    const heatmapHeight = 500 - heatmapMargin.top - heatmapMargin.bottom;

    // Create SVG element for Heatmap
    d3.select("#heatmap-container").html(""); // Clear the content before re-rendering
    const heatmapSvg = d3.select('#heatmap-container')
      .append('svg')
      .attr('width', heatmapWidth + heatmapMargin.left + heatmapMargin.right)
      .attr('height', heatmapHeight + heatmapMargin.top + heatmapMargin.bottom)
      .append('g')
      .attr('transform', `translate(${heatmapMargin.left},${heatmapMargin.top})`);

    d3.csv('/transformed_file.csv').then((data) => {
      const aggregatedData = d3.rollup(
        data,
        (v) => d3.sum(v, (d) => +d.value),
        (d) => d.geo
      );

      const topCountries = Array.from(aggregatedData)
        .sort((a, b) => b[1] - a[1]) // Sort countries by total value
        .slice(0, 10) // Get the top 10 countries
        .map((d) => d[0]); // Extract country names

      const filteredData = data.filter((d) => topCountries.includes(d.geo));
      drawHeatmap(filteredData);
      document.getElementById('A1chart2').classList.remove('hidden');
    });

    const drawHeatmap = (data) => {
      const years = Array.from(new Set(data.map((d) => d.year))).sort();
      const countries = Array.from(new Set(data.map((d) => d.geo))).sort();

      const xScale = d3.scaleBand().domain(years).range([0, heatmapWidth]);
      const yScale = d3.scaleBand().domain(countries).range([0, heatmapHeight]);

      const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, d3.max(data, (d) => +d.value)]);

      const tooltip = d3.select("#A1chart2")
        .append("div")
        .attr("class", "tooltip");

      function mouseover(event, d) {
        const value = d.value;
        console.log("value=", value);
        const country = d.geo;
        console.log("country=", country);
        tooltip
          .html(`Country: ${country}<br>Year: ${d.year}<br>Value: ${value}`)
          .style('opacity', 1);
        d3.select(this).attr('fill', '#0255ee');
      }

      function mousemove() {
        tooltip
          .style('left', `${event.pageX + 40}px`)
          .style('top', `${event.pageY + 5}px`);
      }

      function mouseleave() {
        tooltip.style('opacity', 0);
        d3.select(this).attr('fill', (d) => colorScale(+d.value));
      }

      heatmapSvg.selectAll('*').remove();

      heatmapSvg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d.geo))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('fill', (d) => colorScale(+d.value))
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);

      heatmapSvg.append('g').call(d3.axisBottom(xScale)).attr('transform', `translate(0,${heatmapHeight})`);
      heatmapSvg.append('g').call(d3.axisLeft(yScale));

      const legendWidth = 500, legendHeight = 20;

      // Draw the rectangle and fill with gradient
      heatmapSvg.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)")
        .attr("transform", `translate(${heatmapWidth - legendWidth}, ${heatmapHeight + 40})`);

      // Create scale for legend axis
      const legendScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => +d.value)])
        .range([0, legendWidth]);

      // Create legend axis
      const legendAxis = d3.axisBottom(legendScale).ticks(5);
      heatmapSvg.append("g")
        .attr("transform", `translate(${heatmapWidth - legendWidth}, ${heatmapHeight + 60})`)
        .call(legendAxis);

      // Set up SVG container for the legend
      d3.select("#chart_2_legend").html(""); // Clear the content before re-rendering
      const svg = d3
        .select(this.$refs.legend)
        .append('svg')
        .attr('width', 600) // adjust the width as needed
        .attr('height', 50); // adjust the height as needed

      // Define the gradient
      const gradientHeatMap = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradientHeatMap')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      // Add gradient stops
      gradientHeatMap
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorScale(0));

      gradientHeatMap
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorScale(d3.max(data, (d) => +d.value)));


      // Add a rectangle filled with the gradient
      svg
        .append('rect')
        .attr('width', 500) // adjust the width as needed
        .attr('height', 20) // adjust the height as needed
        .style('fill', 'url(#gradientHeatMap)');

      // Add axis for reference
      const axisScale = d3.scaleLinear().domain([0, d3.max(data, (d) => +d.value)]).range([0, 500]); // adjust the range as needed

      const axis = d3.axisBottom(axisScale).ticks(5);

      svg.append('g').attr('transform', 'translate(0, 30)').call(axis);
    };
  }
}
</script>

<style >
 .tooltip {
  opacity: 0;
  background-color: #2f2f2f;
  color: #f0f0f0;
  border: solid;
  border-width: 2px;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1080;
  display: block;
  margin: 0;
  font-family: var(--bs-font-sans-serif);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  font-size: .875rem;
  word-wrap: break-word;
} 
#chart_2_legend {
  margin-left: 30%;
  padding-bottom: 5px;
}
#texttt{
  color:black;
}
.title{
 
}
</style>