module.exports = function(shoes) {

  var shoeApiModel = shoes.inventory;

  const index = function(req, res, done) {
    shoeApiModel.find({}, function(err, result) {
      if (err) {
        return done(err)
      }
      res.send(result)
    })
  }

  const brandname = function(req, res, done) {
    var shoebrand = req.params.brandname
    shoeApiModel.find({
      brand: shoebrand
    }, function(err, result) {
      if (err) {
        return done(err)
      }
      console.log(result);
      res.send(result)
    })

  }

  const brandsize = function(req, res, done) {
    var shoesize = req.params.size
    shoeApiModel.find({
      size: shoesize
    }, function(err, result) {
      if (err) {
        return done(err)
      }
      console.log(result);
      res.send(result)
    })

  }

  const shoeBrandSize = function(req, res, done) {
    var shoebrand = req.params.brandname
    var shoesize = req.params.size

    shoeApiModel.find({
      brand: shoebrand,
      size: shoesize
    }, function(err, result) {
      if (err) {
        return done(err)
      }
      console.log(result);
      res.send(result)
    })
  }

  const stockUpdate = function(req, res, done) {
    var id = req.params.id

    shoeApiModel.findOneAndUpdate({
          _id: id
        }, {
        $inc: {
          "in_stock" : -1
        }
      },{
        upsert : false
      }, function(err, result) {
        if (err) {
          return done(err)
        }
        res.send(result.brand + ' is saved')
    })
  };


const displayInstock = function(req, res, done) {
  var stock = req.body;

  shoeApiModel.create({
    color: stock.color,
    brand: stock.brand,
    price: stock.price,
    size: stock.size,
    in_stock: stock.in_stock
  }, function(err, result) {
    if (err) {
      return done(err)
    }
    res.send(result)
  })
}

return {
  index,
  displayInstock,
  brandname,
  brandsize,
  shoeBrandSize,
  stockUpdate
}
}
