//Load scripts - http://stackoverflow.com/a/11803418
$.when(
    $.getScript('game/misc.js'),
    $.getScript('game/model/Machine.js'),
    $.getScript('game/model/MachineTypes.js'),
    $.Deferred(function(deferred){
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
    var credits = 0,
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

        $('.current-energy').html(formatNumber(energy));
        $('.current-energyRate').html(formatNumber(energyRate));
        $('.current-matter').html(formatNumber(matter));
        $('.current-matterRate').html(formatNumber(matterRate));
    }

    //Declare
    Machines.newMachine('generator', 1, 100, 1000, 'Mine', 20);

    //Purchase
    Machines.getMachineByID(1).purchase(1);

});
