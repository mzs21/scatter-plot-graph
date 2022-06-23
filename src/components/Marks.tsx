import {
  DSVParsedArray,
  DSVRowString,
  NumberValue,
  ScaleLinear,
  ScaleTime,
} from "d3";

interface IMarksProps {
  yScale: ScaleTime<number, number, never>;
  xScale: ScaleLinear<number, number, never>;
  data: DSVParsedArray<any>;
  xValue: (d: DSVRowString<string>) => NumberValue;
  yValue: (d: DSVRowString<string>) => string;
  // toolTipFormat: (tickValue: number | { valueOf(): number }) => string;
  circleRadius: number;
}
const Marks = ({
  yScale,
  xScale,
  data,
  xValue,
  yValue,
  // toolTipFormat,
  circleRadius,
}: IMarksProps) => {
  return (
    <>
      {data.map((d: DSVRowString<string>) => (
        <circle
          key={Math.random()}
          className="fill-sky-800"
          cx={xScale(xValue(d))}
          cy={yScale(+yValue(d))}
          r={circleRadius}
        >
          {/* <title>{toolTipFormat(xValue(d))}</title> */}
        </circle>
      ))}
    </>
  );
};

export default Marks;
