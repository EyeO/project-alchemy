//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Machine.js'),
    $.getScript('game/model/EnergyCollector.js'),
    $.Deferred(function(deferred){
        $(deferred.resolve);
    })
).done(function() {

    //Game loop
    var lastTime = Date.now();
    var lagCorrection = false;
    var updateInterval = 100;

    function gameLoop() {
        var deltaTime = lagCorrection ? Date.now() - lastTime : updateInterval;
        if (lagCorrection) {
            lastTime = Date.now();
        }
        updateResources({'energyRate': Machines.update(deltaTime)});
    }
    setInterval(gameLoop, updateInterval);

    //Variables
    var credits = 0,
        matterRate = 0,
        matter = 0,
        energy = 0;
        energyRate = 0;

    //Update resources
    function updateResources(deltaResource) {
        energy += deltaResource.energyRate;
        energyRate = deltaResource.energyRate * 1000 / updateInterval;

        $('.current-energy').html(formatNumber(energy));
        $('.current-energyRate').html(formatNumber(energyRate));
    }




    //Declare solar panels
    Machines.newEnergyCollector(1, 100, 1000, 'Tier 1 Solar Panel');
    Machines.newEnergyCollector(2, 500000, 1000000, 'Tier 2 Solar Panel');

    //Purchase 3 solar panels
    Machines.getMachineByID(2).purchase(100);

});
