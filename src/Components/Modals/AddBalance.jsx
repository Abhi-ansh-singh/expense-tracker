/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddBalance({
  open,
  handleOpen,
  handleClose,
  setAddBalance,
}) {
  const schema = yup.object().shape({
    incomeAmount: yup
      .string()
      .required("This field is required")
      .matches(/^\d+$/, "Input must contain only numbers"),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleAddBalance = (data) => {
    // console.log("form data", data);
    setAddBalance((prev) => prev + parseInt(data?.incomeAmount));
    reset();
    handleClose();
  };

  const onClose = () => {
    handleClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Balance</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleAddBalance)} className="flex items-center gap-2">
            <div>
              <Input
                {...register("incomeAmount")}
                label="Income Amount"
                type="text"
                error={errors?.incomeAmount}
              />
              {errors?.incomeAmount && (
                <span className="text-red-500text-sm">
                  {errors?.incomeAmount?.message}
                </span>
              )}
            </div>
            <Button type="submit" className="bg-[#f4bb4a]">
            <span className="text-white font-bold">Add Balance</span>
          </Button>
          <Button
            onClick={onClose}
            className="mr-1 bg-[#f1f1f1] text-blue-gray-800"
          >
            <span>Cancel</span>
          </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
