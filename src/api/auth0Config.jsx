export const auth0Config = {
  domain: "dev-xs0cpy5ap6s6vaem.us.auth0.com",
  clientId: "u574sEOykc9fJHWsccObjS2GAi3V0Q5N",
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: "openid profile email",
  },
};

// Must match the connection name shown in Auth0 → Authentication → Social → LinkedIn
export const connections = { linkedin: "linkedin" };
