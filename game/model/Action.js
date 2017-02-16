function Action(id, name, resource, rate) {
    Abstract.apply(this, arguments);

    this.perform = function() {
        window.resources[this.type] += this.rate;
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
