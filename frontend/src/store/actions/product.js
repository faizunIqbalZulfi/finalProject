import { GET_PRODUCTS, GET_IMAGE, SUMCART } from "./actionTypes";
import axios from "../../config/axios";

//addproduct
export const onAddProduct = data => {
  const formData = new FormData();
  const {
    product_name,
    description,
    price,
    quantity,
    category1,
    category2,
    files
  } = data;
  return async () => {
    try {
      const res = await axios.post("/add/product", {
        product_name,
        description,
        price,
        category1,
        category2
      });
      console.log(res);
      try {
        const res = await axios.post(`/add/size`);
        console.log(res);
        try {
          const res = await axios.post("/add/stock", quantity);
          console.log(quantity);

          try {
            for (let i = 0; i < files.length; i++) {
              if (i === 0) {
                console.log("dafault");
                formData.append("image", files[i], "default.jpg");
              } else {
                console.log("notdafault");
                formData.append("image", files[i]);
              }
            }
            const res = await axios.post(`/add/image`, formData);
            console.log(res);
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log();
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//getallproduct
export const onGetAllProduct = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/get/products");
      console.log(res);

      dispatch({
        type: GET_PRODUCTS,
        payload: res
      });
    } catch (e) {
      console.log();
    }
  };
};

//getimageproduct
export const onGetImageProduct = product_id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/get/image/${product_id}`);
      dispatch({
        type: GET_IMAGE,
        payload: res
      });
      // console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
};

//deleteimageproduct
export const onDeleteImage = image_id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/delete/image/${image_id}`);
      // dispatch({
      //   type: "DELETE_IMAGE",
      //   payload: res
      // });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
};

// editproduct
export const onEditProduct = data => {
  const formData = new FormData();
  const {
    product_name,
    description,
    price,
    quantity,
    category1,
    category2,
    files,
    product_id
  } = data;
  return async () => {
    try {
      const res = await axios.patch(`/edit/product/${product_id}`, {
        product_name,
        description,
        price,
        category1,
        category2
      });
      console.log(files.length);
      try {
        await axios.patch(`/edit/stock/${product_id}`, quantity);
        console.log("stock");
        console.log("image");
        if (files.length) {
          try {
            // :product_id
            const res = await axios.get(`/getedit/image/${product_id}`);
            console.log(res.data);

            for (let i = 0; i < files.length; i++) {
              if (res.data.length === 0 && i === 0) {
                console.log("dafault");
                formData.append("image", files[i], "default.jpg");
              } else {
                console.log("notdafault");
                formData.append("image", files[i]);
              }
            }
            try {
              const res = await axios.post(
                `/edit/image/${product_id}`,
                formData
              );
              console.log(res);
            } catch (e) {
              console.log(e);
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log();
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//getSumCart
export const getAllWishcart = user_id => {
  return async dispatch => {
    // const res = await axios.get(`/get/cart/${user_id}`);
    const wishlist = await axios.get(`/get/wishlist/${user_id}`);
    // this.setState({ allWishlist: wishlist.data });

    const cart = await axios.get(`/get/cart/${user_id}`);
    // this.setState({ allCart: cart.data });

    // if (res.data.length) {
    dispatch({
      type: SUMCART,
      payload: { cart, wishlist }
    });
    // }
  };
};
