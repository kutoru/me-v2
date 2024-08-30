import { ReactElement } from "react";
import MultiMenuContainer from "./MultiMenuContainer";

type SkillData = {
  name: string;
  amount: number;
};

export default function Me() {
  const skills: SkillData[] = [
    {
      name: "React",
      amount: 69,
    },
    {
      name: "TypeScript",
      amount: 80,
    },
    {
      name: "Kotlin",
      amount: 85,
    },
    {
      name: "Rust",
      amount: 75,
    },
    {
      name: "Some skill 1",
      amount: 8,
    },
    {
      name: "Some skill 5",
      amount: 50,
    },
    {
      name: "Some skill 2",
      amount: 0,
    },
    {
      name: "Some skill 3",
      amount: 34,
    },
    {
      name: "Some skill 6",
      amount: 92,
    },
  ];

  function mapSkills(): ReactElement[] {
    const elements: ReactElement[] = [];

    skills.forEach((skill) => {
      elements.push(
        <div className="group/skill grid grid-cols-2 w-full bg-main-dark-2 my-2 rounded-xl p-2 transition-main hover:shadow-skill-container">
          <div className="pe-2 text-xl cursor-default transition-main group-hover/skill:drop-shadow-skill">
            {skill.name}
          </div>
          <div className="rounded-lg bg-main-light-3">
            <div
              className="bg-main-light-2 h-full rounded-s-lg transition-main group-hover/skill:shadow-skill-bar"
              style={{ width: `${skill.amount}%` }}
            ></div>
          </div>
        </div>
      );
    });

    return elements;
  }

  return (
    <MultiMenuContainer
      id="me"
      sideBarChild={
        <div>
          <div className="text-center font-semibold">My technical skills</div>
          {mapSkills()}
        </div>
      }
      mainContentChild={
        <div>
          <h1 className="text-4xl font-semibold text-center">Hello there</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            quisquam deserunt eaque vitae! Ipsum perferendis libero tempora,
            cumque neque odit vitae inventore eveniet? Hic aut animi doloremque
            adipisci, maiores ea odit itaque nam pariatur aperiam vero veniam
            modi velit ut laborum quibusdam rerum. Facere quod eos nulla
            excepturi sunt magni amet consequatur quo incidunt id. Unde incidunt
            voluptate voluptas illum, quae ipsa est debitis dicta! Mollitia
            excepturi ab optio reprehenderit, commodi obcaecati et magni dolore
            suscipit laboriosam assumenda a cumque. Provident repudiandae,
            veritatis culpa officiis adipisci voluptatem soluta sequi aperiam
            laborum corporis optio voluptatum sapiente fugiat, illo, repellendus
            quisquam harum! Ex, assumenda eaque. Fugiat dolore culpa minima
            porro, inventore, ipsa unde voluptas quo eaque assumenda corrupti,
            ratione quae quaerat odio voluptatum itaque? Est, deserunt ad! Ullam
            ipsam, dolores quas voluptatem itaque explicabo dicta neque nesciunt
            deleniti! Dolorum laudantium eos recusandae voluptatibus vero,
            sapiente quam, repellat nihil atque ab non, quidem magni
            necessitatibus hic rem delectus doloremque consequuntur esse
            molestiae commodi quod facere perspiciatis architecto consequatur!
            Dicta accusantium adipisci dolor veniam consequuntur atque, quod
            quam maiores consectetur harum rem aliquid cupiditate ut in ab id
            error voluptates neque sunt nulla, provident tenetur cum. Incidunt
            numquam voluptates ut maxime. Cumque et iste dignissimos modi ea
            rem. Cupiditate nobis mollitia inventore aliquam tempora. Quos modi
            inventore temporibus laboriosam mollitia minima. Omnis velit
            voluptate similique dicta laudantium blanditiis incidunt est
            provident alias ad quidem quo, molestiae earum excepturi fuga
            aspernatur perferendis ex non et. Suscipit nobis iusto consequuntur
            a corporis itaque! A in temporibus sapiente? Totam officiis facere,
            magni maiores sequi ullam nulla obcaecati iste voluptates eligendi
            dolor, molestiae perferendis numquam placeat tempora unde dolorem
            nam. Aliquam accusantium consectetur tempora, quibusdam ex sunt
            delectus dicta, eligendi dolor excepturi voluptas nostrum, eius
            quaerat animi facere iusto! Quibusdam autem repellendus id, aliquid,
            magnam omnis dolor delectus vero aspernatur laborum necessitatibus
            officia exercitationem fugiat numquam quasi. In explicabo neque
            excepturi quo perspiciatis, vero ipsam ut officiis assumenda commodi
            maxime distinctio iusto. Laudantium earum dolore optio saepe nemo
            vero numquam quasi aspernatur porro doloribus quam sit iusto eveniet
            ratione inventore dicta, commodi doloremque. At adipisci voluptates
            possimus voluptatem nesciunt rem, alias consequuntur necessitatibus
            ab voluptatibus, sequi laudantium debitis dolore eius est modi ex
            dignissimos molestias. Id libero, doloribus velit recusandae
            molestiae vel repellat repudiandae inventore amet. Est placeat quasi
            ab similique velit ipsam qui odit eligendi excepturi perferendis
            dolorem ratione incidunt, nemo neque. Qui eveniet error fugit dicta
            natus aliquid sunt unde sit quo praesentium dolores distinctio
            dignissimos nulla, sequi fuga autem. Nam porro, aspernatur beatae
            doloribus assumenda explicabo consequatur, quam eaque voluptate sit
            perspiciatis corporis error neque impedit cum iste sunt dolorem
            illo, qui blanditiis? Quis temporibus voluptatum maxime quisquam
            voluptatibus, numquam laudantium? Quas esse suscipit voluptatibus
            officiis laborum obcaecati expedita ipsa non labore! Eius dolore vel
            doloribus minima cum dolor pariatur, at inventore eligendi excepturi
            quas asperiores perferendis quidem corrupti tenetur est commodi
            consectetur numquam assumenda, harum architecto. Incidunt quod odit
            pariatur porro laudantium, laboriosam illo ullam reiciendis ipsam a
            dolorem magni nisi, libero aut saepe.
          </div>
        </div>
      }
    />
  );
}
