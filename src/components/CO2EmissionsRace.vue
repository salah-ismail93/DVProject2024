<template>
    <div id="viz_container2"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'CO2EmissionsRace',
    mounted() {
        const svg = d3.select("#viz_container2")
            .append("svg")
            .attr("width", 900)
            .attr("height", 500);

        var tickDuration = 100; // Changed from 500
        var top_n = 10;
        var width = 900;
        var height = 500;

        const margin = {
            top: 80,
            right: 10,
            bottom: 5,
            left: 20
        };

        let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);

        // variable declared with let is limted to block it is declared
        // variable declared with var has global scope
        let title = svg.append('text')
            .attr('class', 'title')
            .attr('x', 30)
            .attr('y', 24)
            .text('21 years of CO2 Emissions - Top 10 Countries (across 220 countries)');

        /*let subTitle = svg.append("text")
            .attr("class", "subTitle")
            .attr('x', 30)
            .attr("y", 45)
            .html("CO2 emission value (megatons)");*/

        let subTitle = svg.append('text')
            .attr('class', 'caption')
            .attr('x', width - 20)
            .attr('y', height - 20)
            .style('text-anchor', 'end')
            .html('CO2 emission value (megatons)');

        let caption = svg.append('text')
            .attr('class', 'caption')
            .attr('x', width - 20)
            .attr('y', height - 5)
            .style('text-anchor', 'end')
            .html('Source: Interbrand');

        let year = 2000;

        d3.csv('/CO2_emissions_race.csv').then(function (data) {
            data.forEach(d => {
                d.value = +d.value,
                    d.lastValue = +d.lastValue,
                    d.value = isNaN(d.value) ? 0 : d.value,
                    d.year = +d.year,
                    d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)
            });
            console.log(data);

            let yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
                .sort((a, b) => b.value - a.value)
                .slice(0, top_n);

            yearSlice.forEach((d, i) => d.rank = i);

            console.log('yearSlice: ', yearSlice)

            let x = d3.scaleLinear()
                .domain([0, d3.max(yearSlice, d => d.value)])
                .range([margin.left, width - margin.right - 65]);

            let y = d3.scaleLinear()
                .domain([top_n, 0])
                .range([height - margin.bottom, margin.top]);

            let xAxis = d3.axisTop()
                .scale(x)
                .ticks(width > 500 ? 5 : 2)
                .tickSize(-(height - margin.top - margin.bottom))
                .tickFormat(d => d3.format(',')(d));

            svg.append('g')
                .attr('class', 'axis xAxis')
                .attr('transform', `translate(0, ${margin.top})`)
                .call(xAxis)
                .selectAll('.tick line')
                .classed('origin', d => d == 0);

            svg.selectAll('rect.bar')
                .data(yearSlice, d => d.name)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', x(0) + 1)
                .attr('width', d => x(d.value) - x(0) - 1)
                .attr('y', d => y(d.rank) + 5)
                .attr('height', y(1) - y(0) - barPadding)
                .style('fill', d => d.colour);

            svg.selectAll('text.label')
                .data(yearSlice, d => d.name)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', d => x(d.value) - 8)
                .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
                .style('text-anchor', 'end')
                .html(d => d.name);

            svg.selectAll('text.valueLabel')
                .data(yearSlice, d => d.name)
                .enter()
                .append('text')
                .attr('class', 'valueLabel')
                .attr('x', d => x(d.value) + 5)
                .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
                .text(d => d3.format(',.0f')(d.lastValue));

            let yearText = svg.append('text')
                .attr('class', 'yearText')
                .attr('x', width - margin.right)
                .attr('y', height - 45)
                .style('text-anchor', 'end')
                .html(~~year) //~~ "double  tilde" convert to int (remove decimals) => shortcut for math.floor() function
                .call(halo, 10);

            let ticker = d3.interval(e => {      // e -> custom event object

                yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, top_n);

                yearSlice.forEach((d, i) => d.rank = i);
                //console.log('IntervalYear: ', yearSlice);

                x.domain([0, d3.max(yearSlice, d => d.value)]);

                svg.select('.xAxis')
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .call(xAxis);

                let bars = svg.selectAll('.bar').data(yearSlice, d => d.name);
                bars
                    .enter()
                    .append('rect')
                    .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
                    .attr('x', x(0) + 1)
                    .attr('width', d => x(d.value) - x(0) - 1)
                    .attr('y', d => y(top_n + 1) + 5)
                    .attr('height', y(1) - y(0) - barPadding)
                    .style('fill', d => d.colour)
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('y', d => y(d.rank) + 5);
                bars
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('width', d => x(d.value) - x(0) - 1)
                    .attr('y', d => y(d.rank) + 5);
                bars
                    .exit()
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('width', d => x(d.value) - x(0) - 1)
                    .attr('y', d => y(top_n + 1) + 5)
                    .remove();

                let labels = svg.selectAll('.label')
                    .data(yearSlice, d => d.name);
                labels
                    .enter()
                    .append('text')
                    .attr('class', 'label')
                    .attr('x', d => x(d.value) - 8)
                    .attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2))
                    .style('text-anchor', 'end')
                    .html(d => d.name)
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);
                labels
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) - 8)
                    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);
                labels
                    .exit()
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) - 8)
                    .attr('y', d => y(top_n + 1) + 5)
                    .remove();

                let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.name);
                valueLabels
                    .enter()
                    .append('text')
                    .attr('class', 'valueLabel')
                    .attr('x', d => x(d.value) + 5)
                    .attr('y', d => y(top_n + 1) + 5)
                    .text(d => d3.format(',.0f')(d.lastValue))
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);
                valueLabels
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) + 5)
                    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
                    .tween("text", function (d) {
                        let i = d3.interpolateRound(d.lastValue, d.value);
                        return function (t) {
                            this.textContent = d3.format(',')(i(t));
                        };
                    });
                valueLabels
                    .exit()
                    .transition()
                    .duration(tickDuration)
                    .ease(d3.easeLinear)
                    .attr('x', d => x(d.value) + 5)
                    .attr('y', d => y(top_n + 1) + 5)
                    .remove();

                yearText.html(~~year); //~~ "double  tilde" convert to int (remove decimals) => shortcut for math.floor() function

                if (year == 2020) year = d3.format('.1f')((2000) + 0.1);
                year = d3.format('.1f')((+year) + 0.1);
            }, tickDuration);

        });

        // Format for yearText
        const halo = function (text, strokeWidth) {
            text.select(function () { return this.parentNode.insertBefore(this.cloneNode(true), this); })
                .style('fill', '#ffffff')
                .style('stroke', '#ffffff')
                .style('stroke-width', strokeWidth)
                .style('stroke-linejoin', 'round')
                .style('opacity', 1);

        }

    }
}
</script>

