import Item from "./Item";

export default function SearchItem({ item, setOpen }) {
  return item.data.map((item) => <Item item={item} setOpen={setOpen} />);
}
