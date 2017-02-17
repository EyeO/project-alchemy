//Generic resource
function Resource(amount, capacity, money) {
    this.amount = amount;
    this.capacity = capacity;
    this.previous = amount;

    this.money = money;

    this.percentage = function() {
        if (this.capacity === 0) {
            return '0%';
        }
        return parseFloat(100 * this.amount / this.capacity).toFixed(2) + '%';
    };

    this.rate = function() {
        var rate = formatNumber(floatSub(this.amount, this.previous) * 1000 / rateInterval, this.money);
        this.previous = this.amount;
        return rate;
    };
}

resources = {
    e: new Resource(0, 0),
    m: new Resource(0, 0),
    c: new Resource(0, 50, 1)
};
