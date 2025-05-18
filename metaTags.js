const defaultMetaTags = {
  contentSecurityPolicy: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self';",
  strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
  xContentTypeOptions: "nosniff",
  xFrameOptions: "DENY",
  xXSSProtection: "1; mode=block",
  referrerPolicy: "no-referrer-when-downgrade"
};

module.exports = defaultMetaTags;