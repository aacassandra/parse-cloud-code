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
  attributesRemover(response) {
    let newResponse = response;
    newResponse = JSON.stringify(newResponse);
    newResponse = JSON.parse(newResponse);
    return newResponse;
  }
};
