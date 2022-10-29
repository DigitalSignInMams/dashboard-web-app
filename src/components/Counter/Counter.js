import React, { useState } from "react";

function Counter() {
    // State Hook
    //    value     setter func    state hook w/ initial val
    let [numClicks, setNumClicks] = useState(0);

    function clickHandler() {
        // whatever the # of times we've click is, +1 to that
        setNumClicks(numClicks + 1);
    }

    return (
        <div>
            <p>You have clicked the button {numClicks} times</p>
            <button onClick={clickHandler}>Click Me</button>
        </div>
    );
}

export default Counter;