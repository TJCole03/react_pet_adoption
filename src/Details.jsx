import { useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from './fetchPets'
import Carousel from "./Carousel";


const Modal = lazy(() => import('./Modal'))

//CANNOT AWAIT IN A RENDER FUNCTION
const Details = () => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext)
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
                <h2>{pet.animal} -- {pet.breed} -- {pet.city} -- {pet.state}
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                {/* <button>Adopt {pet.name}</button> */}
                <p>{pet.description}</p>
                    {
                        showModal ? //'if we have show modal'/ do we have showModal?
                        ( 
                            <Modal>
                                <div>
                                        <h1>
                                            Would you like to adopt {pet.name}?
                                        </h1>
                                        <div className="buttons">
                                            <button onClick={() => {
                                                setAdoptedPet(pet);
                                                navigate("/")
                                            }}>Yes</button>
                                            <button onClick={() => setShowModal(false)}>No</button>
                                        </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </h2>
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

/*

BRIANS'S BLURB ABOUT SERVICE WORKERS: 

Can we load stuff in the background? 
The answer is yes, you definitely can. 
We're now adding another factor of complexity here by doing that.
The best way that I found to do that is you have a service worker.
If you're not familiar with service workers,basically what they do is you have your application, 
you have your API server.A service worker sits in the middle, soany time that your application makes 
a request to your API,it goes through your service worker and out to the API, right?That's just how 
service workers work. 
What you can do is you can basically have your service worker, once it loads, 
once your app is loaded, it can say, okay, the user is trying to load modal.
The the user might try and load details, they might try and load this.
So they basically go and grab all the pieces in the background, so that whenever modal 
gets requested to the service worker, it can just say,guess what, I already have it.
We're not gonna talk to the API right now, here you go, right?And so by having that 
service worker sit in the middle of that, you can basically just serve those requests 
as if they were happening instantaneously.And your user never has to know, and you don't 
have to write your code anydifferently either, the service worker can handle all of that. 
So the way that you do that is you have Vite or Parcel orWebpack generate a manifest of all the chunks.
The service worker, once it's loaded and once your app is loaded,can look at that manifest and say,
all right, cool, give me all of those chunks. 
And then, it'll do that for you.Something like Remix actually does this for you already.
 */