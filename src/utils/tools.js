import _ from "lodash";
export const spliceAddress = (str, triggerLen = 13, prevLen = 6, endLen = 4) => {
    if (_.isNil(str)) return str;
    return str.length > triggerLen ? _.truncate(str, { length: prevLen + 3 }) + str.substr(-endLen) : str;
  }