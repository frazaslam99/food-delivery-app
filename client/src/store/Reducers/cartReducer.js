let initialState = {
    cartItems: [

    ],
    checkoutData: [
        {

        }
    ],
    total: [
        {

        }
    ]

}

const cartReducer = (state = initialState, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    if (action.type == "persist/REHYDRATE" && action.payload) {

        newState = action.payload.cartReducer;

    } else if (action.type === "Add_To_Cart") {
        newState.cartItems = [...newState.cartItems, action.payload];
        // newState.inProcess = false;
        return newState;
    } else if (action.type == "Update_Cart") {
        let targetCart = newState.cartItems.find((cart) => {
            return cart.description == action.payload.description
        });

        if (targetCart) {
            let cartIndex = newState.cartItems.indexOf(targetCart);
            newState.cartItems[cartIndex] = action.payload;
        }

    } else if (action.type === "checkout") {
        newState.checkoutData = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "Handle_Total") {
        newState.total = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type === "Remove-cartItem") {
        let targetcartItems = newState.cartItems.find((items) => {
            return items.description == action.payload.description
        })
        if (targetcartItems) {
            let getIndex=newState.cartItems.indexOf(targetcartItems);
            newState.cartItems.splice(getIndex,1);
        }
        return newState;
    }
    return newState;
}
export default cartReducer;