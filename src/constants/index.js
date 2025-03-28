//NOTE: API URL 🍎🍎🍎🍎
export const BASE_URL =
  'http://master.devicebee.com/saveMe/api';
export const API_URL = BASE_URL;
export const API_URL_STR = 'https://api.stripe.com/v1';

//NOTE: API END POINTS 🍎🍎🍎🍎
export const LOGIN = `${API_URL}/login`;
export const REGISTER = `${API_URL}/register`;
export const VERIFYEMAIL = `${API_URL}/verify-email`;
export const FORGOTPASSWORD = `${API_URL}/forgot-password`;
export const RESETPASSWORD = `${API_URL}/reset-password`;
export const RESENDOTP = `${API_URL}/resend-otp`;
export const DASHBOARD = `${API_URL}/getAllCategories`;
export const GETALLTYPES = `${API_URL}/getCollectTypes`;
export const UPDATELOCATION = `${API_URL}/update-location`;
export const LASTHOURTYPES = `${API_URL}/getLastHourBundles`;
export const GLOBALSEARCH = `${API_URL}/globalSearch`;
export const DETAILSBUNDLES = `${API_URL}/getBundleDetails`;
export const VERIFYUSER = `${API_URL}/login/verifyUser`;
export const FAVOURITEDATA = `${API_URL}/myFavouriteBundles`;
export const PROFILEDATA = `${API_URL}/profile`;
export const IMAGEDATA = `${API_URL}/update-profile`;
export const RECENTDATA = `${API_URL}/myReservedBundles`;
export const DELETEACCOUNT = `${API_URL}/delete-account`;
export const LOGOUT = `${API_URL}/logout`;
export const ADDFAVOURITEDATA = `${API_URL}/addRemoveFavourite`;
export const SEARCHDATA = `${API_URL}/searchVendorBundles`;
export const RATING = `${API_URL}/rate-vendor`;
export const RESERVEDBUNDLE = `${API_URL}/reserveBundle`;
export const STRIPE_API = `${API_URL}/stripePayment`;
export const PAYVIACARD = `${API_URL}/payViaCard`;
export const PAYVIACASH = `${API_URL}/payViaCash`;
export const GOOGLE_SIGNIN = `${API_URL}/google-signin`;
export const APPLE_SIGNIN = `${API_URL}/apple-signin`;


//SCREEN Title
export const screenTitle = {
  HOME: 'Home',
  LOGIN: 'Login',
  SPALSH: 'Splash',
  FORGOTPASSWORD: 'ForgotPassword',
  NEWPASSWORD: 'NewPassword',
  SIGNUP: 'SignUp',
  OTP: 'OTP',
  SETLOCATION: 'SetLocation',
  SELECTFROMMAP: 'SelectFromMap',
  FAVOURITESCREEN: 'FavouriteScreen',
  RECENTSCREEN: 'RecentScreen',
  FOODHOME:'FoodHome',
  FILTER: 'Filter',
  MYACCOUNT: 'Account',
  FOODDETAIL: 'FoodDetail',
  CATEGORYFILTER: 'CategoryFilter',
  SEARCHRESULT: 'SearchResult',
  MYPROFILE: 'MyProfile',
  SETTINGS: 'Settings',
  TOTALSAVING: 'TotalSaving',
  TOTALBUNDLES: 'TotalBundles',
  FAVOURITE: 'Favourite',
  RECENT: 'Recent',
  BECOMEVENDOR: 'BecomeVendor',
  CHANGEPASSWORD: 'ChangePassword',
  CHANGEEMAIL: 'ChangeEmail'
};

//Fonts Name
export const fontsName = {
  NUNITO_MEDIUM: 'Nunito-Medium',
  NUNITO_REGULAR: 'Nunito-Regular',
  NUNITO_BOLD: 'Nunito-Bold',
  NUNITO_LIGHT: 'Nunito-Light',
};

export const RegEx = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  VISACARD : /\d{4} *\d{4} *\d{4} *\d{4}/
}

export const LocalStorage = {
  AUTH_TOKEN : 'auth_token',
  LOCATION_KEY : 'LOCATION_KEY'
}
