interface User {
  user_id: number;
  username: string;
}

const Navbar = ({
  options,
  handleSelectChange,
  error,
  selected,
}: {
  options: User[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error: any;
  selected: number | null;
}) => {
  return (
    <>
      <nav className="p-2 shadow-md bg-white shadow-gray-400 w-full sticky top-0 z-10 ">
        <section className="flex justify-end w-full px-12">
          {error && (
            <div className="text-red-500 text-center">
              Failed to fetch users
            </div>
          )}
          <div className="flex  items-center w-64 text-black ">
            <label className="block text-sm w-full font-semibold text-gray-700 ">
              Select User:
            </label>
            <select
              value={selected || ""}
              onChange={handleSelectChange}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select user
              </option>
              {options?.map((option: User) => (
                <option key={option.user_id} value={option.user_id}>
                  {option.username}
                </option>
              ))}
            </select>
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
