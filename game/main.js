//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Abstract.js'),
    $.getScript('game/model/Machine.js'),
    $.getScript('game/model/Action.js'),
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
        credits: 100,
        energyRate: 0,
        matterRate: 0,
        creditsRate: 0
    };

    //Update resources
    function updateResources(delta) {
        window.resources.energy += delta.energy;
        window.resources.energyRate = delta.energy * 1000 / updateInterval;
        window.resources.matter += delta.matter;
        window.resources.matterRate = delta.matter * 1000 / updateInterval;
        window.resources.credits += delta.currency;
        window.resources.creditsRate = delta.currency * 1000 / updateInterval;

        $('.current-energy').html(formatNumber(window.resources.energy));
        $('.current-energyRate').html(formatNumber(window.resources.energyRate));
        $('.current-matter').html(formatNumber(window.resources.matter));
        $('.current-matterRate').html(formatNumber(window.resources.matterRate));
        $('.current-credits').html(formatNumber(window.resources.credits, 1));
        $('.current-creditsRate').html(formatNumber(window.resources.creditsRate, 1));
    }

    function updateMachineList() {
        $('.machines ul').empty();
        Machines.run(function() {
            var units;
            var unary = true;
            switch (this.type) {
                case 'collector':
                    units = ['W'];
                    break;
                case 'harvester':
                    units = ['g/s'];
                    break;
                case 'fabricator':
                    units = ['g/s', 'W'];
                    unary = false;
                    break;
                case 'generator':
                    units = ['W', 'g/s'];
                    unary = false;
                    break;
                default:
                    throw "Update error: unknown machine type";
            }
            var stats = '+' + formatNumber(this.rate) + units[0] + (unary ? '' : (', -' + formatNumber(this.rate2) + units[1]));
            $('.machines ul').append('<li class="purchase ' + this.id + '">$' + formatNumber(this.cost, 1) + ' - <span class="machine-name">' + this.name + ' </span>(' + stats + ') [' + this.instances + ' owned]</li>');
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

    function updateLabourList() {
        $('.labour ul').empty();
        Actions.run(function() {
            var units;
            switch (this.type) {
                case 'energy':
                    units = ['', 'W'];
                    break;
                case 'matter':
                    units = ['', 'g'];
                    break;
                case 'credits':
                    units = ['$', ''];
                    break;
                default:
                    throw "Update error: unknown resource type";
            }
            var stats = '+' + units[0] + formatNumber(this.rate) + units[1];
            $('.labour ul').append('<li class="perform ' + this.id + '">' + this.name + ' </span>(' + stats + ')</li>');
        });
        bindLabour();
    }

    function bindLabour() {
        $('.perform').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Actions.get(id).perform();
        });
    }

    //Declare
    Machines.new(0, 'Solar Panel', 'collector', 1000, 100);
    Machines.new(1, 'Mine', 'harvester', 200, 500);
    Machines.new(2, 'Nuclear Reactor', 'generator', 1000000, 1000000, 10);
    Machines.new(3, 'Generic Mass Fabricator', 'fabricator', 1000, 10000000, 100000);

    Actions.new(0, 'Bank Robbery', 'credits', 1000);

    updateLabourList();
    updateMachineList();

});
