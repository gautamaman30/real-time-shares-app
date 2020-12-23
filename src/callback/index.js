export default function makeCallBack(controller){
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
      }
    }
    let httpResponse = {};
    try{
      httpResponse = await controller(httpRequest);
      if(httpResponse.headers){
        res.set(httpResponse.headers);
      }
    } catch(e){
      console.log(e);
    }
    res.status(httpResponse.statusCode).send(httpResponse.body);
  }
}
