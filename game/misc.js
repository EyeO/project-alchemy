//Variables
var lastTime = Date.now(),
    lagCorrection = false,
    updateInterval = 100,
    rateInterval = 1000;

function Delta(e, m, c, deltaTime, instances) {
    this.energy = e * deltaTime * instances / 1000;
    this.matter = m * deltaTime * instances / 1000;
    this.currency = c * deltaTime * instances / 1000;
}

//Proto script - http://javascript.info/tutorial/inheritance
function inherit(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

//Floating point operations
var big = 1e12;

function floatAdd(a, b) {
    return Math.round((a + b) * big) / big;
}

function floatSub(a, b) {
    return floatAdd(a, -b);
}

//Caps - http://stackoverflow.com/a/1026087
String.prototype.sentenceCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//Format large numbers - http://stackoverflow.com/a/17633552
var ranges = [{
        divider: 1e30,
        suffix: 'W',
        money: 'D'
    },
    {
        divider: 1e27,
        suffix: 'X',
        money: 'N'
    },
    {
        divider: 1e24,
        suffix: 'Y',
        money: 'Sp'
    },
    {
        divider: 1e21,
        suffix: 'Z',
        money: 'Sx'
    },
    {
        divider: 1e18,
        suffix: 'E',
        money: 'Qi'
    },
    {
        divider: 1e15,
        suffix: 'P',
        money: 'Qa'
    },
    {
        divider: 1e12,
        suffix: 'T',
        money: 'T'
    },
    {
        divider: 1e9,
        suffix: 'G',
        money: 'B'
    },
    {
        divider: 1e6,
        suffix: 'M',
        money: 'M'
    },
    {
        divider: 1e3,
        suffix: 'k',
        money: 'k'
    }
];

function formatNumber(n, money) {
    if (n < 0) {
        return '-' + formatNumber(-n);
    }
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return parseFloat((n / ranges[i].divider).toFixed(3).toString()) + (typeof money === 'undefined' ? ranges[i].suffix : ranges[i].money);
        }
    }
    return n.toString();
}
