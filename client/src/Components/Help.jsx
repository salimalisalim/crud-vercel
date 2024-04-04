import React, { useState } from 'react';

function Help() {
  
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    setExpandedQuestion(expandedQuestion === questionIndex ? null : questionIndex);
  };

  const questions = [
    {
      question: 'Can I easily create an account by providing my name, email, and password?',
      answer: 'Yes, you can easily create an account by providing your name, email, and password.',
    },
    {
      question: 'If I enter an existing email during registration, does the system correctly inform me that the account already exists?',
      answer: 'Yes, the system correctly informs you if the entered email already exists, and it displays a modal indicating that an account with that email is already registered.',
    },{
      question: 'Can I log in with my registered email and password without any issues?',
      answer: 'Yes, you can log in with your registered email and password without any issues.',
    },{
      question: 'If I enter an incorrect password, does the system provide a clear error message??',
      answer: 'If you enter an incorrect password, the system provides a clear error message stating "Incorrect Password.',
    },{
      question: 'Can I easily choose my preference on emergency medical consent?',
      answer: 'Yes, you can easily choose your preference regarding emergency medical consent through the provided radio buttons.',
    },{
      question: 'Once logged in, can I view and edit my profile information?',
      answer: 'Yes, once logged in, you can view and edit your profile information.',
    },{
      question: 'If I decide to delete my profile, is the process clear and straightforward?',
      answer: 'If you decide to delete your profile, the process is clear and straightforward, and there is a confirmation modal before deletion.',
    },{
      question: 'Can I successfully log out from my account when needed?',
      answer: 'Yes, you can successfully log out from your account when needed, and after logging out, you are redirected appropriately.',
    },{
      question: 'Does the app work smoothly on different browsers?',
      answer: 'Yes, the app works smoothly on different browsers like Chrome, Firefox, and Safari.',
    },{
      question: 'Does the app provide a consistent experience across various devices and screen sizes?',
      answer: 'Yes, the app provides a consistent experience across various devices and screen sizes.',
    },
    
    {
      question: 'If I submit a form with missing information, do I receive clear instructions on what needs to be corrected?',
      answer: 'If you submit a form with missing information, you receive clear instructions on what needs to be corrected.',
    },
    {
      question: 'Are there any unexpected pop-ups or modals that may confuse me during my interaction with the app?      ',
      answer: 'There are no unexpected pop-ups or modals that may confuse you during your interaction with the app.',
    },


  ];

  return (
    <div className="help-container">
      <h2>FAQs</h2>

      {questions.map((q, index) => (
        <div key={index} className="faq-card">
          <div className="faq-question" onClick={() => toggleQuestion(index)}>
            {q.question}
          
          </div>
          {expandedQuestion === index && (
            <div className="faq-answer bg-warning">
              <p>{q.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Help;