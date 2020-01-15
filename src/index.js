// import Tools from './tools';
const Tools = require('./tools');

const Index = (Parse, request, callback) => {
  const { functionName } = request.params;
  if (functionName === 'ParseUpdateUser') {
    const { data } = request.params;
    const { objectId } = request.params;
    const options = request.params.options ? request.params.options : null;
    const User = new Parse.User();
    const query = new Parse.Query(User);

    if (options.include) {
      query.include(options.include);
    }

    query.get(objectId).then(
      async object => {
        await Tools.objectSet(object, data);
        object.save(null, { useMasterKey: true }).then(
          async success => {
            let newSuccess = success;
            newSuccess = await Tools.attributesRemover(newSuccess);
            const res = {
              output: newSuccess,
              status: true
            };
            callback(res);
          },
          error => {
            const res = {
              output: error,
              status: false
            };
            callback(res);
          }
        );
      },
      error => {
        const res = {
          output: error,
          status: false
        };
        callback(res);
      }
    );
  } else if (functionName === 'ParseUpdate') {
    const { data } = request.params;
    const { objectId } = request.params;
    const { className } = request.params;
    const options = request.params.options ? request.params.options : null;

    const Class = Parse.Object.extend(className);
    const query = new Parse.Query(Class);

    if (options.include) {
      query.include(options.include);
    }

    query.get(objectId).then(
      async object => {
        await Tools.objectSet(object, data);
        object.save(null, { useMasterKey: true }).then(
          async success => {
            let newSuccess = success;
            newSuccess = await Tools.attributesRemover(newSuccess);
            const res = {
              output: newSuccess,
              status: true
            };
            callback(res);
          },
          error => {
            const res = {
              output: error,
              status: false
            };
            callback(res);
          }
        );
      },
      error => {
        const res = {
          output: error,
          status: false
        };
        callback(res);
      }
    );
  }
};

module.exports = Index;
