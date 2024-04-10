/* eslint-disable react/prop-types */
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
import { MdCardTravel } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";

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

  // deleting expenses from table

  const handleDeleteExpense = (data, index) => {
    setExpenseData((prev) => prev.filter((_, i) => i !== index));
    setBalance((prev) => prev + parseInt(data?.expenseAmount));
    setExpense((prev) => prev - parseInt(data?.expenseAmount));
  };

  // pagination
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

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  console.log(data);

  return (
    <Card className="h-53 w-full">
      <CardBody className="px-4 py-1">
        <table className="w-full min-w-max table-auto text-left">
          <tbody>
            {rows?.length > 0 ? (
              rows?.slice(startIndex, endIndex).map((item, index) => {
                return (
                  <tr key={item.expenseTitle}>
                    <td>
                      <div className="flex items-center gap-3">
                        {item.expenseCategory === "Food" && (
                          <IoFastFoodOutline  size={30}/>
                        )}
                        {item.expenseCategory === "Travel" && <MdCardTravel  size={30}/>}
                        {item.expenseCategory === "Entertainment" && (
                          <MdMovieFilter  size={30}/>
                        )}
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
                    <td className="items-center mr-2">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-extrabold text-[#f4bb4a] flex justify-center"
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
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-100 px-4 py-2">
        <div className="flex">
          <Button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            size="sm"
            className="rounded-xl bg-[#f1f1f1] border-collapse text-black mx-2"
          >
            <FaArrowLeft />
          </Button>
          {pageNumbers.map((pageNumber) => (
            <Button
              size="sm"
              className="rounded-xl bg-[#43967b] border-collapse mx-1"
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
            className="rounded-xl  bg-[#f1f1f1] border-collapse text-black mx-2"
          >
            <FaArrowRight />
          </Button>
        </div>
      </CardFooter>
      <EditExpense
        data={editingExpense}
        open={openEditExpense}
        handleClose={handleCloseEditExpense}
        setExpenseData={setExpenseData}
        setBalance={setBalance}
        setExpense={setExpense}
      />
    </Card>
  );
}
