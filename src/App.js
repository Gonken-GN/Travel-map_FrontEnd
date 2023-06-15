/* global document */
import * as React from "react";
import { render } from "react-dom";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Star } from "@mui/icons-material";
import './App.css'
import axios from 'axios';
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ2luMTIzIiwiYSI6ImNsaXZsYmY2MDA4ODUzZW5rbmxuaWZ1N3MifQ.2R-Scqlf5dyEW4HpnJcduw";

function App() {
  const [showPopup, setShowPopup] = React.useState(true);
  const [pins, setPins] = React.useState([]);
  React.useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get('/pins');
        setPins(res.data.data.pins);
      }catch(err){
        console.log(err);
      }
    }
    getPins();
  }, []);
  console.log(pins);
  return (
    <div className="App">
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 8,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
        {showPopup && (
          <Popup
            longitude={-122.4}
            latitude={37.8}
            anchor="left"
            onClose={() => setShowPopup(false)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="card">
              <label>Place</label>
              <h4 className="place">Eiffel Tower</h4>
              <label>Review</label>
              <h4 className="desc">it's beatiful place. I Like it</h4>
              <label>Rating</label>
              <div>
                <Star className="star"/>
                <Star className="star"/>
                <Star className="star"/>
                <Star className="star"/>
                <Star className="star"/>
              </div>
              <label>Information</label>
              <span className="username">Created by <b>Fadhil</b></span>
              <span className="date">1 hour ago</span>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
