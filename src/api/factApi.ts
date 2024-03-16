import { useQuery } from '@tanstack/react-query';

interface CatFact {
  fact: string;
}

const fetchCatFact = async (): Promise<CatFact> => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data as CatFact;
};

const useCatFact = () => {
  return useQuery<CatFact>({ queryKey: ['catFact'], queryFn: fetchCatFact });
};

export default useCatFact;
