
export const getPageParams = (
  req,
  error,
  success,
  admin
) => {
  let isAdmin = false;
  if (admin) {
    isAdmin = admin;
  }
  const pageParams = {
    isLogin: getToken(req) !== undefined && getToken(req) !== "",
    error,
    success,
    isAdmin,
  };
  return pageParams;
};
export const getToken = (req) => {
  const token = req.cookies["token"];
  return token;
};
export const setToken = async (res, token) => {
  const expire = new Date(Date.now() + 3600000);
  res.cookie("token", token, { httpOnly: true, expires: expire });
};
export const getMessage = (req) => {
  let success = '';
  let error = '';
  if (req.query.success) {
    const message = decodeURIComponent(req.query.success);
    console.log(message)
    success = message.split("-");
  }
  if (req.query.error) {
    const message = decodeURIComponent(req.query.error);
    error = message.split("-");
  }
  return {
    success,
    error,
  };
};
