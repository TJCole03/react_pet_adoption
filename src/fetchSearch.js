async function fetchSearch({ queryKey }) {
    const { animal, location, breed } = queryKey[1]
    
    //what happens if we have multiple things we're tracking?
    //instead of giving things individual strings, we can give make then objects
    //our queryKey is an object in this projet
    
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
        { mode: 'no-cors' }
    )

    if (!res.ok) {
        throw new Error(`pet search not okay ${animal}, ${location}, ${breed}`)
    }

    return res.json()

}

export default fetchSearch;