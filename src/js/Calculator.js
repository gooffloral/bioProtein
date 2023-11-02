export default function Calculator(dataGlobal)
{
    this.dataGlobal = dataGlobal;

    this.elements = {
        'blocks' : {
            'all' : '._params[data-value="mass"]',
            'noProtein' : '._params[data-value="mass-noprotein"]'
        },
    }
    this.listeners = {
        'delete' : { 'e': 'click', 'f': (e) => { this.deleteButton(e); }},
        'weight' : { 'e': 'keyup', 'f':  (e) => { this.weightInput(e); }},
        'percentage' : { 'e': 'keyup', 'f': (e) => { this.percentageInput(); }},
        'isolate' : { 'e': 'keyup', 'f': (e) => { this.isolateInput(); }},
    }

    this.forTemplate = {
        'delete': 'button[data-value="delete"]',
        'percentage' : 'input[name="percentage"]',
        'isolate' : 'input[name="isolate"]',
        'weight' : 'input[name="weight"]',
    }
    this.template = {
        'protein' : ['delete', 'percentage', 'weight'],
        'all' : ['weight', ],
        'noProtein' : ['weight', 'percentage'],
    }

    document.addEventListener('new-template', (e) => this.newBlock(e));
    document.addEventListener('delete-block', (e) => console.log('ggg'));
    this.init();
    console.log(this.initEl);
}

Calculator.prototype.deleteButton = function (e) {
    const k2 = e.target.parentElement.dataset.value;
    const k1 = e.target.parentElement.dataset.c;
    const arr = this.dataGlobal.selectedValues[k1];
    this.dataGlobal.selectedValues[k1] = arr.filter((n) => n != k2);
    /// (???)
    e.target.parentElement.remove();
}
Calculator.prototype.weightInput = function (e) {
    const c = e.target.parentElement.dataset.c;
    const k = e.target.parentElement.dataset.key;

    console.log(c, k)
}
Calculator.prototype.percentageInput = function () {}
Calculator.prototype.isolateInput = function () {}

Calculator.prototype.init = function(){
    this.initEl = {};
    for(const i in this.elements['blocks']){
        const mainSelector = this.elements['blocks'][i];
        this.initEl[i] = this.initElements(mainSelector, i);
        this.addListeners(this.initEl[i]);
    }
}
Calculator.prototype.addListeners = function(block){
    for(const i in block){
        const m = this.listeners[i]['e'];
        block[i].addEventListener(m, (e) => {
            this.listeners[i]['f'](e);
        })
    }
}
Calculator.prototype.initElements = function(mainSelector, blockID) {
    const obj = {};
    this.template[blockID].forEach((j) => {
        let selector = mainSelector + ' > ' + this.forTemplate[j];
        console.log(selector);
        const block = document.querySelector(selector);
        obj[j] = block;
    });
    return obj;
}
Calculator.prototype.newBlock = function(e) {
    const selector = e.detail.selector;
    const id = e.detail.id;
    const key = e.detail.key;
    if(!this.initEl.hasOwnProperty(id)){this.initEl[id] = {};}
    this.initEl[id][key] = this.initElements(selector, id);
    this.addListeners(this.initEl[id][key]);
}

