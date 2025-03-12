const APIs = {
  SIGNUP_API: "http://localhost:3000/signup",
  LOGIN_API: "http://localhost:3000/login",
LOGOUT_API: "http://localhost:3000/logout",

// User Management APIs
  ALL_USERS_API: "http://localhost:3000/admin/all-user",
  USER_DETAILS_API: (userId) => `http://localhost:3000admin//user/${userId}`,
  SUSPEND_USER_API: (userId) => `http://localhost:3000/admin/user-suspend/${userId}`,
  UNSUSPEND_USER_API: (userId) => `http://localhost:3000/admin/user-unsuspend/${userId}`,
  DELETE_USER_API: (userId) => `http://localhost:3000/admin/user-delete/${userId}`,

  // Vehicle Management APIs
  VEHICLE_LIST_API: "http://localhost:3000/admin/vehicle",
  VEHICLE_DETAILS_API: (id) => `http://localhost:3000/admin/vehicle/${id}`,
  ADD_VEHICLE_API:  `http://localhost:3000/admin/addVehicle`,
  UPDATE_VEHICLE_API: (id) => `http://localhost:3000/admin/vehicle-update/${id}`,
  DELETE_VEHICLE_API: (id) => `http://localhost:3000/admin/vehicle/${id}`,
  AVAILABLE_VEHICLES_API: "http://localhost:3000/admin/vehicle-available",
  VEHICLES_UNDER_MAINTENANCE_API: "http://localhost:3000/admin/vehicle-maintenance",
  
  BOOKED_VEHICLES_API: "http://localhost:3000/admin/book",
  
  BOOKED_VEHICLES_BYID_API:(vehicleId)=> `http://localhost:3000/admin/book${vehicleId}`,
  BOOK_CAR_API: "http://localhost:3000/admin/book",
  VERIFY_PAYMENT_API: "http://localhost:3000/admin/verify-payment",
  CANCEL_BOOKING_API: (bookingId) => `http://localhost:3000/admin/cancel/${bookingId}`,



  
  ADMIN_COMPLAINTS_API: "http://localhost:3000/admin/complaints",
  ADMIN_COMPLAINT_DETAILS_API: (id) => `http://localhost:3000/admin/complaints/${id}`,

  

 

};

export default APIs;
