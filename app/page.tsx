'use client';

import Link from "next/link";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

interface Team {
  name: string,
  moxiePoints: number
}

export default function Home() {

  const firebaseConfig = {
    apiKey: "AIzaSyDnLORBcN6EBx2azGE9dl7A70XC7sDaje8",
    authDomain: "prs-moxie-votes.firebaseapp.com",
    databaseURL: "https://prs-moxie-votes-default-rtdb.firebaseio.com",
    projectId: "prs-moxie-votes",
    storageBucket: "prs-moxie-votes.firebasestorage.app",
    messagingSenderId: "944186277824",
    appId: "1:944186277824:web:a179b61e8dbbde9bb15225"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);



  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const pointsData = ref(database, 'MKE_4609');
    return onValue(pointsData, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      const collator = new Intl.Collator([], { numeric: true });
      const newTeams: Team[] = Object.keys(data).sort((a, b) => collator.compare(a, b)).map(key =>
        ({ name: key, moxiePoints: parseInt(data[key]) }));
      setTeams(newTeams);
      console.log(teams);
    });
  }, []);

  return (
    <>
      <header>
        Moxie Points!
      </header>
      <main>
        <br />
        {teams.map((team, index) =>
        (
          <div key={index}>
            <p>Team: {team.name}</p>
            <p>Moxie Points: {team.moxiePoints}</p>
            <br />
          </div>
        )
        )}
      </main>
      <footer>
        <Link href="https://powerracingseries.org">
          PowerRacingSeries
        </Link>
      </footer>
    </>
  );
}
