import {
  DSVParsedArray,
  DSVRowString,
  NumberValue,
  ScaleLinear,
  ScaleTime
} from "d3";

interface IMarksProps {
  yScale: ScaleTime<number, number, never>;
  xScale: ScaleLinear<number, number, never>;
  data: DSVParsedArray<any>;
  xValue: (d: DSVRowString<string>) => NumberValue;
  yValue: (d: DSVRowString<string>) => string;
  toolTipFormat: any;
  circleRadius: number;
  doping: string[];
  toolTipValue: any;
}
const Marks = ({
  yScale,
  xScale,
  data,
  xValue,
  yValue,
  toolTipFormat,
  circleRadius,
  doping,
  toolTipValue
}: IMarksProps) => {
  
  let dopingArray = doping;

  let tooltip = toolTipValue;

  return (
    <>
      {data.map((d: DSVRowString<string>) => (
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
          {/* <div className="tooltip opacity-0">{tooltip}</div> 
          
          Can I use this div as a tooltip?
          */} 

          <title>{tooltip[data.indexOf(d)]}</title> 
          {/* Using title as tooltip */}
        </circle>
      ))}
    </>
  );
};

export default Marks;
