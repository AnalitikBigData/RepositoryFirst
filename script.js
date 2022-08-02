'use strict';

let title = 'project', 
    screens = 'Простые, Сложные, Интерактивные', 
    screenPrice = 36739, 
    rollback = 10, 
    fullPrice = 5699108621, 
    adaptive = true;


/*console.log(typeof(title));
console.log(typeof(fullPrice));
console.log(typeof(adaptive));
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей/долларов/гривен/юани');
console.log( screens.toLowerCase().split(', '));
console.log('процент отката посреднику за работу '+ ( fullPrice * (rollback/100) ));*/


title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil( fullPrice - fullPrice * (rollback/100) );


console.log('Название проекта: ' + title);
console.log('Типы экранов: ' + screens);
console.log('Стоимость данной работы = ' + screenPrice);
console.log('Адаптив - ' + adaptive);
console.log('Тип дополнительной услуги: ' + service1);
console.log('Стоимость дополнительной услуги = ' + servicePrice1);
console.log('Тип дополнительной услуги: ' + service2);
console.log('Стоимость дополнительной услуги = ' + servicePrice2);
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей/долларов/гривен/юани');
console.log('Процент разработчику = ' + servicePercentPrice);


// проверка на скидку
if(fullPrice >= 30000){
    console.log('Даем скидку в 10%');
}
else if(fullPrice >= 15000 && fullPrice < 30000){
    console.log('Даем скидку в 5%');
}
else if(fullPrice > 0 && fullPrice < 15000){
    console.log('Скидка не предусмотрена');
}
else if(fullPrice <= 0){
    console.log('Что то пошло не так');
}
else{
    console.log('ошибка');
}