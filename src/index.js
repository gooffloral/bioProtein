import Data from './js/Data';
import Switcher from "./js/Switcher"
import FormAdder from "./js/Form"
import NiceSelect from "./js/nice-select2"; 
import Calculator from './js/Calculator';

function Main(){
    this.init();
}

Main.prototype.init = function() {
    this.data = new Data();
    this.calculator = new Calculator(this.data);
    this.switcher = new Switcher();
    this.proteinAdder = new FormAdder(this.data, 'protein');
    for(const e in this.data.get('selects'))
    {
        console.log(e,this.data.get('selects'));
        new NiceSelect(document.getElementById(e), this.data.get('selects')[e]);
    }
}

new Main();
