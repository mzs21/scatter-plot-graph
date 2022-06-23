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
const yAxisLabelOffset = 50;

function App() {
  let data = useData(CSVURL);

  if (!data) {
    return <pre>loading...</pre>;
  }

  console.log(data);

  let innerHeight = height - margin.top - margin.bottom;
  let innerWidth = width - margin.left - margin.right;

  let xValue = (d: any) => d.Year;
  let xAxisLabel = "Year";

  let yValue = (d: any) => d.Time;
  let yAxisLabel = "Time in Minutes";

  let xValues = extent(data, xValue);
  let yValues = extent(data, yValue);

  let xScale = scaleLinear()
    .domain([...xValues])
    .range([0, innerWidth])
    .nice();

  let yScale = scaleTime()
    .domain([...yValues])
    .range([innerHeight, 0]);

  let yAxisTickFormat = timeFormat("%M:%S");

  return (
    <svg width={width} height={height}>
      <g transform={`translate (${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickOffSet={5} />
        <text
          transform={`translate(${-yAxisLabelOffset},
          ${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
          className="font-sans stroke-blue-500 text-4xl"
        >
          {yAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffSet={5}
          tickFormat={yAxisTickFormat}
        />
        <text
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
          className="font-sans stroke-blue-500 text-4xl"
        >
          {xAxisLabel}
        </text>
        <Marks
          yScale={yScale}
          xScale={xScale}
          data={data}
          xValue={xValue}
          yValue={yValue}
          // toolTipFormat={xAxisTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
  );
}

export default App;