<style scoped>
::v-deep body {
    margin: 0;
    padding: 0;
    background-color: #e2ffe3;
    width: 100%;
    /* Set the content's width to 100% of the iframe */
    height: 100%;
    /* Set the content's height to 100% of the iframe */
    max-width: 100%;
    /* Ensure the content doesn't exceed the iframe's width */
    max-height: 100%;
    /* Ensure the content doesn't exceed the iframe's height */
    font-family: Open Sans, sans-serif;
    text-align: center;
}

::v-deep text {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
}

::v-deep text.title {
    font-size: 24px;

    font-weight: 500;
    fill: teal;
}

::v-deep text.subTitle {
    font-weight: 500;
    fill: #777777;
    fill: teal;
}

::v-deep text.caption {
    font-weight: 400;
    font-size: 12px;
    fill: #777777;
}

::v-deep text.label {
    font-weight: 600;
    font-size: 12px;
}

::v-deep text.valueLabel {
    font-weight: 300;
    font-size: 12px;
}

::v-deep text.yearText {
    font-size: 64px;
    font-weight: 700;
    opacity: 0.25;
}

::v-deep .tick text {
    fill: #777777;
}

::v-deep .xAxis .tick:nth-child(2) text {
    text-anchor: start;
}

::v-deep .tick line {
    shape-rendering: CrispEdges;
    stroke: #dddddd;
}

::v-deep .tick line.origin {
    stroke: #aaaaaa;
}

::v-deep path.domain {
    display: none;
}
</style>