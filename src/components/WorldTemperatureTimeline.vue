<template>
    <div class="mx-auto flex items-center justify-center">
        <div>
            <label for="country-list2">Select Country:</label>
            <select id="country-list2">
            </select>
        </div>
        <div>
            <label for="year-list2">Select Year:</label>
            <select id="year-list2">
            </select>
        </div>
        <div>
            <label for="month-list2">Select Month:</label>
            <select id="month-list2">
            </select>
        </div>
    </div>
    <div id="outerContainer2" class="flex flex-col justify-center">
        <div class="mx-auto flex flex-col justify-center">
            <div class="mx-auto flex items-center justify-center">
                <div id="areaChart"></div>
            </div>
            <div class="mx-auto flex items-center justify-center">
                <div id="polarArea"></div>
                <div id="anomalyRadial"></div>
            </div>
            <button id="play-button2"
                class="mx-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Pause
            </button>
            <input type="range" value="0"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 my-5"
                id="yearSlider2" />
        </div>
    </div>
    <div class="tooltip" style="opacity: 0"></div>
</template>

<script>
import * as areaChart from "../utils/areaChart.js";
import * as polarArea from "../utils/polarArea.js";
import * as anomalyRadial from "../utils/anomalyRadial.js";
import * as d3 from 'd3';

export default {
    name: 'WorldTemperatureTimeline',
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
        let country = "RUS";
        let year = firstYear;
        let month = 0;

        // Init slider variables
        const slider = document.getElementById("yearSlider2");
        slider.min = firstYear;
        slider.max = lastYear;

        // Init charts
        areaChart.initChart("#areaChart");
        polarArea.initChart("#polarArea");
        anomalyRadial.initChart("#anomalyRadial");

        // Datasets to load
        const dataPromises = [
            d3.csv("/temp-1901-2020-all.csv"),
            d3.csv("/HadCRUT4.csv")
        ];

        // Load datasets and start visualization
        Promise.all(dataPromises).then(function (data) {
            // Group data per country and per year
            const tempData = d3.group(
                data[0],
                (d) => d.Year,
                (d) => d.ISO3
            );
            const anomalyData = d3.group(
                data[1],
                (d) => d.Year
            );

            function updateCharts() {
                const yearData = tempData.get(String(year));
                const countryData = yearData.get(country);
                polarArea.updateChart(countryData);
                areaChart.updateChart(countryData);
                anomalyRadial.updateChart(anomalyData, year);
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
            // document.getElementById('month-list2').addEventListener();
            const playButton = d3.select("#play-button2");
            playButton.on("click", function () {
                const button = d3.select(this);
                if (button.text() == "Pause") {
                    moving = false;
                    interval.stop();
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
            const monthSelect = d3.select('#month-list2');
            monthSelect
                .selectAll('option')
                .data(months)
                .enter()
                .append('option')
                .text((d) => d.month + "(" + d.i + ")");
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
            const yearSelect = d3.select('#year-list2');
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
            // Add countries to countries drop down menu
            let countries = [];
            for (let [iso, isoData] of tempData.get(String(firstYear))) {
                const countryName = isoData[0].Country;
                countries.push({ countryName, iso });
            }
            // Populate the country selection dropdown
            const countrySelect = d3.select('#country-list2');
            countrySelect
                .selectAll('option')
                .data(countries)
                .enter()
                .append('option')
                .text((d) => d.countryName + "(" + d.iso + ")");
            // Change country according to country menu
            countrySelect.on('change', (value) => {
                country = value.target.value;
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
