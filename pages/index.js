import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Textarea from "../components/textarea";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import robot from "@/assets/robot-small.png";
import logo from "@/assets/PromptChainLogo.svg";
import Loader from "@/components/loader/loader";
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
    "Load it and they will come",
    "Convincing AI not to turn evil..",
    "There is no spoon. Because we are not done loading it",
    "Your left thumb points to the right and your right thumb points to the left.",
    "How did you get here?",
    "Wait, do you smell something burning?",
    "Computing the secret to life, the universe, and everything.",
    "When nothing is going right, go left!!...",
    "I love my job only when I'm on vacation...",
    "I'm not lazy, I'm just relaxed!!",
    "Never steal. The government hates competition....",
    "Why are they called apartments if they are all stuck together?",
    "Life is Short – Talk Fast!!!!",
    "Optimism – is a lack of information.....",
    "Save water and shower together",
    "Whenever I find the key to success, someone changes the lock.",
    "Sometimes I think war is God’s way of teaching us geography.",
    "I’ve got a problem for your solution…..",
    "Where there’s a will, there’s a relative.",
    "User: the word computer professionals use when they mean !!idiot!!",
    "Adults are just kids with money.",
    "I think I am, therefore, I am. I think.",
    "A kiss is like a fight, with mouths.",
    "You don’t pay taxes—they take taxes.",
    "Coffee, Chocolate, Men. The richer the better!",
    "I am free of all prejudices. I hate everyone equally.",
    "git happens",
    "May the forks be with you",
    "A commit a day keeps the mobs away",
    "This is not a joke, it's a commit.",
    "Constructing additional pylons...",
    "Roping some seaturtles...",
    "Locating Jebediah Kerman...",
    "We are not liable for any broken screens as a result of waiting.",
    "Hello IT, have you tried turning it off and on again?",
    "If you type Google into Google you can break the internet",
    "Well, this is embarrassing.",
    "What is the airspeed velocity of an unladen swallow?",
    "Hello, IT... Have you tried forcing an unexpected reboot?",
    "They just toss us away like yesterday's jam.",
    "They're fairly regular, the beatings, yes. I'd say we're on a bi-weekly beating.",
    "The Elders of the Internet would never stand for it.",
    "Space is invisible mind dust, and stars are but wishes.",
    "Didn't know paint dried so quickly.",
    "Everything sounds the same",
    "I'm going to walk the dog",
    "I didn't choose engineering life. The engineering life chose me.",
    "Dividing by zero...",
    "Spawn more Overlord!",
    "If I’m not back in five minutes, just wait longer.",
    "Chuck Norris never git push. The repo pulls before.",
    "PromptChainer developers do it with <style>",
    "I need to git pull --my-life-together",
    "Proving P=NP...",
    "Trying to sort in O(n)...",
    "Please wait while the intern refills his coffee.",
    "Please hold on as we reheat our coffee",
    "Kindly hold on as we convert this bug to a feature...",
    "Kindly hold on as our intern quits PromptChainer...",
    "Winter is coming...",
    "Distracted by cat gifs",
    "Finding someone to hold my beer",
    "BRB, working on my side project",
    "TODO: Insert a witty loading message",
    "Let's hope it's worth the wait",
    "Aw, snap! Not..",
    "Ordering 1s and 0s...",
    "Updating dependencies...",
    "Whatever you do, don't look behind you...",
    "Please wait... Consulting the manual...",
    "It is dark. You're likely to be eaten by a grue.",
    "Loading funny message...",
    "Waiting for Daenerys to say all her titles...",
    "Feel free to spin in your chair",
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
              <h2 className={styles.outputTitle}>{output.name}</h2>
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
      return (
        <div className={styles.empty}>
          <Image src={robot} alt="robot" height={200} width={200} />
          <p>Add your inputs and click the button to generate content!</p>
        </div>
      );
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
          <div className={styles.fieldsHolder}>
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
              isKeywords={true}
              description="Seperate keywords by commas."
            />

            <Textarea
              placeholder="Start typing, fear not!"
              value={targetAudience}
              onChange={targetAudienceChange}
              label="Target Audience"
              description="Who's your target audience? For example: purple looking people, bfs that break up with you although you're a lovely gal, etc."
            />
            <Textarea
              placeholder="Start typing, fear not!"
              value={personalNotes}
              onChange={personalNotesChange}
              label="Personal Notes"
              description="Any personal notes or additional instructions."
              rows={2}
            />
          </div>
          <div className={styles.buttonHolder}>
            <button className={styles.button} onClick={sendInputsToAPI}>
              {loading ? "Hold on tight" : "Generate"}
            </button>
          </div>
        </div>
        <div className={styles.outputArea}>
          <div className={styles.right}>
            <div
              className={`${styles.nav} ${loading ? styles.navLoading : ""}`}
            >
              <h1>
                Content<span>Gen</span>
              </h1>
              <Link target="_blank" href="https://promptchainer.io/">
                <div className={styles.poweredBy}>
                  <p>Powered by:</p> <Image alt="logo" src={logo} height={20} />
                </div>
              </Link>
            </div>
            <div className={styles.contentHolder}>
              <div
                className={`${styles.content} ${
                  apiResponse === null ? styles.emptyHolder : ""
                }`}
              >
                {loading ? (
                  <div className={styles.loader}>
                    <Loader />
                    <p>{randomSentence}</p>
                  </div>
                ) : (
                  renderOutputs()
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
