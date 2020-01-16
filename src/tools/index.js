module.exports = {
  objectSet(Parse, object, data) {
    data.forEach(dat => {
      if (dat[3]) {
        if (dat[0] === 'pointer') {
          const pointer = {
            __type: 'Pointer',
            className: dat[3],
            objectId: dat[2]
          };
          object.set(dat[1], pointer);
        }
      } else if (dat[0] === 'string') {
        object.set(dat[1], dat[2]);
        // date,number,boolean
      } else if (dat[0] === 'date') {
        // date only from new Date()
        object.set(dat[1], dat[2]);
      } else if (dat[0] === 'number') {
        object.set(dat[1], Number(dat[2]));
      } else if (dat[0] === 'boolean') {
        let bool = false;
        if (dat[2] === 'True' || dat[2] === 'true' || dat[2] === true || dat[2] === 1) {
          bool = true;
        } else if (dat[2] === 'False' || dat[2] === 'false' || dat[2] === false || dat[2] === 0) {
          bool = false;
        }

        object.set(dat[1], bool);
      } else if (dat[0] === 'array') {
        object.set(dat[1], dat[2]);
      } else if (dat[0] === 'object') {
        object.set(dat[1], dat[2]);
      } else if (dat[0] === 'image') {
        object.set(dat[1], new Parse.File(dat[2].fileName, { base64: dat[2].base64 }));
      } else if (dat[0] === 'geopoint') {
        const point = new Parse.GeoPoint({
          latitude: dat[2],
          longitude: dat[3]
        });
        object.set('location', point);
      }
    });

    return object;
  },
  objectConditional: (Parse, query, options) => {
    Object.keys(options).forEach(key => {
      if (key === 'equalTo') {
        query.equalTo(options[key].object, options[key].value);
      } else if (key === 'equalToPointer') {
        query.equalTo(
          options[key].object,
          new Parse.Object(options[key].class, {
            id: options[key].value
          })
        );
      } else if (key === 'notEqualTo') {
        query.notEqualTo(options[key].object, options[key].value);
      } else if (key === 'notEqualToPointer') {
        query.notEqualToPointer(
          options[key].object,
          new Parse.Object(options[key].class, {
            id: options[key].value
          })
        );
      } else if (key === 'containedIn') {
        query.containedIn(options[key].object, options[key].value);
      } else if (key === 'notContainedIn') {
        query.notContainedIn(options[key].object, options[key].value);
      } else if (key === 'greaterThan') {
        query.greaterThan(options[key].object, options[key].value);
      } else if (key === 'lessThan') {
        query.lessThan(options[key].object, options[key].value);
      } else if (key === 'greaterThanOrEqualTo') {
        query.greaterThanOrEqualTo(options[key].object, options[key].value);
      } else if (key === 'lessThanOrEqualTo') {
        query.lessThanOrEqualTo(options[key].object, options[key].value);
      }
    });

    return query;
  },
  attributesRemover(response) {
    let newResponse = response;
    newResponse = JSON.stringify(newResponse);
    newResponse = JSON.parse(newResponse);
    return newResponse;
  },
  getRelation(query, columnName) {
    return new Promise(resolve => {
      const relation = query.relation(columnName);
      const relationQuery = relation.query();
      relationQuery.find({ useMasterKey: true }).then(
        success => {
          const response = [];
          success.forEach(object => {
            response.push(object.toJSON());
          });
          resolve(response);
        },
        error => {
          resolve(error);
        }
      );
    });
  }
};
