function Action(id, name, type, amount) {
    Abstract.apply(this, arguments);

    this.perform = function() {
        window.resources[this.type] += this.rate;
        if( window.resources[this.type] > window.resources[this.type + 'Capacity']) {
            window.resources[this.type] = window.resources[this.type + 'Capacity'];
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
