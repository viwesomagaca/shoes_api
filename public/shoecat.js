var availableStock = document.getElementById('shoesCat').innerHTML;
var template = Handlebars.compile(availableStock);

// This is a function that is used to view all the stock, works as a onload
$.ajax({
  url: "https://somagies-shoe-api.herokuapp.com/api/shoes",
  type: "GET"
}).then(function(data) {
  var searched = template({
    shoes: data
  });
  document.getElementById("display").innerHTML = searched;
})



var ddowns = document.querySelector(".dropdown").innerHTML;
var myTemplate = Handlebars.compile(ddowns);

function brandUnique() {
  //Populates the dropdown with brands available in stock
    $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes",
    type: "GET"
  }).then(function(data) {
   //maps through data in the api and returns brands
    var uniqueT = [];
    var map = {};

    for (var i = 0; i < data.length; i++) {
      var brandN = data[i];

      if (map[brandN.brand] === undefined) {
        map[brandN.brand] = brandN.brand;
        uniqueT.push(brandN.brand)
      }
    }
    document.querySelector(".brands").innerHTML = myTemplate({
      brand: uniqueT
    });
  })
}
brandUnique();



function UniqueSize() {
  //Populates the dropdown with sizes available in stock
  var uniSize = [];
  var mapSize = {};

  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes",
    type: "GET"
  }).then(function(data) {

    for (var i = 0; i < data.length; i++) {
      var shoeSize = data[i];
      if (mapSize[shoeSize.size] === undefined) {
        mapSize[shoeSize.size] = shoeSize.size;
        uniSize.push(shoeSize.size);
      }
    }
    document.querySelector(".sizes").innerHTML = myTemplate({
      size: uniSize
    });
  })
}
UniqueSize();



$("select").change(search);

function search() {
   //searches according to the dropdowns
  var brandFilter = document.querySelector(".brands");

  var sizeFilter = document.querySelector(".sizes")

  var availableStock = document.getElementById('shoesCat').innerHTML;
  var template = Handlebars.compile(availableStock);
  var message  = "We dont have stock for " + brandFilter.value
  + " size " + sizeFilter.value;
   //filters for brands


  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes/brand/" + brandFilter.value,
    type: "GET"
  }).then(function(data) {
    var searched = template({
      shoes: data
    });
    document.getElementById("display").innerHTML = searched;
  })

    //filters for sizes
  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes/size/" + sizeFilter.value,
    type: "GET"
  }).then(function(data) {
    var searched = template({
      shoes: data
    });
    document.getElementById("display").innerHTML = searched;
  })

  //filters for brands and sizes
  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes/brand/" + brandFilter.value + "/size/" + sizeFilter.value,
    type: "GET"
  }).then(function(data) {
    var searched = template({
      shoes : data
    });
    console.log(data);
    if (data.length >0) {
      document.getElementById("display").innerHTML = searched;
    }
    if (data.length <= 0) {
      document.getElementById("display").innerHTML = message;
      console.log(message);
    }
    })
    };


function showAll() {
  var availableStock = document.getElementById('shoesCat').innerHTML;
  var template = Handlebars.compile(availableStock);


  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes",
    type: "GET"
  }).then(function(data) {

    console.log(data);
    var searched = template({
      shoes: data
    });
    document.getElementById("display").innerHTML = searched;

  })

  $("select").val("0");
  brandUnique();
  UniqueSize();
};



document.getElementById("display").addEventListener("click", function(e) {
   //purchase function
  var _id = e.target.id;
  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes/sold/" + _id,
    type: "POST",
  }).then(function(data) {
    search();
    console.log('You just bought', data);
    var searched = template({
      shoes: data
    });
    document.getElementById("display").innerHTML = searched;


  })
})



document.getElementById("enterstock").addEventListener("click", function() {
  //add stock function
  var addBrand = document.querySelector(".brandAdd");
  var addColor = document.querySelector(".colorAdd");
  var addIn_stock = document.querySelector(".in_stockAdd");
  var addPrice = document.querySelector(".priceAdd");
  var addSize = document.querySelector(".sizeAdd");
  var message = document.querySelector(".message");

  if (addBrand.value == null || addBrand.value.length == 0 &&
    addColor.value == null || addColor.value.length == 0 &&
    addIn_stock.value == null || addIn_stock.value.length == 0 &&
    addPrice.value == null || addPrice.value.length == 0 &&
    addSize.value == null || addSize.value.length == 0) {
    document.getElementById("messages").innerHTML = "Please add stock!"
    alert("Please ENTER stock!")
    return;
  }

  var data1 = ({
    color: addColor.value,
    brand: addBrand.value,
    price: addPrice.value,
    size: addSize.value,
    in_stock: addIn_stock.value
  });

  console.log(data1)

  addColor.value = "";
  addBrand.value = "";
  addPrice.value = "";
  addSize.value = "";
  addIn_stock.value = "";

  $.ajax({
    url: "https://somagies-shoe-api.herokuapp.com/api/shoes",
    type: "POST",
    async: "true",
    dataType: "application/json",
    data: data1,

    sucess: function(data) {
      alert("Stock has been added!")
      brandUnique();
      UniqueSize();
    }
  });
});
