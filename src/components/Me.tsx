import { useEffect, useState } from "react";
import ContentContainer from "./ContentContainer";
import ExpandButton from "./ExpandButton";
import { useLocation } from "react-router-dom";

let expandedOuter = false;

window.addEventListener("resize", (_) => updateSize());

function updateSize(withAnimation: boolean = true) {
  const mainCont = document.getElementById("container-me");
  const sectionCont = mainCont?.children[0] as HTMLElement | undefined;
  const sideSection = sectionCont?.children[0] as HTMLElement | undefined;
  const contentCover = document.getElementById("content-cover");

  if (!mainCont || !sectionCont || !sideSection || !contentCover) {
    return;
  }

  if (window.innerWidth >= 768) {
    mainCont.style.width = "";
    sectionCont.style.transition = "";
    sectionCont.style.transform = "";
    sectionCont.style.width = "";
    sideSection.style.boxShadow = "";
    contentCover.style.display = "";
    return;
  }

  if (!withAnimation) {
    sectionCont.style.transition = "";
  }

  const screenWidth = document
    .getElementById("header")!
    .getBoundingClientRect().width;
  const offsetWidth = sideSection.getBoundingClientRect().width + 8;
  const resultWidth = screenWidth + offsetWidth;

  mainCont.style.width = `${resultWidth}px`;
  sectionCont.style.width = `${resultWidth}px`;

  if (expandedOuter) {
    sectionCont.style.transform = `translate(0px, 0px)`;
    sideSection.style.boxShadow = `0 0 ${offsetWidth * 2}px ${
      (offsetWidth * 2) / 5
    }px rgba(0, 0, 0, 1)`;
    contentCover.style.left = `${offsetWidth}px`;
    contentCover.style.display = "block";
  } else {
    sectionCont.style.transform = `translate(-${offsetWidth}px, 0px)`;
    sideSection.style.boxShadow = "";
    contentCover.style.display = "";
  }

  sectionCont.style.transition = "transform 150ms ease-in-out";
}

export default function Me() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    updateSize(false);
  }, [location]);

  useEffect(() => {
    expandedOuter = expanded;
    updateSize(false);
  }, [expanded]);

  return (
    <div id="container-me" className="flex flex-grow">
      <div className="flex flex-row gap-2 flex-grow lg:gap-4">
        <ContentContainer className="flex-shrink-0 pt-14 md:pt-2">
          My skills here
        </ContentContainer>
        <ContentContainer className="flex-grow pt-14 md:pt-2 -z-10 md:z-0">
          <h1 className="text-4xl font-semibold text-center">Hello there</h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui quisquam
          deserunt eaque vitae! Ipsum perferendis libero tempora, cumque neque
          odit vitae inventore eveniet? Hic aut animi doloremque adipisci,
          maiores ea odit itaque nam pariatur aperiam vero veniam modi velit ut
          laborum quibusdam rerum. Facere quod eos nulla excepturi sunt magni
          amet consequatur quo incidunt id. Unde incidunt voluptate voluptas
          illum, quae ipsa est debitis dicta! Mollitia excepturi ab optio
          reprehenderit, commodi obcaecati et magni dolore suscipit laboriosam
          assumenda a cumque. Provident repudiandae, veritatis culpa officiis
          adipisci voluptatem soluta sequi aperiam laborum corporis optio
          voluptatum sapiente fugiat, illo, repellendus quisquam harum! Ex,
          assumenda eaque. Fugiat dolore culpa minima porro, inventore, ipsa
          unde voluptas quo eaque assumenda corrupti, ratione quae quaerat odio
          voluptatum itaque? Est, deserunt ad! Ullam ipsam, dolores quas
          voluptatem itaque explicabo dicta neque nesciunt deleniti! Dolorum
          laudantium eos recusandae voluptatibus vero, sapiente quam, repellat
          nihil atque ab non, quidem magni necessitatibus hic rem delectus
          doloremque consequuntur esse molestiae commodi quod facere
          perspiciatis architecto consequatur! Dicta accusantium adipisci dolor
          veniam consequuntur atque, quod quam maiores consectetur harum rem
          aliquid cupiditate ut in ab id error voluptates neque sunt nulla,
          provident tenetur cum. Incidunt numquam voluptates ut maxime. Cumque
          et iste dignissimos modi ea rem. Cupiditate nobis mollitia inventore
          aliquam tempora. Quos modi inventore temporibus laboriosam mollitia
          minima. Omnis velit voluptate similique dicta laudantium blanditiis
          incidunt est provident alias ad quidem quo, molestiae earum excepturi
          fuga aspernatur perferendis ex non et. Suscipit nobis iusto
          consequuntur a corporis itaque! A in temporibus sapiente? Totam
          officiis facere, magni maiores sequi ullam nulla obcaecati iste
          voluptates eligendi dolor, molestiae perferendis numquam placeat
          tempora unde dolorem nam. Aliquam accusantium consectetur tempora,
          quibusdam ex sunt delectus dicta, eligendi dolor excepturi voluptas
          nostrum, eius quaerat animi facere iusto! Quibusdam autem repellendus
          id, aliquid, magnam omnis dolor delectus vero aspernatur laborum
          necessitatibus officia exercitationem fugiat numquam quasi. In
          explicabo neque excepturi quo perspiciatis, vero ipsam ut officiis
          assumenda commodi maxime distinctio iusto. Laudantium earum dolore
          optio saepe nemo vero numquam quasi aspernatur porro doloribus quam
          sit iusto eveniet ratione inventore dicta, commodi doloremque. At
          adipisci voluptates possimus voluptatem nesciunt rem, alias
          consequuntur necessitatibus ab voluptatibus, sequi laudantium debitis
          dolore eius est modi ex dignissimos molestias. Id libero, doloribus
          velit recusandae molestiae vel repellat repudiandae inventore amet.
          Est placeat quasi ab similique velit ipsam qui odit eligendi excepturi
          perferendis dolorem ratione incidunt, nemo neque. Qui eveniet error
          fugit dicta natus aliquid sunt unde sit quo praesentium dolores
          distinctio dignissimos nulla, sequi fuga autem. Nam porro, aspernatur
          beatae doloribus assumenda explicabo consequatur, quam eaque voluptate
          sit perspiciatis corporis error neque impedit cum iste sunt dolorem
          illo, qui blanditiis? Quis temporibus voluptatum maxime quisquam
          voluptatibus, numquam laudantium? Quas esse suscipit voluptatibus
          officiis laborum obcaecati expedita ipsa non labore! Eius dolore vel
          doloribus minima cum dolor pariatur, at inventore eligendi excepturi
          quas asperiores perferendis quidem corrupti tenetur est commodi
          consectetur numquam assumenda, harum architecto. Incidunt quod odit
          pariatur porro laudantium, laboriosam illo ullam reiciendis ipsam a
          dolorem magni nisi, libero aut saepe.
        </ContentContainer>
      </div>
      <ExpandButton onClick={() => setExpanded(!expanded)} />
      <div
        id="content-cover"
        className="hidden cursor-pointer bg-transparent fixed top-0 size-full"
        onClick={() => setExpanded(false)}
      ></div>
    </div>
  );
}
