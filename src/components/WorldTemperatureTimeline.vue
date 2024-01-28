<template>
    <div class="bg-indigo-100 flex flex-col">
        <div class="mx-auto my-5 flex items-center justify-center">
            <div class="mx-5">
                <label for="country-list2">Select Country:</label>
                <select id="country-list2">
                </select>
            </div>
            <div class="mx-5">
                <label for="year-list2">Select Year:</label>
                <select id="year-list2">
                </select>
            </div>
        </div>
        <div id="outerContainer2" class="flex flex-col justify-center">
            <div class="mx-auto flex flex-col justify-center">
                <div class="bg-indigo-100 mx-auto px-16 py-20 flex items-center justify-center">
                    <div id="areaChart" class="mr-16"></div>
                <div class="flex flex-col">
                    <div class="text-gray-700 ml-16">
                        <p class="font-bold">Shifting Focus to Asia: Exploring the Global Impact of Covid-19</p>
                        <p class="mt-2">Geographical knowledge informs us about the division of the world into seven
                            significant
                            land masses.</p>

                        <p class="mt-2">In order to comprehend the global repercussions of Covid-19, it is crucial to
                            emphasize
                            the significance of Asia. Not only does it occupy the largest land area, accounting for 30% of
                            the
                            Earth's surface, but it is also home to the majority of the world's population, representing
                            60%.
                        </p>

                        <p class="mt-2">The pie chart illustrates the distribution of GHG across different
                            Industries.</p>

                        <p class="mt-4">
                            <a href="#chart-container" class="text-blue-700">Next ...</a>
                        </p>
                    </div>
                    <button class="mx-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 play-button">Pause</button>
                    <div class="relative mb-6">
                        <input type="range" value="0"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-5 yearSlider"
                            id="yearSliderArea" />
                        <span class="absolute start-0 -bottom-6">1901</span>
                        <span class="absolute end-0 -bottom-6">2020</span>
                    </div>
                    </div>
                </div>
                <div class="bg-white mx-auto px-16 py-20 flex items-center justify-center">
                    <div id="polarArea" class="mr-16"></div>
                <div class="flex flex-col">
                    <div class="text-gray-700 ml-16">
                        <p class="font-bold">Shifting Focus to Asia: Exploring the Global Impact of Covid-19</p>
                        <p class="mt-2">Geographical knowledge informs us about the division of the world into seven
                            significant
                            land masses.</p>

                        <p class="mt-2">In order to comprehend the global repercussions of Covid-19, it is crucial to
                            emphasize
                            the significance of Asia. Not only does it occupy the largest land area, accounting for 30% of
                            the
                            Earth's surface, but it is also home to the majority of the world's population, representing
                            60%.
                        </p>

                        <p class="mt-2">The pie chart illustrates the distribution of GHG across different
                            Industries.</p>

                        <p class="mt-4">
                            <a href="#chart-container" class="text-blue-700">Next ...</a>
                        </p>
                    </div>
                    <button class="mx-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 play-button">Pause</button>
                    <div class="relative mb-6">
                        <input type="range" value="0"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-5 yearSlider"
                            id="yearSliderPolar" />
                        <span class="absolute start-0 -bottom-6">1901</span>
                        <span class="absolute end-0 -bottom-6">2020</span>
                    </div>
                    </div>
                </div>
                <div class="bg-indigo-100 mx-auto px-16 py-20 flex items-center justify-center">
                    <div id="anomalyRadial" class="mr-16"></div>
                <div class="flex flex-col">
                    <div class="text-gray-700 ml-16">
                        <p class="font-bold">Shifting Focus to Asia: Exploring the Global Impact of Covid-19</p>
                        <p class="mt-2">Geographical knowledge informs us about the division of the world into seven
                            significant
                            land masses.</p>

                        <p class="mt-2">In order to comprehend the global repercussions of Covid-19, it is crucial to
                            emphasize
                            the significance of Asia. Not only does it occupy the largest land area, accounting for 30% of
                            the
                            Earth's surface, but it is also home to the majority of the world's population, representing
                            60%.
                        </p>

                        <p class="mt-2">The pie chart illustrates the distribution of GHG across different
                            Industries.</p>

                        <p class="mt-4">
                            <a href="#chart-container" class="text-blue-700">Next ...</a>
                        </p>
                    </div>
                    <button class="mx-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 play-button">Pause</button>
                    <div class="relative mb-6">
                        <input type="range" value="0"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-5 yearSlider"
                            id="yearSliderRadial" />
                        <span class="absolute start-0 -bottom-6">1901</span>
                        <span class="absolute end-0 -bottom-6">2020</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="tooltip2" style="opacity: 0"></div>
    </div>
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
        const firstYear = 1901;
        const lastYear = 2020;
        let country = "RUS";
        let year = firstYear;

        // Init slider variables
        const slider = document.getElementById("yearSliderArea");
        const slider2 = document.getElementById('yearSliderPolar');
        const slider3 = document.getElementById('yearSliderRadial');
        slider.min = firstYear;
        slider.max = lastYear;
        slider2.min = firstYear;
        slider2.max = lastYear;
        slider3.min = firstYear;
        slider3.max = lastYear;

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
                slider2.value = year;
                slider3.value = year;
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
            slider2.addEventListener("input", (event) => {
                if (moving) {
                    interval.stop();
                }
                year = +slider2.value;
                updateCharts();
            });
            slider3.addEventListener("input", (event) => {
                if (moving) {
                    interval.stop();
                }
                year = +slider3.value;
                updateCharts();
            });
            // eslint-disable-next-line no-unused-vars
            slider.addEventListener("pointerup", (event) => {
                if (moving) {
                    interval = d3.interval(() => {
                        year = year < lastYear ? year + 1 : firstYear;
                        slider.value = year;
                        slider2.value = year;
                        slider3.value = year;
                        updateCharts();
                    }, 400);
                }
            });
            slider2.addEventListener("pointerup", (event) => {
                if (moving) {
                    interval = d3.interval(() => {
                        year = year < lastYear ? year + 1 : firstYear;
                        slider.value = year;
                        slider2.value = year;
                        slider3.value = year;
                        updateCharts();
                    }, 400);
                }
            });
            slider3.addEventListener("pointerup", (event) => {
                if (moving) {
                    interval = d3.interval(() => {
                        year = year < lastYear ? year + 1 : firstYear;
                        slider.value = year;
                        slider2.value = year;
                        slider3.value = year;
                        updateCharts();
                    }, 400);
                }
            });
            // Play/pause button
            const playButtons = d3.selectAll(".play-button");
            playButtons.on("click", function () {
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
                        slider2.value = year;
                        slider3.value = year;
                        updateCharts();
                    }, 400);
                    button.text("Pause");
                }
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
                slider2.value = year;
                slider3.value = year;
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
                .attr('value', (d) => d.iso)
                .text((d) => d.countryName);
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
.tooltip2 {
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
