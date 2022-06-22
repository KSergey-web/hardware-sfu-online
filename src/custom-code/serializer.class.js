class Serializer {
  static serializeObject(item) {
    if (!item) {
      return null;
    }
    if (item.attributes && item.id) {
      item = {
        id: item.id,
        ...item.attributes,
      };
    }
    for (let key of Object.keys(item)) {
      if (item[key] === null) {
        continue;
      }
      if (typeof item[key] === 'object') {
        item[key] = Serializer.serializeObject(item[key].data);
      }
    }
    return item;
  }

  static serializeArray(array) {
    array = array.map(Serializer.serializeObject);
    return array;
  }
}

module.exports = Serializer;
