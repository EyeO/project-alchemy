function Abstract(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
}

function AbstractFactory(createFunction) {
    this.all = [];

    this.new = createFunction;

    this.get = function(id) {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].id == id) {
                return this.all[i];
            }
        }
    };

    this.run = function(fn) {
        for (var i = 0; i < this.all.length; i++) {
            fn.call(this.all[i]);
        }
    };

}