// import { set } from 'mongoose'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useBreedList from './useBreedList.js'
import Results from './Results.jsx'
import fetchSearch from './fetchSearch.js'
// const ANIMALS = ['BIRB', 'KITTERS', 'DOGE', 'LIZARD WIZARD', 'SWIMMY BOIS', 'TORTORTLETER', 'REMY']
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]
const SearchParams = () => {
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([]) //array of pets we retrieved from API
    const [breeds] = useBreedList(animal) //made an empty array as placeholder undtil we get the api for breeds
    

    useEffect(() => {
        //sends a function that goes out to api and requests pets from api
        requestPets();
    }, []) 
    
    //dependencies ask "when do i run again?"
    //by giving an empty aray the anser is: only once! so
    //it'll do the first render without using this effect
    //immediately after render has finished, THEN run USEEFFECT

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`, {
                mode: 'no-cors'}
        );  
        const json = await res.json(`${ANIMALS}`);
    
        setPets(json.pets);
      }
    
    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets()
            }}
            >
                <label htmlFor="location">
                    Location 
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        id="location"
                        value={location}
                        placeholder="Where you looking?"
                    />
                </label> 
                <label htmlFor='animal'>
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("")
                        }}
                    >
                        <option />
                        //this function didn't work at first b/c i used 
                        // "{}" instead of "()". 
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='breed'>
                    Breed
                    <select
                        id="breed"
                        disabled={breeds.length === 0}
                        value={breed}
                        onChange={(e) => {
                            setBreed(e.target.value)
                        }}
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <h4>"More pushups!!" or whatever David Goggins says</h4>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;