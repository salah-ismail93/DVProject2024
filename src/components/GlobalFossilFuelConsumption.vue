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
                const transformedData = data.flatMap(entry => {
                    const date = parseInt(entry.Year);

                    return [
                        {
                            date,
                            hours: parseFloat(entry["Gas (TWh, direct energy)"]),
                            resourceType: "Gas"
                        },
                        {
                            date,
                            hours: parseFloat(entry["Oil (TWh, direct energy)"]),
                            resourceType: "Oil"
                        },
                        {
                            date,
                            hours: parseFloat(entry["Coal (TWh, direct energy)"]),
                            resourceType: "Coal"
                        }
                    ];
                });

                const groupedData = transformedData.reduce((acc, entry) => {
                    const key = entry.date.toString();
                    if (!acc[key]) {
                        acc[key] = { key, values: [] };
                    }
                    acc[key].values.push(entry);
                    return acc;
                }, {});

                const sumstat = Object.values(groupedData);

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
                const mouseover2 = function (event) {
                    event.preventDefault();
                    const mouse = d3.pointer(event);
                    const [xCoord, yCoord] = mouse;
                    //const mouseDate = xScale.invert(xCoord);
                    const domainValues = xScale.domain();
                    const mouseDate = domainValues.reduce((closest, d) => (
                        Math.abs(xScale(d) - xCoord) < Math.abs(xScale(closest) - xCoord) ? d : closest
                    ), domainValues[0]);
                    // Use `sumstat`, not `data`, to get the correct data object for all traces
                    const bisectDate = d3.bisector(d => d.key).left;
                    const xIndex = bisectDate(sumstat, mouseDate);
                    // We get the key directly from xVal
                    const xVal = sumstat[xIndex].key;

                    if (xScale(xVal) <= 0) return;

                    svg
                        .selectAll(".hoverLine")
                        .attr("x1", xScale(xVal))
                        .attr("y1", yScale.range()[0])
                        .attr("x2", xScale(xVal))
                        .attr("y2", yScale.range()[1])
                        .attr("stroke", "#69b3a2")
                        .attr("fill", "#cce5df");

                    const isLessThanHalf = xIndex > sumstat.length / 2;
                    const hoverTextX = isLessThanHalf ? "-0.75em" : "0.75em";
                    const hoverTextAnchor = isLessThanHalf ? "end" : "start";

                    // Create a mapping of type (DMND/SPLY) to single and stacked Y values
                    const yVals = {
                        Gas: { color: "black" },
                        Oil: { color: "black" },
                        Coal: { color: "black" },
                    };
                    sumstat[xIndex].values.forEach((el) => {
                        // Get the single values from `sumstat`
                        yVals[el.resourceType].hours = el.hours;
                        yVals[el.resourceType].year = el.date;
                    });
                    function mapResourceType(resourceType) {
                        if (resourceType.includes("Gas")) {
                            return "Gas";
                        } else if (resourceType.includes("Oil")) {
                            return "Oil";
                        } else if (resourceType.includes("Coal")) {
                            return "Coal";
                        } else {
                            // If none of the conditions match, return the original value
                            return resourceType;
                        }
                    }
                    stackedData.forEach((group) => {
                        // Get the cumulative values from `stackedData`
                        yVals[mapResourceType(group.key)].cumulative = group[xIndex][1];
                    });

                    let hoverPoints = svg
                        .selectAll(".hoverPoint")
                        .data(Object.values(yVals));

                    const newHoverPoints = hoverPoints
                        .enter()
                        .append("g")
                        .classed("hoverPoint", true);

                    newHoverPoints
                        .append("circle")
                        .attr("r", 3)
                        .attr("fill", d => d.color);

                    newHoverPoints
                        .append("text")
                        .attr("dy", "-1.25em");

                    newHoverPoints
                        .merge(hoverPoints)
                        .attr("transform", d => `translate(${xScale(xVal)}, ${yScale(d.cumulative)})`)
                        .select("text")
                        .attr("dx", hoverTextX)
                        .style("text-anchor", hoverTextAnchor)
                        .style("text-shadow",  "1px 1px 2px black, 0 0 25px blue, 0 0 5px black")
                        .text(d => `${d.hours || 0} Twh`);

                    const hoverText = svg
                        .selectAll(".hoverText")
                        .data(Object.values(yVals));  // Use data to bind a single element

                    hoverText
                        .enter()
                        .append("text")
                        .classed("hoverText", true)
                        .attr("text-anchor", "middle")
                        .attr("alignment-baseline", "middle")
                        .style("font-size", "10px")
                        .style("fill", "#333")
                        .merge(hoverText)
                        .attr("x", xScale(mouseDate))
                        .attr("y", yScale.range()[1] + 10)  // Adjust the Y position as needed
                        .style("text-shadow",  "1px 1px 1px black, 0 0 1px blue, 0 0 1px black")
                        .text(d => `${d.year || 0}`);  // Replace with the actual text you want to display
                }
                const mouseleave = function (d) {
                    tooltip
                        .style("opacity", 0)
                    d3.select(this)
                        .style("opacity", 1)
                }

                svg.append("line").classed("hoverLine", true);
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

                svg.on("mousemove", mouseover2);
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
