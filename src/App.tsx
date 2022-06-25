import { extent, scaleLinear, scaleTime, timeFormat } from "d3";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import useData from "./hooks/useData";

const CSVURL =
  "https://gist.githubusercontent.com/mzs21/f4ae3ab614177c1b19ac4edc85fbb34a/raw/1fa2b532a1e6e631c2a6ba38cd20789b05cdab50/CyclistData.csv";

const width = 960;
const height = 600;
const margin = { top: 20, left: 90, right: 30, bottom: 80 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 60;

function App() {
  let data = useData(CSVURL);

  if (!data) {
    return <pre>loading...</pre>;
  }

  // console.log(data);

  let innerHeight = height - margin.top - margin.bottom;
  let innerWidth = width - margin.left - margin.right;

  let xValue = (d: any) => d.Year;
  let xAxisLabel = "Year";

  let yValue = (d: any) => d.Time;
  let yAxisLabel = "Time in Minutes";

  let xValues = extent(data, xValue);
  let yValues = extent(data, yValue);

  let dopings = data.map((d: any) => d.Doping);

  let xScale = scaleLinear()
    .domain([...xValues])
    .range([0, innerWidth])
    .nice();

  let yScale = scaleTime()
    .domain([...yValues])
    .range([innerHeight, 0]);

  let yAxisTickFormat = timeFormat("%M:%S");

  let tooltipValue = data.map(
    (d: any) =>
      `${d.Name}:${d.Nationality}\nYear: ${d.Year}, Time: ${yAxisTickFormat(
        d.Time
      )}\n\n${d.Doping}`
  );

  console.log(tooltipValue);
  return (
    <>
      <div className="grid place-content-center text-center">
        <div>
          <p className="text-4xl">Doping in Professional Bicycle Racing</p>
          <p className="text-3xl"> 35 Fastest times up Alpe d'Huez</p>
        </div>

        <div className="legend ">
          <p>No doping allegations </p>
          <div className="legend-box bg-green-600"></div>
          <p>Riders with doping allegations</p>
          <div className="legend-box bg-red-600"></div>
        </div>
      </div>


      <svg width={width} height={height}>
        <g transform={`translate (${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffSet={5}
          />
          <line
            x2={innerWidth}
            className="stroke-gray-500"
            transform={`translate (${0}, ${innerHeight})`}
          />

          <text
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
            className="font-sans stroke-black text-4xl"
          >
            {xAxisLabel}
          </text>

          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickOffSet={10}
            tickFormat={yAxisTickFormat}
          />
          <text
            transform={`translate(${-yAxisLabelOffset},
          ${innerHeight / 2}) rotate(-90)`}
            textAnchor="middle"
            className="font-sans stroke-black  text-4xl"
          >
            {yAxisLabel}
          </text>

          <Marks
            yScale={yScale}
            xScale={xScale}
            data={data}
            xValue={xValue}
            yValue={yValue}
            circleRadius={7}
            doping={dopings}
            toolTipValue = {tooltipValue}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
