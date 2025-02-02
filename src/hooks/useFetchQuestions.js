import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQuestions = async ({ queryKey }) => {
  const [{ category, amount }] = queryKey.slice(1);
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&type=multiple&category=${category}`
  );

  console.log("API Response:", data); // Debugging

  return data.results; // Ensure `results` exist
};

export const useFetchQuestions = (category, amount = 10) => {
  return useQuery({
    queryKey: ["questions", { category, amount }],
    queryFn: fetchQuestions,
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // ✅ Cache results for 5 minutes
  });
};
