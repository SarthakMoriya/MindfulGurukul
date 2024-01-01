export const fetchAllRecords = async () => {
  try {
    const res = await fetch("http://localhost:8000/record/getrecords");
    const data = await res.json();
    return data;
  } catch (error) {
    alert("Error fetching Records");
  }
};
