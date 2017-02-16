function Abstract(id, name, type, rate) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.rate = rate;

    this.stats = function() {
        switch (this.type) {
            case 'energy':
                return '+' + formatNumber(this.rate) + 'J';
            case 'matter':
                return '+' + formatNumber(this.rate) + 'g';
            case 'credits':
                return '+$' + formatNumber(this.rate, 1);

            case 'collector':
                return '+' + formatNumber(this.rate) + 'W';
            case 'harvester':
                return '+' + formatNumber(this.rate) + 'g/s';
            case 'fabricator':
                return '+' + formatNumber(this.rate) + 'g/s, -' + formatNumber(this.rate2) + 'W';
            case 'generator':
                return '+' + formatNumber(this.rate) + 'W, -' + formatNumber(this.rate2) + 'g/s';

            default:
                throw "Update error: unknown resource type";
        }
    };
}

function AbstractFactory(createFunction) {
    this.all = [];

    this.new = createFunction;

    this.get = function(id) {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].id == id) {
                return this.all[i];
            }
        }
    };

    this.run = function(fn) {
        for (var i = 0; i < this.all.length; i++) {
            fn.call(this.all[i]);
        }
    };
}
