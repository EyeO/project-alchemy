//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Abstract.js'),
    $.getScript('game/model/Machine.js'),
    $.getScript('game/model/Action.js'),
    $.getScript('game/model/Storage.js'),
    $.getScript('game/model/MachineTypes.js'),
    $.Deferred(function(deferred) {
        $(deferred.resolve);
    })
).done(function() {

    //Game loop
    var lastTime = Date.now(),
        lagCorrection = false,
        updateInterval = 100;

    function gameLoop() {
        var deltaTime = lagCorrection ? Date.now() - lastTime : updateInterval;
        if (lagCorrection) {
            lastTime = Date.now();
        }
        updateResources(Machines.update(deltaTime));
    }
    setInterval(gameLoop, updateInterval);

    //Variables
    window.resources = {
        energy: 0,
        matter: 0,
        credits: 1000000,

        energyRate: 0,
        matterRate: 0,
        creditsRate: 0,

        energyCapacity: 1000,
        matterCapacity: 1000000,
        creditsCapacity: 1000000
    };

    //Update resources
    function updateResources(delta) {
        window.resources.energy += delta.energy;
        window.resources.energyRate = delta.energy * 1000 / updateInterval;

        window.resources.matter += delta.matter;
        window.resources.matterRate = delta.matter * 1000 / updateInterval;

        window.resources.credits += delta.currency;
        window.resources.creditsRate = delta.currency * 1000 / updateInterval;

        $('.current-energy').html(formatNumber(window.resources.energy) + 'J');
        $('.current-energyRate').html(formatNumber(window.resources.energyRate) + 'W');
        $('.current-energyCapacity').html(formatNumber(window.resources.energyCapacity) + 'J');

        $('.current-matter').html(formatNumber(window.resources.matter) + 'g');
        $('.current-matterRate').html(formatNumber(window.resources.matterRate) + 'g/s');
        $('.current-matterCapacity').html(formatNumber(window.resources.matterCapacity) + 'g');

        $('.current-credits').html('$' + formatNumber(window.resources.credits, 1));
        $('.current-creditsRate').html('$' + formatNumber(window.resources.creditsRate, 1) + '/s');
        $('.current-creditsCapacity').html('$' + formatNumber(window.resources.creditsCapacity, 1));
    }

    function updateMachineList() {
        $('.machines ul').empty();
        Machines.run(function() {
            $('.machines ul').append('<li class="purchase ' + this.id + '">$' + formatNumber(this.cost, 1) + ' - <span class="machine-name">' + this.name + ' </span>(' + this.stats() + ') [' + this.instances + ' owned]</li>');
        });
        bindPurchase();
    }

    function bindPurchase() {
        $('.purchase').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Machines.get(id).purchase(1);
            updateMachineList();
        });
    }

    function updateActionList() {
        $('.labour ul').empty();
        Actions.run(function() {
            $('.labour ul').append('<li class="perform ' + this.id + '">' + this.name + ' (' + this.stats() + ')</li>');
        });
        bindPerform();
    }

    function bindPerform() {
        $('.perform').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Actions.get(id).perform();
        });
    }

    function updateStorageList() {
        $('.storage ul').empty();
        Storages.run(function() {
            $('.storage ul').append('<li class="purchase-storage ' + this.id + '">$' + formatNumber(this.cost, 1) + ' - <span class="machine-name">' + this.name + ' </span>(' + this.stats() + ')</li>');
        });
        bindPurchaseStorage();
    }

    function bindPurchaseStorage() {
        $('.purchase-storage').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Storages.get(id).purchase(1);
        });
    }

    //Declare
    Machines.new(0, 'Solar Panel', 'collector', 1000, 100);
    Machines.new(1, 'Mine', 'harvester', 200, 500);
    Machines.new(2, 'Nuclear Reactor', 'generator', 1000000, 1000000, 10);
    Machines.new(3, 'Generic Mass Fabricator', 'fabricator', 1000, 10000000, 100000);

    Actions.new(0, 'Bank Robbery', 'credits', 1000);
    Actions.new(1, 'Mt Gox Theft', 'credits', 100000000);

    Storages.new(0, 'Basic Capacitor', 'energy', 1000000, 100);
    Storages.new(1, 'Business Account', 'credits', 1000000000, 10000);

    updateActionList();
    updateMachineList();
    updateStorageList();

});
