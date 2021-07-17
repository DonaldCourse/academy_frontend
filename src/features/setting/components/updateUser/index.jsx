// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import AuthApi from "../../../../api/authApi";
// import { getUserInfo } from "../../userProfileSlide";
// import * as SC from "./style";

// const UpdateUser = (props) => {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.userprofile);
//   const [firstName, setFirst] = useState();
//   const [lastName, setLast] = useState();

//   const onSubmit = async (value) => {
//     props.closePopup(false);
//     const res = await AuthApi.UpdateUserInfo(value);
//     dispatch(getUserInfo());
//   };

//   useEffect(() => {
//     if (!userInfo.fullName) return;
//     const firstname = userInfo.fullName.split(" ").slice(0, -1).join(" "); // returns "Paul Steve"
//     const lastname = userInfo.fullName.split(" ").slice(-1).join(" "); // returns "Panakkal"
//     setFirst(firstname);
//     setLast(lastname);
//   }, [userInfo]);

//   return (
//     <SC.Container
//       style={{
//         overlay: {
//           background: "rgba(0,0,0,0.4)",
//           zIndex: "100",
//         },
//       }}
//       isOpen={props.toggle}
//     >
//       <SC.SubContainer onSubmit={handleSubmit(onSubmit)}>
//         <h3 style={{ margin: "0" }}>Cập nhật tài khoản</h3>
//         <SC.GroupI>
//           <SC.Variable>Họ</SC.Variable>
//           <SC.value
//             defaultValue={firstName}
//             {...register("firstName", { required: true })}
//             type="text"
//           />
//         </SC.GroupI>
//         <SC.GroupI>
//           <SC.Variable>Tên</SC.Variable>
//           <SC.value
//             defaultValue={lastName}
//             type="text"
//             {...register("lastName", { required: true })}
//           />
//         </SC.GroupI>
//         <SC.GroupI>
//           <SC.Variable>Địa chỉ</SC.Variable>

//           <SC.value
//             defaultValue={userInfo.address}
//             type="text"
//             {...register("address", { required: true })}
//           />
//         </SC.GroupI>
//         <SC.GroupI>
//           <SC.Variable>Số điện thoại</SC.Variable>

//           <SC.value
//             defaultValue={userInfo.phoneNumber}
//             type="number"
//             {...register("phoneNumber", { required: true })}
//           />
//         </SC.GroupI>
//         <SC.GroupBTN>
//           <SC.Close onClick={() => props.closePopup(false)}>Đóng</SC.Close>
//           <SC.Submit type="submit">Update</SC.Submit>
//         </SC.GroupBTN>
//       </SC.SubContainer>
//     </SC.Container>
//   );
// };

// export default UpdateUser;
