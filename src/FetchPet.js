const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`, {mode: 'cors'});
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchPet;
//REMEMBER: REACT QUERY EXPECTS YOU TO RETURN A PROMISE; ASYNC FUNCTIONS ALWAYS RETURN PROMISES