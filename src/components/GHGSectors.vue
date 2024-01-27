<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div class="flex">
                <div id="GHGSectors"></div>
                <div id="GHGSectorslegend"></div>
                <div class="text-gray-700">
                    <p class="font-bold">Shifting Focus to Asia: Exploring the Global Impact of Covid-19</p>
                    <p class="mt-2">Geographical knowledge informs us about the division of the world into seven significant
                        land masses.</p>

                    <p class="mt-2">In order to comprehend the global repercussions of Covid-19, it is crucial to emphasize
                        the significance of Asia. Not only does it occupy the largest land area, accounting for 30% of the
                        Earth's surface, but it is also home to the majority of the world's population, representing 60%.
                    </p>

                    <p class="mt-2">The pie chart illustrates the distribution of GHG across different
                        Industries.</p>

                    <p class="mt-4">
                        <a href="#chart-container" class="text-blue-700">Next ...</a>
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
        d3.csv("/GHGSectors.csv").then(function (data) {
            data.forEach(function (d) {
                d.percentage = +d.percentage;
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
                    tooltip
                        .html(
                            d.data.Industry +
                            "<br>" +
                            " (" +
                            ((d.data.percentage)) +
                            "%)"
                        )
                        .style("visibility", "visible");
                })
                .on("mousemove", function () {
                    tooltip
                        .style("top", event.pageY - 10 + "px")
                        .style("left", event.pageX + 10 + "px");
                })
                .on("mouseout", function () {
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
                .attr("width", 300)
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

