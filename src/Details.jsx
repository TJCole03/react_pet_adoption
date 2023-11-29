import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import fetchPet from "./FetchPet";

//CANNOT AWAIT IN A RENDER FUNCTION
const Details = () => {
    const { id } = useParams();
    const results = useQuery(["details", id, fetchPet]) //giving useQuery a key of what we're requesting; 
        //^^^^the query key that will be provided to fetchPet.js^^^
        //if you dont have details, run fetchPet so the user can get the pets' details
    
    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader"> spin </h2>
            </div>
        )
    }

    const pet = results.data.pets[0];

    return (
        <div className="details">
            <div>
                <h1>{pet.name}</h1>
                <h2>{pet.animal} -- {pet.breed} -- {pet.city} -- {pet.state}
                    <button>Adopt {pet.name}</button>
                    <p>{performance.description}</p>
                </h2>
            </div>
        </div>
    )
  };
  
  export default Details;