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
        item[key] = Serializer.serializeObject(item[key].data ?? item[key]);
      }
    }
    return item;
  }

  static serializeArray(array) {
    array = array.map(Serializer.serializeObject);
    return array;
  }

  static serializeDecorator(fnc) {
    return async (ctx) => {
      const { serialize, additional_name_for_data } = ctx.query;
      const res = await fnc(ctx);
      if (!(serialize && res)) {
        return res;
      }
      res.data = Array.isArray(res.data)
        ? Serializer.serializeArray(res.data)
        : Serializer.serializeObject(res.data);
      if (additional_name_for_data) {
        res[additional_name_for_data] = res.data;
      }
      return res;
    };
  }
}

module.exports = Serializer;
