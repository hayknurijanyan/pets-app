import React from "react";

export function PetFinderFunction(props) {
  const { setSearchResult, petBreed, petGender } = props;

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
        setSearchArr(newArray);
      });
    };
    fetchData();
  }, []);

  if (searchVal) {
    if (!petGender && !petBreed) {
      const sVal = searchVal.toLowerCase().trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter((animal) => animal.pet.includes(sVal));
      setSearchResult(myArr);
    } else if (petGender && !petBreed) {
      const sVal = searchVal.toLowerCase().trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter(
        (animal) =>
          animal.pet.includes(sVal) &&
          animal.userPetInfo.petsGender === petGender
      );
      setSearchResult(myArr);
    } else if (!petGender && petBreed) {
      const sVal = searchVal.toLowerCase().trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter(
        (animal) =>
          animal.pet.includes(sVal) && animal.userPetInfo.breed === petBreed
      );
      setSearchResult(myArr);
    } else if (petGender && petBreed) {
      const sVal = searchVal.toLowerCase().trim();
      const newArr = [...searchArr];
      const myArr = newArr.filter(
        (animal) =>
          animal.pet.includes(sVal) &&
          animal.userPetInfo.petsGender === petGender &&
          animal.userPetInfo.breed === petBreed
      );
      setSearchResult(myArr);
    }
  } else alert("write something");

  return null;
}
