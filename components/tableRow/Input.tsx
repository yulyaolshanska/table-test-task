import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { format } from "date-fns";
import FetchService from "services/fetchService";
import { IUser } from "../../types/IUser";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Name is too short")
    .max(255, "Name is too long"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .min(1, "Email is too short")
    .max(254, "Email is too long"),
  birthday_date: yup
    .string()
    .required("birthday date is required")
    .test("is-yyyy-MM-dd", "Invalid date format", (value) => {
      const parts = value.split("-");
      if (parts.length !== 3) return false;

      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      if (
        year < 1000 ||
        year > 9999 ||
        month < 0 ||
        month > 11 ||
        day < 1 ||
        day > 31
      ) {
        return false;
      }

      return true;
    }),
  phone_number: yup
    .string()
    .required("phone number is required")
    .min(1, "phone is too short")
    .max(20, "phone is too long"),
  address: yup.string().min(1, "address is too short"),
});

interface TableRowProps {
  user: IUser;
}

const TableRow: React.FC<TableRowProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...user });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formattedBirthday = () => {
    const birthday = new Date(user.birthday_date);

    if (isNaN(birthday.getTime())) {
      return;
    } else {
      return format(birthday, "yyyy-MM-dd");
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const birthday = formattedBirthday();
  const birthdayDate = birthday ? birthday : today;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (data: any) => {
    console.log("userData", data);
    setEditedData(data);
    FetchService.fetchUpdateUser(user.id, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(editedData);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <>
            <Controller
              name="name"
              control={control}
              defaultValue={editedData.name}
              render={({ field }) => <input {...field} />}
            />
            {errors.name && (
              <span className="error">{errors.name?.message}</span>
            )}
          </>
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <Controller
              name="email"
              control={control}
              defaultValue={editedData.email}
              render={({ field }) => <input {...field} />}
            />
            {errors.email && (
              <span className="error">{errors.email?.message}</span>
            )}
          </>
        ) : (
          user.email
        )}
      </td>

      <td>
        {isEditing ? (
          <>
            <Controller
              name="birthday_date"
              control={control}
              defaultValue={birthdayDate}
              render={({ field }) => <input {...field} />}
            />
            {errors.birthday_date && (
              <span className="error">{errors.birthday_date?.message}</span>
            )}
          </>
        ) : (
          birthdayDate
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <Controller
              name="phone_number"
              control={control}
              defaultValue={editedData.phone_number}
              render={({ field }) => <input {...field} />}
            />
            {errors.phone_number && (
              <span className="error">{errors.phone_number?.message}</span>
            )}
          </>
        ) : (
          user.phone_number
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <Controller
              name="address"
              control={control}
              defaultValue={editedData.address}
              render={({ field }) => <input {...field} />}
            />{" "}
            {errors.address && (
              <span className="error">{errors.address?.message}</span>
            )}
          </>
        ) : (
          user.address
        )}
      </td>
      <td>
        {isEditing ? (
          <div>
            <button onClick={handleSubmit(handleSave)}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
