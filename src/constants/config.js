const devMode = process.env.NODE_ENV !== 'development';

export default {
  // App Details
  appName: 'RealityCheck',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? '221037531' : '221037531',

  SERVER_URL: 'http://192.168.0.7:8080/scoops',
};
