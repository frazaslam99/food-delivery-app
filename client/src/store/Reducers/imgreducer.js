let initialState = {
  carouselProduct: [{}],
  sliderImgs: [],
  sliderProduct: [],
  auraFusionProducts: [],
  auraLuxuryProducts: [],
  auraPrintProducts: [],
  saphonaMahruProducts: [],
  saphonaNoorChasmProducts: [],
  saphonaNoorUlainProducts: [],
  orderedProducts: {},
  subCats: [],
  subCatProducts: [],
};

const imgReducer = (state = initialState, action) => {
  // console.log(state);

  let newState = JSON.parse(JSON.stringify(state));

  if (action.type === "abc") {
    newState.sliderImgs.push(action.payload);
    return newState;
  } else if (action.type === "Product_info_didmount") {
    newState.sliderImgs = action.payload;
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "get_slider_products") {
    newState.sliderProduct = action.payload;
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_FUSION_PRODUCTS") {
    newState.auraFusionProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_LUXURY_PRODUCTS") {
    newState.auraLuxuryProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_PRINT_PRODUCTS") {
    newState.auraPrintProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_MAAHRU_PRODUCTS") {
    newState.saphonaMahruProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_NOORChashm_PRODUCTS") {
    newState.saphonaNoorChasmProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
    return newState;
  } else if (action.type === "SHOW_NOORulain_PRODUCTS") {
    newState.saphonaNoorUlainProducts = action.payload;
    // console.log("payload", action.payload)
    // newState.inProcess = false;
  } else if (action.type === "DELETE_PRODUCT") {
    let filterMaahruProduct = newState.subCatProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.subCatProducts = filterMaahruProduct;
  } else if (action.type === "DELETE_NOOR_UL_AIN_PRODUCT") {
    let filterProduct = newState.saphonaNoorUlainProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.saphonaNoorUlainProducts = filterProduct;
  } else if (action.type === "DELETE_NOOR_E_CHASHM_PRODUCT") {
    let filterProduct = newState.saphonaNoorChasmProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.saphonaNoorChasmProducts = filterProduct;
  } else if (action.type === "DELETE_FUSION_PRODUCT") {
    let filterMaahruProduct = newState.auraFusionProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.auraFusionProducts = filterMaahruProduct;
  } else if (action.type === "DELETE_LUXURY_PRODUCT") {
    let filterMaahruProduct = newState.auraLuxuryProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.auraLuxuryProducts = filterMaahruProduct;
  } else if (action.type === "DELETE_PRINT_PRODUCT") {
    let filterMaahruProduct = newState.auraPrintProducts.filter((item) => {
      console.log("id", item._id);
      return item._id != action.payload;
    });
    newState.auraPrintProducts = filterMaahruProduct;
  } else if (action.type === "SUB_CAT_D") {
    newState.subCats = action.payload;
  } else if (action.type === "SHOW_SUBCAT_NEW_PRODUCTS") {
    newState.subCatProducts = action.payload;
  }
  return newState;
};
export default imgReducer;
