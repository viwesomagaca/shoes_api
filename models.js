const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const inventory = mongoose.model('inventory', {
        color: String,
        brand: String,
        price: Number,
        size: Number,
        in_stock: Number
    })

    return {
    inventory
    };
}
