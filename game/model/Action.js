function Action(id, name, type, amount) {
    Abstract.apply(this, arguments);

    this.perform = function() {
        resources[this.type] = floatAdd(resources[this.type], this.rate);
        if( resources[this.type] > resources[this.type + 'Cap']) {
            resources[this.type] = resources[this.type + 'Cap'];
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
