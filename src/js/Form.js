export default function FormAdder(data)
{
    data.selectedValues = {
        'protein' : [],
    }
    this.dataGlobal = data;
    this.dataArr = data.data;
    this.data = {
        'protein' : (arr) => {
            const name = arr.name;
            const key = arr.key;
            return `<div class="_params _protein" data-c="protein" data-value=${key}>
                <span class="_title _green ">${name}</span>
                <button class="_green" data-value="delete">&#10006</button>
                <br>
                <input type="text" name="weight" placeholder="Вес (гр)">
                или 
                <input type="text" name="percentage" placeholder="Процентное содержание (%)">
                <input type="text" name="isolate" placeholder="Изолят (%)">
            </div>`
        }
    }
    this.elements = {
        'protein' : '#protein',
    }

    this.init();
    this.addListeners();
}

FormAdder.prototype.init = function() {
    this.initEl = {};
    for (const el in this.elements) {
        this.initEl[el] = document.querySelector(this.elements[el]);
    }
}
FormAdder.prototype.getData = function(key, value){
    return this.dataArr[key][value];
}
FormAdder.prototype.getTemplate = function(key, fromDataObj){
    return this.data[key](fromDataObj);
}
FormAdder.prototype.loadData = function(item, template) {
    item.insertAdjacentHTML('afterend', template);
}

FormAdder.prototype.addListeners = function() {
    this.initEl['protein'].addEventListener('change', (e) => {
        
        const value = this.initEl['protein'].selectedOptions[0].value;
        if(value != 'Выберите белок')
        {
            const arr = this.getData('protein', this.initEl['protein'].selectedOptions[0].value);
            console.log(this.dataGlobal.selectedValues['protein'].includes(arr.key));
            if(!this.dataGlobal.selectedValues['protein'].includes(arr.key)){
                this.dataGlobal.selectedValues['protein'].push(value);
                console.log(this.dataGlobal.selectedValues['protein']);
                this.loadData(this.initEl['protein'].parentElement, this.getTemplate('protein', arr));
                const selector = `._params._protein[data-value='${arr.key}']`;
                const ev = new CustomEvent("new-template", {
                    bubbles: true,
                    detail: {
                        id: 'protein',
                        key: arr.key,
                        selector: selector,
                    }
                });  
                e.target.dispatchEvent(ev);
            }
        }
    })
}
