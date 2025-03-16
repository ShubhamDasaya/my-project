const APIs = {
  SIGNUP_API: "http://localhost:3000/signup",
  LOGIN_API: "http://localhost:3000/login",
  LOGOUT_API: "http://localhost:3000/logout",

  // User Management APIs
  ALL_USERS_API: "http://localhost:3000/admin/all-user",
  USER_DETAILS_API: (userId) => `http://localhost:3000/admin/user/${userId}`,
  DELETE_USER_API: (userId) => `http://localhost:3000/admin/user-delete/${userId}`,

  // Vehicle Management APIs
  VEHICLE_LIST_API: "http://localhost:3000/admin/vehicle",
  VEHICLE_DETAILS_ADMIN_API: (id) => `http://localhost:3000/admin/vehicle/${id}`,
  ADD_VEHICLE_API: "http://localhost:3000/admin/addVehicle",
  UPDATE_VEHICLE_API: (id) => `http://localhost:3000/admin/updateVehicle/${id}`,
  DELETE_VEHICLE_API: (id) => `http://localhost:3000/admin/vehicle/${id}`,
  AVAILABLE_VEHICLES_API: (id)=> `http://localhost:3000/admin/vehicle-available${id}`,
  VEHICLES_UNDER_MAINTENANCE_API:(id)=> `http://localhost:3000/admin/vehicle-maintenance${id}`,
  ADMIN_PAYMENTS_API: "http://localhost:3000/admin/payment-table",


  // User APIs
 
  
  //  Booking APIs
//  Vehicle APIs
  VEHICLES_USER_API: "http://localhost:3000/user/vehicles",
  VEHICLE_DETAILS_USER_API: (vehicleId) => `http://localhost:3000/user/vehicle/${vehicleId}`,

  BOOK_VEHICLE_API: "http://localhost:3000/user/book",
  VERIFY_PAYMENT_API: "http://localhost:3000/user/payment",
  USER_BOOKING_HISTORY_API: (userId) => `http://localhost:3000/user/history/${userId}`,
  COMPLETE_BOOKING_API:  `http://localhost:3000/user/complete/`,
  CANCEL_BOOKING_API:  `http://localhost:3000/user/cancel/`,

};

export default APIs;
