import React, { useState, useEffect } from 'react';
import { db } from './firebase-config'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';  // Import Firestore methods
import './ProblemSet.css';

const ProblemSet: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch problems from Firestore
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const problemsCollection = collection(db, 'problems');  // Reference to 'problems' collection
        const problemsSnapshot = await getDocs(problemsCollection);  // Fetch all documents from the collection
        console.log(problems)
        const problemsList = problemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProblems(problemsList);  // Set fetched problems to state
      } catch (err) {
        console.error('Failed to fetch problems:', err);
      }
    };
    fetchProblems();
  }, []);

  // Filter problems based on search term
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="problemset-container">
      <div className="problemset-body">
        <div className="problem-list">
          <div className="problemset-header">
            <h1>Problems</h1>
            <div className="filter-search">
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredProblems.map((problem) => (
            <div className="problem-item" key={problem.id}>
              <div className="problem-details">
                <h3>{problem.title}</h3>
                <div className="companies">
                  {problem.companies && problem.companies.map((company: string, i: number) => (
                    <span key={i}>{company}</span>
                  ))}
                </div>
              </div>
              <div className="problem-info">
                <span>{problem.difficulty}</span>
                <span>{problem.submissions}</span>
                <span>{problem.successRate}</span>
              </div>
              <button className="solve-btn" onClick={() => window.location.href = `/solve/${problem.id}`}>Solve</button>
            </div>
          ))}
        </div>

        <div className="problem-sidebar">
          <div className="problem-of-the-day">
            <h2>Problem of the Day</h2>
            <h3>Largest Pair Sum</h3>
            <div className="timer">08 : 14 : 31</div>
            <button className="solve-problem-btn">Solve Problem</button>
          </div>

          <div className="job-hiring-challenge">
            <h2>Job-A-Thon Hiring Challenge</h2>
            <p>Find better job opportunities this summer with free hiring contest for you!</p>
            <a href="/register" className="register-now">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;
