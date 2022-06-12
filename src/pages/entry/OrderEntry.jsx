import Options from "./Options";

export default function OrderEntry(props) {
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </>
  );
}
