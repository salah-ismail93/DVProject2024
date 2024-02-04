<template>
  <div class="mx-auto">
    <h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
      Waffle Chart
    </h3>
    <div class="flex flex-wrap justify-center py-3 flex-column hidden" id="waffle-container">

      <div class="flex flex-wrap flex-row">
        <div class="flex flex-row">
          <div class="flex flex-row">
            <div class="flex-custom" v-for="(value, key, index) in cities" :key="index" :id="'A1chart5-' + (index + 1)">
              <h3 class="text-left">{{ key }}</h3>
            </div>
          </div>
          <div>
            <div id="chart_5_legend"></div>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'WaffleChart',
  data() {
    return {
      cities: {},
      color_map: {
        'Parties': 0,
        'Media': 1,
        'Observer states': 2,
        'IGO observers': 3,
        'NGO observers': 4,
        'Overflow': 5,
        'UN secretariat observers': 6,
        'UN specialised agency observers': 7,
        'Combined parties': 8,
        'Combined observers': 9,
      },
      color: null
    }
  },

  mounted() {
    let subgroups = ["husam"];
    this.color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#FFB6C1', '#FFD700', '#98FB98', '#ADD8E6', '#FFA07A', '#B0C4DE', '#FFC0CB', '#FF6347', '#696969', '#FFFF00']);

    // Load the combined CSV file
    d3.csv('/Total attendance at COPs through the years.csv').then((data) => {
      // Sort the data based on COP, you may need to adjust the sorting logic
      data.sort((a, b) => (a.COP > b.COP) ? 1 : -1);

      // Take the last 10 items
      const last10COP = data

      document.getElementById('waffle-container').classList.add('hidden');

      // Extract unique city names
      let uniqueCities = Array.from(new Set(last10COP.map(d => d.state)));

      // Generate cities object with unique identifiers
      this.cities = {};
      uniqueCities.forEach((state, index) => {
        this.cities[state] = index + 1;
      });

      // Group data by city
      let groupedData = d3.group(last10COP, d => d.state);

      // Iterate over the cities and generate the waffle charts for each one
      setTimeout(() => {
        document.getElementById('waffle-container').classList.remove('hidden');
        groupedData.forEach((citiesData) => {
          this.generateWaffleChart(this.cities, citiesData);
        });
      }, 500);
    }).catch((err) => {
      console.error(err);
    });
  },


  methods: {
    generateLegend() {
      const legendData = Object.keys(this.color_map);

      const legendContainer = d3.select('#chart_5_legend');
      legendContainer.selectAll('*').remove(); // Clear existing content

      const legendWidth = 200;

      const legendItemHeight = 30;
      const legend = legendContainer
        .append('svg')
        .attr('width', legendWidth)
        .attr('height', 300)
        .selectAll('g')
        .data(legendData)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * legendItemHeight})`)
        ;

      legend
        .append('rect')

        .attr('width', 18)
        .attr('height', 18)

        .style('fill', (d) => this.color(this.color_map[d]));

      legend
        .append('text')
        .attr('x', 24)
        .attr('y', 10)
        .attr('dy', '.35em')
        .attr('dx', '.05em')
        //.style('font-size', '12px')
        //.style('white-space', 'nowrap')
        //.style('overflow', 'hidden')
        //.style('text-overflow', 'ellipsis')
        .style('margin', '1px')
        .text((d) => d);
    },

    // Create a function to generate the waffle chart for a given cop
    generateWaffleChart(cities, data) {
      var total = 0;
      var widthWaffle,
        heightWaffle,
        widthSquares = 10,
        heightSquares = 10,
        squareSize = 10,
        squareValue = 0,
        gap = 1;

      let theData = [];

      // total
      total = d3.sum(data, function (d) {
        return d.tree_count;
      });

      // value of a square
      squareValue = total / (widthSquares * heightSquares);

      // remap data
      let color_map = this.color_map;
      let smallCategoryThreshold = 0.8;  // Adjust this threshold based on your data
      data.forEach(function (d) {
        d.tree_count = +d.tree_count;
        d.units = Math.round(d.tree_count / squareValue);
        if (d.units >= smallCategoryThreshold) {
          theData = theData.concat(
            Array(d.units + 1).join(1).split('').map(function () {
              return {
                squareValue: squareValue,
                units: d.units,
                abundance: d.tree_count,
                groupIndex: color_map[d.scientific_name],
                name: d.scientific_name,
                neigh: d.city
              };
            })
          );
        } else {
          // Combine small categories into an "Other" category
          theData.push({
            squareValue: squareValue,
            units: d.units,
            abundance: d.tree_count,
            groupIndex: color_map['Other'],
            name: 'Other',
            neigh: d.city
          });
        }
      });

      if (theData.length < 100) {
        for (let i = 0; i < 100 - theData.length; i++) {
          theData = theData.slice(0, 1).concat(theData);
        }
      }

      theData = theData.slice(0, 500);

      widthWaffle = (squareSize * widthSquares) + widthSquares * gap + 25;
      heightWaffle = (squareSize * heightSquares) + heightSquares * gap + 25;

      let waffle = d3.select(`#A1chart5-${cities[data[0]['state']]}`);
      waffle.selectAll('svg').remove();
      let color = this.color;

      waffle
        .append("svg")
        .attr("viewBox", `0 0 ${widthWaffle} ${heightWaffle}`)
        .attr("width", widthWaffle * 2)
        .attr("height", heightWaffle * 2)
        .append("g")  // Append a group element
        .attr("transform", `translate(${squareSize / 2},0)`)
        .selectAll("g")  // Select groups within the main group
        .data(theData)
        .enter()
        .append("g")  // Append a group for each data point
        .attr("transform", function (d, i) {
          let col = Math.floor(i / heightSquares);
          let row = i % heightSquares;
          return `translate(${(col * squareSize) + (col * gap)}, ${(heightSquares * squareSize) - ((row * squareSize) + (row * gap))})`;
        })
        .each(function (d) {
          d3.select(this)
            .append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", function (d) {
              return color(d.groupIndex);
            })
            .append("title")
            .text(function (d) {
              return "Participant: " + d.name + "; \nNumber: " + d.abundance + "; \nPercentage: " + d.units + "%" + "\nCity: " + d.neigh;
            });

          d3.select(this)
            .append("text")  // Add a text element for the COP name
            .attr("x", squareSize / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(data[0].COP);
        });
      this.generateLegend();
    }
  }
}

</script>

<style scoped>
.flex-custom {
  flex: 1 1 5%;
}

#waffle-container {
  margin-top: 10px;
}

#waffle-container .flex-custom {
  text-align: center;
  margin: 5px;
}

#waffle-container svg {
  margin-right: 100%;

  border: 1px solid #ccc;
  /* Add a border for better visibility */
}

#chart_5_legend {
  margin-right: 100%;
}

#chart_5_legend svg {
  margin-right: 100%;
}
</style>
