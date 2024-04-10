/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, Option } from "@material-tailwind/react";
import { useEffect } from "react";
import moment from "moment";


export default function EditExpense({
  open,
  data,
  handleOpen,
  handleClose,
  setExpenseData,
  setBalance,
  setExpense,
}) {
  const categoryOption = [
    { value: "Food" },
    { value: "Travel" },
    { value: "Entertainment" }
  ];
  const schema = yup.object().shape({
    expenseAmount: yup
      .string()
      .required("This Field is required")
      .matches(/^\d+$/, "Expense amount must be a valid number"),
    expenseTitle: yup.string().required("This Field is required"),
    expenseCategory: yup.string().required("This Field is required"),
    expenseDate: yup
      .date("Input must be a date")
      .required("This field is required"),
  });
  
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const handleEditExpense = (formData) => {
    console.log("form data", formData);
    if (formData) {
      setExpenseData(
        (prev) =>
          (prev = prev.map((item, index) =>
            index === data?.index ? formData : item
          ))
      );
      setBalance(
        (prev) =>
          prev +
          parseInt(data?.expenseAmount) -
          parseInt(formData?.expenseAmount)
      );
      setExpense(
        (prev) =>
          prev -
          parseInt(data?.expenseAmount) +
          parseInt(formData?.expenseAmount)
      );
      handleClose();
      reset();
    }
  };

  const setAllValues = () => {
    setValue("expenseTitle", data?.expenseTitle);
    setValue("expenseAmount", data?.expenseAmount);
    setValue("expenseCategory",data?.expenseCategory);
    setValue("expenseDate", moment(data?.expenseDate).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setAllValues();
  }, [data]);

  const onClose = () => {
    handleClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader>Update Expenses</DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmit(handleEditExpense)}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-2">
              <div className="mb-2 basis-[49%]">
                <Input
                  {...register("expenseTitle")}
                  label="Title"
                  type="text"
                  
                  error={errors?.expenseTitle}
                />
                {errors?.expenseTitle && (
                  <span className="text-red-500 text-sm">
                    {errors?.expenseTitle?.message}
                  </span>
                )}
                </div>
                <div className="mb-2 basis-[49%]">
                <Input
                  {...register("expenseAmount")}
                  label="Price"
                  type="text"
                  error={errors?.expenseAmount}
                />
                {errors?.expenseAmount && (
                  <span className="text-red-500 text-sm">
                    {errors?.expenseAmount?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-2 basis-[49%]">
                <Controller
                  control={control}
                  name="expenseCategory"
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Select Category"
                      className="w-full"
                    >
                      {categoryOption.map((option, i) => (
                        <Option key={i} value={option.value}>
                          {option.value}
                        </Option>
                      ))}
                    </Select>
                  )}
                  defaultValue=""
                />
                {errors?.expenseCategory && (
                  <span className="text-red-500 text-sm">
                    {errors?.expenseCategory?.message}
                  </span>
                )}
                </div>
                <div className="mb-2 basis-[49%]">
                <Input
                  label="Date"
                  type="date"
                  {...register("expenseDate")}
                  error={errors?.expenseDate}
                />
                {errors?.expenseDate && (
                  <span className="text-red-500 text-sm">
                    {errors?.expenseDate?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-1/2 bg-[#f4bb4a]"
              >
                <span className="text-white font-bold rounded-lg p-5 text-nowrap">
                  Update Expense
                </span>
              </Button>
              <Button
                onClick={onClose}
                className="mr-1 bg-[#f1f1f1] text-blue-gray-800"
              >
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
