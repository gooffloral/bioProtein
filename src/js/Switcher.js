export default function Switcher()
{
    this.elements = {
        'single' : {
            'block' : {'selector': '._options'},
        },
        'many' : {
            'processes': {'selector': '._options_item', 'key' : (e) => {return e.dataset.key;}},
            'tabs': {'selector': '._tab', 'key' : (e) => {return e.id;}},
        },    
    };
    this.init();
    this.addListeners();
    this.loadProcess(this.initEl['processes']['1']);
}
Switcher.prototype.init = function() {
    this.initEl = {};
    for (const el in this.elements.single) {
        this.initEl[el] = document.querySelector(this.elements.single[el].selector);
    }
    for (const el in this.elements.many) {
        this.initEl[el] = {};
        const arr = document.querySelectorAll(this.elements.many[el].selector);
        arr.forEach((i) => {
            const key = this.elements.many[el]['key'](i);
            this.initEl[el][key] = i;
        });
    }
}
Switcher.prototype.addListeners = function() {
    for(const i in this.initEl['processes']){
        this.initEl['processes'][i].addEventListener('click', (e) => {
            this.loadProcess(e.target);
        });
    }
}
Switcher.prototype.loadProcess = function(selectedTab) {
    /* 
    selectedTab - DOM Element; выбор процесса
    */
   const id = selectedTab.dataset.key;
    ['processes', 'tabs'].forEach((i) => {
        for(const k in this.initEl[i]){
            this.initEl[i][k].classList.remove('--active');
        }
    });
    selectedTab.classList.add('--active');
    this.initEl['tabs'][id].classList.add('--active');
}
