import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div className="flex flex-wrap gap-4 my-8 justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
        <div key={index} className="w-96">
          <Skeleton height={200} />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton count={2} />
            <Skeleton width={100} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
