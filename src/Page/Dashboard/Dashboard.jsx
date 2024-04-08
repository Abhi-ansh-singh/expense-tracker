import { useState } from "react";
import { BalanceCard, ExpenseCard } from "../../Components";
import { TransactionTable } from "../../Components";

export default function Dashboard() {
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

  return (
    <>
      <h1 className="flex flex-col items-start font-bold text-[2rem] text-white m-2">
        Expense Tracker
      </h1>
      <section className="bg-[#626262] rounded-lg flex gap-10 px-5 py-10">
        <BalanceCard amount={balance} setAddBalance={setBalance} />
        <ExpenseCard
          amount={expense}
          setExpenseData={setExpenseData}
          setAddExpense={setExpense}
          setBalance={setBalance}
        />
      </section>
      <section className="mt-7 w-2/3">
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
    </>
  );
}
