import React, { useCallback, useEffect, useRef, useState } from 'react';
import {useTimedDependencyToggle} from "../hooks/useTimedDependencyToggle.hook";
import {WeatherForecast} from "../models/weatherForecast.model";
import Global  from "../global/apiConstants";

interface State {
    loading: boolean;
    forecasts: WeatherForecast[];
}

const defaultState: State = {
    loading: true,
    forecasts: [],
}

const fetchCall = async (setter: React.Dispatch<React.SetStateAction<State>>)/*useCallback(async ()*/ => {
    const response = await fetch(Global.urls.allForecasts(), {});
    let forecasts = await response.json() as WeatherForecast[];
    setter(prev => {
        return {...prev, forecasts, loading: false};
        })
    }

const FetchData: React.FC = () => {
    const [state, setState] = useState(defaultState);    
    const [dep, cancel] = useTimedDependencyToggle(5);
  
    const fetch = useCallback(async () => fetchCall(setState), []);
  
    useEffect(() => {
        fetch().then().catch();
      
        return cancel;
    }, [dep]);
    
    const contents = state.loading
        ? <p><em>Loading...</em></p>
        : ForecastTable(state.forecasts);

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
}

export default FetchData;

const ForeCastTableItem = ({ date, temperatureC, temperatureF, summary }: WeatherForecast) => {
    return (
        <tr key={date}>
            <td>{date}</td>
            <td>{temperatureC}</td>
            <td>{temperatureF}</td>
            <td>{summary}</td>
        </tr>
    );
}

const ForecastTable = (forecasts: WeatherForecast[], tableStyle: string = "table table-striped", labelName: string = "tableLabel") =>  (
    <table className={tableStyle} aria-labelledby={labelName}>
        <thead>
        <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
        </tr>
        </thead>
        <tbody>
        {forecasts.map(forecast => <ForeCastTableItem {...forecast}  />)}
        </tbody>
    </table>
);