/* global document */
import Register from "./components/register";
import Login from "./components/login";
import * as React from "react";
import { render } from "react-dom";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Star } from "@mui/icons-material";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ2luMTIzIiwiYSI6ImNsaXZsYmY2MDA4ODUzZW5rbmxuaWZ1N3MifQ.2R-Scqlf5dyEW4HpnJcduw";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = React.useState(myStorage.getItem("user"));
  const [showPopup, setShowPopup] = React.useState(true);
  const [pins, setPins] = React.useState([]);
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [viewPort, setViewPort] = React.useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 8,
  });
  const [title, setTitle] = React.useState("");
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:5000/pins");
        setPins(res.data.data.pins);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewPort({ ...viewPort, latitude: lat, longitude: long });
    console.log(viewPort, lat, long);
  };
  const handleAddClick = (e) => {
    // const [long, lat] =
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;
    setNewPlace({
      lat,
      long,
    });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc: review,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("http://localhost:5000/pins", newPin);
      setPins([...pins, res.data.data.pins]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogOut = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <div className="App">
      <Map
        // viewState={viewPort}
        initialViewState={viewPort}
        onDblClick={handleAddClick}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {pins.map((p) => (
          <Marker
            style={{ cursor: "pointer" }}
            longitude={p.long}
            latitude={p.lat}
            color={p.username === currentUser ? "blue" : "red"}
            onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            // offset={}
          >
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                onClose={() => setShowPopup(false)}
                closeButton={true}
                closeOnClick={false}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <h4 className="desc">{p.desc}</h4>
                  <label>Rating</label>
                  <div>{Array(p.rating).fill(<Star className="star" />)}</div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            onClose={() => setShowPopup(false)}
            closeButton={true}
            closeOnClick={false}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place"
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogOut}>Log Out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
