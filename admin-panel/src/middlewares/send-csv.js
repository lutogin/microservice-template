async function sendCsvMiddleware(request, response, next) {
  response.sendCsv = function sendCsv(csvData) {
    response.set('Content-disposition', 'attachment; filename=data.csv');
    response.set('Content-Type', 'text/csv');
    return response.send(csvData);
  };

  return next();
}

export default sendCsvMiddleware;
