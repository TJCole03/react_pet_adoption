const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`, {'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'});
    // const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`, {mode: 'no-cors'});
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} not fetching`);
    }
  
    return apiRes.json();
  };
  
  export default fetchPet;
//REMEMBER: REACT QUERY EXPECTS YOU TO RETURN A PROMISE; ASYNC FUNCTIONS ALWAYS RETURN PROMISES