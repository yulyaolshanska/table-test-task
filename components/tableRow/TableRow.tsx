import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FetchService from "services/fetchService";
import { IUser } from "../../types/IUser";
// import { updateTableData } from "../redux/tableSlice";

interface TableRowProps {
  user: IUser;
}

const TableRow: React.FC<TableRowProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...user });
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // You can add validation here if needed
    // dispatch(updateTableData(editedData));
    setIsEditing(false);
    FetchService.fetchUpdateUser(user.id, editedData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const date = new Date(editedData.birthday_date);
  console.log("date", date);

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="birthday_date"
            value={editedData.birthday_date}
            onChange={handleInputChange}
          />
        ) : (
          user.birthday_date
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="phone_number"
            value={editedData.phone_number}
            onChange={handleInputChange}
          />
        ) : (
          user.phone_number
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="address"
            value={editedData.address}
            onChange={handleInputChange}
          />
        ) : (
          user.address
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
