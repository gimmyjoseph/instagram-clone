const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${API_VERSION}`;
export const API_ROUTES = {
  AUTH_SERVICE: {
    SIGNIN: `${BASE_URL}/auth/login`,
    SIGNOUT: `${BASE_URL}/auth/logout`,
    PROFILE: `${BASE_URL}/auth/profile`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
    REGISTER: `${BASE_URL}/auth/register`,
    VERIFY_PHONE_OTP: `${BASE_URL}/api/verify/phone/otp`,
    VERIFY_EMAIL_OTP: `${BASE_URL}/api/verify/email/otp`,
  },
};
