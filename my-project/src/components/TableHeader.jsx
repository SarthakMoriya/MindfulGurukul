
const TableHeader = () => {
  return (
    <div className="flex items-center  justify-between text-xs text-white uppercase bg-blue-600">
      <img src="" alt="" className="w-[20" />
      <div className="w-[20%] text-sm text-left px-6 py-3">Name</div>
      <div className="w-[30%] text-sm text-left px-6 py-3">Email</div>
      <div className="w-[10%] text-sm text-left px-6 py-3">Phone</div>
      <div className="buttons flex gap-4 w-[20%] px-6 py-3 text-sm text-left">
        Modify
      </div>
    </div>
  );
};

export default TableHeader;
