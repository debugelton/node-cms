'use strict';
var is_required = function is_required (required, fields) {
    var failed = [];
    required.forEach(function (value, index) {
        for (var key in value) {
            if (fields.hasOwnProperty(key)) {
                if (typeof fields[key] === value[key]) {
                    if (fields[key].length === 0) {
                        failed.push(value);
                    }
                }
            }
        }
    });
    return failed;
};

module.exports = {'is_required': is_required};