const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const APIs = {
  // Authentication APIs
  SIGNUP_API: `${BASE_URL}/signup`,
  LOGIN_API: `${BASE_URL}/login`,
  LOGOUT_API: `${BASE_URL}/logout`,
  FORGOT_PASSWORD_API: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD_API: (token) => `${BASE_URL}/reset-password/${token}`,
  SEND_OTP_API:`${BASE_URL}/send-otp`,
  RESEND_OTP_API:`${BASE_URL}/resend-otp`,
  VERIFY_OTP_API:`${BASE_URL}/verify-otp`,

  // User Management APIs
  ALL_USERS_API: `${BASE_URL}/admin/all-user`,
  USER_DETAILS_API: (userId) => `${BASE_URL}/admin/user/${encodeURIComponent(userId)}`,
  DELETE_USER_API: (userId) => `${BASE_URL}/admin/user-delete/${encodeURIComponent(userId)}`,

  // Vehicle Management APIs
  VEHICLE_LIST_API: `${BASE_URL}/admin/vehicle`,
  VEHICLE_DETAILS_ADMIN_API: (id) => `${BASE_URL}/admin/vehicle/${encodeURIComponent(id)}`,
  ADD_VEHICLE_API: `${BASE_URL}/admin/addVehicle`,
  UPDATE_VEHICLE_API: (id) => `${BASE_URL}/admin/updateVehicle/${encodeURIComponent(id)}`,
  DELETE_VEHICLE_API: (id) => `${BASE_URL}/admin/vehicle/${encodeURIComponent(id)}`,
  ADMIN_PAYMENTS_API: `${BASE_URL}/admin/payment-table`,
  ADMIN_SEE_BOOKED_VEHICLE: `${BASE_URL}/admin/vehicle-booked`,
  ADMIN_CANCEL_BOOKING_API: `${BASE_URL}/admin/cancel/`,
  
  
  // Booking APIs
  VEHICLES_USER_API: `${BASE_URL}/user/vehicles`,
  VEHICLE_DETAILS_USER_API: (vehicleId) => `${BASE_URL}/user/vehicle/${encodeURIComponent(vehicleId)}`,
  BOOK_VEHICLE_API: `${BASE_URL}/user/book`,
  VERIFY_PAYMENT_API: `${BASE_URL}/user/payment`,
  USER_BOOKING_HISTORY_API: (userId) => `${BASE_URL}/user/history/${encodeURIComponent(userId)}`,
  COMPLETE_BOOKING_API: `${BASE_URL}/user/complete/`,
  CANCEL_BOOKING_API: `${BASE_URL}/user/cancel/`,
};

export default APIs;
