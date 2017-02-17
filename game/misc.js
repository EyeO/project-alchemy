//Variables
//TODO DRY
resources = {
    e: 0,
    m: 0,
    c: 0,

    ePrev: 0,
    mPrev: 0,
    cPrev: 0,

    eCap: 0,
    mCap: 0,
    cCap: 50,

    ePer: function() {
        if (resources.eCap === 0) {
            return '0%';
        }
        return parseFloat(100 * resources.e / resources.eCap).toFixed(2) + '%';
    },
    mPer: function() {
        if (resources.mCap === 0) {
            return '0%';
        }
        return parseFloat(100 * resources.m / resources.mCap).toFixed(2) + '%';
    },
    cPer: function() {
        if (resources.cCap === 0) {
            return '0%';
        }
        return parseFloat(100 * resources.c / resources.cCap).toFixed(2) + '%';
    },

    //eRate etc.
};

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
