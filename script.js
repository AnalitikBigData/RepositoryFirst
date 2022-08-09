'use strict';

const Number = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0, 
    fullPrice: 0,
    servicePercentPrice: 0,
    service: '', 
    servicePrice: 0,
    ShowTypeOf: function(variable){
        return (variable + typeof(variable));
    },
    asking : function(){
        appData.title = prompt('Как называется ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?');
        do{
            appData.screenPrice = +prompt('Сколько будет стоить данная работа?');
        } while(!Number(appData.screenPrice) || appData.screenPrice <= 0);
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    },
    getAllServicePrices : function(){
        let summa = 0;
        for(let i = 0; i < 2; i++){
            appData.service = prompt('Какой дополнительный тип услуги нужен?');
            appData.servicePrice = +prompt('Сколько это будет стоить?');
            while(!Number(appData.servicePrice)){
                appData.servicePrice = +prompt('Сколько это будет стоить?');
            }
            summa += appData.servicePrice;
        }
        return summa;
    },
    getFullPrice: function(callback){
        return appData.screenPrice + callback();
    },
    getTitle : function(){
        if (!appData.title){
            return appData.title;
        }
        if((appData.title.trim()).length === 0){
            return appData.title;
        }
        if(appData.title[0] !== ' '){
            return appData.title[0].toUpperCase() + appData.title.toLowerCase().slice(1);
        }
        else{
            let stringTemp = appData.title.trim();
            return stringTemp[0].toUpperCase() + (stringTemp.toLowerCase()).slice(1);
        }
    },
    getServicePercentPrices : function(){
        return Math.ceil( appData.fullPrice - appData.fullPrice * (appData.rollback/100) );
    },
    getRollbackMessage : function(){
        if(appData.fullPrice >= 30000){
            return 'Даем скидку в 10%';
        }
        else if(appData.fullPrice >= 15000 && appData.fullPrice < 30000){
            return 'Даем скидку в 5%';
        }
        else if(appData.fullPrice > 0 && appData.fullPrice < 15000){
            return 'Скидка не предусмотрена';
        }
        else if(appData.fullPrice <= 0){
            return 'Что-то пошло не так';
        }
        else{
            return 'ошибка';
        }
    },
    logger : function(){
        /*console.log('Название проекта: ' + appData.getTitle());
        console.log('Типы экранов: ' + appData.screens);
        console.log('Стоимость данной работы = ' + appData.screenPrice);
        console.log('Адаптив - ' + appData.adaptive);
        console.log('Тип дополнительной услуги: ' + appData.service);
        console.log('Стоимость дополнительной услуги = ' + appData.servicePrice);
        console.log('Стоимость ВСЕХ дополнительных услуг = ' + appData.allServicePrices);
        console.log('Стоимость разработки сайта '+ appData.fullPrice + ' рублей/долларов/гривен/юани');
        console.log('Процент разработчику = ' + appData.getServicePercentPrices());
        console.log(appData.getRollbackMessage(appData.fullPrice));*/ 
        for(let key in appData){
            console.log(key + ' ' + appData[key]);
        }
    },
    start : function(){
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.getAllServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    } 
}
appData.start();