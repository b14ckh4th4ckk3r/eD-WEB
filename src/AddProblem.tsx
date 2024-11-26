import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import './AddProblem.css';

const AddProblem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [example, setExample] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [companies, setCompanies] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle adding a new test case
  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Prepare data for Firestore
      const problemData = {
        title,
        description,
        difficulty,
        example,
        testCases,
        companies: companies.split(',').map((item) => item.trim()).filter(Boolean),
        tags: tags.split(',').map((item) => item.trim()).filter(Boolean),
      };

      // Add problem data to Firestore
      const docRef = await addDoc(collection(db, "problems"), problemData);

      console.log('Problem added:', docRef.id);
      alert('Problem added successfully!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to add problem.');
      console.error(error);
    }
  };

  // Form validation
  const validateForm = () => {
    if (!title || !description || !example || !companies || !tags) {
      setError('All fields are required.');
      return false;
    }

    // Check if test cases are valid
    if (testCases.some((tc) => !tc.input.trim() || !tc.output.trim())) {
      setError('All test cases must have input and output values.');
      return false;
    }

    setError('');
    return true;
  };

  return (
    <div className="add-problem-container">
      <div className="add-problem-form">
        <h1>Add New Problem</h1>
        <form onSubmit={handleSubmit}>
          <label>Problem Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label>Example</label>
          <textarea
            value={example}
            onChange={(e) => setExample(e.target.value)}
            required
          />

          <div className="test-case-container">
            <h3>Test Cases</h3>
            {testCases.map((testCase, index) => (
              <div key={index} className="test-case">
                <label>Test Case {index + 1} Input</label>
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].input = e.target.value;
                    setTestCases(newTestCases);
                  }}
                  placeholder="Input"
                  required
                />

                <label>Test Case {index + 1} Output</label>
                <input
                  type="text"
                  value={testCase.output}
                  onChange={(e) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].output = e.target.value;
                    setTestCases(newTestCases);
                  }}
                  placeholder="Output"
                  required
                />

                <button
                  type="button"
                  onClick={() => {
                    const newTestCases = testCases.filter((_, i) => i !== index);
                    setTestCases(newTestCases);
                  }}
                  className="delete-test-case-btn"
                >
                  Delete Test Case
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddTestCase} className="add-test-case-btn">
              Add Test Case
            </button>
          </div>

          <label>Companies (comma-separated)</label>
          <input
            type="text"
            value={companies}
            onChange={(e) => setCompanies(e.target.value)}
            placeholder="e.g., Google, Amazon"
            required
          />

          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., Arrays, Dynamic Programming"
            required
          />

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <button type="submit" className="submit-btn">
              Submit Problem
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
