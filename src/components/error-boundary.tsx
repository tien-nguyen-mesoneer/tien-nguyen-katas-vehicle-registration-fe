import { useRouteError } from "react-router-dom";

type Props = {};

function ErrorBoundary({}: Props) {
  const error: any = useRouteError(); // TODO: Cast to an error type later : https://stackoverflow.com/questions/75944820/whats-the-correct-type-for-error-in-userouteerror-from-react-router-dom
  return <div>{error.message} NOTFOUND</div>;
}

export default ErrorBoundary;
