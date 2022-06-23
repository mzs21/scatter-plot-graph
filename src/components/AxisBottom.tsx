import { ScaleLinear } from "d3";

interface IAxisBottomProps {
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
  tickOffSet: number;
}

const AxisBottom = ({
  xScale,
  innerHeight,
  tickOffSet = 3,
}: IAxisBottomProps) => {
  return (
    <>
      {xScale.ticks().map((tickValue: number) => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
          <line y2={innerHeight} className="stroke-gray-500" />
          <text
            y={innerHeight + tickOffSet}
            style={{ textAnchor: "middle" }}
            dy="1em"
            className="stroke-blue-500 font-sans"
          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
