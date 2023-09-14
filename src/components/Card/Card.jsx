import "./Card.css"
import Front from "../Front/Front";
import Back from "../Back/Back";
function Card () {
    return (
        <div className="card">
            I'm a card!
            <Front />
            <Back />
        </div>
    )
}

export default Card;