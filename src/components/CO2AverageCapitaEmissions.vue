<template>
    <div class="flex flex-col">
        <div class="mx-auto max-w-5xl py-3">
            <h1 class="mt-4 text-base leading-7 text-center">Who is above or below the global average of capita CO₂ emissions!</h1>
            <p class="mt-6 max-w-2xl text-base leading-8 text-gray-600 text-left">
                This map visual comparison of countries in terms of per capita emissions. So it indicates whether a country's average per capita emissions are above or below the value of global per
                capita emissions (5 tonnes per person). This is based on territorial emissions, which don't
                adjust for trade.
            </p>
        </div>
        <div class="mx-auto max-w-10xl text-center">
            <div id="chart4Div3" class="flex flex-col items-center">
                <svg id="chart4_3" width="1200" height="500"></svg>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'CO2AverageCapitaEmissions',
    data() {
        return {
            // Add your data properties here
        }
    },
    // Add your component logic here
    mounted() {
        this.drawCO2AverageCapitaEmissions();
    },
    methods: {
        drawCO2AverageCapitaEmissions() {
            var margin = { top: 200, right: 30, bottom: 50, left: 500 };
            // The svg
            var svg4 = d3.select("#chart4_3"),
                width = +svg4.attr("width") - margin.left - margin.right,
                height = +svg4.attr("height") - margin.top - margin.bottom;

            // Map and projection

            let projection4 = d3
                .geoNaturalEarth1()
                .scale(150)
                .translate([width, height]);

            // Data and color scale
            var data4 = new Map();
            let colorScale4 = d3
                .scaleThreshold()
                .domain([5])
                .range(["#92c5de", "#f4a582"]);

            var tooltipA3T4 = d3
                .select("#chart4Div3")
                .append("div")
                .attr("class", "tooltip");

            // Load external data and boot
            Promise.all([
                d3.json("/countries.geo.json"),
                d3.csv("/per-capita-co2-vs-average.csv")
            ]).then(([topo, data]) => {
                data.forEach(d => {
                    data4.set(d.Entity, +d["Annual CO₂ emissions (per capita)"]);
                });

                ready4(null, topo); // Call ready4 with loaded topo data

                // ... (rest of your code remains mostly the same)
            }).catch(error => console.error("Error loading data:", error));

            function ready4(error, topo) {
                let mouseOver = function (e, d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", 0.5)
                        .style("stroke", "transparent");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "red");

                    tooltipA3T4.transition().duration(200).style("opacity", 1);
                    tooltipA3T4
                        .html(
                            "<span style='color:grey'>Country: </span>" +
                            d.properties.name +
                            "<br>" +
                            "<span style='color:grey'>Annual CO₂ emissions (per capita): </span>" +
                            d.total.toFixed(2) + "<span style='color:grey'> tonnes per person</span>"
                        )
                        .style("top", event.pageY + "px");
                };
                let mouseMove = function (e, d) {
                    tooltipA3T4
                        .style("left", event.pageX + 30 + "px")
                        .style("top", event.pageY + "px");
                };

                let mouseLeave = function (e, d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    d3.select(this).transition().duration(200).style("stroke", "black");

                    tooltipA3T4.transition().duration(200).style("opacity", 0);
                };

                let path = d3.geoPath().projection(projection4);

                let mouseDotOver = function (e, d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", 0.5)
                        .style("stroke", "transparent");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "red");

                    tooltipA3T4.transition().duration(200).style("opacity", 1);

                    tooltipA3T4
                        .html(
                            "<span style='color:grey'>Country: </span>" +
                            d.Entity +
                            "<br>" +
                            "<span style='color:grey'>Annual CO₂ emissions (per capita): </span>" +
                            d["Annual CO₂ emissions (per capita)"].toFixed(2) + "<span style='color:grey'> tonnes per person</span>"
                        )
                        .style("top", event.pageY + "px");
                };

                let mouseDotLeave = function () {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    d3.select(this).transition().duration(200).style("stroke", "black");

                    tooltipA3T4.transition().duration(200).style("opacity", 0);
                };
                // Draw the map
                let world = svg4
                    .append("g")
                    .selectAll("path")
                    .data(topo.features)
                    .enter()
                    .append("path")
                    // draw each country
                    .attr("d", path)
                    // set the color of each country
                    .attr("fill", function (d) {
                        let abundance_value = data4.get(d.properties.name) || 0;
                        d.total = abundance_value;
                        let color_value = abundance_value != 0 ? colorScale4(d.total) : "white"
                        return color_value;
                    })
                    .style("stroke", "black")
                    .attr("class", function (d) {
                        return "Country";
                    })
                    .style("opacity", 1)
                    .on("mouseover", mouseOver)
                    .on("mousemove", mouseMove)
                    .on("mouseleave", mouseLeave);


                world.append("rect")
                    .attr("class", "background")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "transparent");

                // Legend
                // Calculate the position for the legend
                const legendX = width - 500;
                const legendY = height / 2;

                const x = d3.scaleLinear()
                    .domain([2.6, 75.1])
                    .rangeRound([600, 860]);

                const legend = svg4.append("g")
                    .attr("id", "choropleth_legend")
                    .attr("transform", `translate(${legendX}, ${legendY})`);

                const legend_entry = legend.selectAll("g.legend")
                    .data(colorScale4.range().map(function (d) {
                        d = colorScale4.invertExtent(d);
                        if (d[0] == null) d[0] = x.domain()[0];
                        if (d[1] == null) d[1] = x.domain()[1];
                        return d;
                    }))
                    .enter().append("g")
                    .attr("class", "legend_entry")
                    .classed("Below_global_equity", function (d, i) {
                        // Add your condition based on data or index if needed
                        return i === 0; // Example: apply the class to the first data point
                    })
                    .classed("Above_global_equity", function (d, i) {
                        // Add your condition based on data or index if needed
                        return i === 1; // Example: apply the class to the second data point
                    });
                legend_entry.filter(".Below_global_equity")
                    .on("mouseover", function (d, i, nodes) {
                        // Your mouseover event handling code for Below_global_equity here
                        console.log("Mouseover on Below_global_equity:", d, i, nodes);
                        // Add any additional code you want to execute on mouseover
                        // Adjust the opacity of map elements associated with "Below_global_equity"
                        world.filter(d => data4.get(d.properties.name) > 5)
                            .style("opacity", 0.1);  // Adjust the opacity as needed
                    }).on("mouseout", function () {
                        // Your mouseout event handling code for Below_global_equity here

                        // Reset the opacity of map elements on mouseout
                        world.style("opacity", 1);
                    });

                legend_entry.filter(".Above_global_equity")
                    .on("mouseover", function (d, i, nodes) {
                        // Your mouseover event handling code for Above_global_equity here
                        console.log("Mouseover on Above_global_equity:", d, i, nodes);
                        // Add any additional code you want to execute on mouseover
                        // Adjust the opacity of map elements associated with "Below_global_equity"
                        world.filter(d => data4.get(d.properties.name) < 5)
                            .style("opacity", 0.1);  // Adjust the opacity as needed
                    }).on("mouseout", function () {
                        // Your mouseout event handling code for Below_global_equity here

                        // Reset the opacity of map elements on mouseout
                        world.style("opacity", 1);
                    });

                const ls_w = 20,
                    ls_h = 20;

                legend_entry.append("rect")
                    .attr("x", 20)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - 2 * ls_h;
                    })
                    .attr("width", ls_w)
                    .attr("height", ls_h)
                    .style("fill", function (d) {
                        return colorScale4(d[0]);
                    });

                legend_entry.append("text")
                    .attr("x", 45)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - ls_h - 6;
                    })
                    .text(function (d, i) {
                        if (i === 0) return "Below global equity";
                        if (d[1] < d[0]) return "> " + d[0] / 1000 + "k";
                        return "Above global equity";
                    });

                legend.append("text").attr("x", 15).attr("y", 180).text("Annual CO₂ emissions (per capita)");
            }

        }
    }
}
</script>

<style>
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
</style>
