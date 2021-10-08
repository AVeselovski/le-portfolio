import JunkItem from "./JunkItem";

function JunkList({ junk }) {
  return (
    <ul>
      {junk.map((item) => (
        <JunkItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          updatedAt={item.updatedAt}
          slugs={item.slugs}
        />
      ))}
    </ul>
  );
}

export default JunkList;
