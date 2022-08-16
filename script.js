const listsBook = document.querySelectorAll('.book');
const adv = document.querySelectorAll('.adv');
const li = document.createElement('li');
const changedTitle = listsBook[4].childNodes[1].innerHTML = 'Книга 3. this и Прототипы Объектов';
const book2 = listsBook[0].childNodes;
const book5 = listsBook[5].childNodes;
const book6 = listsBook[2].childNodes;

li.append('Глава 8: За пределами ES6');

// изменение названия 3 книги
listsBook[4].childNodes[1].style.color = "darkkhaki";

// порядок книг 

listsBook[0].before(listsBook[1]);
listsBook[2].before(listsBook[4]);
listsBook[2].before(listsBook[5]);
listsBook[4].after(listsBook[3]);

// удаление рекламы 
adv[0].remove();

// перестановка глав 2 и 5 книг

book2[3].childNodes[19].after(book2[3].childNodes[5]);
book2[3].childNodes[8].before(book2[3].childNodes[12]);
book2[3].childNodes[9].before(book2[3].childNodes[16]);


book5[3].childNodes[3].after(book5[3].childNodes[19]);
book5[3].childNodes[4].after(book5[3].childNodes[8]);
book5[3].childNodes[7].before(book5[3].childNodes[10]);
book5[3].childNodes[12].before(book5[3].childNodes[14]);
book5[3].childNodes[13].before(book5[3].childNodes[16]);

// добавление в 6 книгу 

book6[3].childNodes[20].after(book6[3].append(li));
book6[3].childNodes[17].after(book6[3].childNodes[22]);


// изменение картинки
document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
