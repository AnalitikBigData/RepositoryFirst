'use strict';
// 2 lesson 
let title = 'project', 
    screens = 'Простые, Сложные, Интерактивные', 
    screenPrice = 36739, 
    rollback = 10, 
    fullPrice = 5699108621, 
    adaptive = true;


console.log(typeof(title));
console.log(typeof(fullPrice));
console.log(typeof(adaptive));
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей/долларов/гривен/юани');
console.log((screens.toLowerCase()).split(', '));
console.log('процент отката посреднику за работу '+ ( fullPrice * (rollback/100) ));


alert("Hello");

console.log('console works');

// 3 lesson

title = prompt('Как называется ваш проект?');
//console.log(title);
screens = prompt('Какие типы экранов нужно разработать?');
//console.log(screens);
screenPrice = +prompt('Сколько будет стоить данная работа?');
//console.log(screenPrice);
adaptive = Boolean(prompt('Нужен ли адаптив на сайте?'));
//console.log(adaptive);

let setvice1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let setvice2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

let servicePercentPrice = Math.ceil( fullPrice - fullPrice * (rollback/100) );
console.log(servicePercentPrice);


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