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
