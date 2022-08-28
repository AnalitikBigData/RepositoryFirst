class First {
    hello(){
        console.log('Привет я метод родителя!');
    }
}
class Second extends First{
    hello(){
        super.hello();
        console.log('А я наследуемый метод!');
    }
}

const first = new First();
first.hello();
console.log('----------------');
const second = new Second();
second.hello();