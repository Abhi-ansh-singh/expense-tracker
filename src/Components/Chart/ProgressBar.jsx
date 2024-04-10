import { Typography } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
export default function TopExpenseProgressBar({ chartData, expense }) {
  return (
    <div className="bg-white rounded-lg ml-5 p-5">
      {chartData[1]?.map((item, index) => (
        <div className="mb-2 flex items-center justify-center p-3" key={index}>
          <Typography variant="h5" className="mr-10">
            {item}
          </Typography>
          <div className="h-3 w-full  rounded-full">
            <div
              className="h-full bg-[#8784d2] rounded-r-full"
              style={{ width: `${(chartData[0][index] / expense) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
