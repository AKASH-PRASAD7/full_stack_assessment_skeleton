import React, { useState } from "react";

interface User {
  user_id: number;
  username: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: User[];
}

const allUsers: User[] = [
  {
    user_id: 1,
    username: "john_doe",
  },
  {
    user_id: 2,
    username: "jane_doe",
  },
  {
    user_id: 3,
    username: "joe_doe",
  },
  {
    user_id: 4,
    username: "jim_doe",
  },
  {
    user_id: 5,
    username: "jill_doe",
  },
  {
    user_id: 6,
    username: "jerry_doe",
  },
  {
    user_id: 7,
    username: "jacob_doe",
  },
  {
    user_id: 8,
    username: "jared_doe",
  },
  {
    user_id: 9,
    username: "julie_doe",
  },
  {
    user_id: 10,
    username: "jenny_doe",
  },
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, users }) => {
  if (!isOpen) return null;
  const [selectedUsers, setSelectedUsers] = useState<User[]>(users);

  console.log(selectedUsers);

  const handleCheckboxChange = (user: User) => {
    if (selectedUsers.some((u) => u.user_id === user.user_id)) {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((u) => u.user_id !== user.user_id)
      );
    } else {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-sm lg:max-w-sm m-8 p-6 relative">
        <h2 className="text-xl text-black font-bold mb-4">
          Modify Users For: {title}
        </h2>

        <div>
          <ul>
            {allUsers.map((user) => (
              <li key={user.user_id} className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id={`user-${user.user_id}`}
                  checked={selectedUsers.some(
                    (u) => u.user_id === user.user_id
                  )}
                  onChange={() => handleCheckboxChange(user)}
                  className={`h-4 w-4 border-2 rounded transition-colors duration-200 ${
                    selectedUsers.some((u) => u.user_id === user.user_id)
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                  } focus:ring-blue-500 checked:bg-blue-600 checked:border-blue-600`}
                />
                <label
                  htmlFor={`user-${user.user_id}`}
                  className="text-black font-medium"
                >
                  {user.username}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <button
            className="bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
