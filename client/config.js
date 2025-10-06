

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`; // Base URL without version for flexibility
export const API_ROUTES = {
  AUTH_SERVICE: {
    SIGNIN: `${BASE_URL}/${API_VERSION}/auth/login`,
    SIGNOUT: `${BASE_URL}/${API_VERSION}/auth/logout`,
    PROFILE: `${BASE_URL}/${API_VERSION}/auth/profile`,
    REFRESH_TOKEN: `${BASE_URL}/${API_VERSION}/auth/refresh`,
    REGISTER: `${BASE_URL}/${API_VERSION}/auth/register`,
    VERIFY_PHONE_OTP: `${BASE_URL}/${API_VERSION}/verify/phone/otp`,
    VERIFY_EMAIL_OTP: `${BASE_URL}/${API_VERSION}/verify/email/otp`,
    PRIVACY: `${BASE_URL}/${API_VERSION}/user/privacy/{id}`,
  },
  FOLLOW_SERVICE: {
    FOLLOW: `${BASE_URL}/follows`,
    UNFOLLOW: `${BASE_URL}/follows/unfollow`,
    FOLLOW_STATUS: `${BASE_URL}/follows/status`,
    FOLLOWERS: `${BASE_URL}/follows/users/{userId}/followers`,
    FOLLOWINGS: `${BASE_URL}/follows/users/{userId}/followings`,
    NON_FOLLOWED_USERS: `${BASE_URL}/follows/users/non-followed`,
    REMOVE: `${BASE_URL}/follows/remove`, 
  },
};