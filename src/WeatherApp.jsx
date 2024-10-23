import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";



export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 29.64,
        humidity: 61,
        temp: 28.05,
        tempMax: 28.05,
        tempMin: 28.05,
        weather: "haze"
    })

    let updateInfo = (result) => {
        if (result.error) {
            toast.error(result.error);
        } else {
        setWeatherInfo(result)
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>Weather App</h2>
            <br />
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
            <ToastContainer />
        </div>
    )
}