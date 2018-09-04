/**
 * Created by kenji on 4/9/18.
 */
module.exports.formatPrice = function(input) {
    const output = (input / 100).toFixed(2);
    output.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return '$' + output;
};

module.exports.getMarkup = function(real,retail) {
    if(real === 0 || real === null || real === undefined || retail === 0 || retail === null || retail === undefined)
    {
        return -1;
    }
    let grossProfit = retail - real;
    return Math.floor((grossProfit / real) * 100);
};

module.exports.getGrossProfit = function(real,retail) {
    if(real === 0 || real === null || real === undefined || retail === 0 || retail === null || retail === undefined)
    {
        return -1;
    }
    let grossProfit = retail - real;
    return Math.ceil((grossProfit / retail) * 100);
};

module.exports.removeFromArray = function(ary, elem) {
    let i = ary.indexOf(elem);
    if (i >= 0) ary.splice(i, 1);
    return ary;
};