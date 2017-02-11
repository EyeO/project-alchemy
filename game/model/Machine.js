//Declare machine class
function Machine(type, id, cost, rate, name) {
    this.type = type;
    this.id = id;
    this.cost = cost;
    this.instances = 0;
    this.name = name;
    this.rate = rate;

    this.purchase = function(num) {
        this.instances += num;
    };
}

//Keep track of all machines - http://stackoverflow.com/a/1248023
Machines = {
    newMachine: function() {
        var newMachine = {};

        var controlArgument = arguments[0];
        //controlArgument = [].shift.apply(arguments);

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

        this.allMachines.push(newMachine);
        return newMachine;
    },

    allMachines: [],

    getMachineByID: function(id) {
        for (var i = 0; i < this.allMachines.length; i++) {
            if (this.allMachines[i].id == id) {
                return this.allMachines[i];
            }
        }
    },

    runFunction: function(fn) {
        for (var i = 0; i < this.allMachines.length; i++) {
            fn.call(this.allMachines[i]);
        }
    },

    update: function(deltaTime) {
        var increase = {
            'energy'  : 0,
            'matter'  : 0,
            'currency': 0
        };
        for (var i = 0; i < this.allMachines.length; i++) {
            delta = this.allMachines[i].update(deltaTime);
            increase.energy += delta.energy;
            increase.matter += delta.matter;
            increase.currency += delta.currency;
        }
        return increase;
    }
};
