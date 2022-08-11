'use strict';

const Number = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
}
const isString = function(str){
    if(!Number(str)){
        return true;
    } else return false;
}

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0, 
    fullPrice: 0,
    servicePercentPrice: 0,
    service: {}, 
    servicePrice: 0,
    
    asking : function(){
        appData.title = prompt('Как называется ваш проект?');
        while(!isString(appData.title)){
            appData.title = prompt('Как называется ваш проект?');
        }
        for(let i = 0; i < 2; i++){
            let name = prompt('Какие типы экранов нужно разработать?');
            while(!isString(name)){
                name = prompt('Какие типы экранов нужно разработать?');
            }
            let price = +prompt('Сколько будет стоить данная работа?');
            while(!Number(price) || price < 0){
                price = +prompt('Сколько будет стоить данная работа?');
            }
            appData.screens.push({id: i, name: name, price: price});
            //appData.screenPrice += price;
            
        }
        appData.screenPrice += appData.screens.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.price;
        },appData.screenPrice);
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    },
    aditionalServices : function(){
        let price = 0;
        let name;
        const array = [];
        for(let i = 0; i < 2; i++){
            name = prompt('Какой дополнительный тип услуги нужен?');
            while(!isString(name)){
                name = prompt('Какой дополнительный тип услуги нужен?');
            }
            price = +prompt('Сколько это будет стоить?');
            while(!Number(price)){
                price = +prompt('Сколько это будет стоить?');
            }
            appData.allServicePrices += +price;
            array.push({id: i, name: +price});
            
        }
        return array;
    },
    getAllServicePrices : function(){
        /*for(let key in appData.service){
            appData.allServicePrices += appData.service[key];
        }*/
        return appData.allServicePrices;
    },
    getFullPrice: function(){
        return appData.screenPrice + appData.allServicePrices;
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
        console.log('Название проекта: ' + appData.getTitle());
        console.log(appData.screens);
        console.log('Стоимость данной работы = ' + appData.screenPrice);
        console.log('Адаптив - ' + appData.adaptive);
        //console.log(appData.aditionalServices());
        console.log('Стоимость ВСЕХ дополнительных услуг = ' + appData.allServicePrices);
        console.log('Стоимость разработки сайта '+ appData.fullPrice + ' рублей/долларов/гривен/юани');
        console.log('Процент разработчику = ' + appData.getServicePercentPrices());
        console.log(appData.getRollbackMessage(appData.fullPrice)); 
        
    },
    start : function(){
        appData.asking();
        console.log('Дополнительные услуги: ');
        console.log(appData.aditionalServices());
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    } 
}
appData.start();