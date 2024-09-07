import React, { useEffect, useState } from "react";
import {
  useGetHomeUsersQuery,
  useUpdateHomeUsersMutation,
} from "../../redux/features/api/userHomeSlice";

interface User {
  user_id: number;
  username: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  homeId: number;
  allUsers: User[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  homeId,
  allUsers,
}) => {
  if (!isOpen) return null;
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [updateHomeUsers, { isLoading: isSaving, isError, isSuccess }] =
    useUpdateHomeUsersMutation();

  const { data, error, isLoading, refetch } = useGetHomeUsersQuery(homeId);

  useEffect(() => {
    if (data) {
      setSelectedUsers(data?.data || []);
    }
  }, [data]);

  const handleCheckboxChange = (user: User) => {
    if (selectedUsers.some((u) => u.user_id === user.user_id)) {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((u) => u.user_id !== user.user_id)
      );
    } else {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    }
  };

  const handleSave = async () => {
    const requestData = {
      homeId,
      userIds: selectedUsers.map((u) => u.user_id),
    };

    try {
      await updateHomeUsers(requestData).unwrap();
      await refetch();
      onClose();
    } catch (err) {
      console.error("Error updating users:", err);
    } finally {
      onClose();
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
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching data</p>
            ) : (
              allUsers.map((user) => (
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
              ))
            )}
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
            onClick={handleSave}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        {isError && <p className="text-red-500">Error saving users</p>}
        {isSuccess && (
          <p className="text-green-500">Users saved successfully</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
