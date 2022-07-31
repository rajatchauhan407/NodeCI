function Hello(){
    this.greet = function (names){
        console.log(`my name is ${names}`);
    }
}

Hello.prototype.wish = function (){
    console.log(`May you live long darlin !!`);
    this.greet('Rajat Chauhan');
}
const p1 = new Hello();
p1.wish();

