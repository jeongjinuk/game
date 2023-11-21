String.format = function () {
    let args = arguments;
    return args[0].replace(/{(\d+)}/g, function (match, num) {
        num = Number(num) + 1;
        return typeof (args[num]) != undefined ? args[num] : match;
    });
};