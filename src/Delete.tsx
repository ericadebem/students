import axios from "axios";

export const deleteStudent = async (id: string) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/v1/students/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
