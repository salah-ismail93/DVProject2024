<template>
    <section class="dashboard  slide_base_7 " style="visibility: visible;">
        <div class="dashboard_divider"></div>
        <div class="dashboard_slide">
            <div class="slide_container slick-initialized slick-slider page_dashboard" id="page_dashboard"><button
                    type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button"
                    style="display: block;">Previous</button>
                <div aria-live="polite" class="slick-list draggable">
                    <div class="slick-track" style="opacity: 1; width: 5250px; transform: translate3d(-1400px, 0px, 0px);"
                        role="listbox">
                        <li class="slide arctic_ice_minimum slick-slide slick-cloned" style="width: 350px;"
                            data-slick-index="-4" aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide ice_sheets slick-slide slick-cloned" style="width: 350px;" data-slick-index="-3"
                            aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide sea_level slick-slide slick-cloned" style="width: 350px;" data-slick-index="-2"
                            aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide ocean_heat_added slick-slide slick-cloned" style="width: 350px;"
                            data-slick-index="-1" aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide carbon_dioxide slick-slide slick-current slick-active" style="width: 350px;"
                            data-slick-index="0" aria-hidden="false" tabindex="-1" role="option"
                            aria-describedby="slick-slide10">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_1">
                                        <div class="title">Carbon Dioxide</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value up"></div>
                                                <div class="change_number">422</div>
                                                <div class="units">parts per million</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Carbon Dioxide</div>
                                            <div class="vital_signs_description">Carbon dioxide levels in the air are at
                                                their highest in 650,000 years</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide global_temperature slick-slide slick-active" style="width: 350px;"
                            data-slick-index="1" aria-hidden="false" tabindex="-1" role="option"
                            aria-describedby="slick-slide11">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_2">
                                        <div class="title">Global Temperature</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value up"></div>
                                                <div class="change_number">1.1</div>
                                                <div class="units">°C since preindustrial</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Global Temperature</div>
                                            <div class="vital_signs_description">Nineteen of the warmest years have occurred
                                                since 2000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide methane slick-slide slick-active" style="width: 350px;" data-slick-index="2"
                            aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide12">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_14">
                                        <div class="title">Methane</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value up"></div>
                                                <div class="change_number">1923.6</div>
                                                <div class="units">parts per billion</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Methane</div>
                                            <div class="vital_signs_description"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide arctic_ice_minimum slick-slide slick-active" style="width: 350px;"
                            data-slick-index="3" aria-hidden="false" tabindex="-1" role="option"
                            aria-describedby="slick-slide13">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_3">
                                        <div class="title">Arctic Sea Ice Minimum Extent</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value down"></div>
                                                <div class="change_number">12.2</div>
                                                <div class="units">percent per decade since 1979</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Arctic Sea Ice Minimum Extent</div>
                                            <div class="vital_signs_description">In 2012, Arctic summer sea ice shrank to
                                                the lowest extent on record</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide ice_sheets slick-slide" style="width: 350px;" data-slick-index="4"
                            aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide14">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_4">
                                        <div class="title">Ice Sheets</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value down"></div>
                                                <div class="change_number">424</div>
                                                <div class="units">billion metric tons per year</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Ice Sheets</div>
                                            <div class="vital_signs_description">Satellite data show that Earth's polar ice
                                                sheets are losing mass</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide sea_level slick-slide" style="width: 350px;" data-slick-index="5"
                            aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide15">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_5">
                                        <div class="title">Sea Level</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value up"></div>
                                                <div class="change_number">4</div>
                                                <div class="units">inches since January 1993</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Sea Level</div>
                                            <div class="vital_signs_description">Global average sea level has risen nearly
                                                7" (178 mm) over the past 100 years</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide ocean_heat_added slick-slide" style="width: 350px;" data-slick-index="6"
                            aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide16">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="vital_sign_slide" id="vital_sign_slide_13">
                                        <div class="title">Ocean Warming</div>
                                        <div class="rate_of_change_wrapper">
                                            <div class="rate_of_change">
                                                <div class="value up"></div>
                                                <div class="change_number">345</div>
                                                <div class="units">zettajoules since 1955</div>
                                            </div>
                                            <div class="link_indicator"><svg height="20" viewBox="0 0 20 20" width="20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m11.5 0v8.5h8.5v3h-8.5v8.5h-3v-8.5h-8.5v-3h8.5v-8.5z"
                                                        fill-rule="evenodd"></path>
                                                </svg></div>
                                        </div>
                                        <div class="rollover_vital_signs" title="">
                                            <div class="r_title">Ocean Warming</div>
                                            <div class="vital_signs_description">The past 20 years have seen the warmest
                                                ocean temperatures on record.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="slide carbon_dioxide slick-slide slick-cloned" style="width: 350px;" data-slick-index="7"
                            aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide global_temperature slick-slide slick-cloned" style="width: 350px;"
                            data-slick-index="8" aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide methane slick-slide slick-cloned" style="width: 350px;" data-slick-index="9"
                            aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                        <li class="slide arctic_ice_minimum slick-slide slick-cloned" style="width: 350px;"
                            data-slick-index="10" aria-hidden="true" tabindex="-1">
                            <div class="image_and_description_container overlay">
                                <div class="readout">
                                    <div class="loading value">Loading...</div>
                                </div>
                            </div>
                        </li>
                    </div>
                </div><button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"
                    style="display: block;">Next</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Info',
    // Your component's JavaScript code goes here
    mounted() {

    },
}
</script>

