import jwtDecoder from '../jwt-decoder';

async function jwtValidator(request) {
  const token = request.headers.access_token;
  if (!token) {
    return null;
  }

  const tokenData = await jwtDecoder(token);
  return tokenData;
}

export default jwtValidator;
