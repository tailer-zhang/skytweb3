// ga4 common params config
const trackParams = {
  debug_mode: true,
};

// prod disable debug_mode
if (process.env.NEXT_PUBLIC_SELECTED_ENV === "prod") {
  trackParams.debug_mode = false;
}

// dev and test app id

let MEASUREMENT_ID = "G-8RC2TD938D"

// prod app id 
if (process.env.NEXT_PUBLIC_SELECTED_ENV === "prod") {
  MEASUREMENT_ID = 'G-HWJ6XRS9KH';
}



let  data = {
  trackParams,
  MEASUREMENT_ID
}

export default data;
