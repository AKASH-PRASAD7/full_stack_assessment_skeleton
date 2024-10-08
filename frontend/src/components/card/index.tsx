import { useState } from "react";
import Modal from "../modal";

interface PropertyCardProps {
  id: number;
  street_address: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
  users: User[];
}

interface User {
  user_id: number;
  username: string;
}

const HomeCard: React.FC<PropertyCardProps> = ({
  street_address,
  state,
  zip,
  sqft,
  beds,
  baths,
  list_price,
  users,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={street_address}
          allUsers={users}
          homeId={id}
        />
        <div className="max-w-sm rounded  shadow-lg bg-white border h-80  w-64 border-gray-200 py-8 px-4">
          <div className="font-bold text-gray-950 text-xl mb-2">
            {street_address}
          </div>
          <div className="mt-4">
            <p className="text-gray-600">
              List Price: ${list_price.toLocaleString()}
            </p>
            <p className="text-gray-600">State: {state}</p>
            <p className="text-gray-600">Zip: {zip}</p>
            <p className="text-gray-600">
              Square Feet: {sqft.toLocaleString()} sqft
            </p>
            <p className="text-gray-600">Beds: {beds}</p>
            <p className="text-gray-600">Baths: {baths}</p>
          </div>

          <div className="mt-6 ">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Edit Users
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCard;
