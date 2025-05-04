declare module "prismjs" {
  const Prism: {
    highlightAll: () => void;
    highlight: (code: string, grammar: any, language: string) => string;
    languages: {
      //@ts-ignore
      [language: string]: any;
    };
  };
  export default Prism;
}
