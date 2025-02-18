import { useState } from "react";
import Modal from "react-modal";
import { getToken } from "../auth";
Modal.setAppElement("#root");

const EditRoutine = ({ routines, setRoutines, routineId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  function editNewRoutine(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        `https://nameless-cove-00092.herokuapp.com/api/routines/${routineId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            name: name,
            goal: goal,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const updatedRoutine = routines.map(routine => {
              if(routine.id === routineId) {
                return result;
              } else {
                return routine
              }
            })
            setRoutines(updatedRoutine);
  
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        EDIT ROUTINE
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 200,
            left: 300,
            right: 300,
            bottom: 200,
            backgroundColor: "white",
            border: "solid gold",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
        <form onSubmit={editNewRoutine}>
          <h3> Edit Routine! </h3>
          <label id="wrapper">
            Name:
          </label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label >Goal:</label>
          <input
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />

          <button type="submit">
            Edit Routine
          </button>
          <button
           
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditRoutine;
