interface IError {
  title: string;
  message: string;
}

export function Error(props: IError) {
  return (
    <>
      <h1>{props.title}</h1>
      <h2>{props.message}</h2>
    </>
  );
}
