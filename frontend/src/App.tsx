import "./App.css";
import Navbar from "./components/navbar";
import CardContainer from "./components/cardContainer";
import { useState } from "react";
import {
  useGetAllUsersQuery,
  useGetUsersHomeQuery,
} from "./redux/features/api/userHomeSlice";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: userData, error: userErorr } = useGetAllUsersQuery();
  const options = userData?.data || [];
  const {
    data: homeData,
    error: homeError,
    isLoading,
  } = useGetUsersHomeQuery(
    {
      userId: selectedUserId || 1,
      page: currentPage,
    },
    {
      skip: !selectedUserId,
    }
  );

  const totalPages = Math.ceil(homeData?.total / 50);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedUserId(selectedId);
  };

  return (
    <>
      <main>
        <Navbar
          options={options}
          selected={selectedUserId}
          handleSelectChange={handleSelectChange}
          error={userErorr}
        />
        <CardContainer
          data={homeData}
          users={options}
          error={homeError}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </main>
    </>
  );
}

export default App;
