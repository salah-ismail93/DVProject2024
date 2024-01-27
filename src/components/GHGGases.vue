<template>
    <div id="viz_container"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'GHGGases',
    mounted() {
        // set the dimensions and margins of the graph
        const margin = { top: 80, right: 20, bottom: 50, left: 40 };
        const width = 450 - margin.left - margin.right;
        const height = 260 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select("#viz_container")
            .append("svg")
            .attr("width", 900)
            .attr("height", 900)
            .attr("viewBox", "0 0 450 350")
            .attr("preserveAspectRatio", "xMinYMin")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // parse the Data
        d3.csv("/total_emissions_by_year_Percentage (1).csv")
            .then(function (data) {

                // list of value keys
                const typeKeys = data.columns.slice(1);

                // stack the data
                const stack = d3.stack()
                    .keys(typeKeys.reverse())
                    .order(d3.stackOrderNone)
                    .offset(d3.stackOffsetNone)
                const stackedData = stack(data)

                // X scale and Axis
                const xScale = d3.scaleBand()
                    .domain(data.map(d => d.Year))
                    .range([0, width])
                    .padding(.2);
                svg
                    .append('g')
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(8));

                // Y scale and Axis
                const yScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([height, 0]);
                svg
                    .append('g')
                    .call(d3.axisLeft(yScale).ticks(10).tickSize(0).tickPadding(4).tickFormat(d => d + "%"))
                    .call(d => d.select(".domain").remove());

                // color palette
                const color = d3.scaleOrdinal()
                    .domain(typeKeys.reverse())
                    .range(["#18375F", "#0072BC", "#8EBEFF", "#00B398"])

                // set horizontal grid line
                const GridLine = function () { return d3.axisLeft().scale(yScale) };
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
                    .attr("class", "tooltip");

                // tooltip events
                const mouseover = function (d) {
                    tooltip
                        .style("opacity", 1)
                    d3.select(this)
                        .style("stroke", "#EF4A60")
                        .style("opacity", .5)
                };
                const mousemove = function (event, d) {
                    const subgroupName = d3.select(this.parentNode).datum().key;
                    const subgroupValue = d.data[subgroupName];
                    const f = d3.format(".0f");
                    tooltip
                        .html(`<b>${subgroupName}</b>:  ${f(subgroupValue)}%`)
                        .style("top", event.pageY - 10 + "px")
                        .style("left", event.pageX + 10 + "px")
                };
                const mouseleave = function (d) {
                    tooltip
                        .style("opacity", 0)
                    d3.select(this)
                        .style("stroke", "none")
                        .style("opacity", 1)
                };

                // create bars
                svg.append("g")
                    .selectAll("g")
                    .data(stackedData)
                    .join("g")
                    .attr("fill", d => color(d.key))
                    .selectAll("rect")
                    .data(d => d)
                    .join("rect")
                    .attr("x", d => xScale(d.data.Year))
                    .attr("y", d => yScale(d[1]))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => yScale(d[0]) - yScale(d[1]))
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)

                // set title
                svg
                    .append("text")
                    .attr("class", "chart-title")
                    .attr("x", -(margin.left) * 0.7)
                    .attr("y", -(margin.top) / 1.5)
                    .attr("text-anchor", "start")
                    .text("Levels of GHG | 1850-2021")

                // set source
                svg
                    .append("text")
                    .attr("class", "chart-source")
                    .attr("x", -(margin.left) * 0.7)
                    .attr("y", height + margin.bottom * 0.7)
                    .attr("text-anchor", "start")
                    .text("Source: UNHCR")

                // set copyright
                svg
                    .append("text")
                    .attr("class", "copyright")
                    .attr("x", -(margin.left) * 0.7)
                    .attr("y", height + margin.bottom * 0.9)
                    .attr("text-anchor", "start")
                    .text("©UNHCR, The UN Refugee Agency")

                //set legend
                svg
                    .append("rect")
                    .attr("x", -(margin.left) * 0.7)
                    .attr("y", -(margin.top / 2.5))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#18375F")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", -(margin.left) * 0.6 + 15)
                    .attr("y", -(margin.top / 3.5))
                    .text("N₂O nitrous oxide")
                svg
                    .append("rect")
                    .attr("x", 80)
                    .attr("y", -(margin.top / 2.5))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#0072BC")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", 100)
                    .attr("y", -(margin.top / 3.5))
                    .text("CH₄ methane")
                svg
                    .append("rect")
                    .attr("x", 170)
                    .attr("y", -(margin.top / 2.5))
                    .attr("width", 13)
                    .attr("height", 13)
                    .style("fill", "#8EBEFF")
                svg
                    .append("text")
                    .attr("class", "legend")
                    .attr("x", 190)
                    .attr("y", -(margin.top / 3.5))
                    .text("CO₂ carbon dioxide")
            })
    }
}
</script>

<style scoped>
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

::v-deep .tooltip {
    background-color: #ffffff;
    font-family: lato;
    font-size: 11px;
    padding: 4px;
    color: #666666;
    border: none;
    box-shadow: 0px 0px 3px 0px #E6E6E6;
}

::v-deep .legend {
    font-size: 10px;
}</style>
