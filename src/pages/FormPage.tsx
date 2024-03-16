import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import useAgeByName from '../api/ageByNameApi';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import debounce from '../utils/debounce';
import '../styles/formPage.css';

interface FormValues {
  name: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Name must contain only English letters')
    .required('Name is required'),
});

const NameForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const ageMutation = useAgeByName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const getAgedata = async (nameString: string) => {
    if (nameString.trim() === name) return;

    try {
      const result = await ageMutation.mutateAsync(nameString.trim());
      setAge(result.age);
      setName(nameString.trim());
    } catch (error) {
      console.error('Failed to fetch age:', error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.name.trim() !== '') {
      await getAgedata(data.name);
    }
  };

  // Для корректной валидации формы, передаём в дебаунс onSubmit
  const debounceRef = useRef(debounce(onSubmit));
  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      // Используем сохраненную ссылку для вызова debounce, чтобы предотвратить создание большого количества таймеров
      debounceRef.current({ name: value });
    },
    [ageMutation]
  );

  return (
    <div className="form-container">
      <h2 className="form-title">Submit Your Name:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            {...register('name')}
            className="input-field"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={ageMutation.isPending}
          className="submit-button"
        >
          {ageMutation.isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {age !== null && (
        <div className="age-result">
          <h3>Your age is: {age}</h3>
        </div>
      )}
      {ageMutation.error && (
        <div className="error-message">Error: {ageMutation.error.message}</div>
      )}
    </div>
  );
};

export default NameForm;
