//Declare energy collector class
function EnergyCollector(id, cost, rate, name) {
    Machine.call(this, id, cost, name);
    this.rate = rate;

    this.update = function(deltaTime) {
        return deltaTime * this.instances * this.rate / 1000;
    };
}

//Energy collector inherits from machine
EnergyCollector.prototype = inherit(Machine.prototype);
