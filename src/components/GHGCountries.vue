<template>
    <div class="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div class="flex">
            <div id="GHGCountries"></div>
            <div id="GHGCountrieslegend"></div>
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
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'GHGCountries',
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
        d3.select("#GHGCountries").html(""); // Clear the content before re-rendering
        var svg = d3
            .select("#GHGCountries")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Read data from CSV file
        d3.csv("/GHGCountries.csv").then(function (data) {
            data.forEach(function (d) {
                d.CO2_emission_Megatons = +d.CO2_emission_Megatons;
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
                .attr("fill", (d) => color(d.data.Country))
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .on("mouseover", function (e, d) {
                    tooltip
                        .html(
                            d.data.Country +
                            "<br>" +
                            d.data.CO2_emission_Megatons +
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
            d3.select("#GHGCountrieslegend").html(""); // Clear the content before re-rendering
            var legendSvg = d3
                .select("#GHGCountrieslegend")
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
                .attr("fill", (d) => color(d.data.Country));

            legendItems
                .append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text(function (d) {
                    return (
                        d.data.Country +
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
#GHGCountrieslegend {
    margin-left: 20px;
}
</style>
