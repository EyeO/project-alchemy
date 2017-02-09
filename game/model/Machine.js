//Declare machine class
function Machine(id, cost, name) {
    this.id = id;
    this.cost = cost;
    this.instances = 0;
    this.name = name;

    this.purchase = function(num) {
        this.instances += num;
    };
}

//Keep track of all machines - http://stackoverflow.com/a/1248023
Machines = {
    newEnergyCollector: function() {
        var newMachine = {};
        EnergyCollector.apply(newMachine, arguments);
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
        var increase = 0;
        for (var i = 0; i < this.allMachines.length; i++) {
            increase += this.allMachines[i].update(deltaTime);
        }
        return increase;
    }
};
