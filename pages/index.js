import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Textarea from "../components/textarea";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [personalNotes, setPersonalNotes] = useState("");
  // Use dev only. Comment for prod:
  // const [subject, setSubject] = useState("Car loans in the USA");
  // const [keywords, setKeywords] = useState("car loan");
  // const [targetAudience, setTargetAudience] = useState("car buyers");
  // const [personalNotes, setPersonalNotes] = useState(
  //   "PromptChainer is a revolutionary visual flow builder that enables users to design and fine-tune AI prompt chains with unparalleled ease and precision. By integrating AI and traditional programming methodologies, it opens up a world of possibilities for both coders and non-coders alike. With its intuitive interface, users can create customized AI-driven solutions, ranging from chatbots to content generation, all within a simple, visually-guided environment. As PromptChainer continues to evolve, it aims to make complex AI integrations accessible and manageable for a diverse range of users, driving innovation and empowering businesses across various industries."
  // );

  const loaderSentences = [
    "Distracting AI from world domination plans...",
    "Teaching AI to write sonnets...",
    "Running the hamsters powering the AI...",
  ];
  const randomSentence =
    loaderSentences[Math.floor(Math.random() * loaderSentences.length)];

  const sendInputsToAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://prod.api.promptchainer.io/api/flows/run/clhez045u0003s10gwx7xgr8o",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            variables: {
              subject,
              keywords,
              targetAudience,
              personalNotes,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApiResponse(data);
      } else {
        throw new Error(
          "Something went wrong with the promptchainer.io API call"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const subjectChange = (e) => {
    setSubject(e.target.value);
  };

  const targetAudienceChange = (e) => {
    setTargetAudience(e.target.value);
  };

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const personalNotesChange = (e) => {
    setPersonalNotes(e.target.value);
  };

  const renderOutputs = () => {
    if (apiResponse) {
      const outputs = apiResponse.filter((item) => item.type === "output");

      const renderSection = (sectionName) => {
        const section = outputs.find((output) => output.name === sectionName);
        return section ? (
          <>
            <div className={styles.outputTitle}>{section.name}</div>
            <div className={styles.outputContent}>{section.output}</div>
          </>
        ) : null;
      };

      const renderArticle = () => {
        const titles = [
          "Title 1",
          "Title 2",
          "Title 3",
          "Title 4",
          "Title Conclusion",
        ];
        const paragraphs = [
          "Paragraph 1",
          "Paragraph 2",
          "Paragraph 3",
          "Paragraph 4",
          "Conclusion Paragraph",
        ];
        return (
          <>
            {titles.map((title, index) => {
              const titleOutput = outputs.find(
                (output) => output.name === title
              );
              const paragraphOutput = outputs.find(
                (output) => output.name === paragraphs[index]
              );
              return (
                <>
                  <div className={styles.outputTitle}>
                    {titleOutput?.output}
                  </div>
                  <div className={styles.outputContent}>
                    {paragraphOutput?.output}
                  </div>
                </>
              );
            })}
          </>
        );
      };

      const requiredSections = [
        "Topics",
        "Opening",
        "Meta Description",
        "TL;DR",
      ];
      const otherOutputs = outputs.filter(
        (output) =>
          !requiredSections.includes(output.name) &&
          !output.name.startsWith("Title") &&
          !output.name.startsWith("Paragraph") &&
          !output.name.endsWith("Paragraph")
      );

      return (
        <>
          {renderSection("Topics")}
          {renderSection("Opening")}
          {renderArticle()}
          {otherOutputs.map((output) => (
            <>
              <div className={styles.outputTitle}>{output.name}</div>
              <div className={styles.outputContent}>{output.output}</div>
            </>
          ))}
          <br />
          <br />
          {renderSection("Meta Description")}
          {renderSection("TL;DR")}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>ContentGen</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.left}>
          <Textarea
            placeholder="Start typing, fear not!"
            value={subject}
            onChange={subjectChange}
            label="Subject"
            description="What would you like the article to be about? It can be more than one word."
          />
          <Textarea
            placeholder="Start typing, fear not!"
            value={keywords}
            onChange={keywordsChange}
            label="Keywords"
            description="What would you like the content to include? It can be anything!"
          />
          <Textarea
            placeholder="Start typing, fear not!"
            value={targetAudience}
            onChange={targetAudienceChange}
            label="Target Audience"
            description="Who's your target audience? For example: purple looking people, breaking up bfs, etc."
          />
          <Textarea
            placeholder="Start typing, fear not!"
            value={personalNotes}
            onChange={personalNotesChange}
            label="Personal Notes"
            description="Any personal notes or additional instructions."
          />

          <button className={styles.button} onClick={sendInputsToAPI}>
            Generate
          </button>
        </div>
        <div className={styles.outputArea}>
          <div className={styles.right}>
            <div className={styles.nav}>
              <h1>
                Content<span>Gen</span>
              </h1>
            </div>
            <div className={styles.content}>
              {loading ? (
                <div className={styles.loader}>
                  <img
                    src="https://thumbs.gfycat.com/AgonizingImaginaryInvisiblerail-max-1mb.gif"
                    alt="Loading"
                  />
                  <p>{randomSentence}</p>
                </div>
              ) : (
                renderOutputs()
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
