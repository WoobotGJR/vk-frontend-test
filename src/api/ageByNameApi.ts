import { useMutation } from '@tanstack/react-query';

// Тип данных для ответа от сервера
interface AgifyResponse {
  age: number;
}

// Функция для отправки имени на сервер
export const fetchAgeByName = async (name: string): Promise<AgifyResponse> => {
  const queryParams = new URLSearchParams({ name });
  const url = `https://api.agify.io/?${queryParams}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch age by name');
  }

  return response.json();
};

// Хук для использования запроса к API для отправки имени и получения возраста
const useAgeByName = () => {
  return useMutation({
    mutationFn: fetchAgeByName,
  });
};

export default useAgeByName;
