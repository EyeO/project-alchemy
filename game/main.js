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
        updateInterval = 100,
        rateInterval = 1000;

    function gameLoop() {
        var deltaTime = lagCorrection ? Date.now() - lastTime : updateInterval;
        if (lagCorrection) {
            lastTime = Date.now();
        }
        updateResources(Machines.update(deltaTime));
    }
    setInterval(gameLoop, updateInterval);

    function updateResourceRate() {
        $('.current-energyRate').html(formatNumber((window.resources.energy-window.resources.energyPrev)*1000/rateInterval) + 'W');
        $('.current-matterRate').html(formatNumber((window.resources.matter-window.resources.matterPrev)*1000/rateInterval) + 'g/s');
        $('.current-creditsRate').html('$' + formatNumber((window.resources.credits-window.resources.creditsPrev)*1000/rateInterval, 1) + '/s');
        window.resources.energyPrev = window.resources.energy;
        window.resources.matterPrev = window.resources.matter;
        window.resources.creditsPrev = window.resources.credits;
    }
    setInterval(updateResourceRate, rateInterval);

    //Variables
    window.resources = {
        energy: 0,
        matter: 0,
        credits: 1000000,

        energyPrev: 0,
        matterPrev: 0,
        creditsPrev: 0,

        energyCapacity: 0,
        matterCapacity: 0,
        creditsCapacity: 1000000
    };

    //Update resources
    function updateResources(delta) {
        if(window.resources.energy + delta.energy > window.resources.energyCapacity) {
            delta.energy = window.resources.energyCapacity - window.resources.energy;
        }
        if(window.resources.matter + delta.matter > window.resources.matterCapacity) {
            delta.matter = window.resources.matterCapacity - window.resources.matter;
        }

        window.resources.energy += delta.energy;
        window.resources.energyRate = delta.energy * 1000 / updateInterval;

        window.resources.matter += delta.matter;
        window.resources.matterRate = delta.matter * 1000 / updateInterval;

        /*window.resources.credits += delta.currency;
        window.resources.creditsRate = delta.currency * 1000 / updateInterval;*/

        $('.current-energy').html(formatNumber(window.resources.energy) + 'J');
        $('.current-energyCapacity').html(formatNumber(window.resources.energyCapacity) + 'J');

        $('.current-matter').html(formatNumber(window.resources.matter) + 'g');
        $('.current-matterCapacity').html(formatNumber(window.resources.matterCapacity) + 'g');

        $('.current-credits').html('$' + formatNumber(window.resources.credits, 1));
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
    Machines.new(0, 'Solar Panel', 'collector', 100000, 100);
    Machines.new(1, 'Mine', 'harvester', 200, 500);
    Machines.new(2, 'Nuclear Reactor', 'generator', 1000000, 1000000, 10);
    Machines.new(3, 'Generic Mass Fabricator', 'fabricator', 1000, 10000000, 100000);

    Actions.new(0, 'Bank Robbery', 'credits', 1000);
    Actions.new(1, 'Mt Gox Theft', 'credits', 100000000);
    Actions.new(2, 'Human Power', 'energy', 75);

    Storages.new(0, 'Basic Capacitor', 'energy', 1000000, 100);
    Storages.new(1, 'Business Account', 'credits', 1000000000, 10000);
    Storages.new(2, 'Warehouse', 'matter', 100000000, 100000);

    updateActionList();
    updateMachineList();
    updateStorageList();

});
