import Head from 'next/head';
import {GetServerSideProps} from 'next'

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Contdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/user.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface GithubUser {
  name: string;
  avatar_url: string;
}

interface HomeProps {
  user: GithubUser;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const { user } = props;
  
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
		  <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile {...user} />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
	  </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { username } = ctx.params;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return {
    props: {
      user,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}