import React, { useState } from "react";



export const CreateTeamForm = () => {
    const [teamName, setTeamName] = useState("")

    const handleChange = (event) => {
        setTeamName(event.target.value)
    }

    return(
        <form>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Введите название команды" 
                    value={teamName}
                    onChange={handleChange}/>
            </div>
        </form>
    )
}