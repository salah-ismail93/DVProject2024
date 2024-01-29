<template>
    <div class="flex flex-col">
        <div class="mx-auto my-5 flex items-center justify-center">
            <div class="mx-5">
                <label for="year-list">Select Year: </label>
                <select id="year-list">
                </select>
            </div>
            <div class="mx-5">
                <label for="month-list">Select Month: </label>
                <select id="month-list">
                </select>
            </div>
        </div>
        <div id="outerContainer" class="flex flex-col justify-center">
            <div class="mx-auto flex flex-col justify-center">
                <div class="centered-flex flex flex-col justify-center">
                    <button id="play-button" class="mx-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Pause</button>
                    <div class="relative mb-6">
                        <input type="range" value="0"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-5"
                            id="yearSlider" />
                        <span class="absolute start-0 -bottom-6">1901</span>
                        <span class="absolute end-0 -bottom-6">2020</span>
                    </div>
                    <div id="choroplethMap"></div>
                </div>
            </div>
        </div>
        <div class="tooltip" style="opacity: 0"></div>
    </div>
</template>

<script>
import * as choroplethMap from "../utils/choroplethMap.js";
import * as d3 from 'd3';

export default {
    name: 'WorldTemperatureMap',
    // Your component's JavaScript code goes here
    mounted() {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const firstYear = 1901;
        const lastYear = 2020;
        let year = firstYear;
        let month = 0;

        // Init slider variables
        const slider = document.getElementById("yearSlider");
        slider.min = firstYear;
        slider.max = lastYear;

        // Init charts
        choroplethMap.initChart("#choroplethMap");

        // Datasets to load
        const dataPromises = [
            d3.csv("/temp-1901-2020-all.csv"),
            d3.json("/world.geo.json")
        ];

        // Load datasets and start visualization
        Promise.all(dataPromises).then((data) => {
            const topoData = data[1];
            // Group data per country and per year
            const tempData = d3.group(
                data[0],
                (d) => d.Year,
                (d) => d.ISO3
            );

            let updateCharts = () => {
                const yearData = tempData.get(String(year));
                choroplethMap.updateChart(topoData, yearData, month);
            }
            updateCharts();

            let interval = d3.interval(() => {
                year = year < lastYear ? year + 1 : firstYear;
                slider.value = year;
                updateCharts();
            }, 400);

            // UI
            // Slider
            let moving = true;
            // eslint-disable-next-line no-unused-vars
            slider.addEventListener("input", (event) => {
                if (moving) {
                    interval.stop();
                }
                year = +slider.value;
                updateCharts();
            });
            // eslint-disable-next-line no-unused-vars
            slider.addEventListener("pointerup", (event) => {
                if (moving) {
                    interval = d3.interval(() => {
                        year = year < lastYear ? year + 1 : firstYear;
                        slider.value = year;
                        updateCharts();
                    }, 400);
                }
            });
            // Play/pause button
            // document.getElementById('month-list').addEventListener();
            const playButton = d3.select("#play-button");
            playButton.on("click", (e) => {
                console.log(e.target);
                const button = d3.select(e.target);
                if (button.text() == "Pause") {
                    moving = false;
                    interval.stop();
                    console.log(interval);
                    button.text("Play");
                } else {
                    moving = true;
                    interval = d3.interval(() => {
                        year = year < lastYear ? year + 1 : firstYear;
                        slider.value = year;
                        updateCharts();
                    }, 400);
                    button.text("Pause");
                }
            });
            // Add month names to months drop down menu
            let months = [];
            monthNames.forEach((month, i) => {
                months.push({ month, i });
            });
            // Populate the months selection dropdown
            const monthSelect = d3.select('#month-list');
            monthSelect
                .selectAll('option')
                .data(months)
                .enter()
                .append('option')
                .attr('value', (d) => d.i)
                .text((d) => d.month);
            // Change months according to month menu
            monthSelect.on('change', (value) => {
                month = value.target.value;
                updateCharts();
            });

            // Add years to years drop down menu
            let years = [];
            for (let year of tempData.keys()) {
                years.push(year);
            }
            // Populate the year selection dropdown
            const yearSelect = d3.select('#year-list');
            yearSelect
                .selectAll('option')
                .data(years)
                .enter()
                .append('option')
                .text((d) => d);
            // Change year according to year menu
            yearSelect.on('change', (value) => {
                year = +value.target.value;
                slider.value = year;
                updateCharts();
            });
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
