'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice;

const Number = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
}

do{
    screenPrice = +prompt('Сколько будет стоить данная работа?');
} while(!Number(screenPrice));

let adaptive = confirm('Нужен ли адаптив на сайте?');
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service; 
let servicePrice; 

const ShowTypeOf = function(variable){
    return (variable + typeof(variable));
}

const getAllServicePrices = function(){
    for(let i = 0; i < 2; i++){
        service = prompt('Какой дополнительный тип услуги нужен?');
        servicePrice += +prompt('Сколько это будет стоить?');
        while(!Number(servicePrice)){
            servicePrice = +prompt('Сколько это будет стоить?');
        }
    }
    return servicePrice;
}

function getFullPrice(priceScreen, callback){
    return priceScreen + callback();
}

const getTitle = function(Title){
    if (!Title){
        return Title;
    }
    if(Title[0] !== ' '){
        return Title[0].toUpperCase() + Title.toLowerCase().slice(1);
    }
    else{
        let stringTemp = Title.trim();
        return stringTemp[0].toUpperCase() + (stringTemp.toLowerCase()).slice(1);
    }
}

const getServicePercentPrices = function(priceFull){
    return Math.ceil( priceFull - priceFull * (rollback/100) );
}

const getRollbackMessage = function(priceFull){
    if(priceFull >= 30000){
        console.log('Даем скидку в 10%');
    }
    else if(priceFull >= 15000 && priceFull < 30000){
        console.log('Даем скидку в 5%');
    }
    else if(priceFull > 0 && priceFull < 15000){
        console.log('Скидка не предусмотрена');
    }
    else if(priceFull <= 0){
        console.log('Что-то пошло не так');
    }
    else{
        console.log('ошибка');
    }

}


allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, getAllServicePrices);
servicePercentPrice = getServicePercentPrices();


console.log('Тип title: ' + typeof(title));
console.log('Тип fullPrice: ' + typeof(fullPrice));
console.log('Тип adaptive: ' + typeof(adaptive));
console.log('Название проекта: ' + getTitle(title));
console.log('Типы экранов: ' + screens);
console.log('Стоимость данной работы = ' + screenPrice);
console.log('Адаптив - ' + adaptive);
console.log('Тип дополнительной услуги: ' + service);
console.log('Стоимость дополнительной услуги = ' + servicePrice);
console.log('Стоимость ВСЕХ дополнительных услуг = ' + allServicePrices);
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей/долларов/гривен/юани');
console.log('Процент разработчику = ' + getServicePercentPrices(fullPrice));
getRollbackMessage(fullPrice);