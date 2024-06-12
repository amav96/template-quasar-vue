
  const empty = (str: any) => {
    if (!str || str === '') {
      return true;
    }
    return false;
  };
  
  const removeDuplicates = (arr: any, key: any) => new Promise((resolve) => {
    const remove = arr.filter((val: any, index: any, array: any) => array.findIndex((find: any) => find[key] === val[key]) === index);
    resolve(remove);
  });
  
  export {
    removeDuplicates, empty
  };
  