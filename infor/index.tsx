import idolshowdownnextfesbiboo13 from "./idolshowdownnextfesbiboo-1-3.png";
import idolshowdownnfLogo1 from "./idolshowdownnf-logo-1.png";
import line1 from "./line-1.svg";
import line2 from "./line-2.svg";
import rectangle47 from "./rectangle-47.svg";
import rectangle48 from "./rectangle-48.svg";
import rectangle49 from "./rectangle-49.svg";
import rectangle58 from "./rectangle-58.svg";

const navigationItems = [
  {
    label: "Replay",
    href: "https://www.idolshowdownreplay.games",
    external: true,
  },
  {
    label: "News",
    href: "#news",
    external: false,
  },
  {
    label: "Contacts",
    href: "#contacts",
    external: false,
  },
];

const actionItems = [
  {
    label: "Character",
    href: "/select",
  },
  {
    label: "Glossary",
    href: "/glossary",
  },
];

export const MainPageScreen = (): JSX.Element => {
  return (
    <main
      className="relative min-h-[1080px] min-w-[1920px] w-full overflow-hidden overflow-y-scroll bg-[url(next-fes-skytemplate-4.png)] bg-cover bg-[50%_50%]"
      aria-label="Main page"
    >
      <img
        className="absolute left-[219px] top-5 h-[2021px] w-[1547px]"
        alt=""
        aria-hidden="true"
        src={rectangle58}
      />
      
      <section
        className="absolute left-0 top-0 h-[640px] w-[1920px]"
        aria-labelledby="hero-heading"
      >
        <img
          className="absolute left-0 top-0 h-[640px] w-[1920px] aspect-[3]"
          alt="Idol Showdown Next Fes character artwork"
          src={idolshowdownnextfesbiboo13}
        />
        
        <img
          className="absolute left-[206px] top-0 h-[640px] w-[519px]"
          alt=""
          aria-hidden="true"
          src={rectangle48}
        />
        
        <img
          className="absolute left-[227px] top-[83px] h-[202px] w-[423px] aspect-[2.1] object-cover"
          alt="Idol Showdown Next Fes"
          src={idolshowdownnfLogo1}
        />
        
        <h1 id="hero-heading" className="sr-only">
          Idol Showdown Next Fes
        </h1>
        <p className="absolute left-[271px] top-[258px] h-[179px] w-[407px] [font-family:'Podkova-Medium',Helvetica] text-2xl font-medium leading-[normal] tracking-[0] text-white">
          Date Release: 6 May, 2023
          <br />
          Last update: 7 June, 2026
          <br />
          Developer: Besto Game Team
        </p>
        
        <a
          className="absolute left-[345px] top-[507px] box-border block h-[66px] w-[243px] cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="https://store.steampowered.com/app/1742020/Idol_Showdown/"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Download Idol Showdown on Steam"
        >
          <img
            className="absolute left-0 top-0 h-[66px] w-[241px]"
            alt=""
            aria-hidden="true"
            src={rectangle49}
          />
          <span className="absolute left-0 top-0 flex h-[66px] w-[241px] items-center justify-center [font-family:'Pixelify_Sans-Regular',Helvetica] text-center text-[32px] font-normal leading-[normal] tracking-[0] text-black">
            Download
          </span>
        </a>
      </section>

      <section
        id="news"
        className="absolute left-[232px] top-[550px] flex h-[642px] w-[1521px] items-center justify-center"
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="sr-only">
          About Idol Showdown
        </h2>
        <p className="[font-family:'SF_Compact_Rounded-Medium',Helvetica] text-center text-5xl font-medium leading-[65px] tracking-[0] text-white">
          Được phát triển bởi Besto Games - 1 đội ngũ indie, với niềm đam mê
          game đối kháng và Idol của mình họ đã dành trọn 2 năm để phát triển
          tựa game Idol Showdown này.
        </p>
      </section>

      <section
        id="characters"
        className="absolute left-[237px] top-[856px] h-[766px] w-[1516px]"
        aria-labelledby="explore-heading"
      >
        <h2 id="explore-heading" className="sr-only">
          Explore Idol Showdown
        </h2>
        <p className="[font-family:'SF_Compact_Rounded-Medium',Helvetica] text-center text-5xl font-medium leading-[60px] tracking-[0] text-[#fffafa]">
          Đây là một tựa game đối kháng (Fighting Game) sở hữu lối chơi vô cùng
          mượt mà, nhưng lại cực kỳ thân thiện và dễ dàng tiếp cận ngay cả khi
          bạn là người mới bắt đầu bước chân vào thể loại này.
          <br />
          Để bắt đầu trải nghiệm, bạn muốn khám phá danh sách Nhân vật trước hay
          tìm hiểu về các Định nghĩa/Thuật ngữ trong game trước?
        </p>
      </section>

      <nav
        className="absolute left-0 top-0 z-10 h-[74px] w-[1926px]"
        aria-label="Main navigation"
      >
        <img
          className="absolute left-0 top-0 h-[74px] w-[1920px]"
          alt=""
          aria-hidden="true"
          src={rectangle47}
        />
        
        {navigationItems.map((item, index) => {
          const positionClasses = [
            "left-[1462px] top-[17px] h-[42px] w-[110px]",
            "left-[1608px] top-3.5 h-[47px] w-[90px]",
            "left-[1738px] top-[21px] h-[34px] w-40 whitespace-nowrap",
          ];

          return (
            <a
              key={item.label}
              className={`absolute flex items-center [font-family:'Pixelify_Sans-Medium',Helvetica] text-[32px] font-medium leading-[normal] tracking-[0] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${positionClasses[index]}`}
              href={item.href}
              rel={item.external ? "noopener noreferrer" : undefined}
              target={item.external ? "_blank" : undefined}
            >
              {item.label}
            </a>
          );
        })}

        <img
          className="absolute left-[1581px] top-2.5 h-[55px] w-px object-cover"
          alt=""
          aria-hidden="true"
          src={line1}
        />
        
        <img
          className="absolute left-[1710px] top-2.5 h-[55px] w-px object-cover"
          alt=""
          aria-hidden="true"
          src={line2}
        />
      </nav>

      <nav
        className="absolute left-0 top-0"
        aria-label="Explore game information"
      >
        {actionItems.map((item, index) => (
          <a
            key={item.label}
            id={item.label === "Glossary" ? "glossary" : undefined}
            className={`absolute top-[1715px] flex h-[151px] w-[414px] items-center justify-center rounded-[25px] border-[5px] border-solid border-white bg-black [font-family:'Pixelify_Sans-Regular',Helvetica] text-center text-[64px] font-normal leading-[normal] tracking-[0] text-white shadow-[0px_4px_4px_#00000040] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white ${
              index === 0 ? "left-[429px]" : "left-[1097px]"
            }`}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="contacts" className="sr-only" aria-label="Contacts">
        Contact information for Idol Showdown.
      </section>
    </main>
  );
};
