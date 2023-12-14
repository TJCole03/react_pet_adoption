import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
    state = { hasError: false }
    static getDerivedStateFromError() { 
        //do this anythime we have an error
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        //typically we'd log this to TrackJS or NewRelic
        console.error("ErrorBoundary componenet caught an error", error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>
                    Error in listing; <Link to='/'>Click here to go back to home page</Link>
                </h2>
            )
        }
        //if there is no error, we want this program to seamlessly pass through
        return this.props.children
    }

}

export default ErrorBoundary;

//putting static methods on class. this is the way we'd call it
// ErrorBoundary.getDerivedStateFromError();

