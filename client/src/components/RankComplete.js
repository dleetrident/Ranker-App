import { useSelector } from "react-redux";

const RankComplete = () => {
  const list = useSelector((store) => store.heroes.heroesList);

  return (
    <div>
      <h1>Completed List</h1>
      <ul>
        {list.map((hero) => (
          <li key={hero.id}>
            Name: {hero.name} - Rating: {hero.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankComplete;
