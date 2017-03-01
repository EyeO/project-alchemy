function Market(id, name, type, quantity, cost, action) {
    Abstract.apply(this, arguments);
    this.action = action;
    this.cost = cost;

    this.trade = function() {
        if(this.action == 'buye') {
            if(resources.c.amount >= this.cost) {
                resources.c.amount = floatSub(resources.c.amount, this.cost);
                resources.e.amount = floatAdd(resources.e.amount, this.cost);
            } else {
                alert('Insufficient credits');
            }
        } else {
            if(this.action == 'buym') {
                if(resources.c.amount >= this.cost) {
                    resources.c.amount = floatSub(resources.c.amount, this.cost);
                    resources.m.amount = floatAdd(resources.m.amount, this.cost);
                } else {
                    alert('Insufficient credits');
                }
        } else {
            if(this.action == 'sell') {
                if(resources[this.type].amount >= this.rate) {
                    resources[this.type].amount = floatSub(resources[this.type].amount, this.rate);
                    resources.c.amount = floatAdd(resources.c.amount, this.cost);
                } else {
                    alert('Insufficient resources');
                }
            }
        }
        }
    };
}

Market.prototype = inherit(Abstract.prototype);

Markets = new AbstractFactory(function() {
    var newMarket = {};
    Market.apply(newMarket, arguments);
    this.all.push(newMarket);
    return newMarket;
});

Markets.prototype = inherit(AbstractFactory.prototype);
