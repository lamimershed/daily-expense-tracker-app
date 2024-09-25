import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Markdown = ({ data }: any) => {
  const components = {
    u: (props: any) => {
      return <u style={{ textDecoration: "underline" }}>{props.children}</u>;
    },
    a: (props: any) => {
      return (
        <a
          style={{ textDecoration: "underline" }}
          href={props.href}
          target="_blank"
          rel="noreferrer"
          className=" text-[blue] dark:text-[white] "
        >
          {props.children}
        </a>
      );
    },
    h1: (props: any) => {
      return (
        <h1
          style={{ fontSize: "2em", margin: "0.67em 0", fontWeight: "bold" }}
          className=" text-[#1c2534] dark:text-[white]"
        >
          {props.children}
        </h1>
      );
    },
    h2: (props: any) => {
      const id = props.children.replace(/ /g, "");
      return (
        <h2
          id={id}
          className="m-[10px_0px_20px] text-left font-playfair text-[24px] font-semibold text-[#000000] xl:text-[20px] 3xl:text-[26px]"
        >
          {props.children}
        </h2>
      );
    },
    h3: (props: any) => {
      return (
        <h3 className="m-[10px_0px_20px] text-left font-playfair text-[22px] font-semibold text-[#000000] xl:text-[18px] 3xl:text-[24px]">
          {props.children}
        </h3>
      );
    },
    h4: (props: any) => {
      return (
        <h4 className="m-[10px_0px_20px] text-left font-playfair text-[20px] font-semibold text-[#000000] xl:text-[16px] 3xl:text-[22px]">
          {props.children}
        </h4>
      );
    },
    h5: (props: any) => {
      return (
        <h5
          style={{ fontSize: "0.83em", margin: "1.67em 0", fontWeight: "bold" }}
          className=" text-[#1c2534] dark:text-[white]"
        >
          {props.children}
        </h5>
      );
    },
    h6: (props: any) => {
      return (
        <h6
          style={{ fontSize: "0.67em", margin: "2.33em 0", fontWeight: "bold" }}
          className=" text-[#1c2534] dark:text-[white]"
        >
          {props.children}
        </h6>
      );
    },
    p: (props: any) => {
      return (
        <p className="m-[10px_0px_20px] text-left text-[16px] text-[#000000] xl:text-[16px] 3xl:text-[18px]">
          {props.children}
        </p>
      );
    },
    ul: (props: any) => {
      return (
        <ul
          className="ml-[20px] list-disc text-[#1c2534] dark:text-[white]"
          style={{ fontSize: "1em", fontWeight: "normal" }}
        >
          {props.children}
        </ul>
      );
    },
    li: (props: any) => {
      return (
        <li
          style={{ fontSize: "1em", margin: "0.5em 0", fontWeight: "normal" }}
          className=" text-left text-[16px] text-[#000000] xl:text-[16px] 3xl:text-[18px]"
        >
          {props.children}
        </li>
      );
    },
    ol: (props: any) => {
      return (
        <ol
          className="ml-[18px] list-decimal text-[#1c2534] dark:text-[white]"
          style={{
            fontSize: "1em",
            fontWeight: "normal",
            counterReset: "list-counter",
          }}
        >
          {props.children}
        </ol>
      );
    },
    strong: (props: any) => {
      return (
        <strong className=" font-semibold text-[#1c2534] dark:text-[white]">
          {props.children}
        </strong>
      );
    },
    em: (props: any) => {
      return (
        <em className=" text-[#1c2534] dark:text-[white]">{props.children}</em>
      );
    },
    table: (props: any) => {
      return (
        // rounded-[10px] border-[2px] border-[#c2c6ce]
        <section className="my-[20px] overflow-auto">
          <table className="w-full table-auto border-separate border-spacing-0 rounded-[10px]  border-[1px] border-[#c2c6ce] text-white dark:bg-[#263843]  lg:table-fixed">
            {props.children}
          </table>
          {/* // <table className='w-full table-fixed border-collapse'>{props.children}</table> */}
        </section>
      );
    },
    th: (props: any) => {
      return (
        <th className="border-[1px] border-[#c2c6ce] p-[15px] text-[18px]   font-semibold first:rounded-tl-[10px] last:rounded-tr-[10px] dark:text-white">
          {props.children}
        </th>
      );
    },
    td: (props: any) => {
      return (
        <td className="border-[1px]  border-[#c2c6ce] p-[15px] dark:text-white">
          {props.children}
        </td>
      );
    },
    tr: (props: any) => {
      return (
        <tr className="last:table-row dark:text-white">{props.children}</tr>
      );
    },
    img: (props: any) => {
      return (
        <img
          src={props.src}
          alt={props.alt}
          width={800}
          height={400}
          className="m-auto"
        />
      );
    },
    blockquote: (props: any) => {
      return (
        <div className="rounded-xl bg-[#eefeffbf] p-[20px]">
          {props.children}
        </div>
      );
    },
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        ...components,
      }}
    >
      {data}
    </ReactMarkdown>
  );
};

export default Markdown;
