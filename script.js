'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
fullPrice = screenPrice + servicePrice1 + servicePrice2;
//let servicePercentPrice = Math.ceil( fullPrice - fullPrice * (rollback/100) );

const ShowTypeOf = function(variable){
    return (variable + typeof(variable));
}

const getAllServicePrices = function(servPrice1, servPrice2){
    return servPrice1 + servPrice2;
}

function getFullPrice(priceScreen, servPrice1 ,servPrice2, callback){
    return priceScreen + callback(servPrice1, servPrice2);
}

const getTitle = function(Title){
    if (!Title){
        return Title;
    }
    if(Title[0] != ' '){
        return Title[0].toUpperCase() + Title.toLowerCase().slice(1);
    }
    else{
        return Title[0] + (Title.toLowerCase()).slice(1);
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
        console.log('Что то пошло не так');
    }
    else{
        console.log('ошибка');
    }

}


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, servicePrice1, servicePrice2, getAllServicePrices);
servicePercentPrice = getServicePercentPrices();


console.log('Тип title: ' + typeof(title));
console.log('Тип fullPrice: ' + typeof(fullPrice));
console.log('Тип adaptive: ' + typeof(adaptive));
console.log('Название проекта: ' + getTitle(title));
console.log('Типы экранов: ' + screens);
console.log('Стоимость данной работы = ' + screenPrice);
console.log('Адаптив - ' + adaptive);
console.log('Тип дополнительной услуги: ' + service1);
console.log('Стоимость дополнительной услуги = ' + servicePrice1);
console.log('Тип дополнительной услуги: ' + service2);
console.log('Стоимость дополнительной услуги = ' + servicePrice2);
console.log('Стоимость ВСЕХ дополнительных услуг = ' + allServicePrices);
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей/долларов/гривен/юани');
console.log('Процент разработчику = ' + getServicePercentPrices(fullPrice));
getRollbackMessage(fullPrice);