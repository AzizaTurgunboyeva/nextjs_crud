import { useQuery } from "@tanstack/react-query";
import { getSchool } from "../../api/school";

export function useStudents() {
  return useQuery({
    queryFn: getSchool,
    queryKey: ["school"],
  });
}
