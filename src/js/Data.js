

export default function Data()
{
    this.data = 
    {
        'protein': {
            '1' : {'key': '1', 'name': 'Гороховый'}, 
            '2' : {'key': '2', 'name': 'Подсолнечный'}, 
            '3' : {'key': '3', 'name': 'Тыквенный'}, 
        },
        'selects' : {
            'protein' : { selectedtext: 'белка(-ов)'},
        }
    }
}

Data.prototype.get = function (id) {
    return this.data[id];
}

