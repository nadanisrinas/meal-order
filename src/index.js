import './style/style.scss';
import 'jquery';
window.$ = window.jQuery = $;
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import select2 from "select2"
import "regenerator-runtime";
import main from './js/main.js';
import "./js/component/section-banner.js";

document.addEventListener("DOMContentLoaded", main);

