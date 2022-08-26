'use strict';

let Number = num => !isNaN(parseFloat(num)) && isFinite(num);

let isString = str => {
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

//const cms = document.querySelector('.main-controls__views.cms');
const checkCMS = document.querySelector('div.main-controls__views.cms input[type=checkbox]');
let variantCMS = document.querySelector('.hidden-cms-variants');

//const inputCMS = document.querySelectorAll('.main-controls__input')[8];
const cmsSelect = document.querySelector('.hidden-cms-variants select');


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
    cms : [],
    percentCMS : 0,

    init : function(){ // 
        this.addTitle();
        buttonStart.addEventListener('click', appData.start);
        buttonReset.addEventListener('click', appData.block);
        buttonReset.addEventListener('click', appData.reset);
        plus.addEventListener('click', appData.addScreenBlocks);
        range.addEventListener('input', appData.getRollback);
        appData.CMS();
        checkCMS.addEventListener('click', appData.addCMS);
        cmsSelect.addEventListener('change', appData.CMS);
    },
    addTitle : function(){
        document.title = title.textContent;
    },

    addScreens : function(){ // добавление экранов
        plus.disabled = false;
        screenHTML = document.querySelectorAll('.screen');
        screenHTML.forEach(function(screen, index){
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = false;
            input.disabled = false;
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
            check.disabled = false;
            if(check.checked){
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        number.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            check.disabled = false;
            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addPrices : function(){
        if(appData.ban() === 0){
            for(let screen of this.screens){
                this.screenPrice += +screen.price;
                this.countScreens += +screen.count;
            }
        
            for(let key in this.servicesNumber){
                this.servicePriceNumber += this.servicesNumber[key];
            }
            for(let key in this.servicesPercent){
                this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100) ;
            }
            this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePriceNumber;
            appData.fullPrice = appData.fullPrice + appData.fullPrice * (appData.percentCMS / 100);
            appData.getServiceWithRollback();
        }
    },

    getServiceWithRollback : function(){
        appData.serviceWithRollback = Math.ceil( appData.fullPrice - appData.fullPrice * (appData.rollback/100) );
    },

    ban : function(){ // забанить если экраны с недопустимыми значениями
        let counter = 0;
        for(let i = 0; i < this.screens.length; i++){
            if(this.screens[i].name === 'Тип экранов' || appData.screens[i].price===0){
                counter++;
            }
        }
        if(counter !== 0){
            buttonStart.disabled = true;
        }
        return counter;
    },
    block : function(){ // блокировка кнопок
        plus.disabled = true;
        screenHTML = document.querySelectorAll('.screen');
        screenHTML.forEach(function(screen){
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        });
        percent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });

        number.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });
        variantCMS.forEach(function(cms){
            const select = cms.querySelector('select');
            const input = cms.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        })
        buttonStart.style.display = 'none';
        buttonReset.style.display = 'block';
    },
    CMS : function(){ // вызов всех функций  cms
        appData.addCMS();
        appData.workWithCMS();
    },

    addCMS : function(){ // добавлнение cms
        if(checkCMS.checked === true){
            variantCMS = document.querySelectorAll('.hidden-cms-variants');
            variantCMS[0].style.display = 'flex';
            variantCMS.forEach(function(option){
                const select = option.querySelector('select');
                select.disabled = false;
                const input = option.querySelector('input');
                const selectLabel = select.options[select.selectedIndex].label;
                appData.cms.push(
                    {
                        option : selectLabel,
                        value : +select.value,
                    }
                )
            })
        }
        appData.workWithCMS();
        console.log(appData.cms);
    },

    workWithCMS : function(){ // обработка массива и добавление значений
        for(let i = 0; i < appData.cms.length; i++){
            if(appData.cms[i].option === 'Другое'){
                //console.log(appData.cms[i].option + ' ' + appData.cms[i].value);
                const inputCMS = document.querySelectorAll('.main-controls__input')[8];
                inputCMS.style.display = 'flex';
                inputCMS.disabled = false;
                //console.log(inputCMS.childNodes[1].value);
                appData.percentCMS = +inputCMS.childNodes[1].value;
            }
            else if(appData.cms[i].option === 'WordPress'){
                appData.percentCMS = appData.cms[i].value;
            }
        }
    },

    getRollback : function(){
        range.disabled = false;
        span.textContent = range.value + '%';
        appData.rollback = +range.value;
        appData.getServiceWithRollback();
        totalInput5.value = appData.serviceWithRollback;
    },

    showResult : function(){
        totalInput1.value = this.screenPrice;
        totalInput2.value = this.countScreens;
        totalInput3.value = this.servicePricesPercent + appData.servicePriceNumber;
        totalInput4.value = this.fullPrice;
        totalInput5.value = this.serviceWithRollback;
    },

    start : function(){
        appData.addScreens();
        appData.addServices();
        appData.getRollback();
        appData.CMS();
        appData.addPrices();
        if(appData.ban() === 0){
            buttonStart.disabled = true;
            console.log('!!!');
            appData.showResult();
            appData.block();
        }
        else{
            buttonStart.disabled = false;
            console.log('---');
            appData.screens.splice(0, appData.screens.length);
        };
        console.log(appData);
    },

    deleteShowResult : function(){ // удаление 
        appData.screenPrice = 0;
        appData.rollback = 0;
        appData.servicePricesPercent = 0;
        appData.servicePriceNumber = 0;
        appData.fullPrice = 0;
        appData.servicePercentPrice = 0; 
        appData.servicePrice = 0;
        appData.serviceWithRollback = 0;
        appData.countScreens = 0;
        appData.percentCMS = 0;
        totalInput1.value = 0;
        totalInput2.value = 0;
        totalInput3.value = 0;
        totalInput4.value = 0;
        totalInput5.value = 0;
    },

    deleteScreens : function(){
        appData.screens.splice(0 , appData.screens.length);
        for(let i = 0; i < screenHTML.length - 1; i++){
            screenHTML[i].remove();
        }
        const select = document.querySelector('select');
        const input = document.querySelector('input');
        select.value = '';
        input.value = '';
    },

    deleteCMS : function(){
        appData.cms.splice(0 , appData.cms.length);
        variantCMS.forEach(function(option){
            const select = option.querySelector('select');
            const input = option.querySelector('input');
            select.value = '';
            input.value = '';
            
        })
        const inputCMS = document.querySelectorAll('.main-controls__input')[8];
        inputCMS.style.display = 'none';
        variantCMS[0].style.display = 'none';
        checkCMS.checked = false;
    },

    deleteService : function(){
        percent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });

        number.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
    },

    deleteRange : function(){
        range.disabled = true;
        range.value = 0;
        span.textContent = 0 + '%';
        appData.rollback = 0;
        appData.fullPrice = 0;
        appData.getServiceWithRollback();
        appData.deleteShowResult();
        totalInput5.value = 0;
    },

    reset : function(){
        appData.deleteCMS();
        appData.deleteRange();
        appData.deleteScreens();
        appData.deleteService();
        appData.deleteShowResult();
        buttonStart.style.display = 'block';
        buttonReset.style.display = 'none';
        appData.start();
    },
};
appData.init();


//const element = document.querySelector('.main-controls__views');
//console.dir(screenHTML);
//buttonStart.style.display = 'none';

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