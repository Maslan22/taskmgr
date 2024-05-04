import axios from "axios";

export async function AxiosPost(url: string, data: any) {
  try {
    const response = await axios.post(`http://localhost:8800/${url}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function AxiosPut(url: string, data: any) {
  try {
    const response = await axios.put(`http://localhost:8800/${url}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function AxiosDelete(url: string, data?: any) {
  try {
    const response = await axios.delete(`http://localhost:8800/${url}`, { data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function AxiosGet(url: string, data?: any) {
  try {
    const response = await axios.get(`http://localhost:8800/${url}`, { params: data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
