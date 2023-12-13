import { Component } from 'react'

class Carousel extends Componenet {
    state = {
        active: 0
    }

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
    }
        //"if you don't pass anything into the carousel put in this above image^^"

        //lifecycle methods are when you use useEffect to make a request and give it an ampty array
        //for class components:
        // componenetDidMount() {
        
        // }
    //  this function runs once at the beginning when it gets mounted on the DOM
        //running it every time state gets updated will be:
        //componenentDidUpdate(){
    
        //}

        //running something after the component has unmounted:
        //componenetWillUnmount() {
    
    //    }

    //BRIAN'S WORDS:
        //useEffect combines all these types of lifecycle methods;
        //class components need it to be broken down into various different functinos
        //that describe the lifecycle of a component


//CLASS COMPONENTS AND HOOKS DO NOT MIX. CAN NEVER HAVE BOTH. CAN NEER HAVE BOTH CLASS COMPONENTES AND HOOKS
    render() { //returns jsx markup
        //use 'this' which is mutable state
        //this.props is what is passed in fron the parent component
        const { active } = this.state
        const { images } = this.props //how we get images in this file 

    return(
        <div className = "carousel" >
            <img src={images[active]} alt="animal" />
            <div className='carousel-smaller'>
                {images.map((photo, index) => (
                    //eslint-disable-next-line
                <img 
                    key={photo}
                    src={photo}
                    className={index === active ? "active" : ""}
                    alt="animal thumbnail"
                />
                ))}
            </div>
        </div>
    )
    }       
}

export default Carousel