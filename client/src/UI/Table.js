const Table = (props) => {
  // Table used dynamically for /RankComplete results
  return (
    <div>
      <table>
        <thead>
          <tr>
            {props.headings.map((heading) => {
              return <th>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default Table;
