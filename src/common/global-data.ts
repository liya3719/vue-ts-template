export const isLocation = location.hostname.indexOf('localhost') > -1;
export const isDev = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';