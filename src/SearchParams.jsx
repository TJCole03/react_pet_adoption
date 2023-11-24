const SearchParams = () => {
    const location = "Harrisburg, PA"; 
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location 
                    <input type="text" id="location"  placeholder="Where you looking?" />
                </label> 
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;