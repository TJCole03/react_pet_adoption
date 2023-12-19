import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

//basically going to mostly seamlessly pass children through if it has them
//If no children, it iwll only render itself
const Modal = ({children}) => {
    const elRef = useRef(null) //useRef - when you have a pice of someting and need that same piece back every single time
    if (!elRef.current) {
        elRef.current = document.createElement('div');    
    }
    //an elRef or ref is a container to give yourself back the same thing
    //every time; in the elRef.current it's always going to be the smae div we create
    //and it's only going to create this div once.; we want the same div on every single rerender
    //can attach this div to the DOM now that we have a handle on it;
    //can also detach it, and we're alwasy operating on the same div

    useEffect(() => {
        const modalRoot = document.getElementById("modal")
        modalRoot.appendChild(efRef.current);

        //how to do componenet will unmount in function components??
        return () => modalRoot.removeChild(elRef.current); 
        //so whenever you return an effect or basically return anything,in fact, 
        //it will run this whenever the component will unmount.
        //removing this child at the end of it is important because
        //otherwise we're gonna get infinite divs being left inside this modal/portal
        //removing event listeners, stopping timers, animation frames, removing DOM elements, setting intervals
        //we can use this method to stop and remove all of that
    }, [])

    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;