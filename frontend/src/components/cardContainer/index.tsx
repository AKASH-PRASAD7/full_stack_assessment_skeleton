import { useState } from "react";
import Card from "../card";
import Pagination from "../pagination";

const data = [
  {
    home_id: 2,
    street_address: "123 Main St",
    state: "NY",
    zip: "10001",
    sqft: 1200.0,
    beds: 3,
    baths: 2,
    list_price: 500000.0,
    homeRelations: [],
  },
  {
    home_id: 3,
    street_address: "456 Elm St",
    state: "CA",
    zip: "90001",
    sqft: 1400.0,
    beds: 4,
    baths: 3,
    list_price: 750000.0,
  },
  {
    home_id: 2,
    street_address: "123 Main St",
    state: "NY",
    zip: "10001",
    sqft: 1200.0,
    beds: 3,
    baths: 2,
    list_price: 500000.0,
    homeRelations: [],
  },
  {
    home_id: 3,
    street_address: "456 Elm St",
    state: "CA",
    zip: "90001",
    sqft: 1400.0,
    beds: 4,
    baths: 3,
    list_price: 750000.0,
  },
  {
    home_id: 2,
    street_address: "123 Main St",
    state: "NY",
    zip: "10001",
    sqft: 1200.0,
    beds: 3,
    baths: 2,
    list_price: 500000.0,
    homeRelations: [],
  },
  {
    home_id: 3,
    street_address: "456 Elm St",
    state: "CA",
    zip: "90001",
    sqft: 1400.0,
    beds: 4,
    baths: 3,
    list_price: 750000.0,
  },
  {
    home_id: 2,
    street_address: "123 Main St",
    state: "NY",
    zip: "10001",
    sqft: 1200.0,
    beds: 3,
    baths: 2,
    list_price: 500000.0,
    homeRelations: [],
  },
  {
    home_id: 3,
    street_address: "456 Elm St",
    state: "CA",
    zip: "90001",
    sqft: 1400.0,
    beds: 4,
    baths: 3,
    list_price: 750000.0,
  },
];
const CardContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <section className="flex flex-wrap gap-4 my-8 justify-center">
        {data.map((home) => (
          <Card
            key={home.home_id}
            street_address={home.street_address}
            state={home.state}
            zip={home.zip}
            sqft={home.sqft}
            beds={home.beds}
            baths={home.baths}
            list_price={home.list_price}
          />
        ))}
      </section>
      <section className="flex mb-12 justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
};

export default CardContainer;
