import { useRouteError } from "react-router-dom";
import ContentContainer from "./ContentContainer";

export default function ErrorPage({
  customMessage,
}: {
  customMessage?: string;
}) {
  const error: any = useRouteError();

  return (
    <ContentContainer className="flex-grow">
      <h1 className="text-4xl font-semibold text-center">
        {customMessage || error.statusText || error.message}
      </h1>
    </ContentContainer>
  );
}
