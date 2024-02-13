async function fetchBreedList({ queryKey }) {
  const animal = queryKey[1];

  if (!animal) return [];

  const res = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`,{'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'}
    // `https://pets-v2.dev-apis.com/breeds?animal=${animal}`,{mode: 'no-cors'}
  );

  if (!res.ok) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }

  return res.json();
}

export default fetchBreedList;