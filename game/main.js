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
        $('.current-energyRate').html(formatNumber(floatSub(resources.e, resources.ePrev) * 1000 / rateInterval) + 'W');
        $('.current-matterRate').html(formatNumber(floatSub(resources.m, resources.mPrev) * 1000 / rateInterval) + 'g/s');
        $('.current-creditsRate').html('$' + formatNumber(floatSub(resources.c, resources.cPrev) * 1000 / rateInterval, 1) + '/s');
        resources.ePrev = resources.e;
        resources.mPrev = resources.m;
        resources.cPrev = resources.c;
    }
    setInterval(updateResourceRate, rateInterval);

    //Update resources
    function updateResources(delta) {
        if (resources.e + delta.energy > resources.eCap) {
            delta.energy = resources.eCap - resources.e;
        }
        if (resources.m + delta.matter > resources.mCap) {
            delta.matter = resources.mCap - resources.m;
        }

        resources.e = floatAdd(resources.e, delta.energy);

        resources.m = floatAdd(resources.m, delta.matter);

        //resources.c += delta.currency;

        $('.current-energy').html(formatNumber(resources.e) + 'J');
        $('.current-energyCapacity').html(formatNumber(resources.eCap) + 'J');
        $('.current-energyFilled').html(resources.ePer);

        $('.current-matter').html(formatNumber(resources.m) + 'g');
        $('.current-matterCapacity').html(formatNumber(resources.mCap) + 'g');
        $('.current-matterFilled').html(resources.mPer);

        $('.current-credits').html('$' + formatNumber(resources.c, 1));
        $('.current-creditsCapacity').html('$' + formatNumber(resources.cCap, 1));
        $('.current-creditsFilled').html(resources.cPer);
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
            $('.storage ul').append('<li class="purchase-storage ' + this.id + '">$' + formatNumber(this.cost, 1) + ' - <span class="machine-name">' + this.name + ' </span>(' + this.stats() + ' Capacity)</li>');
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
    Machines.new(0, 'Solar Panel', 'collector', 0.1, 100);
    Machines.new(1, 'Mine', 'harvester', 200, 500);

    Actions.new(0, 'Desk Work', 'c', 0.2);
    Actions.new(1, 'Human Power', 'e', 75);

    Storages.new(0, 'Money Safe', 'c', 1000, 10);
    Storages.new(1, 'Bank Account', 'c', 100000, 100);
    Storages.new(2, 'Business Account', 'c', 1000000, 10000);
    Storages.new(3, 'Corporation Account', 'c', 100000000, 1000000);
    Storages.new(4, 'Multinational Account', 'c', 10000000000, 10000000);
    Storages.new(5, 'Megacorp Account', 'c', 1000000000000, 1000000000);
    Storages.new(6, 'Interplanetary Account', 'c', 1000000000000000, 100000000000);

    updateActionList();
    updateMachineList();
    updateStorageList();

});
