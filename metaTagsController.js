const metaTags = require('./metatags');

exports.setMetaTags = (req, res, next) => {
  res.setHeader('Content-Security-Policy', metaTags.contentSecurityPolicy);
  res.setHeader('Strict-Transport-Security', metaTags.strictTransportSecurity);
  res.setHeader('X-Content-Type-Options', metaTags.xContentTypeOptions);
  res.setHeader('X-Frame-Options', metaTags.xFrameOptions);
  res.setHeader('X-XSS-Protection', metaTags.xXSSProtection);
  res.setHeader('Referrer-Policy', metaTags.referrerPolicy);
  next();
};