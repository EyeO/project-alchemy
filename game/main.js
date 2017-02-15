//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Machine.js'),
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
    window.credits = 100;
    var creditsRate = 0,
        matterRate = 0,
        matter = 0,
        energy = 0;
    energyRate = 0;

    //Update resources
    function updateResources(delta) {
        energy += delta.energy;
        energyRate = delta.energy * 1000 / updateInterval;
        matter += delta.matter;
        matterRate = delta.matter * 1000 / updateInterval;
        window.credits += delta.currency;
        creditsRate = delta.currency * 1000 / updateInterval;

        $('.current-energy').html(formatNumber(energy));
        $('.current-energyRate').html(formatNumber(energyRate));
        $('.current-matter').html(formatNumber(matter));
        $('.current-matterRate').html(formatNumber(matterRate));
        $('.current-credits').html(formatNumber(window.credits,1));
        $('.current-creditsRate').html(formatNumber(creditsRate,1));
    }

    function updateMachineList() {
        $('.machines ul').empty();
        Machines.runFunction(function() {
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
                    units = ['g/s','W'];
                    unary = false;
                    break;
                case 'generator':
                    units = ['W','g/s'];
                    unary = false;
                    break;
                default:
                    throw "Update error: unknown machine type";
            }
            var stats = '+' + formatNumber(this.rate) + units[0] + (unary ? '' : (', -' + formatNumber(this.rate2) + units[1] ) );
            $('.machines ul').append('<li class="purchase ' + this.id + '">$' + formatNumber(this.cost,1) + ' - ' + this.name + ' (' + stats + ') [' + this.instances + ' owned]</li>');
        });
        bindPurchase();
    }

    function bindPurchase() {
        $('.purchase').click(function() {
            var id = $(this).attr('class').split(' ')[1];
            Machines.getMachineByID(id).purchase(1);
            updateMachineList();
        });
    }

    //Declare
    Machines.newMachine('collector', 0, 100, 1000, 'Solar Panel');
    Machines.newMachine('harvester', 1, 500, 200, 'Mine');
    Machines.newMachine('generator', 2, 1000000, 1000000, 'Nuclear Reactor', 10);
    Machines.newMachine('fabricator',3, 10000000, 1000, 'Generic Mass Fabricator', 100000);

    updateMachineList();

});
