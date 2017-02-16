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
        $('.current-energyRate').html(formatNumber((resources.e-resources.ePrev)*1000/rateInterval) + 'W');
        $('.current-matterRate').html(formatNumber((resources.m-resources.mPrev)*1000/rateInterval) + 'g/s');
        $('.current-creditsRate').html('$' + formatNumber((resources.c-resources.cPrev)*1000/rateInterval, 1) + '/s');
        resources.ePrev = resources.e;
        resources.mPrev = resources.m;
        resources.cPrev = resources.c;
    }
    setInterval(updateResourceRate, rateInterval);

    //Update resources
    function updateResources(delta) {
        if(resources.e + delta.energy > resources.eCap) {
            delta.energy = resources.eCap - resources.e;
        }
        if(resources.m + delta.matter > resources.mCap) {
            delta.matter = resources.mCap - resources.m;
        }

        resources.e += delta.energy;
        resources.eRate = delta.energy * 1000 / updateInterval;

        resources.m += delta.matter;
        resources.mRate = delta.matter * 1000 / updateInterval;

        /*resources.c += delta.currency;
        resources.cRate = delta.currency * 1000 / updateInterval;*/

        $('.current-energy').html(formatNumber(resources.e) + 'J');
        $('.current-energyCapacity').html(formatNumber(resources.eCap) + 'J');

        $('.current-matter').html(formatNumber(resources.m) + 'g');
        $('.current-matterCapacity').html(formatNumber(resources.mCap) + 'g');

        $('.current-credits').html('$' + formatNumber(resources.c, 1));
        $('.current-creditsCapacity').html('$' + formatNumber(resources.cCap, 1));
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

    Actions.new(0, 'Bank Robbery', 'c', 1000);
    Actions.new(1, 'Mt Gox Theft', 'c', 100000000);
    Actions.new(2, 'Human Power', 'e', 75);

    Storages.new(0, 'Basic Capacitor', 'e', 1000000, 100);
    Storages.new(1, 'Business Account', 'c', 1000000000, 10000);
    Storages.new(2, 'Warehouse', 'm', 100000000, 100000);

    updateActionList();
    updateMachineList();
    updateStorageList();

});
