import { GET_PRODUCTS, GET_IMAGE, SUMCART } from "../actions/actionTypes";

const init = {
  images: [],
  products: [],
  size: [],
  cart: [],
  wishlist: []
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data.products,
        size: action.payload.data.size
      };
    case GET_IMAGE:
      return {
        ...state,
        images: action.payload.data
      };
    case SUMCART:
      return {
        ...state,
        cart: action.payload.cart.data,
        wishlist: action.payload.wishlist.data
      };
    default:
      return state;
  }
};

export default reducer;
