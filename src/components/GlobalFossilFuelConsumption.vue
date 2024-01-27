<template>
    <div id="area_chart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: 'GlobalFossilFuelConsumption',
    // Your component's JavaScript code goes here
    mounted() {
        // set the dimensions and margins of the graph
        const margin = { top: 100, right: 20, bottom: 50, left: 40 };
        const width = 450 - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#area_chart")
            .append("svg")
            .attr("width", 900)
            .attr("height", 900)
            .attr("viewBox", "0 0 450 350")
            .attr("preserveAspectRatio", "xMinYMin")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // parse the Data
        d3.csv("/global-fossil-fuel-consumption.csv")
            .then(function (data) {

                // list of value keys
                const typeKeys = data.columns.slice(1);
                const yearKeys = data.map(d => d.Year)

                // stack the data
                const stack = d3.stack()
                    .keys(typeKeys)
                    .order(d3.stackOrderNone)
                    .offset(d3.stackOffsetNone)
                const stackedData = stack(data)

                // X scale and Axis
                const xScale = d3.scalePoint()
                    .domain(yearKeys)
                    .range([0, width])
                    .padding(.2);
                svg
                    .append('g')
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(8))
                    .selectAll(".tick text")
                    .style("font-size", "7px");

                // Y scale and Axis
                const yScale = d3.scaleLinear()
                    .domain([0, 120000])
                    .range([height, 0]);
                svg
                    .append('g')
                    .call(d3.axisLeft(yScale).ticks(9).tickSize(0).tickPadding(6))
                    .call(d => d.select(".domain").remove());

                // color palette
                const color = d3.scaleOrdinal()
                    .domain(typeKeys)
                    .range(["#4c699c", "#883039", "#578145"])

                // set horizontal grid line
                const GridLine = () => d3.axisLeft().scale(yScale);
                svg
                    .append("g")
                    .attr("class", "grid")
                    .call(GridLine()
                        .tickSize(-width, 0, 0)
                        .tickFormat("")
                    );

                // create a tooltip
                const tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "chart")
                    .attr("class", "tooltip");

                // tooltip events
                const mouseover = function (d) {
                    tooltip
                        .style("opacity", .8)
                    d3.select(this)
                        .style("opacity", .5)
                }
                const mouseleave = function (d) {
                    tooltip
                        .style("opacity", 0)
                    d3.select(this)
                        .style("opacity", 1)
                }

                svg
                    .append("g")
                    .selectAll("g")
                    .data(stackedData)
                    .join("path")
                    .attr("fill", d => color(d.key))
                    .attr("d", d3.area()
                        .x(d => xScale(d.data.Year))
                        .y0(d => yScale(+d[0]))
                        .y1(d => yScale(+d[1]))
                    )
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => yScale(d[0]) - yScale(d[1]))
                    .on("mouseover", mouseover)
                    .on("mouseleave", mouseleave)

                // set title
                svg
                    .append("text")
                    .attr("class", "chart-title")
                    .attr("x", -(margin.left) * 0.6)
                    .attr("y", -(margin.top) / 1.5)
                    .attr("text-anchor", "start")
                    .text("Global fossil fuel consumption")

                // set Y axis label
                svg
                    .append("text")
                    .attr("class", "chart-label")
                    .attr("x", -(margin.left) * 0.6)
                    .attr("y", -(margin.top / 8))
                    .attr("text-anchor", "start")
                    .text("Tterawatt-hours")

                // set source
                svg
                    .append("text")
                    .attr("class", "chart-source")
                    .attr("x", -(margin.left) * 0.6)
                    .attr("y", height + margin.bottom * 0.7)
                    .attr("text-anchor", "start")
                    .text("Source: Our World in Data")

                // set copyright
                svg
                    .append("text")
                    .attr("class", "copyright")
                    .attr("x", -(margin.left) * 0.6)
                    .attr("y", height + margin.bottom * 0.9)
                    .attr("text-anchor", "start")
                    .text("Article, https://ourworldindata.org/fossil-fuels")

                //set legend
                svg
                    .append("rect")
                    .attr("x", -(margin.left) * 0.6)
                    .attr("y", -(margin.top / 2))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#4c699c")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", -(margin.left) * 0.6 + 20)
                    .attr("y", -(margin.top / 2.5))
                    .text("Coal (TWh)")
                svg
                    .append("rect")
                    .attr("x", 60)
                    .attr("y", -(margin.top / 2))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#883039")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", 80)
                    .attr("y", -(margin.top / 2.5))
                    .text("Oil (TWh)")
                svg
                    .append("rect")
                    .attr("x", 150)
                    .attr("y", -(margin.top / 2))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#578145")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", 170)
                    .attr("y", -(margin.top / 2.5))
                    .text("Gas (TWh)")
                // Define the years you want to display
                const targetYears = [1800, 1850, 1900, 1950, 2000, 2022];

                // Get the SVG element
                const svg2 = document.getElementById("area_chart").childNodes[0];

                // Select and keep only the ticks for the target years
                const ticks = Array.from(svg2.firstElementChild.childNodes[0].childNodes);
                console.log("ticks", ticks);
                for (let i = 0; i < ticks.length; i++) {
                    if (i == 0) {
                        continue;
                    }
                    ticks
                        .filter(function (tick) {
                            const year = parseInt(tick.textContent);
                            return !targetYears.includes(year);
                        })
                        .forEach(function (tick) {
                            tick.remove();
                        });
                }
            })
    }
}
</script>

<style scoped>
/* Your component's CSS code goes here */

::v-deep text {
    font-family: lato;
    font-size: 10px;
    fill: #333333;
}

::v-deep .grid path {
    stroke-width: 0;
    stroke: #333333;
}

::v-deep .grid .tick line {
    stroke: #333333;
    stroke-width: 0.3px;
    stroke-opacity: 0.3;
}

::v-deep text.chart-title {
    font-size: 14px;
    font-weight: bold;
    fill: #222222
}

::v-deep text.chart-label {
    font-size: 10px;
    font-weight: 400;
    fill: #999999;
}

::v-deep text.chart-source {
    font-size: 8px;
    fill: #999999;
}

::v-deep text.copyright {
    font-size: 8px;
    fill: #999999;
}

::v-deep .legend {
    font-size: 10px;
}
</style>
