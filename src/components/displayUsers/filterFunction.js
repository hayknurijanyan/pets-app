let log = console.log;
function filterFunction(arr, filterValue, filterSubject) {
  const newArr = [...arr];
  const newArr2 = [...arr];
  newArr.map(
    (value) => (value[filterSubject] = value[filterSubject].toLowerCase())
  );

  const filteredArray = newArr.filter((value) =>
    value[filterSubject].includes(filterValue)
  );
  log("filteredArray", filteredArray);
  log("newArr", newArr);
  log("newArr2", newArr2);
  log("arr", arr);
  const finalArray = [];
  newArr2.forEach((obj1) =>
    filteredArray.forEach((obj2) => {
      if (obj1.uid === obj2.uid) {
        finalArray.push(obj1);
      }
    })
  );

  return finalArray;
}

export default filterFunction;
