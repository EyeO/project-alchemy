function Action(id, name, type, amount) {
    Abstract.apply(this, arguments);

    this.perform = function() {
        resources[this.type].amount = floatAdd(resources[this.type].amount, this.rate);
        if (resources[this.type].amount > resources[this.type].capacity) {
            resources[this.type].amount = resources[this.type].capacity;
            //alert(this.type + ' capacity full');
        }
    };
}

Action.prototype = inherit(Abstract.prototype);

Actions = new AbstractFactory(function() {
    var newAction = {};
    Action.apply(newAction, arguments);
    this.all.push(newAction);
    return newAction;
});

Actions.prototype = inherit(AbstractFactory.prototype);
