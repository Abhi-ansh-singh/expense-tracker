/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { AddBalance } from "../Modals";

export default function BalanceCard({ amount,setAddBalance }) {

  const [openAddBalance, setOpenAddBalance] = useState(false);

  const handleOpenAddBalance = () => {
    setOpenAddBalance(true);
  };

  return (
    <div className="px-8 py-12 rounded-lg w-96  bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg mx-5 my-10">
      <p className="text-center text-2xl text-white">
        Wallet Balance: <span className="text-green-300">&#8377; {amount}</span>
      </p>
      <Button className="bg-[#a9ff58]" onClick={handleOpenAddBalance}>
        +Add income
      </Button>
      <AddBalance
        open={openAddBalance}
        handleOpen={handleOpenAddBalance}
        handleClose={()=>setOpenAddBalance(false)}
        setAddBalance ={setAddBalance}
      />
    </div>
  );
}
