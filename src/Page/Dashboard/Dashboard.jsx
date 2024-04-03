import { useState } from "react";
import { BalanceCard, ExpenseCard } from "../../Components";

export default function Dashboard() {
  const [balance, setBalance] = useState(5000);
  const [expenseCard, setExpenseCard] = useState(0)
  return (
    <>
      <section className="bg-[#626262] rounded-lg flex gap-10 px-5 py-10">
        <BalanceCard amount={balance} />
        <ExpenseCard amount={balance} />
      </section>
    </>
  );
}
