import { csv, DSVParsedArray } from "d3";
import { useEffect, useState } from "react";
const useData = (URL: string) => {
  const [data, setData] = useState<DSVParsedArray<any>>();

  useEffect(() => {
    let row = (d: any) => {
      d.Year = +d.Year;

      let parsedTime = d.Time.split(":");
      d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);

      return d;
    };

    csv(URL, row).then(setData); // Fetching data & updating data
  }, [URL]);

  return data;
};

export default useData;

