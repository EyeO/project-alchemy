function Storage(id, name, type, amount, cost) {
    Abstract.apply(this, arguments);

    this.cost = cost;

    this.purchase = function(num) {
        if (window.resources.credits - num * this.cost >= 0) {
            window.resources[this.type + 'Capacity'] += this.rate;
            window.resources.credits -= this.cost;
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
