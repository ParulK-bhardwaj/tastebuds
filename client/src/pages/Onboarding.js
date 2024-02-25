import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';


const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        last_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        gender_identity: '',
        show_gender: false,
        dietery: '',
        specialized_cuisine: '',
        preferred_cuisine: '',
        about: '',
        favorite_dish: '',
        url: '',
        matches: [],
    });

    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        console.log( 'submitted')
        // prevent from reloading the form
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:4000/user', { formData })
            console.log(response)
            const success = response.status === 200
            if(success) navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const cuisines = [
        "American",
        "Angolan cuisine",
        "Australian cuisine",
        "Chinese",
        "French cuisine",
        "Greek",
        "Indian",
        "Italian",
        "Japanese",
        "Korean",
        "Lebanese cuisine",
        "Mediterranean",
        "Mexican",
        "Spanish cuisine",
        "Thai",
        "Turkish",
        "Vietnamese", 
        "Desserts",
        "None",
        
    ];

    const dieteryOptions = ["Vegan", "Vegetarian", "Non-Vegetarian", "Gluten-free", "All"];

    return (
        <>
        <Nav
            minimal={true}
            setShowModal={() => {}}
            showModal={false}
            // setIsSignUp={false}
        />
        <div className='onboarding'>
            <h2>Create Account</h2>
             <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type='text'
                            name="last_name"
                            placeholder="Last Name"
                            required={true}
                            value={formData.last_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === "man"}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === "woman"}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === "more"}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender on my Profile</label>

                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />

                        <label>Show</label>
                        
                        <div>
                            <label htmlFor="dietery">Dietary Preference:</label>
                            <select
                                id="dietery"
                                name="dietery"
                                value={formData.dietery}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {dieteryOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="specialized_cuisine">Cuisine I Specialize In:</label>
                            <select
                                id="specialized_cuisine"
                                name="specialized_cuisine"
                                value={formData.specialized_cuisine}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {cuisines.map((cuisine, index) => (
                                    <option key={index} value={cuisine}>{cuisine}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="preferred_cuisine">Cuisines I want to Learn:</label>
                            <select
                                id="preferred_cuisine"
                                name="preferred_cuisine"
                                value={formData.preferred_cuisine}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {cuisines.map((cuisine, index) => (
                                    <option key={index} value={cuisine}>{cuisine}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="about">About me</label>
                            <input
                                id="about"
                                type="text"
                                name="about"
                                required={true}
                                placeholder="I like food in general..."
                                value={formData.about}
                                onChange={handleChange}
                            />
                        </div>
                    
                        <div>
                            <label htmlFor="favorite_dish">Favorite Dish</label>
                            <input
                                id="favorite_dish"
                                type="text"
                                name="favorite_dish"
                                required={true}
                                placeholder="I like food in general..."
                                value={formData.favorite_dish}
                                onChange={handleChange}
                            />
                        </div>

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Me and My food</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
        </div>
        </>
        
    )
}

export default Onboarding;
