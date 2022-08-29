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
        const contextStart = appData.start.bind(appData);
        const contextBlock = appData.block.bind(appData);
        const contextReset = appData.reset.bind(appData);
        const contextAddScreenBlocks = appData.addScreenBlocks.bind(appData);
        const contextGetRollback = appData.getRollback.bind(appData);
        const contextCMS = appData.CMS.bind(appData);
        const contextAddCMS = appData.addCMS.bind(appData);
        buttonStart.addEventListener('click', contextStart);
        buttonReset.addEventListener('click', contextBlock);
        buttonReset.addEventListener('click', contextReset);
        plus.addEventListener('click', contextAddScreenBlocks);
        range.addEventListener('input', contextGetRollback);
        contextCMS();
        checkCMS.addEventListener('click', contextAddCMS);
        cmsSelect.addEventListener('change', contextCMS);
    },
    addTitle : function(){
        document.title = title.textContent;
    },

    addScreens : function(){ // добавление экранов
        plus.disabled = false;
        screenHTML = document.querySelectorAll('.screen');
        screenHTML.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = false;
            input.disabled = false;
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
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
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            check.disabled = false;
            if(check.checked){
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            check.disabled = false;
            if(check.checked){
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addPrices : function(){
        if(this.ban() === 0){
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
            this.fullPrice = this.fullPrice + this.fullPrice * (this.percentCMS / 100);
            this.getServiceWithRollback();
        }
    },

    getServiceWithRollback : function(){
        this.serviceWithRollback = Math.ceil( this.fullPrice - this.fullPrice * (this.rollback/100) );
    },

    ban : function(){ // забанить если экраны с недопустимыми значениями
        let counter = 0;
        for(let i = 0; i < this.screens.length; i++){
            if(this.screens[i].name === 'Тип экранов' || this.screens[i].price===0){
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
        screenHTML.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        });
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });
        if(checkCMS.checked === true)
            variantCMS.forEach((cms) => {
                const select = cms.querySelector('select');
                const input = cms.querySelector('input');
                select.disabled = true;
                input.disabled = true;
                checkCMS.disabled = true;
            })
        checkCMS.disabled = true;
        buttonStart.style.display = 'none';
        buttonReset.style.display = 'block';
    },
    CMS : function(){ // вызов всех функций  cms
        this.addCMS();
        this.workWithCMS();
    },

    addCMS : function(){ // добавлнение cms
        checkCMS.disabled = false;
        if(checkCMS.checked === true){
            variantCMS = document.querySelectorAll('.hidden-cms-variants');
            variantCMS[0].style.display = 'flex';
            variantCMS.forEach((option) => {
                const select = option.querySelector('select');
                select.disabled = false;
                const input = option.querySelector('input');
                const selectLabel = select.options[select.selectedIndex].label;
                this.cms.push(
                    {
                        option : selectLabel,
                        value : +select.value,
                    }
                )
            })
        }
        this.workWithCMS();
        console.log(this.cms);
    },

    workWithCMS : function(){ // обработка массива и добавление значений
        for(let i = 0; i < this.cms.length; i++){
            if(this.cms[i].option === 'Другое'){
                //console.log(appData.cms[i].option + ' ' + appData.cms[i].value);
                const inputCMS = document.getElementsByClassName('main-controls__item hidden-cms-variants')[0].childNodes[3];
                inputCMS.style.display = 'flex';
                inputCMS.disabled = false;
                console.log(inputCMS.childNodes[1].value);
                this.percentCMS = +inputCMS.childNodes[1].value;
            }
            else if(this.cms[i].option === 'WordPress'){
                this.percentCMS = this.cms[i].value;
                const inputCMS = document.getElementsByClassName('main-controls__item hidden-cms-variants')[0].childNodes[3];
                inputCMS.style.display = 'none';
            }
            else{
                const inputCMS = document.getElementsByClassName('main-controls__item hidden-cms-variants')[0].childNodes[3];
                inputCMS.style.display = 'none';
            }
        }
    },

    getRollback : function(){
        range.disabled = false;
        span.textContent = range.value + '%';
        //this.rollback = +range.value;
        this.rollback = +range.value;
        const contextGetServiceWithRollback = appData.getServiceWithRollback.bind(appData);
        contextGetServiceWithRollback();
        totalInput5.value = this.serviceWithRollback;
    },

    showResult : function(){
        totalInput1.value = this.screenPrice;
        totalInput2.value = this.countScreens;
        totalInput3.value = this.servicePricesPercent + appData.servicePriceNumber;
        totalInput4.value = this.fullPrice;
        totalInput5.value = this.serviceWithRollback;
    },

    start : function(){
        const contextAddScreens = appData.addScreens.bind(appData);
        contextAddScreens();
        const contextAddServices = appData.addServices.bind(appData);
        contextAddServices();
        const contextGetRollback = appData.getRollback.bind(appData);
        contextGetRollback();
        const contextCMS = appData.CMS.bind(appData);
        contextCMS();
        const contextAddPrices = appData.addPrices.bind(appData);
        contextAddPrices();
        const contextBan = appData.ban.bind(appData);
        if(contextBan() === 0){
            buttonStart.disabled = true;
            console.log('!!!');
            const contextShowResult = appData.showResult.bind(appData);
            contextShowResult();
            const contextBlock = appData.block.bind(appData);
            contextBlock();
        }
        else{
            buttonStart.disabled = false;
            console.log('---');
            this.screens.splice(0, this.screens.length);
        };
        console.log(appData);
    },

    deleteShowResult : function(){ // удаление 
        this.screenPrice = 0;
        this.rollback = 0;
        this.servicePricesPercent = 0;
        this.servicePriceNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0; 
        this.servicePrice = 0;
        this.serviceWithRollback = 0;
        this.countScreens = 0;
        this.percentCMS = 0;
        totalInput1.value = 0;
        totalInput2.value = 0;
        totalInput3.value = 0;
        totalInput4.value = 0;
        totalInput5.value = 0;
    },

    deleteScreens : function(){
        this.screens.splice(0 , this.screens.length);
        for(let i = 0; i < screenHTML.length - 1; i++){
            screenHTML[i].remove();
        }
        const select = document.querySelector('select');
        const input = document.querySelector('input');
        select.value = '';
        input.value = '';
    },

    deleteCMS : function(){
        this.cms.splice(0 , this.cms.length);
        if(checkCMS.checked === true){
            variantCMS.forEach((option) => {
                const select = option.querySelector('select');
                const input = option.querySelector('input');
                select.value = '';
                input.value = '';
                    
            })
            const inputCMS = document.querySelectorAll('.main-controls__input')[8];
            inputCMS.style.display = 'none';
            variantCMS[0].style.display = 'none';
            checkCMS.checked = false;
        }
        
    },

    deleteService : function(){
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });

        number.forEach((item) =>{
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
    },

    deleteRange : function(){
        range.disabled = true;
        range.value = 0;
        span.textContent = 0 + '%';
        this.rollback = 0;
        this.fullPrice = 0;
        this.getServiceWithRollback();
        totalInput5.value = 0;
    },

    reset : function(){
        const contextDeleteCMS = appData.deleteCMS.bind(appData);
        contextDeleteCMS();
        const contextDeleteRange = appData.deleteRange.bind(appData);
        contextDeleteRange();
        const contextDeleteScreens = appData.deleteScreens.bind(appData);
        contextDeleteScreens();
        const contextDeleteService = appData.deleteService.bind(appData);
        contextDeleteService();
        const contextDeleteShowResult = appData.deleteShowResult.bind(appData);
        contextDeleteShowResult();
        buttonStart.style.display = 'block';
        buttonReset.style.display = 'none';
        const contextStart = appData.start.bind(appData);
        contextStart();
        //appData.start();
    },
};
const contextInit = appData.init.bind(appData);
contextInit();


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