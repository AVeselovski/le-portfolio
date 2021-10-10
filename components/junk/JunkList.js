import JunkItem from "./JunkItem";

function JunkList({ junk }) {
  return (
    <ul>
      {junk.map((j, i) => (
        <JunkItem key={`${i}-${j.slug}`} junk={j} />
      ))}
    </ul>
  );
}

export default JunkList;
