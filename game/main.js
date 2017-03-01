//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Abstract.js'),
    $.getScript('game/model/Resource.js'),
    $.getScript('game/model/Machine.js'),
    $.getScript('game/model/Action.js'),
    $.getScript('game/model/Storage.js'),
    $.getScript('game/model/Market.js'),
    $.getScript('game/model/MachineTypes.js'),
    $.Deferred(function(deferred) {
        $(deferred.resolve);
    })
).done(function() {

    //Game loop
    function gameLoop() {
        var deltaTime = lagCorrection ? Date.now() - lastTime : updateInterval;
        if (lagCorrection) {
            lastTime = Date.now();
        }
        updateResources(Machines.update(deltaTime));
    }
    setInterval(gameLoop, updateInterval);

    function updateResourceRate() {
        $('.current-energyRate').html(resources.e.rate() + 'W');
        $('.current-matterRate').html(resources.m.rate() + 'g/s');
        $('.current-creditsRate').html('$' + resources.c.rate() + '/s');
    }
    setInterval(updateResourceRate, rateInterval);

    //Update resources
    function updateResources(delta) {
        if (resources.e.amount + delta.energy > resources.e.capacity) {
            delta.energy = resources.e.capacity - resources.e.amount;
        }
        if (resources.m.amount + delta.matter > resources.m.capacity) {
            delta.matter = resources.m.capacity - resources.m.amount;
        }

        resources.e.amount = floatAdd(resources.e.amount, delta.energy);

        resources.m.amount = floatAdd(resources.m.amount, delta.matter);

        //resources.c.amount += delta.currency;

        $('.current-energy').html(formatNumber(resources.e.amount) + 'J');
        $('.current-energyCapacity').html(formatNumber(resources.e.capacity) + 'J');
        $('.current-energyFilled').html(resources.e.percentage());

        $('.current-matter').html(formatNumber(resources.m.amount) + 'g');
        $('.current-matterCapacity').html(formatNumber(resources.m.capacity) + 'g');
        $('.current-matterFilled').html(resources.m.percentage());

        $('.current-credits').html('$' + formatNumber(resources.c.amount, 1));
        $('.current-creditsCapacity').html('$' + formatNumber(resources.c.capacity, 1));
        $('.current-creditsFilled').html(resources.c.percentage());
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

    function updateMarketList() {
        $('.market ul').empty();
        Markets.run(function() {
            var stats;
            if (this.action == 'buy') {
                stats = ['-$' + formatNumber(this.cost, 1), this.stats()];
            } else if (this.action == 'sell') {
                stats = ['-' + this.stats().substring(1), '+$' + formatNumber(this.cost, 1)];
            } else {
                stats = ['', ''];
            }
            $('.market ul').append('<li class="trade ' + this.id + '"><span class="item-name">' + this.name + ' </span>(' + stats[1] + ', ' + stats[0] + ') </li>');
        });
        bindTrade();
    }

    function bindTrade() {
        $('.trade').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Markets.get(id).trade();
            updateMarketList();
        });
    }

    //Declare
    Machines.new(0, 'Solar Panel', 'collector', 0.1, 100);
    Machines.new(1, 'Mine', 'harvester', 200, 500);
    Machines.new(2, 'Free Power Plant', 'collector', 10, 0);

    Actions.new(0, 'Desk Work', 'c', 0.2);
    Actions.new(2, 'CEO Work', 'c', 10);
    Actions.new(1, 'Human Power', 'e', 75);


    Storages.new(10, 'Temp Energy Storage', 'e', 1000000, 2);
    Storages.new(11, 'Temp Warehouse', 'm', 15, 6);
    Storages.new(0, 'Money Safe', 'c', 1000, 10);
    Storages.new(1, 'Bank Account', 'c', 100000, 100);
    Storages.new(2, 'Business Account', 'c', 1000000, 10000);
    Storages.new(3, 'Corporation Account', 'c', 100000000, 1000000);
    Storages.new(4, 'Multinational Account', 'c', 10000000000, 10000000);
    Storages.new(5, 'Megacorp Account', 'c', 1000000000000, 1000000000);
    Storages.new(6, 'Interplanetary Account', 'c', 1000000000000000, 100000000000);

    Markets.new(0, 'Small Energy Grid', 'e', 100, 10, 'sell');
    Markets.new(1, 'Matter for sale', 'm', 10, 30, 'buy');
    Markets.new(2, 'Energy for sale', 'e', 10, 40, 'buy');

    updateActionList();
    updateMachineList();
    updateStorageList();
    updateMarketList();

});
