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
