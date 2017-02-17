//Declare machine class
function Machine(id, name, type, rate, cost) {
    Abstract.apply(this, arguments);

    this.cost = cost;
    this.instances = 0;

    this.purchase = function(num) {
        if (resources.c.amount - num * this.cost >= 0) {
            this.instances += num;
            resources.c.amount = floatSub(resources.c.amount, this.cost);
        } else {
            alert('Insufficient credits');
        }
    };
}

Machine.prototype = inherit(Abstract.prototype);

Machines = new AbstractFactory(function() {
    var newMachine = {};

    var controlArgument = arguments[2];

    switch (controlArgument) {
        case 'collector':
            EnergyCollector.apply(newMachine, arguments);
            break;
        case 'harvester':
            MatterHarvester.apply(newMachine, arguments);
            break;
        case 'fabricator':
            MassFabricator.apply(newMachine, arguments);
            break;
        case 'generator':
            EnergyGenerator.apply(newMachine, arguments);
            break;
        default:
            throw "Initialisation error: unknown machine type";
    }

    this.all.push(newMachine);
    return newMachine;
});

Machines.prototype = inherit(AbstractFactory.prototype);

Machines.update = function(deltaTime) {
    var increase = {
        'energy': 0,
        'matter': 0,
        'currency': 0
    };
    for (var i = 0; i < this.all.length; i++) {
        delta = this.all[i].update(deltaTime);
        increase.energy += delta.energy;
        increase.matter += delta.matter;
        increase.currency += delta.currency;
    }
    return increase;
};
