import { useRouteError } from "react-router-dom";
import ContentContainer from "./ContentContainer";

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <ContentContainer className="flex-grow">
      <h1 className="text-4xl font-semibold text-center">
        {error.statusText || error.message}
      </h1>
    </ContentContainer>
  );
}
