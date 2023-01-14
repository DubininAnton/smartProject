import navbar from "./modules/navbar";
import subnavbar from "./modules/subnavbar";
import mainBlock from "./modules/mainBlock";
import {subnavbar768} from "./modules/subnavbar";
import stocks from "./modules/stocks";
import stocksItem from "./modules/stocksItem";
import contacts from "./modules/contacts";
import forms from "./modules/forms";
import accordion from "./modules/accordion";
import catalog from "./modules/catalog";
import catalog768 from "./modules/catalog768";



window.addEventListener('DOMContentLoaded', () => {
    navbar(".navbar__wrapper");
    subnavbar(".subnavbar__catalog");
    mainBlock(".bestsalesCard");
    subnavbar768(".subnavbar768", ".catalog", ".more", ".search", "#formData");
    stocks(".stocks__pageStocks", ".stocks__btn");
    stocksItem(".stocks__aboutUsTitle", ".stocks__stocks", ".stocks__container", ".stocks__aboutUsTitle320");
    contacts(".contacts__table", ".contacts__adress", ".contacts__cart");
    forms();
    accordion(".accordion");
    catalog(".catalogMain");
    catalog768();

});









