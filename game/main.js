$(function() {
    var credits = 0,
        matterRate = 1,
        matter = 0,
        energy = 0;

    setInterval(function(){
      matter+=matterRate;
      $('.current-matter').html(matter);
    },1000);
});
