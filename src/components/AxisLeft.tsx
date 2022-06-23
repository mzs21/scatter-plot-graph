import { ScaleTime } from "d3";

interface IAxisLeftProps {
  yScale: ScaleTime<number, number, never>;
  innerWidth: number;
  tickOffSet: number;
  tickFormat: any;
}

const AxisLeft = ({
  yScale,
  innerWidth,
  tickOffSet = 3,
  tickFormat,
}: IAxisLeftProps) => {
  return (
    <>
      {yScale.ticks().map((tickValue) => (
        <g transform={`translate(0, ${yScale(tickValue)})`} key={Math.random()}>
          <line x2={innerWidth} className="stroke-gray-500" />
          <text
            style={{ textAnchor: "end" }}
            x={-tickOffSet}
            dy=".32em"
            className="stroke-blue-500 font-sans"
          >
            {tickFormat(tickValue)}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft;