<style scoped>
/*! CSS Used from: https://climate.nasa.gov/assets/public_manifest-ae4faaa75a10c8ee4379d403dccf297a83f9595d3af0a9ab8549d3bb408b043d.css ; media=all */
@media all {
    @font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/robotoslab/v14/BngMUXZYTXPIvIBgJJSb6ufN5qA.woff2') format('woff2'); /* You can change this URL to the appropriate one if you have the font files locally */
}
    .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
    }

    .slick-list {
        position: relative;
        overflow: hidden;
        display: block;
        margin: 0;
        padding: 0;
    }

    .slick-list:focus {
        outline: none;
    }

    .slick-slider .slick-list,
    .slick-track,
    .slick-slide {
        transform: translate3d(0, 0, 0);
    }

    .slick-track {
        position: relative;
        left: 0;
        top: 0;
        display: block;
        zoom: 1;
    }

    .slick-track:before,
    .slick-track:after {
        content: "";
        display: table;
    }

    .slick-track:after {
        clear: both;
    }

    .slick-slide {
        float: left;
        height: 100%;
        min-height: 1px;
        display: none;
    }

    .slick-initialized .slick-slide {
        display: block;
    }

    .slick-prev,
    .slick-next {
        position: absolute;
        display: block;
        height: 20px;
        width: 20px;
        line-height: 0;
        font-size: 0;
        cursor: pointer;
        background: transparent;
        color: transparent;
        top: 50%;
        margin-top: -10px;
        padding: 0;
        border: none;
        outline: none;
    }

    .slick-prev:hover,
    .slick-prev:focus,
    .slick-next:hover,
    .slick-next:focus {
        outline: none;
        background: transparent;
        color: transparent;
    }

    .slick-prev:hover:before,
    .slick-prev:focus:before,
    .slick-next:hover:before,
    .slick-next:focus:before {
        opacity: 1;
    }

    .slick-prev:before,
    .slick-next:before {
        font-family: "slick";
        font-size: 20px;
        line-height: 1;
        color: white;
        opacity: 0.75;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .slick-prev {
        left: -25px;
    }

    .slick-prev:before {
        content: "\2190";
    }

    .slick-next {
        right: -25px;
    }

    .slick-next:before {
        content: "\2192";
    }

    .slick-slider {
        margin-bottom: 30px;
    }

    section {
        display: block;
    }

    button {
        font-family: sans-serif;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    button {
        font-size: 100%;
        margin: 0;
        vertical-align: baseline;
        *vertical-align: middle;
    }

    button {
        line-height: normal;
    }

    button {
        text-transform: none;
    }

    button {
        -webkit-appearance: button;
        cursor: pointer;
        *overflow: visible;
    }

    button {
        color: #222;
    }

    ::selection {
        background: #b3d4fc;
        text-shadow: none;
    }

    @media print {
        * {
            background: transparent !important;
            color: #000 !important;
            box-shadow: none !important;
            text-shadow: none !important;
        }
    }

    button {
        color: #3c3c3c;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    button {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    button {
        font-family: Helvetica, Arial, sans-serif;
        color: #2b2b2b;
    }

    .slide {
        position: relative;
        min-height: 100%;
    }

    .slick-slider {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    @media (min-width: 480px) {
        .slick-slider {
            width: 84%;
        }
    }

    @media (min-width: 600px) {
        .slick-slider {
            width: 90%;
        }
    }

    .slick-slider .slide {
        margin: 0 6px;
    }

    @media (min-width: 769px) {
        .slick-slider .slide {
            margin: 0 9px;
        }
    }

    .slick-slider .image_and_description_container {
        position: relative;
        overflow: hidden;
        min-height: 129px;
    }

    .slick-slider .slick-prev,
    .slick-slider .slick-next {
        width: 30px;
        height: 50px;
    }

    .slick-slider .slick-prev:before,
    .slick-slider .slick-next:before {
        content: '';
        display: inline-block;
        padding: 0;
        cursor: pointer;
        width: 17px;
        height: 25px;
        background: url(https://climate.nasa.gov/assets/ui_sprite@2x.png) -30px -100px;
        background-size: 300px;
        width: 14px;
        height: 24px;
    }

    .slick-slider .slick-prev:before:hover,
    .slick-slider .slick-next:before:hover {
        background: url(https://climate.nasa.gov/assets/ui_sprite@2x.png) -30px -100px;
        background-size: 300px;
    }

    .slick-slider .slick-next:before {
        content: '';
        display: inline-block;
        padding: 0;
        cursor: pointer;
        width: 17px;
        height: 25px;
        background: url(https://climate.nasa.gov/assets/ui_sprite@2x.png) -30px -150px;
        background-size: 300px;
    }

    .slick-slider .slick-next:before:hover {
        background: url(https://climate.nasa.gov/assets/ui_sprite@2x.png) -30px -150px;
        background-size: 300px;
    }

    .slick-slider .slick-prev {
        left: -9%;
    }

    @media (min-width: 600px) {
        .slick-slider .slick-prev {
            left: -7%;
        }
    }

    @media (min-width: 769px) {
        .slick-slider .slick-prev {
            left: -5%;
        }
    }

    .slick-slider .slick-next {
        right: -9%;
    }

    @media (min-width: 600px) {
        .slick-slider .slick-next {
            right: -7%;
        }
    }

    @media (min-width: 769px) {
        .slick-slider .slick-next {
            right: -5%;
        }
    }

    .page_dashboard .slide {
        z-index: 1;
        position: relative;
    }

    .page_dashboard .slide.carbon_dioxide .title,
    .page_dashboard .slide.carbon_dioxide .link_indicator {
        color: #FBBC6B;
    }

    .page_dashboard .slide.methane .title,
    .page_dashboard .slide.methane .link_indicator {
        color: #FF984B;
    }

    .page_dashboard .slide.global_temperature .title,
    .page_dashboard .slide.global_temperature .link_indicator {
        color: #F38478;
    }

    .page_dashboard .slide.arctic_ice_minimum .title,
    .page_dashboard .slide.arctic_ice_minimum .link_indicator {
        color: #94AED9;
    }

    .page_dashboard .slide.ice_sheets .title,
    .page_dashboard .slide.ice_sheets .link_indicator {
        color: #AB9AE0;
    }

    .page_dashboard .slide.sea_level .title,
    .page_dashboard .slide.sea_level .link_indicator {
        color: #76A9B9;
    }

    .page_dashboard .slide.ocean_heat_added .title,
    .page_dashboard .slide.ocean_heat_added .link_indicator {
        color: #57A5E7;
    }

    * {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    button {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    section.dashboard {
        position: absolute;
        bottom: 70px;
        overflow: hidden;
        width: 100%;
        color: #F1F1F1;
        text-align: center;
        z-index: 20;
    }

    @media (min-width: 480px) {
        section.dashboard {
            background-color: transparent;
        }
    }

    @media screen and (max-height: 380px) {
        section.dashboard {
            display: none;
        }
    }

    section.dashboard .slick-slider {
        margin: 0 auto;
        width: calc(100% - 70px);
    }

    @media (min-width: 480px) {
        section.dashboard .slick-slider {
            width: calc(100% - 90px);
        }
    }

    @media (min-width: 1200px) {
        section.dashboard .slick-slider {
            max-width: 1400px;
        }
    }

    @media (min-width: 1700px) {
        section.dashboard .slick-slider {
            max-width: 1600px;
            width: 1600px;
        }
    }

    section.dashboard .slick-slider .slick-track {
        margin-left: auto;
        margin-right: auto;
    }

    section.dashboard .slick-list:focus {
        outline: none;
    }

    section.dashboard .slick-prev,
    section.dashboard .slick-next {
        position: absolute;
        background-color: transparent;
        font-size: 1.8em;
        width: 40px;
        height: 100%;
        z-index: 21;
        text-indent: -9999px;
        top: 0;
        color: #F1F1F1;
        margin-top: 0;
    }

    section.dashboard .slick-prev {
        background-image: url(https://climate.nasa.gov/assets/arrow_left_slim_dashboard.png);
        background-repeat: no-repeat;
        background-size: 27px 70px;
        background-position: 7px 12px;
        left: -40px;
    }

    section.dashboard .slick-next {
        background-image: url(https://climate.nasa.gov/assets/arrow_right_slim_dashboard.png);
        background-repeat: no-repeat;
        background-size: 27px 70px;
        background-position: 7px 12px;
        right: -40px;
    }

    section.dashboard .slide {
        outline: 0;
        padding: 0.8rem .6rem 1rem;
        min-width: 200px;
    }

    @media (min-width: 600px) {
        section.dashboard .slide {
            padding: 0.8rem 1.4rem 1.2rem;
        }
    }

    @media (min-width: 1024px) {
        section.dashboard .slide {
            min-width: 0;
            padding: 1.2rem .3rem;
            padding: 0.8rem .3rem 1.2rem;
        }
    }

    @media (min-width: 1200px) {
        section.dashboard .slide {
            padding: 0.8rem .3rem 1.2rem;
        }
    }

    @media (min-width: 1700px) {
        section.dashboard .slide {
            margin: 0 1em;
        }
    }

    section.dashboard .slide:hover svg {
        stroke: white;
        fill: white;
    }

    section.dashboard .image_and_description_container {
        padding-left: 0;
    }

    section.dashboard .title {
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: .5rem;
        font-size: 0.8em;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
    }

    section.dashboard .value {
        color: #F1F1F1;
        margin-top: 2px;
        text-align: center;
        line-height: 1.1;
    }

    section.dashboard .value {
        font-size: 1.1em;
    }

    @media (min-width: 769px) {
        section.dashboard .value {
            font-size: 1.6em;
        }
    }

    section.dashboard .change_number {
        font-size: 2.1em;
    }

    section.dashboard .units {
        top: 0;
        width: 45%;
    }

    section:not(.homepage_dashboard_container) .page_dashboard .overlay .value:after {
        content: "";
        display: inline-block;
        background: url(https://climate.nasa.gov/assets/dashboard_sprite.png) no-repeat;
        background-size: 200px;
        background-position: -10px -10px;
        width: 33px;
        height: 33px;
        margin-left: .8rem;
        vertical-align: middle;
        transform: translateY(-5%);
    }

    section:not(.homepage_dashboard_container) .page_dashboard .slide:hover .value:after {
        background-position: -10px -60px;
    }

    section:not(.homepage_dashboard_container) .page_dashboard .slide .overlay .value:after {
        background-position: -60px -10px;
    }

    section:not(.homepage_dashboard_container) .page_dashboard .slide .overlay:hover .value:after {
        background-position: -60px -60px;
    }

    .dashboard li .value {
        text-align: center;
    }

    section.dashboard {
        background-color: transparent;
    }

    section.dashboard .slick-slider .image_and_description_container {
        min-height: 110px;
    }

    @media (min-width: 1200px) {
        section.dashboard .slick-slider .image_and_description_container {
            min-height: 115px;
        }
    }

    section.dashboard .slick-next,
    section.dashboard .slick-prev {
        background-image: url(https://climate.nasa.gov/assets/chevron-arrow-thin.svg);
        background-size: auto;
        background-position: center;
    }

    section.dashboard .slick-prev {
        transform: rotate(180deg);
    }

    section.dashboard .vital_sign_slide .title {
        text-align: left;
        font-size: 1rem;
        line-height: 1.1;
        color: white;
        margin-bottom: 0.1rem;
        text-transform: none;
    }

    @media (min-width: 769px) {
        section.dashboard .vital_sign_slide .title {
            font-size: .9rem;
        }
    }

    @media (min-width: 769px) {
        section.dashboard .vital_sign_slide .title {
            font-size: 20px;
            margin-bottom: 0.3rem;
        }
    }

    section.dashboard .vital_sign_slide .rate_of_change_wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 8px;
    }

    @media (min-width: 769px) {
        section.dashboard .vital_sign_slide .rate_of_change_wrapper {
            margin-top: 10px;
        }
    }

    section.dashboard .vital_sign_slide .rate_of_change {
        display: flex;
        align-items: flex-start;
    }

    section.dashboard .vital_sign_slide .value {
        display: inline-block;
        font-size: 19px;
        margin-right: 6px;
        margin-top: 3px;
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
    }

    @media (min-width: 769px) {
        section.dashboard .vital_sign_slide .value {
            margin-top: 4px;
            width: 30px;
            height: 30px;
            flex: 0 0 30px;
        }
    }

    section.dashboard .vital_sign_slide .value.up {
        transform: rotate(180deg);
        background: url(https://climate.nasa.gov/assets/arrow.svg) center no-repeat;
        background-size: contain;
    }

    section.dashboard .vital_sign_slide .value.down {
        background: url(https://climate.nasa.gov/assets/arrow.svg) center no-repeat;
        background-size: contain;
    }

    section.dashboard .vital_sign_slide .change_number {
        display: inline-block;
        margin-right: 9px;
        line-height: 1;
        font-weight: 700;
    }

    @media (min-width: 769px) {
        section.dashboard .vital_sign_slide .change_number {
            font-size: 40px;
        }
    }

    section.dashboard .vital_sign_slide .units {
        font-size: 11px;
        text-align: left;
        width: auto;
        margin: 3px 10px 0 0;
    }

    section.dashboard .vital_sign_slide .link_indicator {
        display: flex;
        width: 33px;
        min-width: 33px;
        height: 33px;
        min-height: 33px;
        padding: 9px;
        border-radius: 50%;
        background-color: #4F4F4F00;
        transition: all .25s ease-in-out;
        fill: currentColor;
    }

    section.dashboard .vital_sign_slide .link_indicator svg {
        width: 100%;
        height: 100%;
    }

    section.dashboard .vital_sign_slide .vital_signs_description {
        overflow: hidden;
        font-size: .85em;
        line-height: 1.25em;
    }

    section.dashboard .slide {
        cursor: pointer;
        padding: 0.9rem 1.3rem 0;
        margin: 0;
        position: relative;
    }

    section.dashboard .slide:before {
        content: '';
        display: block;
        position: absolute;
        left: 1.3rem;
        top: calc(0.9rem - 12px);
        width: 0;
        border-top: 1px solid #ffffff;
        transition: width .25s ease-in-out;
        z-index: 1;
    }

    section.dashboard .slide .image_and_description_container {
        overflow: visible;
    }

    section.dashboard .slide .image_and_description_container:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: -12px;
        width: 100%;
        border-top: 1px solid #6A6A6A;
    }

    section.dashboard .slide .rollover_vital_signs {
        display: none;
    }

    section.dashboard .slide:hover:before {
        width: calc(100% - 2.6rem);
    }

    section.dashboard .slide:hover .link_indicator {
        background-color: #4f4f4f91;
        transform: rotate(90deg);
    }

    section.dashboard .slide:hover .link_indicator svg {
        stroke: none;
        fill: currentColor;
    }

    .vital_signs_menu .slick-slider {
        margin: 0;
        width: 100%;
    }

    section:not(.homepage_dashboard_container) .page_dashboard .overlay .value:after {
        display: none;
    }
}

/*! CSS Used fontfaces */
@font-face {
    font-family: "slick";
    src: url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.eot");
    src: url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.eot?#iefix") format("embedded-opentype"), url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.woff") format("woff"), url("https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.ttf") format("truetype"), url(https://climate.nasa.gov/lib/styles/vendor/fonts/slick.svg#slick) format("svg");
    font-weight: normal;
    font-style: normal;
}
</style>
