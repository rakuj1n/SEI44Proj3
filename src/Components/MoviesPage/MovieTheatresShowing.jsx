export default function MovieTheatresShowing() {
  const theatres = [
    "Shaw Theatres Lido",
    "Shaw Theatres Balestier",
    "Shaw Theatres Jewel",
    "Shaw Theatres Paya Lebar Quarter",
  ];

  const timings = ["10:50 AM", "11:35 AM", "02:15 PM", "04:10 PM", "06:20 PM"];

  return (
    <>
      <h1>MovieTheatresShowing</h1>
      {theatres.map((theatre) => theatre)}
      {timings.map((timing) => timing)}
    </>
  );
}
