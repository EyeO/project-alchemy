function Storage(id, name, type, amount, cost) {
    Abstract.apply(this, arguments);

    this.cost = cost;

    this.purchase = function(num) {
        if (resources.c - num * this.cost >= 0) {
            resources[this.type + 'Cap'] += this.rate;
            resources.c -= this.cost;
        } else {
            alert('Insufficient credits');
        }
    };
}

Storage.prototype = inherit(Abstract.prototype);

Storages = new AbstractFactory(function() {
    var newStorage = {};
    Storage.apply(newStorage, arguments);
    this.all.push(newStorage);
    return newStorage;
});

Storages.prototype = inherit(AbstractFactory.prototype);
