const ConsummedProductsList = ({ entryList }) => {
  return (
    <div className="lg:w-4/5 mt-16 h-60 overflow-scroll relative">
      {entryList.map((entry) => (
        <ConsummedProductsList
          key={entry._id}
          productName={entry.productName}
          grams={entry.grams}
          cals={entry.kcal}
          id={entry._id}
        />
      ))}
    </div>
  );
};

export default ConsummedProductsList;
