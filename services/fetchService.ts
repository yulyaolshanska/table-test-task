import { IUser } from "types/IUser";

class FetchService {
  static async fetchUsers() {
    try {
      //   const baseApiUrl = getBaseApiUrl();

      const res = await fetch(
        "https://technical-task-api.icapgroupgmbh.com/api/table/"
      );

      const response = await res.json();

      return response.results;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  static async fetchUpdateUser(id: number, formData: IUser) {
    try {
      //   const baseApiUrl = getBaseApiUrl();

      return await fetch(
        `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default FetchService;
