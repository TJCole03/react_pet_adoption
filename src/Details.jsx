import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from './fetchPets'
import Carousel from "./Carousel";

//CANNOT AWAIT IN A RENDER FUNCTION
const Details = () => {
    const { id } = useParams(); //this requires BrowserRouter in App.jsx
    const results = useQuery(["details", id], fetchPet) //giving useQuery a key of what we're requesting; 
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
        //tempting to make the error boundary wrap around this entire block of code but 
        //DO NOT DO THAT; WHY?
        //error boundaries can only catch things in components that are rendered inside of it
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                {/* <h2>{`${pet.animal} -- ${pet.breed} -- ${pet.city} -- ${pet.state}`}</h2> */}
                <h2>{pet.animal} -- {pet.breed} -- {pet.city} -- {pet.state}</h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>
            </div>
        </div>
    )
};
  
function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}
//So our details page doesn't actually accept any props up here right ? But what is one problem with this if for whatever reason we startedpassing in props to details? 
//as of right now they will get killed right here right ? because we are not passing these props into details.So this would be like one of the only cases I'd be okay withyou 
//just saying ...props here using the spread operator here, because details error boundary doesn't care about these props at all.It's meant to be totally 
//seamless andpassed these props through seamlessly, right ? So this is what I would do here is basically say like I don't care what
//props are coming in just go directly through the ErrorBoundary anddon't care about what's coming in, right ?
  
  export default DetailsErrorBoundary;