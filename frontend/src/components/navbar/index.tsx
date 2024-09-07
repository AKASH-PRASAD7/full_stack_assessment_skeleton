import { useState } from "react";

const Navbar = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    {
      user_id: 1,
      username: "John Doe",
    },
    {
      user_id: 2,
      username: "Jane Doe",
    },
    {
      user_id: 3,
      username: "John Smith",
    },
    {
      user_id: 4,
      username: "Jane Smith",
    },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <nav className="p-2 shadow-md bg-white shadow-gray-400 w-full sticky top-0 z-10 ">
        <section className="flex justify-end w-full px-12">
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
              {options.map((option) => (
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
