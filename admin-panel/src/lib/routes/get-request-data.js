const getRequestData = async request => {
  const data = {
    ...request.body,
    ...request.params,
    ...request.query,
  };

  const accessToken =
    request && request.headers && request.headers.access_token;
  if (accessToken) {
    data.accessToken = accessToken;
  }

  // TODO: think about the best solution

  // const { cookies } = request;

  // data.accessToken =
  //   cookies && cookies.access_token && decodeURIComponent(cookies.access_token);
  // data.currentEmail =
  //   cookies &&
  //   cookies.current_email &&
  //   decodeURIComponent(cookies.current_email);

  return data;
};

export default getRequestData;
