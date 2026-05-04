import useAuthStore from "@/store/authStore";

const BASE_URL = typeof window === "undefined" 
  ? (process.env.API_URL || "http://ramspeed-laravel-api.test")
  : (process.env.NEXT_PUBLIC_API_BASE_URL || "/backend-api");

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const token = useAuthStore.getState().token;

  const headers = {
    "Accept": "application/json",
    ...options.headers,
  };

  // Only set Content-Type to application/json if it's not FormData
  if (options.body && options.body instanceof FormData) {
    // Let the browser set the Content-Type with boundary for FormData
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: "omit", // JWT doesn't need cookies
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (response.status === 401 && !endpoint.includes("/login")) {
      useAuthStore.getState().logout();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      throw new Error("Unauthorized. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
