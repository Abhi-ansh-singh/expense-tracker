import { useState } from "react";
import {
  BalanceCard,
  ExpenseCard,
  ExpenseChart,
  ProgressBar,
  TransactionTable,
} from "../../Components";

export default function Dashboard() {
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [chartData, setChartData] = useState(null);

  return (
    <>
      <h1 className="flex flex-col items-start font-bold text-[2rem] text-white m-2">
        Expense Tracker
      </h1>
      <section className="bg-[#626262] rounded-lg flex gap-10 pl-20 items-center ">
        <BalanceCard amount={balance} setAddBalance={setBalance} />
        <ExpenseCard
          amount={expense}
          setExpenseData={setExpenseData}
          setAddExpense={setExpense}
          setBalance={setBalance}
        />
        <ExpenseChart data={expenseData} setChartData={setChartData}/>
      </section>
      <div className="flex flex-row">
        <section className="mt-2 w-3/5 ">
          <h1 className="flex flex-col items-start font-bold text-[2rem] text-white m-2 italic">
            Recent Transactions
          </h1>
          <TransactionTable
            data={expenseData}
            setExpenseData={setExpenseData}
            setExpense={setExpense}
            setBalance={setBalance}
          />
        </section>
        <section className="mt-2 w-2/5">
          <h1 className="flex flex-row items-start font-bold text-[2rem] text-white m-2 italic">
            Top Expenses
         </h1>
           {chartData && (
            <ProgressBar chartData={chartData}   expense={expense}/> 
          )}
        </section>
      </div>
    </>
  );
}
