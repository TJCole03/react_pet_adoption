// import { set } from 'mongoose'
import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext.js'
import useBreedList from './useBreedList.js'
import Results from './Results.jsx'
import fetchSearch from './fetchSearch.js'
// const ANIMALS = ['BIRB', 'KITTERS', 'DOGE', 'LIZARD WIZARD', 'SWIMMY BOIS', 'TORTORTLETER', 'REMY']
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]
const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "", 
        animal: "", 
        breed: "", 
    })
    const [animal, setAnimal] = useState("")
    // const [pets, setPets] = useState([]) //array of pets we retrieved from API
    const [breeds] = useBreedList(animal) //made an empty array as placeholder undtil we get the api for breeds
    const [adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext)

    const results = useQuery(["search", requestParams], fetchSearch)
    const pets = results?.data?.pets ?? [];



    // useEffect(() => {
    //     //sends a function that goes out to api and requests pets from api
    //     requestPets();
    // }, []) 
    
    // //dependencies ask "when do i run again?"
    // //by giving an empty aray the anser is: only once! so
    // //it'll do the first render without using this effect
    // //immediately after render has finished, THEN run USEEFFECT

    // async function requestPets() {
    //     const res = await fetch(
    //         `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`, {
    //             mode: 'no-cors'}
    //     );  
    //     const json = await res.json();
    
    //     setPets(json.pets);
    //   }
    
    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                //browser api; can feed it a form and it'll pull out all the data 
                //on the form for you into an object
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get('animal') ?? "",
                    breed: formData.get('breed') ?? "",
                    location: formData.get('location') ?? "",
                }
                setRequestParams(obj)
            }}
            > 
                {
                    adoptedpet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label htmlFor="location">
                    Location 
                    <input
                        name="location"
                        type="text"
                        id="location"
                        placeholder="Location"
                    />
                </label> 
                <label htmlFor='animal'>
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                           // setBreed("")
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value)
                        }}
                    >
                        <option />
                        {/* //this function didn't work at first b/c i used 
                        // "{}" instead of "()".  */}
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
                        name="breed"
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