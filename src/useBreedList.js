import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import fetchBreedList from "./fetchBreedList";

// export default function useBreedList(animal) {
//   ;

//   return [results?.data?.breeds ?? [], results.status];
// }


const localCache = {}

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([])
    const [status, setStatus] = useState("unloaded")
    const results = useQuery(["breeds", animal], fetchBreedList)
    useEffect(() => {
        if (!animal) {
            setBreedList([])
        } else if (localCache[animal]) {
            setBreedList(localCache[animal])
        } else {
            requestBreedList();
        }
    
        async function requestBreedList() {
            setBreedList([])
            setStatus("loading")

            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`, {mode: 'no-cors'}
            )
            const json = await res.json();
            localCache[animal] = json.breeds || []
            setBreedList(localCache[animal])
            setStatus("loaded")
        }
    }, [animal])
    return [breedList, status]
}