let User = require("../db/models/UserSchema");
let CarouselProducts = require("../db/models/carouselSchema");
let SliderProduct = require("../db/models/sliderSchema");
let subCatProducts = require("../db/models/subCatSchema");
let OrderedProducts = require("../db/models/buyNowSchema");
let SubscriptionMails = require("../db/models/subscriptionSchema");
let createSubCat = require("../db/models/createSubCat");
let PromoCode = require("../db/models/promoCodeSchema")


let userController = {
  onSignup: (body, next) => {
    let newUser = new User(body);
    newUser.save(function (err, user) {
      next(err, user);
    });
  },
};
let sliderController = {
  saveData: (body, next) => {
    let prdDetail = new SliderProduct(body);
    prdDetail.save(function (err, user) {
      next(err, user);
    });
  },
};

let carouselController = {
  saveData: (body, next) => {
    let prdDetail = new CarouselProducts(body);
    prdDetail.save(function (err, user) {
      next(err, user);
    });
  },
};

let subCatController = {
  saveData: (body, next) => {
    let subCatDetail = new subCatProducts(body);
    subCatDetail.save(function (err, user) {
      next(err, user);
    });
  },
};
let OrderedProductsCatController = {
  saveData: (body, next) => {
    let OPDetail = new OrderedProducts(body);
    OPDetail.save(function (err, user) {
      next(err, user);
    });
  },
};
let subscriptionController = {
  subscription: (body, next) => {
    let prdDetail = new SubscriptionMails(body);
    prdDetail.save(function (err, user) {
      next(err, user);
    });
  },
};
let createSubCatController = {
  saveData: (body, next) => {
    let subCatDetail = new createSubCat(body);
    subCatDetail.save(function (err, user) {
      next(err, user);
    });
  },
};


let promoCodeController = {
  saveData: (body, next) => {
    let promoCodeDetail = new PromoCode(body);
    promoCodeDetail.save(function (err, user) {
      next(err, user);
    });
  },
};
module.exports.userController = userController;
module.exports.carouselController = carouselController;
module.exports.sliderController = sliderController;
module.exports.subCatController = subCatController;
module.exports.createSubCatController = createSubCatController;
module.exports.OrderedProductsCatController = OrderedProductsCatController;
module.exports.subscriptionController = subscriptionController;
module.exports.promoCodeController = promoCodeController;

