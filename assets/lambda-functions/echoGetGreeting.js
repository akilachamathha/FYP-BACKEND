exports.handler = async function (event) {
  console.log(`event: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Welcome!!! FYP APIs are up and running.',
  };
};
