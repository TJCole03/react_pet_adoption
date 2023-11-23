const Pet = (props) => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("h2", {}, props.animal),
        React.createElement("h2", {}, props.breed)
    ])
}

const App = () => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, "Adopt Me!"),
            React.createElement(Pet, {
                name: 'Big Hawk',
                animal: "Chicken",
                breed: "Angry Rooster"
            }),
            React.createElement(Pet, {
                name: "Steel",
                animal: "Pig",
                breed: "War"
            }),
            React.createElement(Pet, {
                name: "Charmeleon", 
                animal: "Flaming Lizard",
                breed: "Fiah!!!"
            }),
        ]
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App))
