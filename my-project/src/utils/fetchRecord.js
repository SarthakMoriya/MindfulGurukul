export const fetchAllRecords = async () => {
  try {
    const res = await fetch("https://mindfulgurukulbackend.onrender.com/record/getrecords");
    const data = await res.json();
    return data;
  } catch (error) {
    alert("Error fetching Records");
  }
};
