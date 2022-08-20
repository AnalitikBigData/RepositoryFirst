'use strict';

const Number = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num);
}
const isString = function(str){
    if(!Number(str)){
        return true;
    } else return false;
}

const title = document.getElementsByTagName('h1')[0];
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input[type=range]');
const span = document.querySelector('.rollback span[class=range-value]');
const totalInput1 = document.getElementsByClassName('total-input')[0];
const totalInput2 = document.getElementsByClassName('total-input')[1];
const totalInput3 = document.getElementsByClassName('total-input')[2];
const totalInput4 = document.getElementsByClassName('total-input')[3];
const totalInput5 = document.getElementsByClassName('total-input')[4];
let screenHTML = document.querySelectorAll('.screen');
const inputScreens = document.querySelector('.main-controls__input');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    servicePricesPercent: 0, 
    servicePriceNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {}, 
    servicePrice: 0,
    serviceWithRollback: 0,
    countScreens: 0,

    init : function(){
        appData.addTitle();
        buttonStart.addEventListener('click', appData.start);
        plus.addEventListener('click', appData.addScreenBlocks);
        range.addEventListener('input', appData.getRollback);
    },
    addTitle : function(){
        document.title = title.textContent;
    },

    addScreens : function(){
        screenHTML = document.querySelectorAll('.screen');
        screenHTML.forEach(function(screen, index){
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },

    addScreenBlocks : function(){
        const cloneScreen = screenHTML[0].cloneNode(true);
        screenHTML[screenHTML.length - 1].after(cloneScreen);
    },

    addServices : function(){
        percent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked){
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        number.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addPrices : function(){
        for(let screen of appData.screens){
            appData.screenPrice += +screen.price;
            appData.countScreens += +screen.count;
        }
        for(let key in appData.servicesNumber){
            appData.servicePriceNumber += appData.servicesNumber[key];
        }
        for(let key in appData.servicesPercent){
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100) ;
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePriceNumber;
        appData.getServiceWithRollback();
    },

    getServiceWithRollback : function(){
        appData.serviceWithRollback = Math.ceil( appData.fullPrice - appData.fullPrice * (appData.rollback/100) );
    },

    ban : function(){
        let counter = 0;
        for(let i = 0; i < appData.screens.length; i++){
            if(appData.screens[i].name === 'Тип экранов' || appData.screens[i].price===0){
                counter++;
            }
        }
        return counter;
    },

    getRollback : function(){
        span.textContent = range.value + '%';
        appData.rollback = +range.value;
        appData.getServiceWithRollback();
        totalInput5.value = appData.serviceWithRollback;
    },

    showResult : function(){
        totalInput1.value = appData.screenPrice;
        totalInput2.value = appData.countScreens;
        totalInput3.value = appData.servicePricesPercent + appData.servicePriceNumber;
        totalInput4.value = appData.fullPrice;
        totalInput5.value = appData.serviceWithRollback;
    },

    start : function(){
        appData.addScreens();
        appData.addServices();
        appData.getRollback();
        appData.addPrices();
        if(appData.ban() === 0){
            buttonStart.disabled = true;
            buttonStart.addEventListener('click', appData.start);
            console.log('!!!');
        }
        else{
            buttonStart.disabled = false;
            console.log('---');
            appData.screens.splice(0, appData.screens.length);
        };
        appData.showResult();
        console.log(appData);
    },
};
appData.init();


//console.log(title);//
//console.log(plus);
//console.log(percent);
//console.log(number);
//console.dir(range);
//console.log(span);
//console.log(totalInput1);
//console.log(totalInput2);
//console.log(totalInput3);
//console.log(totalInput4);
//console.log(totalInput5);
//console.log(screenHTML);