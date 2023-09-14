import "./Card.css";
import Front from "../Front/Front";
import Back from "../Back/Back";
function Card({ front, back, toggleCard, toggled }) {
  return (
    <div className="card" onClick={toggleCard}>
      {!toggled ? <Front front={front} /> : <Back back={back} />}
    </div>
  );
}

export default Card;
