import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { AddBalance } from '../Modals'

export default function BalanceCard({amount}) {
    const [openAddBAlance, setOpenAddBAlance] = useState(false)
const handleOpenAddBalance = () => {
    setOpenAddBAlance(true);
}

const handleCloseAddBalance = () => {
    setOpenAddBAlance(false);
}

  return (
     <div className="px-8 py-12 rounded-lg w-96 bg-[#9b9b9b] flex flex-col items-center gap-3 shadow-lg">
     <p className="text-center text-2xl text-white">
     Wallet Balance: <span className="text-green-300">Rs.{amount}</span>
     </p>
     <Button className="bg-[#a9ff58]" onClick={handleOpenAddBalance}>+Add income</Button>
     <AddBalance open ={openAddBAlance} handleOpen={handleOpenAddBalance} handleClose={handleCloseAddBalance}/>
   </div>
  )
}
