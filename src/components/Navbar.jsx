import react from 'react';
function Navbar () {
    return (
        <div>
            <nav>
                <img src={logo} alt="book icon"/>
                <input type="text" placeholder="Search books..."/>
                <input type="file" accept="image/*"/>
                <img src="search.png" alt="search icon"/>
                <h3> Name </h3>
            </nav>

        </div>
    );
}
export default Navbar;