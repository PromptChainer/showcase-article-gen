import Head from "next/head";
import Script from "next/script";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Textarea from "../components/textarea/textarea";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import robot from "@/assets/robot-small.png";
import logo from "@/assets/PromptChainLogo.svg";
import Loader from "@/components/loader/loader";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [personalNotes, setPersonalNotes] = useState("");

  const loaderSentences = [
    "Orit rules this land together with Aryeh the grand shepherd ❤️",
    "Making funny faces to AI to stop it from world domination...",
    "Making the AI powering hamsters sweat real good...",
    "Load it and they will come.",
    "Having a philosophical chat with AI about right and wrong...",
    "Computing the secret to life. Or love. Or both.",
    "Never steal. The government hates competition...",
    "Optimism is a lack of information...",
    "Save water and shower together",
    "I’ve got a problem for your solution...",
    "Where there’s a will, there’s a relative.",
    "git happens",
    "May the forks be with you",
    "A commit a day keeps the doctor away",
    "The Elders of the Internet would never stand for it.",
    "I'm gonna walk my dog, brb",
    "Dividing by zero, muahahaha...",
    "Chuck Norris never git push. The repo pulls before.",
    "PromptChainer developers do it with <style>",
    "I need to git pull --my-life-together",
    "Proving P=NP...",
    "Please wait while the intern refills his coffee...",
    "Kindly hold on as our intern quits PromptChainer, this race isn't for the weak hearted...",
    "Distracted by adorable dog gifs...",
    "Finding someone to hold my beer...",
    "BRB, working on my side project...",
    "TODO: Insert a witty loading message...",
    "Let's hope it's worth the wait, eh?...",
    "Making 1s and 0s rain down upon you...",
    "Whatever you do, don't look behind you.",
    "Please wait, consulting the manual...",
    "Loading a funny message...",
    "Waiting for Daenerys to finish announcing all her titles...",
    "Feel free to spin in your chair...",
    "How many plants are currently in Promptchainer's office? Mail us your guess and the winner gets a filthy burgundy bean bag.",
    "Waiting for Ofir's character to walk so so slowly in Heroes...",
    "Waiting for Dani to finish playing his guitar...",
    "Waiting to finish listening to Simon's ideas for the future...",
    "Waiting for Stoyan to finish his 5 hours workout...",
    "Waiting for Aryeh and Chasey to finish barking at the door...",
  ];

  const [randomSentence, setRandomSentence] = useState(
    loaderSentences[Math.floor(Math.random() * loaderSentences.length)]
  );

  const setNewRandomSentence = () => {
    const newSentence =
      loaderSentences[Math.floor(Math.random() * loaderSentences.length)];
    setRandomSentence(newSentence);
  };

  const calculateDisplayTime = (sentence) => {
    // Each word displays for 300ms, then a 50ms wait between words, then a 2s wait after the sentence
    return sentence.split(" ").length * 400 + 2000;
  };

  useEffect(() => {
    const sentenceInterval = setInterval(() => {
      setNewRandomSentence();
    }, calculateDisplayTime(randomSentence));

    return () => {
      clearInterval(sentenceInterval);
    };
  }, [randomSentence]);

  const validateForm = () => {
    if (!subject && !keywords && !targetAudience && !personalNotes) {
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  const sendInputsToAPI = async () => {
    if (!validateForm()) {
      return;
    }

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

  const LoaderComponent = () => {
    const [currentSentenceIdx, setCurrentSentenceIdx] = useState(
      Math.floor(Math.random() * loaderSentences.length)
    );
    const currentDisplaySentence = randomSentence;
    const [displayTimeout, setDisplayTimeout] = useState(null);

    const calculateDisplayTime = (sentence) => {
      // Each word displays for 300ms, then a 50ms wait between words, then a 2s wait after the sentence
      return sentence.split(" ").length * 400 + 2000;
    };

    useEffect(() => {
      // Clear existing timeout
      if (displayTimeout) {
        clearTimeout(displayTimeout);
      }

      // Set new timeout
      const newTimeout = setTimeout(() => {
        const nextSentenceIdx =
          (currentSentenceIdx + 1) % loaderSentences.length;
        setCurrentSentenceIdx(nextSentenceIdx);
        setRandomSentence(loaderSentences[nextSentenceIdx]);
      }, calculateDisplayTime(currentDisplaySentence));

      // Save the timeout ID for clearing it later
      setDisplayTimeout(newTimeout);

      // Cleanup on unmount or update
      return () => clearTimeout(newTimeout);
    }, [currentDisplaySentence, currentSentenceIdx]);

    return (
      <div className={styles.loader}>
        <Loader />
        <p>
          {currentDisplaySentence.split(" ").map((word, wordIdx) => (
            <span
              className={styles["fade-in-word"]}
              key={wordIdx}
              style={{
                animationDelay: `${wordIdx * 250}ms`, // Word display duration
              }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    );
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
          <p>Add inputs and click the button to generate content</p>
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>ContentGen</title>
        <meta name="description" content="Generated by PromptChainer" />
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
              {loading
                ? "Baking an article"
                : "Generate an article, save my time!"}
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
                {loading ? <LoaderComponent /> : renderOutputs()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <a
        href="https://blog.promptchainer.io/p/use-case-custom-built-article-writer"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.blogPostLink}
      >
        Wanna know how we activated this chain of prompts in a matter of minutes?
      </a>
    </>
  );
}
