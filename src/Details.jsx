import { useParams } from "react-router-dom"

const Details = () => {
    const { id, name, breed } = useParams();
    return <h2>{id}{name}{ breed }</h2>;
  };
  
  export default Details;