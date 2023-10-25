import { selectAuthState } from "@redux/authSlice";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import TableRow from "components/tableRow/Input";
import { IUser } from "types/IUser";
import FetchService from "services/fetchService";

interface TablePageProps {
  users: IUser[];
}

const TablePage: React.FC<TablePageProps> = ({ users }) => {
  const authState = useSelector(selectAuthState);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">birthday_date</th>
            <th scope="col">phone_number</th>
            <th scope="col">address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps<TablePageProps> = async () => {
  try {
    const users = await FetchService.fetchUsers();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        users: [],
      },
    };
  }
};

export default TablePage;
