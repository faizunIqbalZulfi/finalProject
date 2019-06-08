// import axios from "../config/axios";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

// //register
// export const onRegister = data => {
//   return async dispatch => {
//     try {
//       const res = await axios.post("/register/user", data);
//       dispatch({
//         type: "REGISTER",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //login
// export const onLogin = data => {
//   return async dispatch => {
//     try {
//       const res = await axios.post("/login/user", data);
//       if (res.data.length !== 1) {
//         dispatch({
//           type: "AUTH_ERROR",
//           payload: res
//         });
//         return setTimeout(() => {
//           dispatch({
//             type: "SETTIMEOUT"
//           });
//         }, 3000);
//       }

//       cookies.set("user_id", res.data[0].user_id, { path: "/" });
//       cookies.set("role", res.data[0].role, { path: "/" });

//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: res.data[0]
//       });

//       console.log(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //keeplogin
// export const keepLogin = user_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.get(`/user/${user_id}`);
//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: res.data[0]
//       });
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //edituser
// export const onEditUser = data => {
//   return async dispatch => {
//     try {
//       const res = await axios.patch(
//         `/edit/user/${cookies.get("user_id")}`,
//         data
//       );
//       dispatch({
//         type: "EDIT_USER",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //editpassword
// export const onEditPassword = data => {
//   return async dispatch => {
//     try {
//       const res = await axios.patch(
//         `/edit/password/${cookies.get("user_id")}`,
//         data
//       );
//       dispatch({
//         type: "EDIT_USER",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //logout
// export const onLogout = () => {
//   cookies.remove("user_id", { path: "/" });
//   cookies.remove("address", { path: "/" });
//   cookies.remove("role", { path: "/" });
//   return {
//     type: "LOGOUT_SUCCESS"
//   };
// };

// //deleteuser
// export const onDeleteUser = user_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.delete(`/delete/user/${user_id}`);
//       cookies.remove("user_id", { path: "/" });
//       cookies.remove("address", { path: "/" });
//       cookies.remove("role", { path: "/" });
//       dispatch({
//         type: "DELETE_USER"
//       });
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //getaddress
// export const onGetAddress = user_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.get(`/address/${user_id}`);
//       dispatch({
//         type: "GET_ADDRESS",
//         payload: res
//       });
//       console.log(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //editaddress
// export const onEditAddress = (address_id, data) => {
//   return async dispatch => {
//     try {
//       const res = await axios.patch(`/edit/address/${address_id}`, data);
//       dispatch({
//         type: "AUTH_ERROR",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //deleteaddress
// export const onDeleteAddress = address_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.delete(`/delete/address/${address_id}`);

//       dispatch({
//         type: "AUTH_ERROR",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //addaddress
// export const onAddAddress = data => {
//   return async dispatch => {
//     try {
//       const res = await axios.post(`/add/address`, data);
//       dispatch({
//         type: "AUTH_ERROR",
//         payload: res
//       });
//       setTimeout(() => {
//         dispatch({
//           type: "SETTIMEOUT"
//         });
//       }, 3000);
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //addproduct
// export const onAddProduct = data => {
//   const formData = new FormData();
//   const {
//     product_name,
//     description,
//     price,
//     quantity,
//     category1,
//     category2,
//     files
//   } = data;
//   return async () => {
//     try {
//       const res = await axios.post("/add/product", {
//         product_name,
//         description,
//         price,
//         category1,
//         category2
//       });
//       console.log(res);
//       try {
//         const res = await axios.post(`/add/size`);
//         console.log(res);
//         try {
//           const res = await axios.post("/add/stock", quantity);
//           console.log(quantity);

//           try {
//             for (let i = 0; i < files.length; i++) {
//               if (i === 0) {
//                 console.log("dafault");
//                 formData.append("image", files[i], "default.jpg");
//               } else {
//                 console.log("notdafault");
//                 formData.append("image", files[i]);
//               }
//             }
//             const res = await axios.post(`/add/image`, formData);
//             console.log(res);
//           } catch (e) {
//             console.log(e);
//           }
//         } catch (e) {
//           console.log();
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //getallproduct
// export const onGetAllProduct = () => {
//   return async dispatch => {
//     try {
//       const res = await axios.get("/get/products");
//       console.log(res);

//       dispatch({
//         type: "GET_PRODUCTS",
//         payload: res
//       });
//     } catch (e) {
//       console.log();
//     }
//   };
// };

// //getimageproduct
// export const onGetImageProduct = product_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.get(`/get/image/${product_id}`);
//       dispatch({
//         type: "GET_IMAGE",
//         payload: res
//       });
//       // console.log(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //deleteimageproduct
// export const onDeleteImage = image_id => {
//   return async dispatch => {
//     try {
//       const res = await axios.delete(`/delete/image/${image_id}`);
//       // dispatch({
//       //   type: "DELETE_IMAGE",
//       //   payload: res
//       // });
//       console.log(res);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// // editproduct
// export const onEditProduct = data => {
//   const formData = new FormData();
//   const {
//     product_name,
//     description,
//     price,
//     quantity,
//     category1,
//     category2,
//     files,
//     product_id
//   } = data;
//   return async () => {
//     try {
//       const res = await axios.patch(`/edit/product/${product_id}`, {
//         product_name,
//         description,
//         price,
//         category1,
//         category2
//       });
//       console.log(res);
//       try {
//         const res = await axios.patch(`/edit/stock/${product_id}`, quantity);
//         console.log(res);
//         if (files.length !== 0) {
//           try {
//             // console.log(data);
//             for (let i = 0; i < files.length; i++) {
//               if (i === 0) {
//                 console.log("dafault");
//                 formData.append("image", files[i], "default.jpg");
//               } else {
//                 console.log("notdafault");
//                 formData.append("image", files[i]);
//               }
//             }
//             const res = await axios.post(`/edit/image/${product_id}`, formData);
//             console.log(res);
//           } catch (e) {
//             console.log(e);
//           }
//         }
//       } catch (e) {
//         console.log();
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

// //getproducthome
// // export default onGetProductHome =()=>{

// // }
