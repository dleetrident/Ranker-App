import { useSelector } from "react-redux";
import Card from "../UI/Card";

const RankComplete = () => {
  const list = useSelector((store) => store.heroes.heroesList);

  return (
    <Card>
      <h1>Completed List</h1>
      <ul>
        {list.map((hero) => (
          <li key={hero.id}>
            Name: {hero.name} - Rating: {hero.rating}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RankComplete;
