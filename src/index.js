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

    if (options && options.include) {
      query.include(options.include);
    }

    query.get(objectId).then(
      async object => {
        await Tools.objectSet(Parse, object, data);
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

    if (options && options.include) {
      query.include(options.include);
    }

    query.get(objectId).then(
      async object => {
        await Tools.objectSet(Parse, object, data);
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
  } else if (functionName === 'ParseRetrieve') {
    const { objectId } = request.params;
    const { className } = request.params;
    const options = request.params.options ? request.params.options : null;

    const Class = Parse.Object.extend(className);
    const query = new Parse.Query(Class);

    if (options && options.where && Object.keys(options.where).length) {
      Tools.objectConditional(Parse, query, options.where);
    }

    if (options && options.include) {
      query.include(options.include);
    }

    query.get(objectId, { useMasterKey: true }).then(
      async success => {
        let newSuccess = success;
        newSuccess = await Tools.attributesRemover(newSuccess);
        if (options && options.relation) {
          const promises = options.relation.map(async columnName => {
            const relation = await Tools.getRelation(success, columnName);
            Object.keys(newSuccess).forEach(column => {
              if (column === columnName) {
                newSuccess[column] = relation;
              }
            });
          });
          await Promise.all(promises);
        }
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
  } else if (functionName === 'ParseRetrieves') {
    const { className } = request.params;
    const options = request.params.options ? request.params.options : null;

    const Class = Parse.Object.extend(className);
    const query = new Parse.Query(Class);

    if (options && options.where && Object.keys(options.where).length) {
      Tools.objectConditional(Parse, query, options.where);
    }

    if (options && options.include) {
      query.include(options.include);
    }

    query.find({ useMasterKey: true }).then(
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
  }
};

module.exports = Index;
