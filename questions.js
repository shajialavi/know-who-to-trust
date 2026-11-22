/* ===================================================================
   PERSONALITY TEST CONTENT  (edit freely)
   Each question:  [ areaKey, traitKey, "Question text", healthyAnswer ]
     areaKey       : "trust" | "updown" | "work"  (the three coaching programmes)
     traitKey      : one of the 12 personality areas listed in "traits" below
     healthyAnswer : "y" if YES is the healthy answer, "n" if NO is the healthy answer
   Scoring: healthy answer = 2 points, Maybe = 1, other answer = 0.
   Each programme and each personality area gets a percentage. The lowest ones are the "dipping points",
   the highest ones are the "rising points". Selection: 34 + 33 + 33 = 100 questions.
   =================================================================== */
window.QUIZ_BANK = {
 "testName": "The Know Who To Trust Personality Test",
 "areas": {
  "trust": {
   "name": "Know Who To Trust",
   "advice": "Your answers suggest you would gain most from learning to read people and decide whom to trust. In Know Who To Trust you learn to observe behaviour clearly, understand what drives people and build relationships you can rely on."
  },
  "updown": {
   "name": "Handling the Ups and Downs in Life",
   "advice": "Your answers indicate that managing setbacks, keeping your emotional balance and handling difficult people deserve more attention. This programme helps you understand what pulls your life up and down, and gives you practical ways to handle it."
  },
  "work": {
   "name": "Problems of Work",
   "advice": "Your answers point to friction in how you handle responsibility, communication or follow-through at work. This programme gives you practical ways to deal with people and problems at work with confidence."
  }
 },
 "traits": [
  {
   "key": "warm",
   "area": "trust",
   "name": "Warmth & Friendliness",
   "short": "Warmth",
   "dip": "Connecting openly and warmly with people may feel harder than it should."
  },
  {
   "key": "read",
   "area": "trust",
   "name": "Reading & Trusting People",
   "short": "Reading|People",
   "dip": "You may be trusting too quickly, or doubting too much, without a clear way to read people."
  },
  {
   "key": "honest",
   "area": "trust",
   "name": "Honesty & Fairness",
   "short": "Honesty",
   "dip": "Balancing fairness with personal interest may need attention."
  },
  {
   "key": "understand",
   "area": "trust",
   "name": "Understanding Others",
   "short": "Under-|standing",
   "dip": "Hasty words and misunderstandings may be costing you good relationships."
  },
  {
   "key": "balance",
   "area": "updown",
   "name": "Emotional Balance",
   "short": "Emotional|Balance",
   "dip": "Your moods may swing more than you would like, especially under pressure."
  },
  {
   "key": "worry",
   "area": "updown",
   "name": "Worry & Peace of Mind",
   "short": "Peace of|Mind",
   "dip": "Past events and worries may be taking up too much space in your mind."
  },
  {
   "key": "bounce",
   "area": "updown",
   "name": "Bouncing Back",
   "short": "Bouncing|Back",
   "dip": "Setbacks and change may take longer to recover from than they should."
  },
  {
   "key": "difficult",
   "area": "updown",
   "name": "Handling Difficult People",
   "short": "Difficult|People",
   "dip": "Other people's pressure, moods and opinions may be affecting you strongly."
  },
  {
   "key": "resp",
   "area": "work",
   "name": "Responsibility & Decisions",
   "short": "Decisions",
   "dip": "Taking charge and deciding firmly may feel uncomfortable."
  },
  {
   "key": "drive",
   "area": "work",
   "name": "Drive & Follow-through",
   "short": "Follow-|through",
   "dip": "Starting, planning and finishing tasks on time may be a struggle."
  },
  {
   "key": "conf",
   "area": "work",
   "name": "Confidence & Communication",
   "short": "Confidence",
   "dip": "Speaking up and expressing yourself clearly may be holding you back."
  },
  {
   "key": "feedback",
   "area": "work",
   "name": "Accepting Feedback",
   "short": "Feedback",
   "dip": "Criticism, blame and disagreement may be harder to handle than they should."
  }
 ],
 "questions": [
  [   "trust",
   "warm",
   "Are you considered warm-hearted by your friends?",
   "y"
  ],
  [   "trust",
   "warm",
   "Do people enjoy being in your company?",
   "y"
  ],
  [   "trust",
   "warm",
   "Are you friendly in your voice, attitude and expression?",
   "y"
  ],
  [   "trust",
   "warm",
   "Do other people interest you very much?",
   "y"
  ],
  [   "trust",
   "warm",
   "Do you have many warm friends?",
   "y"
  ],
  [   "trust",
   "warm",
   "Are you normally considered cold by others?",
   "n"
  ],
  [   "trust",
   "warm",
   "Do you make efforts to get others to laugh and smile?",
   "y"
  ],
  [   "trust",
   "warm",
   "Would you stop and find out whether a person needs help, even if they have not asked you?",
   "y"
  ],
  [   "trust",
   "warm",
   "Do you laugh or smile quite readily?",
   "y"
  ],
  [   "trust",
   "read",
   "Are you suspicious of people who ask to borrow money from you?",
   "y"
  ],
  [   "trust",
   "read",
   "Do you often feel that people are looking at you or talking about you behind your back?",
   "n"
  ],
  [   "trust",
   "read",
   "If you lose an article, do you get the idea that someone must have stolen it?",
   "n"
  ],
  [   "trust",
   "read",
   "Do you sometimes wonder if anyone really cares about you?",
   "n"
  ],
  [   "trust",
   "read",
   "Can you trust your own judgment in an emotional situation in which you are involved?",
   "y"
  ],
  [   "trust",
   "read",
   "When asked to make a decision, would you be swayed by your like or dislike of the person involved?",
   "n"
  ],
  [   "trust",
   "read",
   "Do you completely condemn a person because he is a rival or opponent?",
   "n"
  ],
  [   "trust",
   "read",
   "Do you make allowances for your friends, whereas with others you might judge more severely?",
   "n"
  ],
  [   "trust",
   "honest",
   "Are you usually truthful to others?",
   "y"
  ],
  [   "trust",
   "honest",
   "Do you pay your debts and keep your promises when it is possible?",
   "y"
  ],
  [   "trust",
   "honest",
   "Do you consider the good of everyone concerned rather than only your own advantage?",
   "y"
  ],
  [   "trust",
   "honest",
   "Do you find it easy to be impartial?",
   "y"
  ],
  [   "trust",
   "honest",
   "Are your decisions swayed by personal interests?",
   "n"
  ],
  [   "trust",
   "honest",
   "Do you sometimes give away articles which, strictly speaking, do not belong to you?",
   "n"
  ],
  [   "trust",
   "honest",
   "If you saw an article in a shop obviously marked lower than its correct price by mistake, would you try to get it at that price?",
   "n"
  ],
  [   "trust",
   "honest",
   "If you were involved in a slight accident, would you take the trouble to make good any damage you caused?",
   "y"
  ],
  [   "trust",
   "understand",
   "Can you see the other person's point of view when you wish to?",
   "y"
  ],
  [   "trust",
   "understand",
   "In a disagreement, do you find it hard to understand how the other person fails to see your side?",
   "n"
  ],
  [   "trust",
   "understand",
   "Do you make thoughtless remarks or accusations which you later regret?",
   "n"
  ],
  [   "trust",
   "understand",
   "Do you often make tactless blunders?",
   "n"
  ],
  [   "trust",
   "understand",
   "Do you enjoy telling people the latest scandal about your associates?",
   "n"
  ],
  [   "trust",
   "understand",
   "Would you criticise faults and point out the bad points in someone else's character?",
   "n"
  ],
  [   "trust",
   "understand",
   "Do you see the best points of most people and only rarely speak slightingly of them?",
   "y"
  ],
  [   "trust",
   "understand",
   "Are you likely to be jealous?",
   "n"
  ],
  [   "trust",
   "understand",
   "Are you normally considerate in your demands on employees, relatives or children?",
   "y"
  ],
  [   "updown",
   "balance",
   "When others are getting ruffled, do you remain fairly composed?",
   "y"
  ],
  [   "updown",
   "balance",
   "Can you be a steadying influence when others panic?",
   "y"
  ],
  [   "updown",
   "balance",
   "Do you quickly recover from the effects of bad news?",
   "y"
  ],
  [   "updown",
   "balance",
   "Do you often feel low or down?",
   "n"
  ],
  [   "updown",
   "balance",
   "Do you have spells of feeling sad for no apparent reason?",
   "n"
  ],
  [   "updown",
   "balance",
   "Is it easy for you to relax?",
   "y"
  ],
  [   "updown",
   "balance",
   "Do you sleep well?",
   "y"
  ],
  [   "updown",
   "balance",
   "Do you get an after-reaction when something unexpected, such as an accident or other disturbing incident, takes place?",
   "n"
  ],
  [   "updown",
   "balance",
   "Do you find it easy to express your emotions?",
   "y"
  ],
  [   "updown",
   "worry",
   "Do you spend much time on needless worries?",
   "n"
  ],
  [   "updown",
   "worry",
   "Do your past failures still worry you?",
   "n"
  ],
  [   "updown",
   "worry",
   "Do you often ponder on previous misfortunes?",
   "n"
  ],
  [   "updown",
   "worry",
   "Do you ever get a single thought which hangs around for days?",
   "n"
  ],
  [   "updown",
   "worry",
   "Do you have little regret about past misfortunes and failures?",
   "y"
  ],
  [   "updown",
   "worry",
   "Does a minor failure on your part rarely trouble you?",
   "y"
  ],
  [   "updown",
   "worry",
   "Do you often sit and think about sickness, pain and sorrow?",
   "n"
  ],
  [   "updown",
   "worry",
   "Having settled an argument, do you continue to feel disgruntled for a while?",
   "n"
  ],
  [   "updown",
   "bounce",
   "Do you cope with the everyday problems of living quite well?",
   "y"
  ],
  [   "updown",
   "bounce",
   "Can you accept defeat easily, without having to swallow your disappointment?",
   "y"
  ],
  [   "updown",
   "bounce",
   "Can you quite quickly adapt to new conditions and situations even though they may be difficult?",
   "y"
  ],
  [   "updown",
   "bounce",
   "Is your life a constant struggle for survival?",
   "n"
  ],
  [   "updown",
   "bounce",
   "Do you do much grumbling about the conditions you have to face in life?",
   "n"
  ],
  [   "updown",
   "bounce",
   "Do you often get frustrated at not being able to do something, rather than finding a substitute?",
   "n"
  ],
  [   "updown",
   "bounce",
   "Would the idea of making a complete new start cause you much concern?",
   "n"
  ],
  [   "updown",
   "bounce",
   "Would you consider yourself energetic in your attitude towards life?",
   "y"
  ],
  [   "updown",
   "difficult",
   "Do others push you around?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do you frequently not do something you want to do because of other people's desires?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do you feel there are people who are definitely unfriendly toward you and work against you?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do the petty foibles of others make you impatient?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Are there some things about yourself on which you are touchy?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do you turn up the volume of your emotions just to create an effect?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do you get very ill at ease in disordered surroundings?",
   "n"
  ],
  [   "updown",
   "difficult",
   "Do children irritate you?",
   "n"
  ],
  [   "work",
   "resp",
   "Would you prefer to be in a position where you did not have the responsibility of making decisions?",
   "n"
  ],
  [   "work",
   "resp",
   "Do you turn down responsibility because you doubt your fitness to cope?",
   "n"
  ],
  [   "work",
   "resp",
   "Do you frequently take action even though you know your own good judgment would indicate otherwise?",
   "n"
  ],
  [   "work",
   "resp",
   "Can you take a calculated risk without too much worry?",
   "y"
  ],
  [   "work",
   "resp",
   "Do you prefer to take a passive role in any club or organisation to which you belong?",
   "n"
  ],
  [   "work",
   "resp",
   "Would you rather wait for something to happen than make it happen yourself?",
   "n"
  ],
  [   "work",
   "resp",
   "Are your actions considered unpredictable by other people?",
   "n"
  ],
  [   "work",
   "resp",
   "Are you always getting into trouble?",
   "n"
  ],
  [   "work",
   "resp",
   "Are you often impulsive in your behaviour?",
   "n"
  ],
  [   "work",
   "drive",
   "Do you find it easy to get yourself started on a project?",
   "y"
  ],
  [   "work",
   "drive",
   "Do you find it hard to get started on a task that needs to be done?",
   "n"
  ],
  [   "work",
   "drive",
   "Do you tend to put off doing things and then discover it is too late?",
   "n"
  ],
  [   "work",
   "drive",
   "Do you usually carry out assignments promptly and systematically?",
   "y"
  ],
  [   "work",
   "drive",
   "Can you confidently plan and work towards carrying out an event six months from now?",
   "y"
  ],
  [   "work",
   "drive",
   "Do you tend to be careless?",
   "n"
  ],
  [   "work",
   "drive",
   "Do you work in spurts, being inactive and then furiously active for a day or two?",
   "n"
  ],
  [   "work",
   "drive",
   "Do you often find yourself going off in all directions at once?",
   "n"
  ],
  [   "work",
   "drive",
   "Would you give up easily on a given course if it were causing you considerable inconvenience?",
   "n"
  ],
  [   "work",
   "conf",
   "Does the idea of talking in front of people make you nervous?",
   "n"
  ],
  [   "work",
   "conf",
   "Can you start the ball rolling at a social gathering?",
   "y"
  ],
  [   "work",
   "conf",
   "Do you mingle easily with people at a social gathering?",
   "y"
  ],
  [   "work",
   "conf",
   "Do you feel your opinions are not important enough to tell other people?",
   "n"
  ],
  [   "work",
   "conf",
   "Are you definite and emphatic in voice and manner?",
   "y"
  ],
  [   "work",
   "conf",
   "Is your voice monotonous rather than varied in pitch?",
   "n"
  ],
  [   "work",
   "conf",
   "Are your facial expressions varied rather than set?",
   "y"
  ],
  [   "work",
   "conf",
   "When you criticise, do you at the same time try to encourage?",
   "y"
  ],
  [   "work",
   "feedback",
   "Do you accept criticism easily and without resentment?",
   "y"
  ],
  [   "work",
   "feedback",
   "Is it normally hard for you to own up and take the blame?",
   "n"
  ],
  [   "work",
   "feedback",
   "Do you resent the efforts of others to tell you what to do?",
   "n"
  ],
  [   "work",
   "feedback",
   "Are you sometimes convinced of the correctness of your opinion about a subject even though you are not an expert?",
   "n"
  ],
  [   "work",
   "feedback",
   "Do you tend to exaggerate a justifiable grievance?",
   "n"
  ],
  [   "work",
   "feedback",
   "Are you sometimes considered by others a spoilsport?",
   "n"
  ],
  [   "work",
   "feedback",
   "Are you so self-assured that it sometimes annoys others?",
   "n"
  ]
 ],
 "labels": {
  "low": "Needs attention",
  "mid": "Developing",
  "high": "Strong"
 }
};
