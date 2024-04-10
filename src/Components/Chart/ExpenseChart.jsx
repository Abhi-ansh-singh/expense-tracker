import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ data,setChartData }) => {
const [expenseChartData,setExpenseChartData] =useState(null)

  useEffect(() => {
    if (data) {
      const categories = data?.map((expense) => expense.expenseCategory);
      const uniqueCategories = [...new Set(categories)];

      const totalExpenses = {};
      uniqueCategories.forEach((category) => {
        const categoryExpenses = data?.filter(
          (expense) => expense.expenseCategory === category
        );
        const total = categoryExpenses.reduce(
          (acc, expense) => acc + parseInt(expense.expenseAmount),
          0
        );
        totalExpenses[category] = total;
      });

      setExpenseChartData({
        labels: Object.keys(totalExpenses),
        datasets: [
          {
            data: Object.values(totalExpenses),
            backgroundColor: [
              "rgb(160, 0, 255)",
              "rgb(253, 224, 6)",
              "rgb(255, 147, 4)",
            ],
            borderWidth: 0,
          },
        ],
      });

    }
  }, [data]);

useEffect(() => {
  setChartData([expenseChartData?.datasets[0]?.data, expenseChartData?.labels]);
},[expenseChartData])

  return (
    <>
      {expenseChartData && (
        <div className="pl-8 rounded-lg w-96 bg-[#626262] flex flex-col items-center m-2">
          <Pie
            width={250}
            height={150}
            data={expenseChartData}
            options={{
              responsive: true,
              plugins: {
                colors: {
                  forceOverride: true,
                  color: [255, 255, 255],
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const value = context.raw || 0;
                      const percentage = (
                        (value /
                          context.dataset.data.reduce((a, b) => a + b, 0)) *
                        100
                      ).toFixed();
                      return `${percentage}%`;
                    },
                  },
                },
                legend: {
                  labels: {
                    font: { size: 10 },
                    color: [],
                  },
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default ExpenseChart;
