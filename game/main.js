$(function() {
    var credits = 0,
        matterRate = 0,
        matter = 0,
        energy = 0;

    //http://javascript.info/tutorial/inheritance
    function inherit(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    }

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

    //Declare energy collector class
    function EnergyCollector(id, cost, rate, name) {
        Machine.call(this, id, cost, name);
        this.rate = rate;

        this.update = function(deltaTime) {
            alert(deltaTime * this.instances * this.rate / 1000);
        };
    }

    //Energy collector inherits from machine
    EnergyCollector.prototype = inherit(Machine.prototype);

    //http://stackoverflow.com/a/1248023
    //Keep track of all machines
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
            for (var i = 0; i < this.allMachines.length; i++) {
                this.allMachines[i].update(deltaTime);
            }
        }
    };

    //Declare solar panels
    Machines.newEnergyCollector(1, 1000, 100, 'Tier 1 Solar Panel');
    Machines.newEnergyCollector(2, 1000000, 50000, 'Tier 2 Solar Panel');

    //Purchase 3 solar panels
    Machines.getMachineByID(1).purchase(3);

    //Update values
    Machines.update(50);

});
