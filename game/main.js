$(function() {
    var credits = 0,
        matterRate = 0,
        matter = 0,
        energy = 0;

    function inherit(proto) {
      function F() {}
      F.prototype = proto;
      return new F();
    }

    function Machine(cost){
      this.cost = cost;
      this.number = 0;
    }

    Machine.prototype.numOfMachines = function() {
        alert(this.number);
    };

    Machine.prototype.purchase = function(num) {
        this.number += num;
    };

    function energyCollector(cost, rate){
        Machine.call(this, cost);
        this.rate = rate;
    }
    energyCollector.prototype = inherit(Machine.prototype);

    var solarPanel = new energyCollector(1000,100);
    //solarPanel.purchase(3);
    //solarPanel.purchase(7);
    //solarPanel.numOfMachines();

});
