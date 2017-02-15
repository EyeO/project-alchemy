function Action(id, name, resource, strength) {
   Abstract.apply(this, arguments);

   this.strength = strength;

   this.perform = function() {
       window.resources[this.type] += strength;
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
