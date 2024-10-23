export const formatContent = (content: string) => {
  return content.split("\\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
