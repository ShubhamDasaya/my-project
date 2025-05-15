const BASE_URL = "http://localhost:3000"; // Update with your backend URL

export default {
  // Authentication APIs
  "USER_LOGIN": `${BASE_URL}/login`,
  "USER_SIGNUP": `${BASE_URL}/signup`,

  // Admin vehicle APIs
  "GET_ALL_VEHICLES": `${BASE_URL}/admin/vehicle`,
  "ADD_VEHICLE": `${BASE_URL}/admin/vehicle`, // Append `/:owner_id` when calling
  "UPDATE_VEHICLE": `${BASE_URL}/admin/vehicle-update`, // Append `/:id` when calling
  "DELETE_VEHICLE": `${BASE_URL}/admin/vehicle-delete`, // Append `/:id` when calling
  "GET_AVAILABLE_VEHICLES": `${BASE_URL}/admin/vehicle-available`,
  "GET_BOOKED_VEHICLES": `${BASE_URL}/admin/vehicle-booked`,
  "GET_MAINTENANCE_VEHICLES": `${BASE_URL}/admin/vehicle-maintenance`,
  "MAKE_VEHICLE_AVAILABLE": `${BASE_URL}/admin/vehicle-maintenance`,
};
