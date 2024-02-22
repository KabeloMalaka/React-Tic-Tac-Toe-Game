import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)

    function toggleEdit() {
        setIsEditing(editing => !editing);
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value)

        if (isEditing) onChangeName(symbol, playerName);
    }

    return (
        <li className={isActive ? 'active' : null}>
            <span className="player">
                <span className="player-name">{isEditing
                    ? <input type="text" required defaultValue={playerName} onChange={handleNameChange}/>
                    : playerName}
                </span>
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}