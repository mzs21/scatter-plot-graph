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
  circleRadius: number;
  doping: string[];
  toolTipValue: string[];
}
const Marks = ({
  yScale,
  xScale,
  data,
  xValue,
  yValue,
  circleRadius,
  doping,
  toolTipValue,
}: IMarksProps) => {
  let dopingArray = doping;

  let tooltip = toolTipValue;

  return (
    <>
      {data.map((d: DSVRowString<string>) => (
        <g>
          {/* className="component" This was on the upper 'g' */}
          <circle
            key={Math.random()}
            className={
              dopingArray.find(() => dopingArray[data.indexOf(d)] !== "")
                ? "fill-red-800 opacity-50 "
                : "fill-green-800 opacity-50 "
            }
            cx={xScale(xValue(d))}
            cy={yScale(+yValue(d))}
            r={circleRadius}
          >
            {/* <div className="tooltip">
              {tooltip[data.indexOf(d)]}
            </div> */}
            {/* Can I use this div as a tooltip? */}

            <title>{tooltip[data.indexOf(d)]}</title>
            {/* Using title as tooltip */}
          </circle>
          {/* <g className="tooltip" transform="translate(20,20)">
            <rect x={xScale(xValue(d)) - 5} y={yScale(+yValue(d)) - 20} className="rect">
            
            </rect>
            <text
              x={xScale(xValue(d))}
              y={yScale(+yValue(d))}
              className="text"
            >
              {tooltip[data.indexOf(d)]}
            </text>
          </g> */}{" "}
          {/* Failed attemped */}
        </g>
      ))}
    </>
  );
};

export default Marks;

