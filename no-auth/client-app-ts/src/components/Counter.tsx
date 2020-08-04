import React, { useCallback, useState } from 'react';

interface State {
    currentCount: number;
}

const defaultState: State = {
    currentCount: 0,
}

const Counter = () => {
    const [state, setState] = useState(defaultState);
    const increment = useCallback(() => {
        setState({currentCount: state.currentCount++});
    }, [state]);

    return (
        <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p aria-live="polite">Current count: <strong>{state.currentCount}</strong></p>

            <button className="btn btn-primary" onClick={increment}>Increment</button>
        </div>
    );
}

Counter.displayName = Counter.name;

export default Counter;