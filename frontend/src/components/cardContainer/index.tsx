import Card from "../card";
import Pagination from "../pagination";
import Loader from "../Loader";

interface Home {
  home_id: number;
  street_address: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
}
interface User {
  user_id: number;
  username: string;
}
interface CardContainerProps {
  data: { data: Home[] } | undefined;
  users: User[];
  error: any;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const CardContainer = ({
  data,
  error,
  isLoading,
  totalPages,
  currentPage,
  handlePageChange,
  users,
}: CardContainerProps) => {
  return (
    <>
      <section className="flex flex-wrap gap-4 my-8 justify-center">
        {error && (
          <p className="text-red-500 m-4 text-center">Error fetching data</p>
        )}
        {isLoading ? (
          <Loader />
        ) : !data ? (
          <p className="text-black m-4 text-center">Select any user</p>
        ) : data?.data.length === 0 ? (
          <p className="text-red-500 m-4 text-center">No data found</p>
        ) : (
          data?.data.map((home: Home) => (
            <Card
              key={home.home_id}
              id={home.home_id}
              street_address={home.street_address}
              state={home.state}
              zip={home.zip}
              sqft={home.sqft}
              beds={home.beds}
              baths={home.baths}
              list_price={home.list_price}
              users={users}
            />
          ))
        )}
      </section>
      <section className="flex mb-12 justify-center">
        {data && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default CardContainer;
