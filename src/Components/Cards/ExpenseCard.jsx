import { Button } from "@material-tailwind/react";
import {AddExpense} from "../Modals";
import { useState } from "react";

const ExpenseCard = ({ amount, setAddExpense,setBalance, setExpenseData }) => {
  const [openAddExpense, setOpenAddExpense] = useState(false);

  const handleOpenAddExpense = () => {
    setOpenAddExpense(true);
  };
  return (
    <div className="px-8 py-12 rounded-lg w-96 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
      <p className="text-center text-2xl text-white">
        Expenses: <span className="text-orange-300">&#8377; {amount}</span>
      </p>
      <Button className="bg-red-500" onClick={handleOpenAddExpense}>
        +Add Expense
      </Button>
      <AddExpense
        open={openAddExpense}
        handleOpen={handleOpenAddExpense}
        handleClose={() => setOpenAddExpense(false)}
        setExpenseData={setExpenseData}
        setAddExpense={setAddExpense}
        setBalance={setBalance}
      />
    </div>
  );
};

export default ExpenseCard;
