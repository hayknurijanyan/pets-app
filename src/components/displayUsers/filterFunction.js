let log = console.log;
function filterFunction(arr, filterValue, filterSubject) {
  const newArr = [...arr];
  const toLowerCaseArray = newArr.map((value) =>
    value[filterSubject].toLowerCase()
  );

  const filteredArray = toLowerCaseArray.filter((value) =>
    value[filterSubject].includes(filterValue)
  );

  const finalArray = [];
  arr.forEach((obj1) =>
    filteredArray.forEach((obj2) => {
      if (obj1.uid === obj2.uid) {
        finalArray.push(obj1);
      }
    })
  );

  return finalArray;
}

export default filterFunction;
