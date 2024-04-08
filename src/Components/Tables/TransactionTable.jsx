import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import moment from "moment";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { EditExpense } from "../Modals";

export default function TransactionTable({
  data,
  setExpenseData,
  setExpense,
  setBalance,
}) {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  let itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  // edit module opening && closing
  const handleOpenEditExpense = (data, index) => {
    setEditingExpense({ ...data, index });
    setOpenEditExpense(true);
  };

  const handleCloseEditExpense = () => {
    setOpenEditExpense(false);
    setEditingExpense(null);
  };



  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++)
      pageNumbers.push(currPage);
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers(totalPages);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleDeleteExpense = (data, index) => {
    setExpenseData(prev => prev.filter((_, i) => i !== index));
    setBalance(prev => prev + parseInt(data?.expenseAmount));
    setExpense(prev => prev - parseInt(data?.expenseAmount));
  };
  

  
  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  return (
    <Card className="h-full w-full">
      <CardBody className="px-1">
        <table className="mt-2 w-full min-w-max table-auto text-left">
          <tbody>
            {rows?.length > 0 ? (
              rows?.slice(startIndex, endIndex).map((item, index) => {
                const isLast = index === rows.length - 1;
                const classes = isLast
                  ? "p-1"
                  : "p-1 border-b border-blue-gray-50";

                return (
                  <tr key={item.expenseTitle}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src="" alt="" size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.expenseTitle}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {moment(item?.expenseDate).format("MMMM DD, YYYY")}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="items-center justify-end mr-2">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-extrabold text-[#f4bb4a]"
                      >
                        &#8377; {item.expenseAmount}
                      </Typography>
                    </td>
                    <td className="flex flex-row items-center justify-end mr-2">
                      <Button
                        size="sm"
                        className="rounded-xl bg-[#ff3e3e] border-collapse text-white font-medium m-2"
                        onClick={() => handleDeleteExpense(item, index)}
                      >
                        <RxCrossCircled size={20} />
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-xl bg-[#f4bb4a] border-collapse text-white"
                        onClick={() => handleOpenEditExpense(item, index)}
                      >
                        <MdOutlineModeEdit size={20} />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-bold flex items-center justify-center"
              >
                No Transaction Made
              </Typography>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex gap-2">
          <Button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            size="sm"
            className="rounded-xl bg-[#f1f1f1] border-collapse text-black"
          >
            <FaArrowLeft />
          </Button>
          {pageNumbers.map((pageNumber) => (
            <Button
              size="sm"
              className="rounded-xl bg-[#43967b] border-collapse"
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className="rounded-xl  bg-[#f1f1f1] border-collapse text-black"
          >
            <FaArrowRight />
          </Button>
        </div>
      </CardFooter>
      <EditExpense
        open={openEditExpense}
        handleClose={handleCloseEditExpense}
        setExpenseData={setExpenseData}
        setBalance={setBalance}
        setExpense={setExpense}
      />
    </Card>
  );
}
