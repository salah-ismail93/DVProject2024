<template>
    <div class="mx-auto max-w-10xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div class="flex">

            <div class="text-gray-700">
                <h1 class="font-bold">Global warming means Sea level rising !!</h1>
                <p class="mt-2">Sea levels are inextricably tied to global temperatures and the levels of land-based ice. 
                     When temperatures rise, land-based ice is lost and sea levels rise.</p>

                <p class="mt-2">Time passing by, the sea level rise caused by each major factor
                     has increased, which is consistent with the conclusion that the rate of sea 
                     level rise is accelerating. The contributions of each major factor to global 
                     sea level rise are shown in the donut chart for the period between 1993-2018
                    </p>
                    <p>
                        And ofcourse each of these factors are effected in different percentages by the global warming, and that as shown has a huge impact on the sea level
                    </p>
            </div>
            <div id="GHGCountrieslegend"></div>
            <div id="GHGCountries"></div>

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'GHGCountries',

    mounted() {
        // Width and height of the chart
        var width = 500;
        var height = 500;

        // Radius of the donut chart
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
        d3.csv("/sea.csv").then(function (data) {
            data.forEach(function (d) {
                d.CO2_emission_Megatons = +d.CO2_emission_Megatons;
                d.percentage = +d.percentage;
            });

            // Generate donut chart
            var donut = d3
                .pie()
                .value((d) => d.percentage)
                .sort(null);

            var arc = d3.arc().outerRadius(radius - 30).innerRadius(radius / 2); // Adjust innerRadius for the donut hole


            var path = svg.selectAll("path")
                .data(donut(data))
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d) => color(d.data.Country))
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .on("mouseover", function (e, d) {
                    d3.select(this)

                        .attr("fill", "grey")
                        .attr("stroke-width", "7px");
                    tooltip
                        .html(
                            d.data.Country +
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
                    d3.select(this)

                        .attr("fill", (d) => color(d.data.Country))
                        .attr("stroke-width", "2px");
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
                .attr("width", 250)
                .attr("height", height);

            var legendItems = legendSvg
                .selectAll(".legend-item")
                .data(donut(data))
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
    margin-left: 15px;


}
</style>
