function MatterHarvester(id, cost, rate, name) {
    Machine.apply(this, arguments);

    this.update = function(deltaTime) {
        return new Delta(0, rate, 0, deltaTime, this.instances);
    };
}

function EnergyGenerator(id, cost, rate, name, matterRate) {
    Machine.apply(this, arguments);
    this.matterRate = matterRate;

    this.update = function(deltaTime) {
        return new Delta(rate, -(matterRate), 0, deltaTime, this.instances);
    };
}

function MassFabricator(id, cost, rate, name, energyRate) {
    Machine.apply(this, arguments);
    this.energyRate = energyRate;

    this.update = function(deltaTime) {
        return new Delta(-(energyRate), rate, 0, deltaTime, this.instances);
    };
}

function EnergyCollector(id, cost, rate, name) {
    Machine.apply(this, arguments);

    this.update = function(deltaTime) {
        return new Delta(rate, 0, 0, deltaTime, this.instances);
    };
}

MassFabricator.prototype  = inherit(Machine.prototype);
EnergyCollector.prototype = inherit(Machine.prototype);
MatterHarvester.prototype = inherit(Machine.prototype);
EnergyGenerator.prototype = inherit(Machine.prototype);
