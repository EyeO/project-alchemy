function MatterHarvester(id, name, type, rate, cost) {
    Machine.apply(this, arguments);

    this.update = function(deltaTime) {
        return new Delta(0, this.rate, 0, deltaTime, this.instances);
    };
}

function EnergyGenerator(id, name, type, rate, cost, rate2) {
    Machine.apply(this, arguments);
    this.rate2 = rate2;

    this.update = function(deltaTime) {
        return new Delta(this.rate, -(this.rate2), 0, deltaTime, this.instances);
    };
}

function MassFabricator(id, name, type, rate, cost, rate2) {
    Machine.apply(this, arguments);
    this.rate2 = rate2;

    this.update = function(deltaTime) {
        return new Delta(-(this.rate2), this.rate, 0, deltaTime, this.instances);
    };
}

function EnergyCollector(id, name, type, rate, cost) {
    Machine.apply(this, arguments);

    this.update = function(deltaTime) {
        return new Delta(this.rate, 0, 0, deltaTime, this.instances);
    };
}

MassFabricator.prototype  = inherit(Machine.prototype);
EnergyCollector.prototype = inherit(Machine.prototype);
MatterHarvester.prototype = inherit(Machine.prototype);
EnergyGenerator.prototype = inherit(Machine.prototype);
