import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export default function render(url, opts) {
    const stream = renderToPipeableStream(
        <StaticRouter location={url}>
            <App/>
        </StaticRouter>,
        opts
    )

    return stream
}

/*

So here, we have Vite building ServerApp.jsx; 
We'll import what Vite built (ServerApp) into Node because 
Node CANNOT read JSX; 
Don't have to build our entire Node server, we only need to 
build our ServerApp, which interfaces to our JSX; 
We have to do this because Node CANNOT read JSX; 
We need to have Vite build an output and have our 
Node application import the built output

 */



/*

  renderToPipeableStream- can ONLY be run in Node. going to run 
    our application and going to run it into a 'node stream', 
    which is a thing that progressively renders the app 
    and gives the app progressive output, so when a user makes a request, 
    we can slowly feed them pieces of info as they're available. 
        The way it USED to work is we'd have to render the whole thing all at once
        and then send the complete HTML; Now, with react 18 and suspence, we can 
            send the users the HTML piece by piece
  StaticRouter - react router than can be run in Node; same 
    machinations of how to resolve route, which routes they're on, which ones to send them 
    to, navigation; doesn't have stuff that ties into history
  
*/