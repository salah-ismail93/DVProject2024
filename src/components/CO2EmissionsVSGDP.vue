<template>
    <div class="m-16">
        <h2 class="font-bold text-2xl">Consumption-based CO₂ emissions per capita vs. GDP per capita, 2021</h2>
        <p class="mt-4">
            Consumption-based emissions are measured in tonnes per person. They are territorial emissions minus emissions
            embedded in exports, plus emissions embedded in imports. GDP per capita is adjusted for price differences
            between
            countries (PPP) and over time (inflation).
        </p>
        <div id="chart5"></div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'CO2EmissionsVSGDP',
    mounted() {
        // set the dimensions and margins of the graph
        var margin = { top: 60, right: 150, bottom: 60, left: 160 },
            width = 720 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg5 = d3
            .select("#chart5")
            .append("svg")
            .attr("id", "SVG5_ID")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", `0 0 800 500`)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.csv("/consumption-co2-per-capita-vs-gdppc_2021.csv").then((data) => {
            // ---------------------------//
            //       AXIS  AND SCALE      //
            // ---------------------------//
            data = data.filter(country =>
                !isNaN(country['Per capita consumption-based CO₂ emissions']) && country['Per capita consumption-based CO₂ emissions'] !== '' &&
                !isNaN(country['GDP per capita, PPP (constant 2017 international)']) && country['GDP per capita, PPP (constant 2017 international)'] !== ''
            );
            data.forEach(function (d) {
                d["GDP per capita, PPP (constant 2017 international)"] = parseFloat(d["GDP per capita, PPP (constant 2017 international)"]);
                // d['Oxygen Production (kg/yr)'] = parseFloat(d['Oxygen Production (kg/yr)']);
                d["Per capita consumption-based CO₂ emissions"] = parseFloat(
                    d["Per capita consumption-based CO₂ emissions"]
                );
                d["Population (historical estimates)"] = parseFloat(d["Population (historical estimates)"]);
            });
            // var keys = d3.map(data, function (d) {
            //   return (d.Neighborhood)
            // }).keys()
            // Add X axis
            var tickValues = [2000, 5000, 10000, 50000, 75000, 100000];
          
             var x = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d["GDP per capita, PPP (constant 2017 international)"])])
                .range([0, width]);
            svg5
                .append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(d3.format("~s"))); 

            svg5
                .append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + 40)
                .text("GDP per capita (US dollars)");

            // Add Y axis
            var y = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d["Per capita consumption-based CO₂ emissions"])])
                .range([height, 0]);
            svg5.append("g").call(d3.axisLeft(y));

            // Add Y axis label:
            svg5
                .append("text")
                .attr("text-anchor", "end")
                .attr("x", -50)
                .attr("y", -20)
                .text("Consumption-based CO₂ emissions (tonnes per person)")
                .attr("text-anchor", "start");

            // Add a scale for bubble size
            var z = d3
                .scaleSqrt()
                .domain([0, d3.max(data, (d) => d["Population (historical estimates)"])])
                .range([5, 20]);

            // Add a scale for bubble color
            // var myColor = d3.scaleOrdinal()
            //   // .domain(keys)
            //   .domain(['Asia', 'Europe', 'North America', 'Africa', 'South America', 'Oceania'])
            // .range(d3.schemeSet1);

            var myColor = d3
                .scaleOrdinal()
                .domain([
                    "Asia",
                    "Europe",
                    "North America",
                    "Africa",
                    "South America",
                    "Oceania",
                ])
                .range([
                    "#440154ff",
                    "#febbd9",
                    "#fde725ff",
                    "#f00034",
                    "#52a163",
                    "#0d6efc",
                ]);

            // ---------------------------//
            //      TOOLTIP               //
            // ---------------------------//

            var tooltipA2T5 = d3
                .select("#chart5")
                .append("div")
                .attr("class", "tooltip");
            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseoverA2T5 = function (e, d) {
                tooltipA2T5.transition().duration(200).style("opacity", 1);
                tooltipA2T5
                    .html(
                        "<span style='color:grey'>Population (historical estimates): </span> " +
                        d["Population (historical estimates)"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
                        "<br> <span style='color:grey'>Country: </span>" +
                        d.Entity +
                        "<br><span style='color:grey'>Per capita consumption-based CO₂ emissions: </span>" +
                        d["Per capita consumption-based CO₂ emissions"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
                        "<br><span style='color:grey'>GDP per capita: </span> " +
                        d["GDP per capita, PPP (constant 2017 international)"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    ) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY + "px");
            };
            var mousemoveA2T5 = function (e, d) {
                tooltipA2T5
                    .style("left", event.pageX + 30 + "px")
                    .style("top", event.pageY + "px");
            };
            var mouseleaveA2T5 = function (e, d) {
                tooltipA2T5.transition().duration(200).style("opacity", 0);
            };

            // ---------------------------//
            //       HIGHLIGHT GROUP      //
            // ---------------------------//
            var isHighlighted = false;
            // What to do when one group is hovered
            var highlight = function (e, d) {
                // reduce opacity of all groups
                d3.selectAll(".bubbles").style("opacity", 0);
                // expect the one that is hovered
                d3.selectAll(".bubbles." + d.replaceAll(" ", ".")).style("opacity", 1);
                console.log(d.replaceAll(" ", "."))
            };

      

            var highlight2 = function (e, d) {
                isHighlighted = !isHighlighted;
                if (isHighlighted) {
               // If highlighted, set opacity to 1 for the selected bubbles
               d3.selectAll(".bubbles").style("opacity", 0);
               d3.selectAll(".bubbles." + d.replaceAll(" ", ".")).style("opacity", 0.7);
                } else {
                 // If not highlighted, set opacity back to 0.8 for all bubbles
                  d3.selectAll(".bubbles").style("opacity", 0.7);
                  }
                console.log(d.replaceAll(" ", "."))
            };


            // And when it is not hovered anymore
            var noHighlight = function (e, d) {
                d3.selectAll(".bubbles").style("opacity", 0.8);
            };

            // ---------------------------//
            //       CIRCLES              //
            // ---------------------------//

            // Add dots
            svg5
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", function (d) {
                    return "bubbles " + d.Continent;
                })


                .attr("cx", function (d) {
                    return x(d["GDP per capita, PPP (constant 2017 international)"]);
                })
                .attr("cy", function (d) {
                    return y(d["Per capita consumption-based CO₂ emissions"]);
                })
                .attr("r", function (d) {
                    return z(d["Population (historical estimates)"]);
                })
                .style("fill", function (d) {
                    return myColor(d.Continent);
                })

                // -3- Trigger the functions for hover
                .on("mouseover", mouseoverA2T5)
                .on("mousemove", mousemoveA2T5)
                .on("mouseleave", mouseleaveA2T5);

            // ---------------------------//
            //       LEGEND              //
            // ---------------------------//

            // Add legend: circles
            var valuesToShow = [
                d3.min(data, (d) => d["Population (historical estimates)"]),
                (
                    (d3.min(data, (d) => d["Population (historical estimates)"]) +
                        d3.max(data, (d) => d["Population (historical estimates)"])) /
                    4
                ).toFixed(2),
                d3.max(data, (d) => d["Population (historical estimates)"]),
            ];
            var moveX = 100;
            var moveY = 70;
            var xCircle = 390 + moveX;
            var xLabel = 440 + moveX;
            svg5
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("circle")
                .attr("cx", xCircle)
                .attr("cy", function (d) {
                    return height - moveY - z(d);
                })
                .attr("r", function (d) {
                    return z(d);
                })
                .style("fill", "none")
                .attr("stroke", "black");

            // Add legend: segments
            svg5
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("line")
                .attr("x1", function (d) {
                    return xCircle + z(d);
                })
                .attr("x2", xLabel)
                .attr("y1", function (d, i) {
                    return height - moveY - z(d) - i * 3;
                })
                .attr("y2", function (d, i) {
                    return height - moveY - z(d) - i * 3;
                })
                .attr("stroke", "black")
                .style("stroke-dasharray", "2,2");

            // Add legend: labels
            svg5
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("text")
                .attr("x", xLabel)
                .attr("y", function (d, i) {
                    return height - moveY - z(d) - i * 3;
                })
                .text(function (d) {
                    let Population = parseInt(d);
                    return Population.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                })
                .style("font-size", 9)
                .style("font-weight", "bold")
                .attr("alignment-baseline", "middle");

            // Legend title
            svg5
                .append("text")
                .attr("x", xCircle)
                .attr("y", height - moveY + 30)
                .text("Population (historical)")
                .attr("text-anchor", "middle");

            // Add one dot in the legend for each Continent.
            var size = 20;

            // var allgroups = keys
            var allgroups = [
                "Asia",
                "Europe",
                "North America",
                "Africa",
                "South America",
                "Oceania",
            ];

            svg5
                .selectAll("myrect")
                .data(allgroups)
                .enter()
                .append("circle")
                .attr("cx", xCircle)
                .attr("cy", function (d, i) {
                    return 10 + i * (size + 5);
                }) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("r", 7)
                .style("fill", function (d) {
                    return myColor(d);
                })
                .on("mouseover", function (e, d) { })
                //.on("mouseleave", noHighlight);

            // Add labels beside legend dots
            svg5
                .selectAll("mylabels")
                .data(allgroups)
                .enter()
                .append("text")
                .attr("x", xCircle + size * 0.8)
                .attr("y", function (d, i) {
                    return i * (size + 5) + size / 2;
                }) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", function (d) {
                    return myColor(d);
                })
                .text(function (d) {
                    return d;
                })
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .on("click", highlight2) // .on("mouseover",highlight)
               
               // .on("mouseleave", noHighlight);
        }).catch((err) => {
            console.error(err);
        });

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
