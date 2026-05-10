import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface WorksheetRequest {
  student_class: number;
  subject: string;
  topics: string[];
  questions: string[];
}

export const generateWorksheet = async (data: WorksheetRequest) => {
  const response = await axios.post(`${API_URL}/generate-worksheet`, data, {
    responseType: 'blob',
  });
  return response.data;
};
