import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Textarea from "@/components/textarea";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [subject, setSubject] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keywords, setKeywords] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const subjectChange = (e) => {
    setSubject(e.target.value);
  };

  const targetAudienceChange = (e) => {
    setTargetAudience(e.target.value);
  };

  const keywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  const generate = () => {
    console.log("hello");
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.left}>
          <Textarea
            placeholder="Add subject"
            value={subject}
            onChange={subjectChange}
            label="Subject"
            description="Add subject up to 100 characters"
          />
          <Textarea
            placeholder="Add target audience"
            value={targetAudience}
            onChange={targetAudienceChange}
            label="Target audience"
            description="Explaining target audience field"
          />
          <Textarea
            placeholder="Add keywords"
            value={keywords}
            onChange={keywordsChange}
            rows={3}
            label="Keywords"
            description="Explaining keywords field"
          />
          <div className={styles.keywords}>
            {keywords &&
              keywords.split(",").map((keyword) => {
                return (
                  <p key={keyword.trim()} className={styles.keyword}>
                    {keyword}
                  </p>
                );
              })}
          </div>
          <button className={styles.button}>Generate</button>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            Bla bla bla redirects here. For the car, see Toyota Ipsum.
          </div>
          <div className={styles.content}>
            32 Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
            sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos, qui ratione voluptatem sequi nesciunt, neque porro
            quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur
            adipisci[ng] velit, sed quia non numquam [do] eius modi tempora
            inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem.
            Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam
            corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
            consequatur? [D]Quis autem vel eum i[r]ure reprehenderit, qui in ea
            voluptate velit esse, quam nihil molestiae consequatur, vel illum,
            qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero
            eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis
            praesentium voluptatum deleniti atque corrupti, quos dolores et quas
            molestias excepturi sint, obcaecati cupiditate non provident,
            similique sunt in culpa, qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio, cumque nihil impedit, quo minus id, quod maxime
            placeat, facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet, ut et voluptates repudiandae
            sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat. 32] Sed
            ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
            sit, aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos, qui ratione voluptatem sequi nesciunt, neque porro
            quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur
            adipisci[ng] velit, sed quia non numquam [do] eius modi tempora
            inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem.
            Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam
            corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
            consequatur? [D]Quis autem vel eum i[r]ure reprehenderit, qui in ea
            voluptate velit esse, quam nihil molestiae consequatur, vel illum,
            qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero
            eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis
            praesentium voluptatum deleniti atque corrupti, quos dolores et quas
            molestias excepturi sint, obcaecati cupiditate non provident,
            similique sunt in culpa, qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio, cumque nihil impedit, quo minus id, quod maxime
            placeat, facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet, ut et voluptates repudiandae
            sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </div>
        </div>
      </main>
    </>
  );
}
