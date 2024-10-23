import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css'
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("")

    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY= "1fed464e07cb60e960e29d4a26cc3ef6"

    let getWeatherInfo = async () => {
      try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            throw new Error("City not found");
        }
        let jsonResponse = await response.json()
        console.log(jsonResponse)
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,

        };

        console.log(result);
        return result;
      } catch (err) {
        toast.error(err.message || "Error fetching weather data");
        throw err
      }
    }
    


    let handeChange = (event) => {
        setCity(event.target.value)
    }
    let handleSubmit = async (event) => {
        event.preventDefault();
        if (!city) return;
        console.log(city)
        setCity("")
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo)
        } catch (error) {
            
        }
    }
    
    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
            <TextField 
             id="city" 
             label="City Name" 
             variant="outlined" 
             size="small"
             required 
             value={city}
             onChange={handeChange}
             />
             
            <Button variant="contained" type='submit' style={{ marginLeft: '2rem' }}>Search</Button>
            </form>
        </div>
    )
}