import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase-config';  // Import your Firebase config file
import { doc, getDoc } from 'firebase/firestore';
import MonacoEditor from '@monaco-editor/react';
import './SolveProblem.css';

const SolveProblem: React.FC = () => {
  const { id } = useParams(); // Get the problem ID from the URL
  const [problem, setProblem] = useState<any>(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [testCaseInput, setTestCaseInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // Reference the specific problem in Firestore by ID
        const docRef = doc(db, 'problems', id!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProblem(docSnap.data()); // Set the fetched problem data
          setIsLoading(false);
        } else {
          setError('Problem not found.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching problem:', err);
        setError('Failed to load the problem. Please try again later.');
        setIsLoading(false);
      }
    };

    if (id) fetchProblem();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!problem) {
    return <div>No problem found.</div>;
  }

  // Handlers for running and submitting code
  const handleRun = () => {
    // Simulate running the code (mock output for now)
    setOutput('Test Case Passed! Output: [0, 1]');
  };

  const handleSubmit = () => {
    // Simulate submission logic
    setOutput('All Test Cases Passed!');
  };

  return (
    <div className="solve-problem-container">
      {/* Left: Problem Description */}
      <div className="problem-description">
        <h1>{problem.title}</h1>
        <p>Difficulty: <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></p>
        <p>{problem.description}</p>
        <h3>Examples:</h3>
        <p>{problem.example}</p>
      </div>

      {/* Right: Code Editor + Test Cases */}
      <div className="code-section">
        <div className="code-editor-container">
          <div className="editor-header">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
            <div className="buttons">
              <button onClick={handleRun} className="run-btn">Run</button>
              <button onClick={handleSubmit} className="submit-btnn">Submit</button>
            </div>
          </div>
          <MonacoEditor
            height="300px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
          />
        </div>

        {/* Test Case Section */}
        <div className="test-case-section">
          <h3>Test Cases</h3>
          <textarea
            value={testCaseInput}
            onChange={(e) => setTestCaseInput(e.target.value)}
            placeholder="Enter custom test case input here..."
          />
          <h3>Output</h3>
          <pre className="output">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default SolveProblem;
