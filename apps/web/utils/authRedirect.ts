import Cookies from "js-cookie";

export const setRedirectAfterLogin = (path: string) => {
  Cookies.set("redirectAfterLogin", path, { expires: 1 / 24 }); // expires in 1 hour
};

export const getAndClearRedirectAfterLogin = () => {
  const redirect = Cookies.get("redirectAfterLogin");
  if (redirect) {
    Cookies.remove("redirectAfterLogin");
  }
  return redirect;
};
