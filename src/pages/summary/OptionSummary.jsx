import { useOrderDetails } from "../../contexts/OrderDetails";
import { capitalize } from "../../utils";

export default function OptionSummary({ optionType }) {
  const [OrderDetails] = useOrderDetails();

  return (
    <>
      <h3>
        {capitalize(optionType)} {OrderDetails.totals[optionType]}
      </h3>
      <ul>
        {[...OrderDetails[optionType].keys()].map((option) => {
          const scoopItemCount = OrderDetails[optionType].get(option);
          return scoopItemCount === 0 ? null : (
            <li key={option}>
              {optionType === "scoops" &&
                `${OrderDetails[optionType].get(option)} `}
              {option}
            </li>
          );
        })}
      </ul>
    </>
  );
}
