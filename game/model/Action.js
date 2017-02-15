//this + machine should inherit from abstract parent class

function Action(resource, id, strength, name) {
   this.type = resource;
   this.id = id;
   this.strength = strength;
   this.name = name;

   this.perform = function() {
       window.resources[this.type] += strength;
   };
}

Actions = {
    newAction: function() {
        var newAction = {};
        Action.apply(newAction, arguments);
        this.allActions.push(newAction);
        return newAction;
    },

    allActions: [],

    getActionByID: function(id) {
        for (var i = 0; i < this.allActions.length; i++) {
            if (this.allActions[i].id == id) {
                return this.allActions[i];
            }
        }
    },

    runFunction: function(fn) {
        for (var i = 0; i < this.allActions.length; i++) {
            fn.call(this.allActions[i]);
        }
    }
};
