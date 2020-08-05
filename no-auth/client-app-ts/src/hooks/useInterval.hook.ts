import React, {useCallback, useEffect, useRef} from 'react';
import {Disposable} from "../utility/utility-types";

/**
 * Use setInterval with Hooks in a declarative way.
 *
 * @see https://stackoverflow.com/a/59274004/3723993
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(
    callback: React.EffectCallback,
    delay: number,
): Disposable {
    const intervalRef = useRef<number>();
    const callbackRef = useRef(callback);

    // Remember the latest callback:
    //
    // Without this, if you change the callback, when setInterval ticks again, it
    // will still call your old callback.
    //
    // If you add `callback` to useEffect's deps, it will work fine but the
    // interval will be reset.

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Set up the interval:

    useEffect(() => {
        intervalRef.current = window.setInterval(() => callbackRef.current(), delay);
        return () => window.clearInterval(intervalRef.current);
    }, [delay]);

    // In case you want to manually clear the interval from the consuming component...:
    
    
    return useCallback(() => window.clearInterval(intervalRef.current), [callback, delay]);
}