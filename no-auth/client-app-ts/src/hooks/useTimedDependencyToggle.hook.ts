import {MutableRefObject, useRef} from "react";
import { useInterval } from "./useInterval.hook";
import { Disposable } from "../Utility/utility-types";

export const useTimedDependencyToggle = (seconds: number, fireImmediately = true): [boolean, Disposable] => {
    const depRef = useRef(fireImmediately);

    const disposerRef = useRef(useInterval(() => {
        depRef.current = !depRef.current;
    }, seconds*1000));

    return [depRef.current, disposerRef.current];
}