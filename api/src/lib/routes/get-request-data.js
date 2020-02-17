const getRequestData = async request => {
  const data = {
    ...request.body,
    ...request.params,
    ...request.query,
  };

  return data;
};

export default getRequestData;
