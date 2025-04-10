import Image from "next/image";
import { MODULE_TYPE_TEXT } from "@constants/constant";

interface MeasurementResult {
  type: string;
  operationTimes: number;
}

interface SpeedReportProps {
  data: {
    measurementResults: MeasurementResult[];
  };
}

export default function SpeedReport({ data }: SpeedReportProps): JSX.Element {
  const { measurementResults } = data;
  const wasmOperationTimes =
    measurementResults.find(
      (item) => item.type === MODULE_TYPE_TEXT.WEB_ASSEMBLY,
    )?.operationTimes ?? 1;

  const jsOperationTimes =
    measurementResults.find((item) => item.type === MODULE_TYPE_TEXT.JAVASCRIPT)
      ?.operationTimes ?? 1;

  const speedDifference = (wasmOperationTimes / jsOperationTimes).toFixed(2);

  return (
    <div className="relative flex flex-col justify-center w-full h-full p-4 rounded-lg">
      <div className="absolute top-4 left-0 w-full h-1/2 overflow-hidden">
        <Image
          src="/half-circle.svg"
          alt="Half Circle"
          fill={true}
          style={{ objectFit: "contain" }}
          className="absolute top-0 left-0 w-full h-1/2"
        />
      </div>
      <div className="relative flex flex-col top-0 items-center justify-end text-white mt-10">
        <div className="vw-5 md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-bold">
          WASM
        </div>
        <div className="vw-10 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold p-2">
          {speedDifference}
          <span className="vw-8 md:text-2xl lg:text-3xl xl:text-6xl 2xl:text-7xl">
            &times;
          </span>
        </div>
        <div className="vw-3 md:text-lg xl:text-xl font-bold">FASTER</div>
      </div>
    </div>
  );
}
