import { useState } from "react";
import "./App.css";

function InputGuest({ guests, setGuests }) {
  return (
    <input
      type="text"
      placeholder="Guest name..."
      onKeyUp={(event) => {
        if (event.key !== "Enter") {
          return;
        }
        if (!event.target.value.trim()) {
          alert("Guest name cannot be empty!");
          return;
        }
        const newState = [
          ...guests,
          { name: event.target.value.trim().toUpperCase(), confirmed: false },
        ];
        setGuests(newState);
        event.target.value = "";
      }}
    ></input>
  );
}

function GuestsList({ guests, setGuests }) {
  return (
    <>
      {guests.length > 0 ? (
        <ul>
          {guests.map((guest, index) => {
            return (
              <li key={guest.name}>
                <p>{guest.name}</p>
                <button
                  style={{ margin: "0 1em 0 0" }}
                  onClick={() => {
                    const newState = [...guests];
                    newState[index].confirmed = !newState[index].confirmed;
                    setGuests(newState);
                  }}
                >
                  {guest.confirmed ? "Confirmed" : "Not confirmed"}
                </button>
                <button
                  onClick={() => {
                    const updatedGuests = guests.filter((_, i) => i !== index);
                    setGuests(updatedGuests);
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="alert_line">No guests yet.</p>
      )}
    </>
  );
}

export default function App() {
  const [guests, setGuests] = useState([]);

  return (
    <div className="main_container">
      <h1>Guest List Manager</h1>
      <InputGuest guests={guests} setGuests={setGuests} />
      <GuestsList guests={guests} setGuests={setGuests} />
    </div>
  );
}
