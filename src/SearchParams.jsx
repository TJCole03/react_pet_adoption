// import { set } from 'mongoose'
import { useState, useEffect } from 'react'
const ANIMALS = ['BIRB', 'KITTERS', 'DOGE', 'LIZARD WIZARD', 'SWIMMY BOIS', 'TORTORTLETER', 'REMY']
const SearchParams = () => {
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const breeds = [] //made an empty array as placeholder undtil we get the api for breeds
    return (
        <div className="search-params">
            <form>
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
        </div>
    )
}

export default SearchParams;