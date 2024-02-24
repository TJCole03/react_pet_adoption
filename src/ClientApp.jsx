import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
        <App />
    </BrowserRouter >
)

/*
You cannot do DOM stuff in Node. C
annot do something like: window.alert
because there are no windows, alerts, documents, etc. 
have to make sure that anything that interacts with the DOM is 
NOT loaded in Node, or else it breaks
*/

/*

Same as createRoot(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer.
Hydrate root is the same as createRoot() but it's used to hydrate/fulfill/water/whatever 
a container whose HTML contents have been rendered by ReactDOMServer

*/