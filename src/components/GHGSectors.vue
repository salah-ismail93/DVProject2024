<template>
    <div class="bg-white">
        <div class="mx-auto max-w-10xl px-6 py-1 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div class="flex">
                <div id="GHGSectors"></div>
                <div id="GHGSectorslegend"></div>
                <div class="text-gray-700 text-left">
                    <h1 class="font-bold text-left">Emissions by sector: where do greenhouse gases come from?</h1>
                    <p class="mt-2">According to the 2020 statistics from <b>
                        <a target="_blank" href="https://ourworldindata.org/emissions-by-sector"><u>Ourworldindata.org</u></a>
                        </b> regarding the impact of each life sector in the global warming, 
                        we can make a small comparison to know where to target with our efforts in general.</p>
                     
                    <p class="mt-2">The aside pie chart illustrates the distribution of GHG across different
                        Industries.</p>

                    <p class="mt-2">We can notice that Electricity and heat has the most powerful impact regarding the GHG, followed by Transportation, which 
                        is very predictable since these sectors relay the most on engines and machines run by gas.
                    </p>
                    <p class="mt-2">After that we have Agriculture for almost 13% and Manufacturing and Construction with slightly less value for 12.24%, and then we have other sectors that are under 10%.
                    </p>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'GHGSectors',
    // Your component's JavaScript code goes here
    mounted() {
        // Width and height of the chart
        var width = 400;
        var height = 400;

        // Radius of the pie chart
        var radius = Math.min(width, height) / 2;

        // Color scale
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // Create SVG element
        d3.select("#GHGSectors").html(""); // Clear the content before re-rendering
        var svg = d3
            .select("#GHGSectors")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Read data from CSV file
        d3.csv("/ghg-emissions-by-sectors.csv").then(function (data) {
            data.forEach(function (d) {
                d.percentage = (+d.percentage).toFixed(2);
            });

            // Generate pie chart
            var pie = d3
                .pie()
                .value((d) => d.percentage)
                .sort(null);

            var path = d3.arc().outerRadius(radius).innerRadius(0);

            var arc = svg.selectAll("arc").data(pie(data)).enter();

            arc
                .append("path")
                .attr("d", path)
                .attr("fill", (d) => color(d.data.Industry))
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .on("mouseover", function (e, d) {
                    d3.select(this)
                  
                    .attr("fill", "grey")
                    .attr("stroke-width", "7px");
                    tooltip

                        .html(
                            d.data.Industry +
                            "<br>" +
                            " (" +
                            ((d.data.percentage)) +
                            "%)"
                        )
                        .style("visibility", "visible")

                })
                .on("mousemove", function () {
                    tooltip
                        .style("top", event.pageY - 10 + "px")
                        .style("left", event.pageX + 10 + "px");
                })
                .on("mouseout", function () {
                    d3.select(this)
                    .attr("stroke-width","2px")

                    .attr("fill", (d) => color(d.data.Industry));
                    tooltip.style("visibility", "hidden");
                });

            // Add tooltip
            var tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip3")
                .style("visibility", "hidden");

            // Create legend
            d3.select("#GHGSectorslegend").html(""); // Clear the content before re-rendering
            var legendSvg = d3
                .select("#GHGSectorslegend")
                .append("svg")
                .attr("width", 400)
                .attr("height", height);

            var legendItems = legendSvg
                .selectAll(".legend-item")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "legend-item")
                .attr("transform", function (d, i) {
                    var itemHeight = 20;
                    var itemSpacing = 10;
                    var legendHeight = data.length * itemHeight + (data.length - 1) * itemSpacing;
                    var offsetY = (height - legendHeight) / 2;
                    return "translate(0," + (offsetY + i * (itemHeight + itemSpacing)) + ")";
                });

            legendItems
                .append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", (d) => color(d.data.Industry));

            legendItems
                .append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text(function (d) {
                    return (
                        d.data.Industry +
                        " (" +
                        ((d.data.percentage)) +
                        "%)"
                    );
                });
        });
    }
}
</script>

<style>
@font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/robotoslab/v14/BngMUXZYTXPIvIBgJJSb6ufN5qA.woff2') format('woff2'); /* You can change this URL to the appropriate one if you have the font files locally */
}
h1{
    font-family: "Roboto Slab";
}
#GHGSectorslegend {
    margin-left: 20px;
}

.tooltip3 {
    position: absolute;
    padding: 6px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 4px;
    pointer-events: none;
    font-size: 150%;
}

.tooltip h3 {
    font-size: 0.8em;
    margin-bottom: 2px;
    padding: 0;
}

.tooltip p {
    font-size: 0.7em;
    margin-bottom: 2px;
    padding: 0;
}

</style>

