import ContentContainer from "./ContentContainer";

export default function Projects() {
  return (
    <div className="flex flex-row flex-grow md:gap-2 lg:gap-4">
      <ContentContainer className="flex-shrink-0 hidden md:block">
        Navigation here
      </ContentContainer>
      <ContentContainer className="flex-grow">
        <h1 className="text-4xl font-semibold text-center">
          Hello there, these are my projects
        </h1>
      </ContentContainer>
    </div>
  );
}
