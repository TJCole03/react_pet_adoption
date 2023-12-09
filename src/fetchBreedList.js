async function fetchBreedList({ queryKey }) {
    const animal = queryKey[1];
  
    if (!animal) return [];
  
    const apiRes = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`, {mode: 'no-cors'}
    );
  
    if (!apiRes.ok) {
      throw new Error(`breeds ${animal} not fetching`);
    }
  
    return apiRes.json();
  }
  
  export default fetchBreedList;