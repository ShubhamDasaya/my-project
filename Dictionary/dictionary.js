let isDicLoaded = false,
  isTranslatorLoaded = false,
  isHelpLoaded = false,
  isConLoaded = false,
  isHomeLoaded = false;
function homepage() {
  let mainDiv = document.getElementById("main");
  let dicMain1 = document.createElement("div");
  let bodyId = document.getElementById("bodyId");
  bodyId.style.backgroundImage = "url('background.jpeg')";
  bodyId.style.backgroundSize = "cover";
  bodyId.style.backgroundPosition = "center";

  let navBarDiv = document.createElement("div");
  navBarDiv.setAttribute(
    "style",
    "height:100px;padding:20px;background-color:#193A07;position: fixed;top: 0;width: 100%;"
  );

  navBarDiv.setAttribute(
    "class",
    "navBarDiv align-items-center justify-content-center d-flex"
  );
  let button = document.createElement("button");
  button.setAttribute("class", "button-class");
  let button1 = document.createElement("button");
  button1.setAttribute("class", "button-class");
  let button2 = document.createElement("button");
  button2.setAttribute("class", "button-class");
  let button3 = document.createElement("button");
  button3.setAttribute("class", "button-class");
  let button4 = document.createElement("button");
  button4.setAttribute("class", "button-class");

  button.innerText = "Home";
  button1.innerText = "Dictionary";
  button2.innerText = "Translate";
  button3.innerText = "Help   ";
  button4.innerText = "Contect";

  let activeButton = null;

  function applyButtonLogic(button, clickAction) {
    let isClicked = false;

    button.addEventListener("mouseover", () => {
      if (!isClicked) {
        button.setAttribute(
          "style",
          "font-size:auto;border: 1px solid white;background-color: white; color: black; font-weight: 1000; border-radius: 1px;  height: 100%; width: 100%; max-width: 130px;  max-height: 100px; min-width: 80px; min-height: 60px; text-align: center; font-size: 1rem;"
        );
      }
    });

    button.addEventListener("mouseout", () => {
      if (!isClicked) {
        button.setAttribute(
          "style",
          "font-size: auto;font-weight: 1000;color:white; background-color:#193A07;border:none;max-width: 130px;  max-height: 100px; min-width: 80px; min-height: 60px ;"
        );
      }
    });

    button.addEventListener("click", (event) => {
      homeDiv.style.display = "none";

      if (activeButton && activeButton !== button) {
        activeButton.setAttribute(
          "style",
          "font-size: auto;font-weight: 1000;color:white; background-color:#193A07;border:none;max-width: 130px;  max-height: 100px; min-width: 80px; min-height: 60px; "
        );
      }

      isClicked = true;
      activeButton = button;

      button.setAttribute(
        "style",
        "font-size:auto;border:1px solid white;background-color:white;height:auto;width:130px;color:black;font-weight: 1000;max-width: 130px;  max-height: 100px; min-width: 80px; min-height: 60px; "
      );

      event.preventDefault();
      clickAction();
    });
  }

  applyButtonLogic(button, () => home());
  applyButtonLogic(button1, () => {
    ContainBar(), adjustLayout();
  });
  applyButtonLogic(button2, () => transition());
  applyButtonLogic(button3, () => help());
  applyButtonLogic(button4, () => Contact());

  let homeDiv = document.createElement("div");
  homeDiv.setAttribute(
    "style",
    "display: flex;margin-top:200px; flex-direction: column; align-items: center; padding: 40px;background: linear-gradient(135deg, #193A07 0%, #4CAF50 100%); border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); width: 500px; max-width: 90%; margin: auto; margin-top: 300px; color: white;"
  );

  let title = document.createElement("h1");
  title.innerText = "Welcome to My App";
  title.setAttribute(
    "style",
    "font-size: 2rem; margin-bottom: 20px; text-align: center; font-weight: bold;"
  );

  let description = document.createElement("p");
  description.innerText = "Explore the app by using the buttons below.";
  description.setAttribute(
    "style",
    "text-align: center; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.5;"
  );

  mainDiv.appendChild(dicMain1);
  mainDiv.appendChild(navBarDiv);
  navBarDiv.appendChild(button);
  navBarDiv.appendChild(button1);
  navBarDiv.appendChild(button2);
  navBarDiv.appendChild(button3);
  navBarDiv.appendChild(button4);

  homeDiv.appendChild(title);
  homeDiv.appendChild(description);
  mainDiv.appendChild(homeDiv);
  // mainDiv.appendChild(style1);
  function insertMediaQueryCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
    @media (max-width: 768px) {
      

      .button-class {
        font-size: 16px;
        padding: 8px 16px;
        // font-size: 15px;
        font-weight: 700;
        gap:2px;
      }

     
    }

    @media (max-width: 480px) {
     

      .button-class {
        font-size: 12px;
        padding: 6px 12px;
        // font-size: 15px;
        font-weight: 400;
        
      }

     
    }
  `;
    document.head.appendChild(style);
  }

  insertMediaQueryCSS();
}

const wordsArray = [
  {
    word: "Abate",
    phonetic: "/əˈbeɪt/",
    meaning: "to reduce in amount, degree, or intensity",
    hindiMeaning: "कम करना",
    usage: "The storm began to abate after a few hours.",
  },
  {
    word: "Abandon",
    phonetic: "/əˈbændən/",
    meaning: "to leave behind",
    hindiMeaning: "छोड़ देना",
    usage: "They had to abandon the mission due to the weather.",
  },
  {
    word: "Abhor",
    phonetic: "/əbˈhɔːr/",
    meaning: "to regard with disgust and hatred",
    hindiMeaning: "नफ़रत करना",
    usage: "She abhors cruelty to animals.",
  },
  {
    word: "Abridge",
    phonetic: "/əˈbrɪdʒ/",
    meaning: "to shorten",
    hindiMeaning: "संक्षिप्त करना",
    usage: "The book was abridged for the film adaptation.",
  },
  {
    word: "Abscond",
    phonetic: "/əbˈskɒnd/",
    meaning: "to leave hurriedly and secretly",
    hindiMeaning: "गुपचुप भाग जाना",
    usage: "The thief absconded with the money.",
  },
  {
    word: "Abstain",
    phonetic: "/əbˈsteɪn/",
    meaning: "to refrain from something by choice",
    hindiMeaning: "परहेज करना",
    usage: "He abstained from alcohol during the event.",
  },
  {
    word: "Abundant",
    phonetic: "/əˈbʌndənt/",
    meaning: "existing or available in large quantities",
    hindiMeaning: "प्रचुर",
    usage: "The garden had an abundant amount of vegetables.",
  },
  {
    word: "Accentuate",
    phonetic: "/əkˈsɛntʃʊeɪt/",
    meaning: "to make something more noticeable",
    hindiMeaning: "उज्जवल करना",
    usage: "Her dress accentuates her figure.",
  },
  {
    word: "Acclaim",
    phonetic: "/əˈkleɪm/",
    meaning: "enthusiastic approval",
    hindiMeaning: "स्वीकृति",
    usage: "The movie received critical acclaim.",
  },
  {
    word: "Accumulate",
    phonetic: "/əˈkjuːmjʊleɪt/",
    meaning: "to gather or collect",
    hindiMeaning: "इकट्ठा करना",
    usage: "Over the years, he accumulated a large collection of books.",
  },
  {
    word: "Acidic",
    phonetic: "/əˈsɪdɪk/",
    meaning: "having the properties of an acid",
    hindiMeaning: "एसिडीय",
    usage: "The soil was too acidic for growing vegetables.",
  },
  {
    word: "Acquaint",
    phonetic: "/əˈkweɪnt/",
    meaning: "to make someone familiar with something",
    hindiMeaning: "परिचित कराना",
    usage: "I will acquaint you with the new software tomorrow.",
  },
  {
    word: "Acquiesce",
    phonetic: "/ˌakwēˈes/",
    meaning: "to accept something reluctantly but without protest",
    hindiMeaning: "मौन स्वीकृति देना",
    usage: "She acquiesced to his demands after some time.",
  },
  {
    word: "Adept",
    phonetic: "/əˈdɛpt/",
    meaning: "highly skilled or proficient",
    hindiMeaning: "निपुण",
    usage: "He is adept at solving complex mathematical problems.",
  },
  {
    word: "Adhere",
    phonetic: "/ədˈhɪə/",
    meaning: "to stick to something",
    hindiMeaning: "चिपकना",
    usage: "Please ensure that the label adheres firmly to the surface.",
  },
  {
    word: "Admonish",
    phonetic: "/ədˈmɒnɪʃ/",
    meaning: "to warn or reprimand someone",
    hindiMeaning: "चेतावनी देना",
    usage: "She admonished the children for being late.",
  },
  {
    word: "Adverse",
    phonetic: "/ˈædvɜːs/",
    meaning: "unfavorable or harmful",
    hindiMeaning: "प्रतिकूल",
    usage: "Adverse weather conditions forced the event to be postponed.",
  },
  {
    word: "Advocate",
    phonetic: "/ˈædvəkət/",
    meaning: "to publicly support or recommend",
    hindiMeaning: "समर्थन करना",
    usage: "He advocates for equal rights for all.",
  },
  {
    word: "Aesthetic",
    phonetic: "/iːsˈθɛtɪk/",
    meaning: "concerned with beauty or the appreciation of beauty",
    hindiMeaning: "सौंदर्य संबंधित",
    usage: "The new building has an aesthetic design.",
  },
  {
    word: "Affable",
    phonetic: "/ˈæfəbəl/",
    meaning: "friendly and easy to talk to",
    hindiMeaning: "मित्रवत",
    usage: "She is an affable person, always willing to help.",
  },
  {
    word: "Affect",
    phonetic: "/əˈfɛkt/",
    meaning: "to have an effect on",
    hindiMeaning: "प्रभावित करना",
    usage: "The news of his success deeply affected his family.",
  },
  {
    word: "Affluent",
    phonetic: "/ˈæfluənt/",
    meaning: "having a lot of money or wealth",
    hindiMeaning: "धनवान",
    usage: "They live in an affluent neighborhood.",
  },
  {
    word: "Aggressive",
    phonetic: "/əˈɡrɛsɪv/",
    meaning: "ready or likely to attack or confront",
    hindiMeaning: "आक्रामक",
    usage: "His aggressive behavior made people uncomfortable.",
  },
  {
    word: "Alleviate",
    phonetic: "/əˈliːvɪeɪt/",
    meaning: "to make something less severe",
    hindiMeaning: "कम करना",
    usage: "The medication will alleviate your pain.",
  },
  {
    word: "Allocate",
    phonetic: "/ˈæləkeɪt/",
    meaning: "to distribute or assign resources",
    hindiMeaning: "आवंटित करना",
    usage: "The government allocated funds for the new project.",
  },
  {
    word: "Altruistic",
    phonetic: "/ˌæltruːˈɪstɪk/",
    meaning: "unselfishly concerned for or devoted to the welfare of others",
    hindiMeaning: "परहितैषी",
    usage: "Her altruistic nature made her a beloved figure in the community.",
  },
  {
    word: "Ameliorate",
    phonetic: "/əˈmiːljəreɪt/",
    meaning: "to make something better",
    hindiMeaning: "सुधारना",
    usage: "The new policies are meant to ameliorate the situation.",
  },
  {
    word: "Ample",
    phonetic: "/ˈæmpəl/",
    meaning: "more than enough",
    hindiMeaning: "पर्याप्त",
    usage: "There is ample food for everyone at the party.",
  },
  {
    word: "Analogous",
    phonetic: "/əˈnælədʒəs/",
    meaning: "comparable in certain respects",
    hindiMeaning: "समान",
    usage: "The situation is analogous to last year's crisis.",
  },
  {
    word: "Anarchy",
    phonetic: "/ˈænɑːki/",
    meaning: "a state of disorder due to absence of authority",
    hindiMeaning: "राजनीतिक अराजकता",
    usage: "The country descended into anarchy after the government collapsed.",
  },
  {
    word: "Anxious",
    phonetic: "/ˈæŋkʃəs/",
    meaning: "worried or uneasy",
    hindiMeaning: "चिंतित",
    usage: "She felt anxious before her big presentation.",
  },
  {
    word: "Apathy",
    phonetic: "/ˈæpəθi/",
    meaning: "lack of interest, enthusiasm, or concern",
    hindiMeaning: "उदासीनता",
    usage: "The apathy of the voters was evident in the low turnout.",
  },
  {
    word: "Apt",
    phonetic: "/æpt/",
    meaning: "appropriate or suitable",
    hindiMeaning: "उपयुक्त",
    usage: "She gave an apt response to the question.",
  },
  {
    word: "Arbitrary",
    phonetic: "/ˈɑːbɪtrɛri/",
    meaning: "based on random choice or personal whim",
    hindiMeaning: "मनमाना",
    usage: "The decision to fire him seemed arbitrary.",
  },
  {
    word: "Arduous",
    phonetic: "/ˈɑːdjuəs/",
    meaning: "involving a lot of effort and hard work",
    hindiMeaning: "कठिन",
    usage: "The hike up the mountain was arduous.",
  },
  {
    word: "Articulate",
    phonetic: "/ɑːˈtɪkjʊlət/",
    meaning: "able to express oneself clearly",
    hindiMeaning: "स्पष्ट",
    usage: "She gave an articulate presentation on climate change.",
  },
  {
    word: "Ascertain",
    phonetic: "/ˌæsərˈteɪn/",
    meaning: "to find out or determine something",
    hindiMeaning: "पता लगाना",
    usage: "The detective ascertained the identity of the thief.",
  },
  {
    word: "Aspire",
    phonetic: "/əˈspaɪə/",
    meaning: "to have a strong desire or aim",
    hindiMeaning: "लक्ष्य रखना",
    usage: "He aspires to become a successful entrepreneur.",
  },
  {
    word: "Assiduous",
    phonetic: "/əˈsɪdjuəs/",
    meaning: "showing great care and attention",
    hindiMeaning: "मेहनती",
    usage: "She was assiduous in her work, always paying attention to detail.",
  },
  {
    word: "Assess",
    phonetic: "/əˈsɛs/",
    meaning: "to evaluate or estimate the nature, ability, or quality of",
    hindiMeaning: "मूल्यांकन करना",
    usage: "We need to assess the damage before proceeding.",
  },
  {
    word: "Assimilate",
    phonetic: "/əˈsɪmɪleɪt/",
    meaning: "to absorb and integrate information",
    hindiMeaning: "समाहित करना",
    usage: "He quickly assimilated into the new work environment.",
  },
  {
    word: "Assume",
    phonetic: "/əˈsjuːm/",
    meaning: "to suppose something is true without proof",
    hindiMeaning: "मानना",
    usage: "I assumed you were coming with us to the event.",
  },
  {
    word: "Astute",
    phonetic: "/əˈstjuːt/",
    meaning: "having or showing sharp judgment",
    hindiMeaning: "चतुर",
    usage: "She was astute in her negotiations.",
  },
  {
    word: "Atone",
    phonetic: "/əˈtəʊn/",
    meaning: "to make amends for a wrong or mistake",
    hindiMeaning: "पश्चाताप करना",
    usage: "He tried to atone for his mistakes by apologizing.",
  },
  {
    word: "Audible",
    phonetic: "/ˈɔːdɪbəl/",
    meaning: "able to be heard",
    hindiMeaning: "सुनाई देने योग्य",
    usage: "The sound of the bell was barely audible.",
  },
  {
    word: "Augment",
    phonetic: "/ɔːɡˈmɛnt/",
    meaning: "to increase or make something greater",
    hindiMeaning: "वृद्धि करना",
    usage: "They plan to augment the production to meet demand.",
  },
  {
    word: "Auspicious",
    phonetic: "/ɔːˈspɪʃəs/",
    meaning: "showing or suggesting that future success is likely",
    hindiMeaning: "शुभ",
    usage: "The wedding ceremony was held on an auspicious day.",
  },
  {
    word: "Authentic",
    phonetic: "/ɔːˈθɛntɪk/",
    meaning: "genuine or real",
    hindiMeaning: "असली",
    usage: "The restaurant serves authentic Italian dishes.",
  },
  {
    word: "Aversion",
    phonetic: "/əˈvɜːʃən/",
    meaning: "a strong dislike",
    hindiMeaning: "घृणा",
    usage: "He had an aversion to spicy food.",
  },
  {
    word: "Avid",
    phonetic: "/ˈævɪd/",
    meaning: "having a keen interest or enthusiasm",
    hindiMeaning: "जोशपूर्ण",
    usage: "She is an avid reader of mystery novels.",
  },
  {
    word: "Awkward",
    phonetic: "/ˈɔːkwəd/",
    meaning: "clumsy or uncomfortable",
    hindiMeaning: "अजीब",
    usage: "There was an awkward silence after the argument.",
  },
  {
    word: "Axiom",
    phonetic: "/ˈæksɪəm/",
    meaning: "a self-evident truth",
    hindiMeaning: "सिद्धांत",
    usage: "The principle of gravity is an axiom in science.",
  },

  {
    word: "Benevolent",
    phonetic: "/bɪˈnɛvələnt/",
    meaning: "well-meaning and kindly",
    hindiMeaning: "दयालु",
    usage: "She gave a benevolent smile to the children.",
  },
  {
    word: "Brilliant",
    phonetic: "/ˈbrɪljənt/",
    meaning: "exceptionally clever or talented",
    hindiMeaning: "प्रतिभाशाली",
    usage: "His brilliant idea changed the course of the project.",
  },
  {
    word: "Benevolence",
    phonetic: "/bɪˈnɛvələns/",
    meaning: "desire to do good to others",
    hindiMeaning: "दया",
    usage: "Her benevolence was evident in her charity work.",
  },
  {
    word: "Blatant",
    phonetic: "/ˈbleɪtənt/",
    meaning: "done openly and unashamedly",
    hindiMeaning: "साफ़ तौर पर",
    usage: "His blatant disregard for the rules was shocking.",
  },
  {
    word: "Blissful",
    phonetic: "/ˈblɪsfʊl/",
    meaning: "extremely happy",
    hindiMeaning: "आनंदमय",
    usage: "They spent a blissful day at the beach.",
  },
  {
    word: "Breach",
    phonetic: "/briːʧ/",
    meaning: "an act of breaking a law, promise, or agreement",
    hindiMeaning: "उल्लंघन",
    usage: "The company was sued for breach of contract.",
  },
  {
    word: "Brisk",
    phonetic: "/brɪsk/",
    meaning: "quick and energetic",
    hindiMeaning: "तेज़",
    usage: "He took a brisk walk in the morning.",
  },
  {
    word: "Benevolently",
    phonetic: "/bɪˈnɛvələntli/",
    meaning: "in a kind or charitable manner",
    hindiMeaning: "दयालुता से",
    usage: "She smiled benevolently as she helped the elderly.",
  },
  {
    word: "Burden",
    phonetic: "/ˈbɜːrdən/",
    meaning: "a heavy load",
    hindiMeaning: "भार",
    usage: "He carried the heavy burden of his responsibilities.",
  },
  {
    word: "Bountiful",
    phonetic: "/ˈbaʊntɪfʊl/",
    meaning: "large in quantity",
    hindiMeaning: "प्रचुर",
    usage: "They had a bountiful harvest this year.",
  },
  {
    word: "Bashful",
    phonetic: "/ˈbæʃfʊl/",
    meaning: "easily embarrassed or shy",
    hindiMeaning: "शर्मिला",
    usage: "The bashful child hid behind his mother.",
  },
  {
    word: "Brave",
    phonetic: "/breɪv/",
    meaning: "showing courage",
    hindiMeaning: "बहादुर",
    usage: "The brave soldier saved his comrades.",
  },
  {
    word: "Blunder",
    phonetic: "/ˈblʌndər/",
    meaning: "a stupid or careless mistake",
    hindiMeaning: "गलती",
    usage: "He made a blunder during the meeting.",
  },
  {
    word: "Benevolence",
    phonetic: "/bɪˈnɛvələns/",
    meaning: "the quality of being kind and charitable",
    hindiMeaning: "उदारता",
    usage: "Her benevolence touched the lives of many people.",
  },
  {
    word: "Brittle",
    phonetic: "/ˈbrɪtl/",
    meaning: "easily broken",
    hindiMeaning: "नाजुक",
    usage: "The glass is very brittle, handle it carefully.",
  },
  {
    word: "Breach",
    phonetic: "/briːʧ/",
    meaning: "breaking the law or rules",
    hindiMeaning: "उल्लंघन",
    usage: "There was a breach of security in the system.",
  },
  {
    word: "Barter",
    phonetic: "/ˈbɑːrtər/",
    meaning: "to exchange goods or services without money",
    hindiMeaning: "समान वस्तु का आदान-प्रदान",
    usage: "They agreed to barter goods instead of paying cash.",
  },
  {
    word: "Baffled",
    phonetic: "/ˈbæfld/",
    meaning: "confused or perplexed",
    hindiMeaning: "हैरान",
    usage: "She was baffled by the complicated instructions.",
  },
  {
    word: "Befriend",
    phonetic: "/bɪˈfrɛnd/",
    meaning: "to become friends with",
    hindiMeaning: "मित्र बनाना",
    usage: "She befriended the new student.",
  },
  {
    word: "Bully",
    phonetic: "/ˈbʊli/",
    meaning: "a person who hurts or intimidates someone weaker",
    hindiMeaning: "अत्याचार करने वाला",
    usage: "The teacher intervened when she saw the bully in the playground.",
  },
  {
    word: "Bureaucracy",
    phonetic: "/ˈbjʊəˌrɒkrəsi/",
    meaning: "a system of government with many departments and officials",
    hindiMeaning: "अधिकारियों का तंत्र",
    usage: "The bureaucracy was slow to approve the new project.",
  },
  {
    word: "Bliss",
    phonetic: "/blɪs/",
    meaning: "perfect happiness",
    hindiMeaning: "आनंद",
    usage: "They lived in marital bliss for many years.",
  },
  {
    word: "Bore",
    phonetic: "/bɔːr/",
    meaning: "to make someone feel weary or uninterested",
    hindiMeaning: "ऊब",
    usage: "The long lecture bored the students.",
  },
  {
    word: "Broach",
    phonetic: "/brəʊʧ/",
    meaning: "to bring up a topic",
    hindiMeaning: "विषय उठाना",
    usage: "She was hesitant to broach the subject of money.",
  },
  {
    word: "Bristle",
    phonetic: "/ˈbrɪsl/",
    meaning: "to react angrily",
    hindiMeaning: "गुस्से में आना",
    usage: "He bristled at the suggestion.",
  },
  {
    word: "Benevolent",
    phonetic: "/bɪˈnɛvələnt/",
    meaning: "showing kindness",
    hindiMeaning: "दया दिखाना",
    usage: "The benevolent donor helped the orphanage.",
  },
  {
    word: "Blush",
    phonetic: "/blʌʃ/",
    meaning: "to become red in the face from embarrassment",
    hindiMeaning: "लज्जित होना",
    usage: "She blushed when complimented on her dress.",
  },
  {
    word: "Bureaucratic",
    phonetic: "/ˌbjʊəroʊˈkrætɪk/",
    meaning: "related to government administration",
    hindiMeaning: "प्रशासनिक",
    usage: "The bureaucratic process was slow and complicated.",
  },
  {
    word: "Beckon",
    phonetic: "/ˈbɛkən/",
    meaning: "to signal or summon someone",
    hindiMeaning: "हाथ से इशारा करना",
    usage: "He beckoned her to come closer.",
  },
  {
    word: "Banter",
    phonetic: "/ˈbæntər/",
    meaning: "light and playful conversation",
    hindiMeaning: "मजाक",
    usage: "The friends engaged in friendly banter.",
  },
  {
    word: "Brag",
    phonetic: "/bræɡ/",
    meaning: "to talk about something with excessive pride",
    hindiMeaning: "घमंड करना",
    usage: "He loves to brag about his accomplishments.",
  },
  {
    word: "Baffle",
    phonetic: "/ˈbæfl/",
    meaning: "to confuse someone completely",
    hindiMeaning: "हैरान करना",
    usage: "The complex puzzle baffled the players.",
  },
  {
    word: "Benevolent",
    phonetic: "/bɪˈnɛvələnt/",
    meaning: "having a desire to help others",
    hindiMeaning: "सहानुभूति",
    usage: "The company took benevolent actions during the disaster.",
  },
  {
    word: "Bounty",
    phonetic: "/ˈbaʊnti/",
    meaning: "a reward, especially given by a government",
    hindiMeaning: "इनाम",
    usage: "The bounty for capturing the criminal was $1,000.",
  },
  {
    word: "Bulge",
    phonetic: "/bʌldʒ/",
    meaning: "to swell or protrude",
    hindiMeaning: "फूलना",
    usage: "The suitcase bulged with clothes.",
  },
  {
    word: "Bias",
    phonetic: "/ˈbaɪəs/",
    meaning: "prejudice in favor of or against one thing",
    hindiMeaning: "पक्षपाती",
    usage: "She was accused of having a bias against the opposing team.",
  },
  {
    word: "Banish",
    phonetic: "/ˈbænɪʃ/",
    meaning: "to expel or drive away",
    hindiMeaning: "निर्वासित करना",
    usage: "He was banished from the kingdom for his crimes.",
  },
  {
    word: "Boisterous",
    phonetic: "/ˈbɔɪstərəs/",
    meaning: "noisy, energetic, and cheerful",
    hindiMeaning: "शोरगुल",
    usage: "The boisterous crowd cheered for the team.",
  },
  {
    word: "Benevolent",
    phonetic: "/bɪˈnɛvələnt/",
    meaning: "kind and generous",
    hindiMeaning: "उदार",
    usage: "She is known for her benevolent nature.",
  },
  {
    word: "Bask",
    phonetic: "/bɑːsk/",
    meaning: "to lie in and enjoy warmth",
    hindiMeaning: "सूरज की धूप में स्नान करना",
    usage: "He basked in the sun on a warm day.",
  },
  {
    word: "Blaze",
    phonetic: "/bleɪz/",
    meaning: "a large, strong fire",
    hindiMeaning: "आग",
    usage: "The forest was destroyed in a blazing fire.",
  },
  {
    word: "Bend",
    phonetic: "/bɛnd/",
    meaning: "to flex or curve something",
    hindiMeaning: "मोड़ना",
    usage: "He bent the wire into a circle.",
  },
  {
    word: "Backlash",
    phonetic: "/ˈbækˌlæʃ/",
    meaning: "a strong negative reaction",
    hindiMeaning: "प्रतिक्रिया",
    usage: "The new policy caused a backlash from employees.",
  },
  {
    word: "Breach",
    phonetic: "/briːʧ/",
    meaning: "violation or break in something",
    hindiMeaning: "उल्लंघन",
    usage: "They filed a lawsuit due to a breach of contract.",
  },
  {
    word: "Brim",
    phonetic: "/brɪm/",
    meaning: "the edge or rim of something",
    hindiMeaning: "किनारा",
    usage: "Her eyes brimmed with tears.",
  },
  {
    word: "Burrow",
    phonetic: "/ˈbʌroʊ/",
    meaning: "a hole or tunnel dug by an animal",
    hindiMeaning: "गहेरा गड्ढा",
    usage: "The rabbit dug a burrow in the ground.",
  },
  {
    word: "Bore",
    phonetic: "/bɔːr/",
    meaning: "to cause someone to feel dull or uninterested",
    hindiMeaning: "ऊब",
    usage: "The lecture bored the students to tears.",
  },

  {
    word: "Courage",
    phonetic: "/ˈkʌrɪdʒ/",
    meaning: "the ability to do something that frightens one",
    hindiMeaning: "साहस",
    usage: "It takes courage to speak in public.",
  },
  {
    word: "Compassion",
    phonetic: "/kəmˈpæʃən/",
    meaning:
      "sympathetic pity and concern for the sufferings or misfortunes of others",
    hindiMeaning: "करुणा",
    usage: "She showed compassion for the homeless.",
  },
  {
    word: "Creative",
    phonetic: "/kriˈeɪtɪv/",
    meaning:
      "relating to or involving the use of the imagination or original ideas",
    hindiMeaning: "रचनात्मक",
    usage: "She is very creative in her art.",
  },
  {
    word: "Cautious",
    phonetic: "/ˈkɔːʃəs/",
    meaning: "careful to avoid potential problems or dangers",
    hindiMeaning: "सावधान",
    usage: "Be cautious when walking on ice.",
  },
  {
    word: "Curious",
    phonetic: "/ˈkjʊərɪəs/",
    meaning: "eager to know or learn something",
    hindiMeaning: "जिज्ञासु",
    usage: "The curious child asked many questions.",
  },
  {
    word: "Confident",
    phonetic: "/ˈkɒnfɪdənt/",
    meaning: "having a strong belief or full assurance",
    hindiMeaning: "आत्मविश्वासी",
    usage: "She felt confident in her abilities.",
  },
  {
    word: "Comprehend",
    phonetic: "/ˌkɒmprɪˈhɛnd/",
    meaning: "to understand or grasp mentally",
    hindiMeaning: "समझना",
    usage: "He could not comprehend the difficult math problem.",
  },
  {
    word: "Conscious",
    phonetic: "/ˈkɒnʃəs/",
    meaning: "aware of and responding to one's surroundings",
    hindiMeaning: "सचेत",
    usage: "She was conscious of the people around her.",
  },
  {
    word: "Clever",
    phonetic: "/ˈklɛvər/",
    meaning: "quick to understand, learn, and devise or apply ideas",
    hindiMeaning: "चतुर",
    usage: "The clever boy solved the puzzle in minutes.",
  },
  {
    word: "Complicated",
    phonetic: "/ˈkɒmplɪkeɪtɪd/",
    meaning: "consisting of many different and connected parts",
    hindiMeaning: "जटिल",
    usage: "The instructions were too complicated to follow.",
  },
  {
    word: "Calm",
    phonetic: "/kɑːm/",
    meaning: "peaceful, quiet, and without worry",
    hindiMeaning: "शांत",
    usage: "She stayed calm during the emergency.",
  },
  {
    word: "Candid",
    phonetic: "/ˈkændɪd/",
    meaning: "truthful and straightforward",
    hindiMeaning: "ईमानदार",
    usage: "He gave a candid response to the question.",
  },
  {
    word: "Cheerful",
    phonetic: "/ˈʧɪəfʊl/",
    meaning: "noted for cheerfulness or good humor",
    hindiMeaning: "उत्साही",
    usage: "The cheerful girl greeted everyone with a smile.",
  },
  {
    word: "Capable",
    phonetic: "/ˈkeɪpəbl/",
    meaning:
      "having the ability, fitness, or quality necessary to do or achieve a specified thing",
    hindiMeaning: "क्षम",
    usage: "She is capable of handling the project on her own.",
  },
  {
    word: "Curious",
    phonetic: "/ˈkjʊərɪəs/",
    meaning: "desiring to learn or know something",
    hindiMeaning: "जिज्ञासु",
    usage: "He was curious about the new technology.",
  },
  {
    word: "Comfortable",
    phonetic: "/ˈkʌmftəbl/",
    meaning: "providing physical ease and relaxation",
    hindiMeaning: "आरामदायक",
    usage: "The sofa was very comfortable to sit on.",
  },
  {
    word: "Cooperate",
    phonetic: "/kəʊˈɒpəreɪt/",
    meaning: "to work together towards a common goal",
    hindiMeaning: "सहयोग करना",
    usage: "The two teams will cooperate to complete the task.",
  },
  {
    word: "Comical",
    phonetic: "/ˈkɒmɪkəl/",
    meaning: "funny or humorous",
    hindiMeaning: "मज़ेदार",
    usage: "The comedian gave a comical performance.",
  },
  {
    word: "Concern",
    phonetic: "/kənˈsɜːrn/",
    meaning: "a matter of interest or importance to someone",
    hindiMeaning: "चिंता",
    usage: "Her concern for the environment was evident.",
  },
  {
    word: "Convince",
    phonetic: "/kənˈvɪns/",
    meaning: "to persuade someone to do or believe something",
    hindiMeaning: "विश्वास दिलाना",
    usage: "He tried to convince her to join the team.",
  },
  {
    word: "Conviction",
    phonetic: "/kənˈvɪkʃən/",
    meaning: "a firmly held belief or opinion",
    hindiMeaning: "विश्वास",
    usage: "He spoke with conviction about the importance of education.",
  },
  {
    word: "Crafty",
    phonetic: "/ˈkrɑːfti/",
    meaning: "skilled in deception or trickery",
    hindiMeaning: "चालाक",
    usage: "The crafty thief evaded the police.",
  },
  {
    word: "Charming",
    phonetic: "/ˈʧɑːmɪŋ/",
    meaning: "pleasant or attractive",
    hindiMeaning: "आकर्षक",
    usage: "The charming man won everyone’s heart.",
  },
  {
    word: "Contemplate",
    phonetic: "/ˈkɒntəmˌpleɪt/",
    meaning: "to think deeply about something",
    hindiMeaning: "विचार करना",
    usage: "She sat and contemplated her future.",
  },
  {
    word: "Critical",
    phonetic: "/ˈkrɪtɪkəl/",
    meaning: "expressing adverse or disapproving comments or judgments",
    hindiMeaning: "आलोचनात्मक",
    usage: "The movie received critical acclaim from reviewers.",
  },
  {
    word: "Crucial",
    phonetic: "/ˈkruːʃəl/",
    meaning: "decisive or critical importance",
    hindiMeaning: "महत्वपूर्ण",
    usage: "His decision will play a crucial role in the outcome.",
  },
  {
    word: "Consequence",
    phonetic: "/ˈkɒnsɪkwəns/",
    meaning: "a result or effect of an action",
    hindiMeaning: "परिणाम",
    usage: "The consequence of his actions was severe.",
  },
  {
    word: "Clarify",
    phonetic: "/ˈklærɪfaɪ/",
    meaning:
      "to make a statement or situation less confused and more comprehensible",
    hindiMeaning: "स्पष्ट करना",
    usage: "Can you clarify your point?",
  },
  {
    word: "Calamity",
    phonetic: "/kəˈlæmɪti/",
    meaning: "an event causing great and often sudden damage or distress",
    hindiMeaning: "आपत्ति",
    usage: "The earthquake was a natural calamity.",
  },
  {
    word: "Cultivate",
    phonetic: "/ˈkʌltɪveɪt/",
    meaning: "to prepare and use land for crops or gardening",
    hindiMeaning: "उगाना",
    usage: "Farmers cultivate the land in the spring.",
  },
  {
    word: "Clarity",
    phonetic: "/ˈklærɪti/",
    meaning: "the quality of being clear, in particular",
    hindiMeaning: "स्पष्टता",
    usage: "Her explanation brought clarity to the situation.",
  },
  {
    word: "Comfort",
    phonetic: "/ˈkʌmfət/",
    meaning: "a state of physical ease and freedom from pain or constraint",
    hindiMeaning: "सुविधा",
    usage: "She found comfort in her family’s support.",
  },
  {
    word: "Curiosity",
    phonetic: "/ˌkjʊəˈrɪɒsɪti/",
    meaning: "a strong desire to know or learn something",
    hindiMeaning: "जिज्ञासा",
    usage: "His curiosity about the universe led him to study science.",
  },
  {
    word: "Censor",
    phonetic: "/ˈsɛnsər/",
    meaning: "to examine and remove parts of something",
    hindiMeaning: "नियंत्रण करना",
    usage: "The government decided to censor the controversial film.",
  },
  {
    word: "Clumsy",
    phonetic: "/ˈklʌmzi/",
    meaning: "awkward in movement or handling things",
    hindiMeaning: "अकुशल",
    usage: "The clumsy waiter dropped the plates.",
  },
  {
    word: "Confuse",
    phonetic: "/kənˈfjuːz/",
    meaning: "to make someone unable to think clearly",
    hindiMeaning: "भ्रमित करना",
    usage: "The complicated instructions confused the participants.",
  },
  {
    word: "Chilly",
    phonetic: "/ˈʧɪli/",
    meaning: "cold enough to make one feel uncomfortable",
    hindiMeaning: "ठंडा",
    usage: "It was too chilly to sit outside without a jacket.",
  },

  {
    word: "Diligent",
    phonetic: "/ˈdɪlɪdʒənt/",
    meaning: "showing care and effort in your work or duties",
    hindiMeaning: "मेहनती",
    usage:
      "She was a diligent student, always completing her assignments on time.",
  },
  {
    word: "Doubt",
    phonetic: "/daʊt/",
    meaning: "a feeling of uncertainty or lack of conviction",
    hindiMeaning: "संदेह",
    usage: "He had doubt about the outcome of the experiment.",
  },
  {
    word: "Delicate",
    phonetic: "/ˈdɛlɪkət/",
    meaning: "fragile or easily damaged",
    hindiMeaning: "नाजुक",
    usage: "The delicate flowers required careful handling.",
  },
  {
    word: "Decisive",
    phonetic: "/dɪˈsaɪsɪv/",
    meaning: "able to make decisions quickly and effectively",
    hindiMeaning: "निर्णायक",
    usage: "Her decisive actions helped solve the crisis.",
  },
  {
    word: "Dazzling",
    phonetic: "/ˈdæzlɪŋ/",
    meaning: "extremely bright, especially so as to blind the eyes temporarily",
    hindiMeaning: "चमकदार",
    usage:
      "The dazzling lights of the city made it a beautiful sight at night.",
  },
  {
    word: "Defend",
    phonetic: "/dɪˈfɛnd/",
    meaning: "to protect from harm or danger",
    hindiMeaning: "रक्षा करना",
    usage: "The army was called in to defend the borders.",
  },
  {
    word: "Dramatic",
    phonetic: "/drəˈmætɪk/",
    meaning: "having a strong or vivid effect",
    hindiMeaning: "नाटकीय",
    usage: "The dramatic rise in temperature was surprising.",
  },
  {
    word: "Dynamic",
    phonetic: "/daɪˈnæmɪk/",
    meaning: "characterized by constant change or progress",
    hindiMeaning: "गतिशील",
    usage: "She has a dynamic personality and always stays busy.",
  },
  {
    word: "Diverse",
    phonetic: "/daɪˈvɜːs/",
    meaning: "showing a great deal of variety",
    hindiMeaning: "विविध",
    usage: "The city is known for its diverse culture.",
  },
  {
    word: "Deceive",
    phonetic: "/dɪˈsiːv/",
    meaning: "to cause someone to believe something that is not true",
    hindiMeaning: "धोखा देना",
    usage: "He tried to deceive her with false promises.",
  },
  {
    word: "Definite",
    phonetic: "/ˈdɛfɪnɪt/",
    meaning: "clearly stated or decided",
    hindiMeaning: "स्पष्ट",
    usage: "The instructions were very definite and easy to follow.",
  },
  {
    word: "Doubtful",
    phonetic: "/ˈdaʊtfʊl/",
    meaning: "feeling uncertain or unsure",
    hindiMeaning: "संदेहास्पद",
    usage: "He was doubtful about the success of the project.",
  },
  {
    word: "Dismay",
    phonetic: "/dɪsˈmeɪ/",
    meaning: "shock or distress",
    hindiMeaning: "आश्चर्य",
    usage: "The news of the accident caused great dismay among the team.",
  },
  {
    word: "Devote",
    phonetic: "/dɪˈvəʊt/",
    meaning: "to give all or a large part of one's time or resources",
    hindiMeaning: "समर्पित करना",
    usage: "She devotes a lot of her time to charity work.",
  },
  {
    word: "Discreet",
    phonetic: "/dɪˈskriːt/",
    meaning: "careful and prudent in speech or action",
    hindiMeaning: "सावधान",
    usage: "He was discreet in handling sensitive matters.",
  },
  {
    word: "Diminish",
    phonetic: "/dɪˈmɪnɪʃ/",
    meaning: "to make or become less",
    hindiMeaning: "घटाना",
    usage: "The importance of the issue will diminish over time.",
  },
  {
    word: "Dramatize",
    phonetic: "/ˈdræmətaɪz/",
    meaning: "to exaggerate or overemphasize",
    hindiMeaning: "नाटकीय रूप से प्रस्तुत करना",
    usage: "The media often dramatizes events to attract attention.",
  },
  {
    word: "Dwell",
    phonetic: "/dwɛl/",
    meaning: "to live or stay in a particular place",
    hindiMeaning: "रहना",
    usage: "They dwell in a beautiful house near the beach.",
  },
  {
    word: "Dumbfound",
    phonetic: "/ˈdʌmfaʊnd/",
    meaning: "to shock or stun into silence",
    hindiMeaning: "हैरान करना",
    usage: "The sudden announcement dumbfounded the entire audience.",
  },
  {
    word: "Durable",
    phonetic: "/ˈdjʊərəbl/",
    meaning: "able to withstand wear, pressure, or damage",
    hindiMeaning: "मजबूत",
    usage: "The product is durable and built to last.",
  },
  {
    word: "Deny",
    phonetic: "/dɪˈnaɪ/",
    meaning: "to refuse to accept or acknowledge",
    hindiMeaning: "अस्वीकार करना",
    usage: "He denied the accusations made against him.",
  },
  {
    word: "Defuse",
    phonetic: "/dɪˈfjuːz/",
    meaning: "to make a situation less tense or dangerous",
    hindiMeaning: "कम करना",
    usage: "The negotiator was able to defuse the crisis.",
  },
  {
    word: "Demolish",
    phonetic: "/dɪˈmɒlɪʃ/",
    meaning: "to tear down or destroy completely",
    hindiMeaning: "ध्वस्त करना",
    usage: "They plan to demolish the old building next year.",
  },
  {
    word: "Damp",
    phonetic: "/dæmp/",
    meaning: "slightly wet, often in an unpleasant way",
    hindiMeaning: "नम",
    usage: "The room felt damp due to the heavy rain.",
  },
  {
    word: "Disrupt",
    phonetic: "/dɪsˈrʌpt/",
    meaning: "to interrupt or disturb the normal order",
    hindiMeaning: "व्यवधान डालना",
    usage: "The storm disrupted the travel plans of many people.",
  },
  {
    word: "Demand",
    phonetic: "/dɪˈmɑːnd/",
    meaning: "to ask for something forcefully",
    hindiMeaning: "मांगना",
    usage: "She demanded a fair explanation from the company.",
  },
  {
    word: "Delight",
    phonetic: "/dɪˈlaɪt/",
    meaning: "great pleasure",
    hindiMeaning: "आनंद",
    usage: "Her smile brought delight to everyone in the room.",
  },
  {
    word: "Diligence",
    phonetic: "/ˈdɪlɪdʒəns/",
    meaning: "careful and persistent work or effort",
    hindiMeaning: "परिश्रम",
    usage: "Her diligence in studies resulted in excellent grades.",
  },
  {
    word: "Displace",
    phonetic: "/dɪsˈpleɪs/",
    meaning: "to move something from its usual position",
    hindiMeaning: "स्थानांतरित करना",
    usage: "The flood displaced many families.",
  },
  {
    word: "Defeat",
    phonetic: "/dɪˈfiːt/",
    meaning: "to win a victory over someone",
    hindiMeaning: "पराजित करना",
    usage: "The team defeated their rivals in the final match.",
  },
  {
    word: "Dedicate",
    phonetic: "/ˈdɛdɪkeɪt/",
    meaning: "to devote time, effort, or oneself to a particular cause",
    hindiMeaning: "समर्पित करना",
    usage: "He dedicated his life to helping the poor.",
  },
  {
    word: "Dizzy",
    phonetic: "/ˈdɪzi/",
    meaning: "feeling lightheaded or unsteady",
    hindiMeaning: "चक्कर आना",
    usage: "She felt dizzy after spinning around.",
  },
  {
    word: "Drift",
    phonetic: "/drɪft/",
    meaning: "to move slowly, typically in a casual or aimless way",
    hindiMeaning: "बहना",
    usage: "The boat began to drift with the current.",
  },
  {
    word: "Distinguish",
    phonetic: "/dɪˈstɪŋɡwɪʃ/",
    meaning: "to recognize or treat as different",
    hindiMeaning: "अंतर करना",
    usage: "He can distinguish between good and bad behavior.",
  },
  {
    word: "Doom",
    phonetic: "/duːm/",
    meaning: "death, destruction, or some other terrible fate",
    hindiMeaning: "नाश",
    usage: "The prophecy foretold doom for the kingdom.",
  },
  {
    word: "Doubtful",
    phonetic: "/ˈdaʊtfʊl/",
    meaning: "feeling uncertain about something",
    hindiMeaning: "संदेहास्पद",
    usage: "He was doubtful about the success of the plan.",
  },
  {
    word: "Dampen",
    phonetic: "/ˈdæmpən/",
    meaning: "to make something slightly wet",
    hindiMeaning: "नम करना",
    usage: "The rain began to dampen the soil.",
  },
  {
    word: "Dignity",
    phonetic: "/ˈdɪɡnɪti/",
    meaning: "the state of being worthy of honor or respect",
    hindiMeaning: "गरिमा",
    usage: "She handled the situation with grace and dignity.",
  },
  {
    word: "Dramatic",
    phonetic: "/drəˈmætɪk/",
    meaning: "having a strong or vivid effect",
    hindiMeaning: "नाटकीय",
    usage: "The movie had a dramatic ending.",
  },
  {
    word: "Disturb",
    phonetic: "/dɪsˈtɜːb/",
    meaning: "to interrupt the normal operation or peace of something",
    hindiMeaning: "व्यवधान डालना",
    usage: "Please do not disturb me while I'm working.",
  },
  {
    word: "Dwindle",
    phonetic: "/ˈdwɪndəl/",
    meaning: "to decrease gradually",
    hindiMeaning: "कम होना",
    usage: "The resources began to dwindle as the demand increased.",
  },
  {
    word: "Doubtless",
    phonetic: "/ˈdaʊtlɪs/",
    meaning: "without doubt",
    hindiMeaning: "संदेह रहित",
    usage: "He is doubtless one of the best players on the team.",
  },
  {
    word: "Eloquent",
    phonetic: "/ˈɛləkwənt/",
    meaning: "fluent or persuasive in speaking or writing",
    hindiMeaning: "प्रभावशाली",
    usage: "Her eloquent speech moved the audience to tears.",
  },
  {
    word: "Elaborate",
    phonetic: "/ɪˈlæbəreɪt/",
    meaning: "involving many careful details",
    hindiMeaning: "विस्तृत",
    usage: "The teacher asked him to elaborate on his research findings.",
  },
  {
    word: "Eminent",
    phonetic: "/ˈɛmɪnənt/",
    meaning: "famous, well-known, and respected",
    hindiMeaning: "प्रख्यात",
    usage: "He is an eminent scientist in the field of genetics.",
  },
  {
    word: "Eclipse",
    phonetic: "/ɪˈklɪps/",
    meaning: "to obscure or block something",
    hindiMeaning: "ग्रहण",
    usage: "The moon will eclipse the sun tomorrow during the solar event.",
  },
  {
    word: "Empathy",
    phonetic: "/ˈɛmpəθi/",
    meaning: "the ability to understand and share the feelings of another",
    hindiMeaning: "सहानुभूति",
    usage: "Her empathy towards the victims of the flood was heartwarming.",
  },
  {
    word: "Examine",
    phonetic: "/ɪɡˈzæmɪn/",
    meaning: "to inspect or analyze something closely",
    hindiMeaning: "जाँच करना",
    usage: "The doctor will examine your health and provide advice.",
  },
  {
    word: "Enthusiastic",
    phonetic: "/ɪnˌθjuːziˈæstɪk/",
    meaning: "showing intense excitement or interest",
    hindiMeaning: "उत्साही",
    usage: "He was enthusiastic about the upcoming trip.",
  },
  {
    word: "Efficient",
    phonetic: "/ɪˈfɪʃənt/",
    meaning: "achieving maximum productivity with minimum wasted effort",
    hindiMeaning: "कुशल",
    usage: "Her efficient work ethic impressed the manager.",
  },
  {
    word: "Exquisite",
    phonetic: "/ɪkˈskwɪzɪt/",
    meaning: "extremely beautiful and delicate",
    hindiMeaning: "सुंदर",
    usage: "The intricate design of the necklace was exquisite.",
  },
  {
    word: "Essential",
    phonetic: "/ɪˈsɛnʃəl/",
    meaning: "absolutely necessary",
    hindiMeaning: "आवश्यक",
    usage: "Water is essential for life.",
  },
  {
    word: "Eternal",
    phonetic: "/ɪˈtɜːnəl/",
    meaning: "lasting forever",
    hindiMeaning: "शाश्वत",
    usage: "The love between them felt eternal.",
  },
  {
    word: "Examine",
    phonetic: "/ɪɡˈzæmɪn/",
    meaning: "to inspect or analyze something closely",
    hindiMeaning: "जाँच करना",
    usage: "The teacher will examine the homework assignments.",
  },
  {
    word: "Euphoria",
    phonetic: "/juːˈfɔːrɪə/",
    meaning: "a feeling of great happiness or excitement",
    hindiMeaning: "आनंद",
    usage: "Winning the championship filled the team with euphoria.",
  },
  {
    word: "Exaggerate",
    phonetic: "/ɪɡˈzædʒəreɪt/",
    meaning: "to make something seem more important than it is",
    hindiMeaning: "अतिशयोक्ति करना",
    usage: "He tends to exaggerate the story for dramatic effect.",
  },
  {
    word: "Elusive",
    phonetic: "/ɪˈluːsɪv/",
    meaning: "difficult to find, catch, or achieve",
    hindiMeaning: "पार करने योग्य",
    usage:
      "The solution to the puzzle was elusive and took hours to figure out.",
  },
  {
    word: "Endorse",
    phonetic: "/ɪnˈdɔːs/",
    meaning: "to support or approve of something publicly",
    hindiMeaning: "समर्थन करना",
    usage: "The celebrity endorsed the new brand of skincare products.",
  },
  {
    word: "Euphoria",
    phonetic: "/juːˈfɔːrɪə/",
    meaning: "a feeling of intense happiness",
    hindiMeaning: "आनंद",
    usage: "She felt a sense of euphoria after receiving the award.",
  },
  {
    word: "Evident",
    phonetic: "/ˈɛvɪdənt/",
    meaning: "clear and obvious",
    hindiMeaning: "स्पष्ट",
    usage: "The damage caused by the storm was evident in the streets.",
  },
  {
    word: "Examine",
    phonetic: "/ɪɡˈzæmɪn/",
    meaning: "to inspect or analyze something closely",
    hindiMeaning: "जाँच करना",
    usage: "The teacher will examine the homework assignments.",
  },
  {
    word: "Empower",
    phonetic: "/ɪmˈpaʊə/",
    meaning: "to give someone the authority or power to do something",
    hindiMeaning: "सशक्त करना",
    usage: "The training program is designed to empower employees.",
  },
  {
    word: "Eloquent",
    phonetic: "/ˈɛləkwənt/",
    meaning: "expressing yourself in a clear, fluent, and effective way",
    hindiMeaning: "प्रभावशाली",
    usage: "Her eloquent speech moved the audience deeply.",
  },
  {
    word: "Effortless",
    phonetic: "/ˈɛfərtləs/",
    meaning: "requiring little or no effort",
    hindiMeaning: "सुबह का काम",
    usage: "He made the task look effortless, though it was difficult.",
  },
  {
    word: "Equilibrium",
    phonetic: "/ˌiːkwɪˈlɪbrɪəm/",
    meaning: "a state of balance",
    hindiMeaning: "संतुलन",
    usage: "The body strives to maintain equilibrium despite outside forces.",
  },
  {
    word: "Eradicate",
    phonetic: "/ɪˈrædɪkeɪt/",
    meaning: "to destroy or remove something completely",
    hindiMeaning: "नष्ट करना",
    usage: "The goal is to eradicate poverty in the region.",
  },
  {
    word: "Enchant",
    phonetic: "/ɪnˈtʃɑːnt/",
    meaning: "to attract and delight someone greatly",
    hindiMeaning: "मोहित करना",
    usage: "The beautiful scenery enchanted the visitors.",
  },
  {
    word: "Embody",
    phonetic: "/ɪmˈbɒdi/",
    meaning: "to represent something or be a perfect example of it",
    hindiMeaning: "प्रत्यय व्यक्त करना",
    usage: "The team embodies the spirit of perseverance.",
  },
  {
    word: "Enrich",
    phonetic: "/ɪnˈrɪtʃ/",
    meaning: "to improve or enhance the quality or value of something",
    hindiMeaning: "सम्पन्न बनाना",
    usage: "Her experiences abroad enriched her knowledge of global cultures.",
  },
  {
    word: "Envision",
    phonetic: "/ɪnˈvɪʒən/",
    meaning: "to imagine or visualize something in the future",
    hindiMeaning: "कल्पना करना",
    usage: "He envisioned a future where technology solved many problems.",
  },
  {
    word: "Erase",
    phonetic: "/ɪˈreɪz/",
    meaning: "to remove something completely",
    hindiMeaning: "मिटाना",
    usage: "She tried to erase the mistakes from the document.",
  },
  {
    word: "Eminent",
    phonetic: "/ˈɛmɪnənt/",
    meaning: "famous or respected",
    hindiMeaning: "प्रख्यात",
    usage: "He is an eminent scientist in the field of physics.",
  },
  {
    word: "Exhibit",
    phonetic: "/ɪɡˈzɪbɪt/",
    meaning: "to display something publicly",
    hindiMeaning: "प्रदर्शित करना",
    usage: "The museum will exhibit rare artifacts from ancient civilizations.",
  },
  {
    word: "Expert",
    phonetic: "/ˈɛkspɜːt/",
    meaning:
      "a person with a high level of skill or knowledge in a particular area",
    hindiMeaning: "विशेषज्ञ",
    usage: "He is an expert in computer programming.",
  },
  {
    word: "Evasion",
    phonetic: "/ɪˈveɪʒən/",
    meaning: "the act of avoiding something",
    hindiMeaning: "परिहार",
    usage: "The evasive answers left everyone confused.",
  },
  {
    word: "Excavate",
    phonetic: "/ˈɛkskəveɪt/",
    meaning: "to dig up or uncover",
    hindiMeaning: "खोदना",
    usage: "The archaeologists began to excavate the ancient site.",
  },
  {
    word: "Explore",
    phonetic: "/ɪksˈplɔːr/",
    meaning: "to search or travel for the purpose of discovery",
    hindiMeaning: "अन्वेषण करना",
    usage: "They explored new lands in search of valuable resources.",
  },
  {
    word: "Exile",
    phonetic: "/ˈɛksaɪl/",
    meaning: "the state of being barred from one's native country",
    hindiMeaning: "निर्वासन",
    usage: "The leader was forced into exile after the coup.",
  },
  {
    word: "Expand",
    phonetic: "/ɪksˈpænd/",
    meaning: "to make something larger or more extensive",
    hindiMeaning: "विस्तार करना",
    usage: "The company plans to expand into new markets.",
  },
  {
    word: "Exult",
    phonetic: "/ɪɡˈzʌlt/",
    meaning: "to show or feel happiness or joy",
    hindiMeaning: "आनंदित होना",
    usage: "The team exulted after winning the championship.",
  },
  {
    word: "Elegant",
    phonetic: "/ˈɛlɪɡənt/",
    meaning: "graceful and stylish in appearance or manner",
    hindiMeaning: "शानदार",
    usage: "The ballroom was decorated in an elegant style.",
  },
  {
    word: "Edge",
    phonetic: "/ɛdʒ/",
    meaning: "the boundary or edge of something",
    hindiMeaning: "किनारा",
    usage: "She stood at the edge of the cliff, gazing at the view.",
  },
  {
    word: "Eliminate",
    phonetic: "/ɪˈlɪmɪneɪt/",
    meaning: "to remove or get rid of something",
    hindiMeaning: "हटाना",
    usage: "They plan to eliminate the barriers to entry.",
  },
  {
    word: "Enhance",
    phonetic: "/ɪnˈhɑːns/",
    meaning: "to improve the quality or value of something",
    hindiMeaning: "सुधारना",
    usage: "The new software will enhance the user experience.",
  },

  {
    word: "Facilitate",
    phonetic: "/fəˈsɪlɪteɪt/",
    meaning: "to make something easier or less difficult",
    hindiMeaning: "सहज बनाना",
    usage: "The teacher will facilitate the learning process for the students.",
  },
  {
    word: "Favorable",
    phonetic: "/ˈfeɪvərəbəl/",
    meaning: "expressing approval or support",
    hindiMeaning: "अनुकूल",
    usage: "The weather was favorable for the outdoor event.",
  },
  {
    word: "Fluctuate",
    phonetic: "/ˈflʌktʃueɪt/",
    meaning: "to change frequently in amount or level",
    hindiMeaning: "आवधिक परिवर्तन करना",
    usage: "Stock prices fluctuate throughout the day.",
  },
  {
    word: "Formidable",
    phonetic: "/ˈfɔːrmɪdəbl/",
    meaning:
      "inspiring fear or respect due to being large, powerful, or capable",
    hindiMeaning: "प्रभावशाली",
    usage: "The opponent was a formidable adversary in the final match.",
  },
  {
    word: "Frivolous",
    phonetic: "/ˈfrɪvələs/",
    meaning: "not having any serious purpose or value",
    hindiMeaning: "तुच्छ",
    usage: "He was criticized for spending money on frivolous things.",
  },
  {
    word: "Fascinate",
    phonetic: "/ˈfæsɪneɪt/",
    meaning: "to attract and hold the interest of someone",
    hindiMeaning: "आकर्षित करना",
    usage: "The scientist's discoveries fascinated the entire audience.",
  },
  {
    word: "Fortuitous",
    phonetic: "/fɔːˈtjuːɪtəs/",
    meaning: "happening by chance, often in a lucky or fortunate way",
    hindiMeaning: "संयोगवश",
    usage: "It was a fortuitous encounter that led to their collaboration.",
  },
  {
    word: "Frantic",
    phonetic: "/ˈfræntɪk/",
    meaning: "wild with excitement, anxiety, or other emotions",
    hindiMeaning: "उद्विग्न",
    usage: "She was frantic when she couldn’t find her keys.",
  },
  {
    word: "Feasible",
    phonetic: "/ˈfiːzəbl/",
    meaning: "possible and practical to do easily or conveniently",
    hindiMeaning: "संभव",
    usage: "The project is feasible within the given time frame.",
  },
  {
    word: "Flamboyant",
    phonetic: "/flæmˈbɔɪənt/",
    meaning:
      "attracting attention because of exuberance, confidence, and stylishness",
    hindiMeaning: "चमकदार",
    usage: "He wore a flamboyant suit to the party.",
  },
  {
    word: "Fury",
    phonetic: "/ˈfjʊəri/",
    meaning: "wild or violent anger, intense force",
    hindiMeaning: "क्रोध",
    usage: "The fury of the storm was terrifying.",
  },
  {
    word: "Frustrate",
    phonetic: "/ˈfrʌstreɪt/",
    meaning: "to prevent someone from achieving a goal",
    hindiMeaning: "निराश करना",
    usage: "The delays in the project frustrated the entire team.",
  },
  {
    word: "Fallacy",
    phonetic: "/ˈfæləsi/",
    meaning: "a false belief or mistaken idea",
    hindiMeaning: "गलत धारणा",
    usage: "It's a fallacy to think that success comes without hard work.",
  },
  {
    word: "Futile",
    phonetic: "/ˈfjuːtaɪl/",
    meaning: "incapable of producing any useful result; pointless",
    hindiMeaning: "व्यर्थ",
    usage: "All their efforts to stop the invasion were futile.",
  },
  {
    word: "Finesse",
    phonetic: "/fɪˈnɛs/",
    meaning: "intricate and refined delicacy",
    hindiMeaning: "चतुराई",
    usage: "He handled the delicate negotiation with great finesse.",
  },
  {
    word: "Foolhardy",
    phonetic: "/ˈfuːlhɑːrdi/",
    meaning: "recklessly bold or daring",
    hindiMeaning: "जोखिम से भरा",
    usage: "It would be foolhardy to try to cross the river during the flood.",
  },
  {
    word: "Flourish",
    phonetic: "/ˈflʊrɪʃ/",
    meaning: "to grow or develop in a healthy or vigorous way",
    hindiMeaning: "विकसित होना",
    usage: "The flowers flourished in the garden after the rain.",
  },
  {
    word: "Feeble",
    phonetic: "/ˈfiːbl/",
    meaning:
      "lacking physical strength, especially as a result of age or illness",
    hindiMeaning: "कमज़ोर",
    usage: "The old man gave a feeble attempt to stand.",
  },
  {
    word: "Frenzied",
    phonetic: "/ˈfrɛnziɪd/",
    meaning: "wildly excited or uncontrolled",
    hindiMeaning: "उत्साही",
    usage: "The frenzied crowd cheered loudly during the concert.",
  },
  {
    word: "Fungible",
    phonetic: "/ˈfʌndʒɪbəl/",
    meaning: "able to be replaced by another identical item",
    hindiMeaning: "बदला जा सकता है",
    usage: "Money is a fungible asset.",
  },
  {
    word: "Foresight",
    phonetic: "/ˈfɔːrsʌɪt/",
    meaning: "the ability to predict or plan for the future",
    hindiMeaning: "पूर्वदृष्टि",
    usage: "He showed great foresight in investing in emerging technologies.",
  },
  {
    word: "Fissure",
    phonetic: "/ˈfɪʃər/",
    meaning: "a narrow opening or crack",
    hindiMeaning: "दरार",
    usage: "There was a fissure in the rock caused by the earthquake.",
  },
  {
    word: "Flock",
    phonetic: "/flɒk/",
    meaning: "a group of birds or animals",
    hindiMeaning: "झुंड",
    usage: "A flock of birds flew over the lake at dawn.",
  },
  {
    word: "Forestall",
    phonetic: "/fɔːˈstɔːl/",
    meaning: "to prevent something by taking action ahead of time",
    hindiMeaning: "अवरोध करना",
    usage: "She forestalled the argument by offering a solution.",
  },
  {
    word: "Fathom",
    phonetic: "/ˈfæðəm/",
    meaning: "to understand after much thought",
    hindiMeaning: "समझना",
    usage: "I can't fathom how he managed to finish the project so quickly.",
  },
  {
    word: "Fallible",
    phonetic: "/ˈfælɪbəl/",
    meaning: "capable of making mistakes or being wrong",
    hindiMeaning: "त्रुटिपूर्ण",
    usage: "Even the best scientists are fallible.",
  },
  {
    word: "Felicity",
    phonetic: "/fəˈlɪsɪti/",
    meaning: "great happiness",
    hindiMeaning: "आनंद",
    usage: "Her face radiated felicity after hearing the good news.",
  },
  {
    word: "Franchise",
    phonetic: "/ˈfrænʧaɪz/",
    meaning:
      "the right to sell a company's products or services in a certain area",
    hindiMeaning: "फ्रैंचाइज़",
    usage: "They bought a fast food franchise and opened several branches.",
  },
  {
    word: "Faint",
    phonetic: "/feɪnt/",
    meaning: "weak and dizzy",
    hindiMeaning: "मध्यम",
    usage: "She felt faint after running for so long.",
  },
  {
    word: "Fetid",
    phonetic: "/ˈfɛtɪd/",
    meaning: "having a bad smell",
    hindiMeaning: "दुर्गंधित",
    usage: "The fetid air in the alley made it hard to breathe.",
  },
  {
    word: "Fray",
    phonetic: "/freɪ/",
    meaning: "to wear out or cause to unravel",
    hindiMeaning: "झगड़ा",
    usage: "The constant friction caused the fabric to fray at the edges.",
  },
  {
    word: "Furlough",
    phonetic: "/ˈfɜːloʊ/",
    meaning: "a temporary leave of absence from work",
    hindiMeaning: "अवकाश",
    usage: "The company gave the workers a furlough due to the lack of orders.",
  },
  {
    word: "Fumble",
    phonetic: "/ˈfʌmbl/",
    meaning: "to handle something clumsily",
    hindiMeaning: "भटकना",
    usage: "He fumbled with the keys before unlocking the door.",
  },
  {
    word: "Frenetic",
    phonetic: "/frəˈnɛtɪk/",
    meaning: "fast and energetic in a rather wild or uncontrolled way",
    hindiMeaning: "आतुर",
    usage: "The frenzied pace of the meeting left everyone exhausted.",
  },
  {
    word: "Flabbergasted",
    phonetic: "/ˈflæbərɡæstɪd/",
    meaning: "extremely surprised or shocked",
    hindiMeaning: "हैरान",
    usage: "She was flabbergasted when she won the award.",
  },
  {
    word: "Foster",
    phonetic: "/ˈfɔːstər/",
    meaning: "to encourage or promote the development of something",
    hindiMeaning: "पालन-पोषण करना",
    usage:
      "They are working to foster a sense of community in their neighborhood.",
  },
  {
    word: "Filament",
    phonetic: "/ˈfɪləmənt/",
    meaning: "a slender thread or fiber",
    hindiMeaning: "तंतु",
    usage: "The filament in the light bulb broke.",
  },
  {
    word: "Finesse",
    phonetic: "/fɪˈnɛs/",
    meaning: "delicate skill or artistry",
    hindiMeaning: "कला",
    usage: "She executed the dance with remarkable finesse.",
  },

  {
    word: "Gallant",
    phonetic: "/ˈɡæl.ənt/",
    meaning: "showing courage, determination, or bravery",
    hindiMeaning: "साहसी",
    usage: "The gallant soldier fought bravely in the war.",
  },
  {
    word: "Garner",
    phonetic: "/ˈɡɑːr.nər/",
    meaning: "to gather or collect",
    hindiMeaning: "संग्रह करना",
    usage: "She garnered a lot of praise for her hard work.",
  },
  {
    word: "Garrulous",
    phonetic: "/ˈɡærələs/",
    meaning: "excessively talkative",
    hindiMeaning: "बातूनी",
    usage: "He became garrulous after a few drinks.",
  },
  {
    word: "Genuine",
    phonetic: "/ˈdʒɛnjʊɪn/",
    meaning: "truly what something is said to be; authentic",
    hindiMeaning: "सच्चा",
    usage: "She gave me a genuine smile.",
  },
  {
    word: "Gracious",
    phonetic: "/ˈɡreɪʃəs/",
    meaning: "courteous, kind, and pleasant",
    hindiMeaning: "कृपालु",
    usage: "He was gracious enough to accept my apology.",
  },
  {
    word: "Grimace",
    phonetic: "/ˈɡrɪməs/",
    meaning: "a twisted expression on someone's face",
    hindiMeaning: "चेहरे पर शिकन",
    usage: "She made a grimace when she tasted the sour lemon.",
  },
  {
    word: "Gregarious",
    phonetic: "/ɡrɪˈɡɛə.riəs/",
    meaning: "fond of company; sociable",
    hindiMeaning: "सामाजिक",
    usage: "He is a gregarious person who enjoys meeting new people.",
  },
  {
    word: "Gallop",
    phonetic: "/ˈɡæl.əp/",
    meaning: "to run fast, especially used for horses",
    hindiMeaning: "धावक दौड़",
    usage: "The horse galloped across the field.",
  },
  {
    word: "Gratitude",
    phonetic: "/ˈɡrætɪtjud/",
    meaning: "the quality of being thankful",
    hindiMeaning: "आभार",
    usage: "He expressed his gratitude for their support.",
  },
  {
    word: "Glimpse",
    phonetic: "/ɡlɪmps/",
    meaning: "a brief or quick view",
    hindiMeaning: "झलक",
    usage: "I caught a glimpse of the actor in the crowd.",
  },
  {
    word: "Gale",
    phonetic: "/ɡeɪl/",
    meaning: "a very strong wind",
    hindiMeaning: "तूफान",
    usage: "The gale blew down several trees in the park.",
  },
  {
    word: "Gaudy",
    phonetic: "/ˈɡɔːdi/",
    meaning: "extravagantly bright or showy, typically so as to be tasteless",
    hindiMeaning: "चमकदार",
    usage: "The decorations were too gaudy for the formal event.",
  },
  {
    word: "Gaunt",
    phonetic: "/ɡɔːnt/",
    meaning: "extremely thin, especially due to suffering or hunger",
    hindiMeaning: "पतला",
    usage: "The gaunt figure of the old man stood by the door.",
  },
  {
    word: "Gutsy",
    phonetic: "/ˈɡʌtsi/",
    meaning: "showing courage or determination",
    hindiMeaning: "साहसी",
    usage: "Her gutsy decision to start a new business paid off.",
  },
  {
    word: "Gregarious",
    phonetic: "/ɡrɪˈɡɛə.riəs/",
    meaning: "sociable, outgoing",
    hindiMeaning: "सामाजिक",
    usage: "She is a gregarious person who loves to spend time with friends.",
  },
  {
    word: "Glimpse",
    phonetic: "/ɡlɪmps/",
    meaning: "a brief or fleeting look",
    hindiMeaning: "झलक",
    usage: "I saw a glimpse of the celebrity as she passed by.",
  },
  {
    word: "Grim",
    phonetic: "/ɡrɪm/",
    meaning: "serious, worrying, or unpleasant",
    hindiMeaning: "गंभीर",
    usage: "The news about the accident was grim.",
  },
  {
    word: "Gallivant",
    phonetic: "/ˈɡælɪvænt/",
    meaning: "to go from place to place in search of pleasure or entertainment",
    hindiMeaning: "सैर करना",
    usage: "They spent the summer gallivanting around Europe.",
  },
  {
    word: "Gorge",
    phonetic: "/ɡɔːrdʒ/",
    meaning: "a narrow valley between hills or mountains",
    hindiMeaning: "गहरी खाई",
    usage: "The river flowed through a narrow gorge.",
  },
  {
    word: "Grouse",
    phonetic: "/ɡraʊs/",
    meaning: "a complaint or grumble",
    hindiMeaning: "शिकायत",
    usage: "He had a grouse about the long wait at the airport.",
  },
  {
    word: "Glance",
    phonetic: "/ɡlæns/",
    meaning: "to look quickly or briefly",
    hindiMeaning: "झलक",
    usage: "She took a quick glance at the clock.",
  },
  {
    word: "Gargantuan",
    phonetic: "/ɡɑːˈɡæntʃʊən/",
    meaning: "enormous",
    hindiMeaning: "विशाल",
    usage: "The gargantuan meal was more than enough for the group.",
  },
  {
    word: "Gaffe",
    phonetic: "/ɡæf/",
    meaning: "a mistake, especially a social blunder",
    hindiMeaning: "गलती",
    usage: "His gaffe at the meeting embarrassed everyone.",
  },
  {
    word: "Gloomy",
    phonetic: "/ˈɡluːmi/",
    meaning: "dark or poorly lit; feeling sad or pessimistic",
    hindiMeaning: "उदास",
    usage: "The gloomy weather made everyone feel sluggish.",
  },
  {
    word: "Gregarious",
    phonetic: "/ɡrɪˈɡɛə.riəs/",
    meaning: "sociable, enjoying the company of others",
    hindiMeaning: "सामाजिक",
    usage: "He is a gregarious individual who thrives in large crowds.",
  },
  {
    word: "Gallop",
    phonetic: "/ˈɡæl.əp/",
    meaning: "to run swiftly, especially referring to a horse",
    hindiMeaning: "धावक दौड़",
    usage: "The horse galloped across the open field.",
  },
  {
    word: "Grudge",
    phonetic: "/ɡrʌdʒ/",
    meaning: "a persistent feeling of ill will or resentment",
    hindiMeaning: "द्वेष",
    usage: "She held a grudge against him for years.",
  },
  {
    word: "Granular",
    phonetic: "/ˈɡrænjʊlər/",
    meaning: "having a grainy texture",
    hindiMeaning: "अनाज जैसा",
    usage: "The granular texture of the sand made it difficult to walk on.",
  },
  {
    word: "Gainsay",
    phonetic: "/ɡeɪnˈseɪ/",
    meaning: "to deny or contradict",
    hindiMeaning: "इनकार करना",
    usage: "No one could gainsay the facts presented in the report.",
  },
  {
    word: "Gibberish",
    phonetic: "/ˈdʒɪbərɪʃ/",
    meaning: "unintelligible or meaningless talk",
    hindiMeaning: "बकवास",
    usage: "He was talking gibberish after the long flight.",
  },
  {
    word: "Gall",
    phonetic: "/ɡɔːl/",
    meaning: "boldness or audacity",
    hindiMeaning: "हिम्मत",
    usage: "She had the gall to speak against her boss in the meeting.",
  },
  {
    word: "Germane",
    phonetic: "/dʒɜːˈmeɪn/",
    meaning: "relevant and appropriate",
    hindiMeaning: "संगत",
    usage: "The question was not germane to the current discussion.",
  },
  {
    word: "Grave",
    phonetic: "/ɡreɪv/",
    meaning: "serious or solemn",
    hindiMeaning: "गंभीर",
    usage: "His grave expression suggested he was troubled by something.",
  },
  {
    word: "Gratify",
    phonetic: "/ˈɡrætɪfaɪ/",
    meaning: "to give pleasure or satisfaction",
    hindiMeaning: "संतुष्ट करना",
    usage: "The gift was meant to gratify her.",
  },
  {
    word: "Glimpse",
    phonetic: "/ɡlɪmps/",
    meaning: "a brief or quick view",
    hindiMeaning: "झलक",
    usage: "She caught a glimpse of the famous actor in the crowd.",
  },
  {
    word: "Gush",
    phonetic: "/ɡʌʃ/",
    meaning: "to express something with great enthusiasm",
    hindiMeaning: "बहेना",
    usage: "She couldn't help but gush about her new job.",
  },
  {
    word: "Grease",
    phonetic: "/ɡriːs/",
    meaning: "a thick oily substance",
    hindiMeaning: "तेल",
    usage: "The mechanic applied grease to the car engine parts.",
  },
  {
    word: "Gush",
    phonetic: "/ɡʌʃ/",
    meaning: "to flow out in a rapid and plentiful stream",
    hindiMeaning: "बहेना",
    usage: "Water began to gush out from the broken pipe.",
  },
  {
    word: "Germane",
    phonetic: "/dʒɜːˈmeɪn/",
    meaning: "relevant to a subject under consideration",
    hindiMeaning: "संगत",
    usage: "Her comments were not germane to the ongoing discussion.",
  },

  {
    word: "Habitat",
    phonetic: "/ˈhæbɪtæt/",
    meaning:
      "the natural home or environment of an animal, plant, or other organism",
    hindiMeaning: "आवास",
    usage: "The forest is the habitat of many wild animals.",
  },
  {
    word: "Hack",
    phonetic: "/hæk/",
    meaning: "to cut or chop something roughly",
    hindiMeaning: "काटना",
    usage: "He hacked through the thick branches with a machete.",
  },
  {
    word: "Hail",
    phonetic: "/heɪl/",
    meaning: "pellets of frozen rain",
    hindiMeaning: "ओले",
    usage: "The crops were damaged by the hailstorm.",
  },
  {
    word: "Halt",
    phonetic: "/hɔːlt/",
    meaning: "to stop",
    hindiMeaning: "रोकना",
    usage: "The car came to a sudden halt.",
  },
  {
    word: "Handsome",
    phonetic: "/ˈhænsəm/",
    meaning: "good-looking, especially of a man",
    hindiMeaning: "सुंदर",
    usage: "He is a handsome man with striking features.",
  },
  {
    word: "Harass",
    phonetic: "/həˈræs/",
    meaning: "to disturb or trouble repeatedly",
    hindiMeaning: "तंग करना",
    usage: "She felt harassed by the constant calls from telemarketers.",
  },
  {
    word: "Harmonious",
    phonetic: "/hɑːˈməʊnɪəs/",
    meaning: "forming a pleasing or consistent whole",
    hindiMeaning: "संगत",
    usage: "They had a harmonious relationship and worked well together.",
  },
  {
    word: "Harsh",
    phonetic: "/hɑːrʃ/",
    meaning: "severe or cruel",
    hindiMeaning: "कठोर",
    usage: "The harsh winters make life difficult in the mountains.",
  },
  {
    word: "Hasten",
    phonetic: "/ˈheɪsən/",
    meaning: "to hurry or accelerate",
    hindiMeaning: "जल्दी करना",
    usage: "He hastened to finish his homework before the deadline.",
  },
  {
    word: "Haughty",
    phonetic: "/ˈhɔːti/",
    meaning: "arrogantly superior and disdainful",
    hindiMeaning: "अहंकारी",
    usage: "Her haughty attitude made her unpopular among her peers.",
  },
  {
    word: "Haunt",
    phonetic: "/hɔːnt/",
    meaning: "to visit or appear repeatedly",
    hindiMeaning: "परेशान करना",
    usage: "The memory of her lost pet continued to haunt her for months.",
  },
  {
    word: "Heed",
    phonetic: "/hiːd/",
    meaning: "to pay attention to",
    hindiMeaning: "ध्यान देना",
    usage: "You should heed the advice of experienced professionals.",
  },
  {
    word: "Heir",
    phonetic: "/ɛər/",
    meaning:
      "a person legally entitled to the property or rank of another on that person's death",
    hindiMeaning: "विरासतधारक",
    usage: "He was the heir to a large fortune.",
  },
  {
    word: "Helpless",
    phonetic: "/ˈhɛlpləs/",
    meaning: "unable to help oneself or others",
    hindiMeaning: "बेहल",
    usage: "The child was helpless without the aid of his parents.",
  },
  {
    word: "Herald",
    phonetic: "/ˈhɛrəld/",
    meaning:
      "a person or thing that announces or signals the approach of another",
    hindiMeaning: "सूचना देनेवाला",
    usage: "The herald announced the arrival of the king.",
  },
  {
    word: "Hinder",
    phonetic: "/ˈhɪndər/",
    meaning:
      "to create difficulties for someone or something, resulting in delay or obstruction",
    hindiMeaning: "रोकना",
    usage: "The rain hindered the progress of the construction work.",
  },
  {
    word: "Hoarse",
    phonetic: "/hɔːs/",
    meaning: "having a rough or harsh voice",
    hindiMeaning: "काँपती आवाज़",
    usage: "She had a hoarse voice after cheering at the concert all night.",
  },
  {
    word: "Hollow",
    phonetic: "/ˈhɒləʊ/",
    meaning: "having a hole or empty space inside",
    hindiMeaning: "खोखला",
    usage: "The tree trunk was hollow and could be used as a shelter.",
  },
  {
    word: "Honest",
    phonetic: "/ˈɒnɪst/",
    meaning: "free of deceit and untruthfulness",
    hindiMeaning: "ईमानदार",
    usage: "She is an honest person who always tells the truth.",
  },
  {
    word: "Honor",
    phonetic: "/ˈɒnər/",
    meaning: "high respect or esteem",
    hindiMeaning: "सम्मान",
    usage: "He was awarded the honor of being the guest of honor.",
  },
  {
    word: "Hopeful",
    phonetic: "/ˈhəʊpfəl/",
    meaning: "feeling or inspiring optimism about a future event",
    hindiMeaning: "आशावादी",
    usage: "She remained hopeful despite the challenges she faced.",
  },
  {
    word: "Hostile",
    phonetic: "/ˈhɒstaɪl/",
    meaning: "unfriendly, antagonistic",
    hindiMeaning: "दुश्मनी",
    usage:
      "The negotiations were unsuccessful due to hostile relations between the two countries.",
  },
  {
    word: "Huddle",
    phonetic: "/ˈhʌdəl/",
    meaning:
      "to gather closely together, often for warmth or to discuss something",
    hindiMeaning: "एकत्र होना",
    usage: "The team huddled together to discuss their strategy.",
  },
  {
    word: "Humiliate",
    phonetic: "/hjuːˈmɪlieɪt/",
    meaning: "to make someone feel ashamed or foolish",
    hindiMeaning: "अपमानित करना",
    usage: "The teacher humiliated the student in front of the class.",
  },
  {
    word: "Hunger",
    phonetic: "/ˈhʌŋɡər/",
    meaning: "a feeling of discomfort caused by the need for food",
    hindiMeaning: "भुख",
    usage: "The long journey made him feel intense hunger.",
  },
  {
    word: "Harmonize",
    phonetic: "/ˈhɑːmənaɪz/",
    meaning: "to bring into harmonious or agreeable relation",
    hindiMeaning: "संगत करना",
    usage: "The musicians harmonized beautifully during the performance.",
  },
  {
    word: "Humble",
    phonetic: "/ˈhʌmbəl/",
    meaning: "having or showing a modest or low estimate of one's importance",
    hindiMeaning: "नम्र",
    usage: "Despite his success, he remains a humble person.",
  },
  {
    word: "Hunt",
    phonetic: "/hʌnt/",
    meaning: "to search or pursue something, especially animals for food",
    hindiMeaning: "शिकार करना",
    usage: "They went out to hunt for food in the forest.",
  },
  {
    word: "Haggle",
    phonetic: "/ˈhæɡəl/",
    meaning: "to argue persistently over the cost of something",
    hindiMeaning: "सौदा करना",
    usage: "She haggled with the vendor to get a better price.",
  },
  {
    word: "Humor",
    phonetic: "/ˈhjuːmər/",
    meaning: "the quality of being amusing or entertaining",
    hindiMeaning: "हंसी",
    usage: "His sense of humor lightened up the entire room.",
  },
  {
    word: "Hypocrite",
    phonetic: "/ˈhɪpəkrɪt/",
    meaning: "a person who indulges in hypocrisy",
    hindiMeaning: "पाखंडी",
    usage: "He is a hypocrite who preaches honesty but lies all the time.",
  },
  {
    word: "Hesitate",
    phonetic: "/ˈhɛzɪteɪt/",
    meaning: "to pause before doing something, due to uncertainty or doubt",
    hindiMeaning: "हिचकिचाना",
    usage: "She hesitated before answering the question.",
  },
  {
    word: "Hearty",
    phonetic: "/ˈhɑːti/",
    meaning: "lively, strong, and full of energy",
    hindiMeaning: "जोश से भरपूर",
    usage: "The hearty laughter filled the room.",
  },
  {
    word: "Handy",
    phonetic: "/ˈhændi/",
    meaning: "convenient to use or nearby",
    hindiMeaning: "सहज",
    usage: "She always keeps a handy tool in her purse.",
  },
  {
    word: "Hub",
    phonetic: "/hʌb/",
    meaning: "a central point of activity or importance",
    hindiMeaning: "केन्द्र",
    usage: "The city is a hub for business and culture.",
  },
  {
    word: "Hustle",
    phonetic: "/ˈhʌsəl/",
    meaning: "to push or force someone to move",
    hindiMeaning: "धक्का देना",
    usage: "The crowd was hustling to get to the front.",
  },
  {
    word: "Harrow",
    phonetic: "/ˈhæroʊ/",
    meaning: "to cause distress or torment",
    hindiMeaning: "दुःख देना",
    usage: "The news of her illness harrowed him.",
  },
  {
    word: "Hover",
    phonetic: "/ˈhɒvər/",
    meaning: "to remain in one place in the air",
    hindiMeaning: "उड़ते रहना",
    usage: "The helicopter hovered above the building.",
  },
  {
    word: "Hunger",
    phonetic: "/ˈhʌŋɡər/",
    meaning: "a feeling of discomfort caused by the need for food",
    hindiMeaning: "भुख",
    usage: "The long journey made him feel intense hunger.",
  },
  {
    word: "Hitch",
    phonetic: "/hɪtʃ/",
    meaning: "a temporary interruption or problem",
    hindiMeaning: "रुकावट",
    usage: "There was a hitch in the plan, so we had to postpone the meeting.",
  },

  {
    word: "Icon",
    phonetic: "/ˈaɪkɒn/",
    meaning: "a symbol or graphic representation",
    hindiMeaning: "प्रतीक",
    usage: "The app’s icon is easily recognizable.",
  },
  {
    word: "Ideal",
    phonetic: "/aɪˈdɛəl/",
    meaning: "perfect or most suitable",
    hindiMeaning: "आदर्श",
    usage: "She is the ideal candidate for the job.",
  },
  {
    word: "Ignite",
    phonetic: "/ɪɡˈnaɪt/",
    meaning: "to start a fire or cause to burn",
    hindiMeaning: "जलाना",
    usage: "The matchstick ignited the dry grass.",
  },
  {
    word: "Imitate",
    phonetic: "/ˈɪmɪteɪt/",
    meaning: "to copy or mimic the actions or behavior",
    hindiMeaning: "नकल करना",
    usage: "Children often imitate their parents' behavior.",
  },
  {
    word: "Impact",
    phonetic: "/ˈɪmpækt/",
    meaning: "the strong effect or influence something has",
    hindiMeaning: "प्रभाव",
    usage: "The new law had a significant impact on the economy.",
  },
  {
    word: "Important",
    phonetic: "/ɪmˈpɔːtnt/",
    meaning: "of great significance",
    hindiMeaning: "महत्वपूर्ण",
    usage: "It is important to stay focused during the meeting.",
  },
  {
    word: "Inadequate",
    phonetic: "/ɪnˈædɪkwət/",
    meaning: "not sufficient or not enough",
    hindiMeaning: "अपर्याप्त",
    usage: "His explanation was inadequate to solve the problem.",
  },
  {
    word: "Incredible",
    phonetic: "/ɪnˈkrɛdəbl/",
    meaning: "impossible to believe; extraordinary",
    hindiMeaning: "अविश्वसनीय",
    usage: "Her performance was incredible, earning her a standing ovation.",
  },
  {
    word: "Inherit",
    phonetic: "/ɪnˈhɛrɪt/",
    meaning: "to receive something from someone, usually after their death",
    hindiMeaning: "विरासत में प्राप्त करना",
    usage: "She inherited her grandmother's jewelry.",
  },
  {
    word: "Inspire",
    phonetic: "/ɪnˈspaɪə/",
    meaning: "to fill someone with the urge or ability to do something",
    hindiMeaning: "प्रेरित करना",
    usage: "Her speech inspired many to take action.",
  },
  {
    word: "Intelligent",
    phonetic: "/ɪnˈtɛlɪdʒənt/",
    meaning: "having high mental capacity",
    hindiMeaning: "बुद्धिमान",
    usage: "He is known as an intelligent student.",
  },
  {
    word: "Integrate",
    phonetic: "/ˈɪntɪɡreɪt/",
    meaning: "to combine two or more things to create a whole",
    hindiMeaning: "संयुक्त करना",
    usage: "The software integrates well with existing systems.",
  },
  {
    word: "Intense",
    phonetic: "/ɪnˈtɛns/",
    meaning: "extreme in degree or strength",
    hindiMeaning: "तीव्र",
    usage: "There was intense competition for the scholarship.",
  },
  {
    word: "Interesting",
    phonetic: "/ˈɪntrəstɪŋ/",
    meaning: "engaging or captivating",
    hindiMeaning: "रोमांचक",
    usage: "This book is very interesting, and I couldn't put it down.",
  },
  {
    word: "Intuition",
    phonetic: "/ˌɪntjʊˈɪʃən/",
    meaning:
      "the ability to understand something without the need for conscious reasoning",
    hindiMeaning: "स्वाभाविक ज्ञान",
    usage: "Her intuition told her something was wrong.",
  },
  {
    word: "Invisible",
    phonetic: "/ɪnˈvɪzɪbl/",
    meaning: "unable to be seen",
    hindiMeaning: "अदृश्य",
    usage: "The air around us is invisible to the naked eye.",
  },
  {
    word: "Involve",
    phonetic: "/ɪnˈvɒlv/",
    meaning: "to include or make someone a part of something",
    hindiMeaning: "शामिल करना",
    usage: "The project involves many aspects of software development.",
  },
  {
    word: "Irony",
    phonetic: "/ˈaɪrəni/",
    meaning:
      "a situation that is strange or funny because things happen in the opposite way to what you expect",
    hindiMeaning: "विडंबना",
    usage: "It was an irony that he failed the test despite studying so hard.",
  },
  {
    word: "Inevitable",
    phonetic: "/ɪˈnɛvɪtəbl/",
    meaning: "certain to happen and impossible to avoid",
    hindiMeaning: "अपरिहार्य",
    usage: "The failure of the project was inevitable due to lack of planning.",
  },
  {
    word: "Immense",
    phonetic: "/ɪˈmɛns/",
    meaning: "extremely large or great",
    hindiMeaning: "विशाल",
    usage: "They were amazed by the immense size of the pyramid.",
  },
  {
    word: "Impactful",
    phonetic: "/ɪmˈpæktfl/",
    meaning: "having a strong effect",
    hindiMeaning: "प्रभावशाली",
    usage: "Her speech was highly impactful and moved the audience.",
  },
  {
    word: "Innocent",
    phonetic: "/ˈɪnəsənt/",
    meaning: "not guilty of a crime or offense",
    hindiMeaning: "निरपराध",
    usage: "He was declared innocent of all charges.",
  },
  {
    word: "Idealistic",
    phonetic: "/ˌaɪdɪəˈlɪstɪk/",
    meaning: "believing or pursuing noble ideals",
    hindiMeaning: "आदर्शवादी",
    usage: "She had an idealistic view of how the world should be.",
  },
  {
    word: "Inconsistent",
    phonetic: "/ˌɪnkənˈsɪstənt/",
    meaning: "not staying the same throughout",
    hindiMeaning: "अस्थिर",
    usage:
      "His results were inconsistent, making it hard to predict his performance.",
  },
  {
    word: "Intangible",
    phonetic: "/ɪnˈtændʒəbl/",
    meaning: "not able to be touched or grasped; not having physical presence",
    hindiMeaning: "अमूर्त",
    usage: "Trust is an intangible quality that is difficult to measure.",
  },
  {
    word: "Indifferent",
    phonetic: "/ɪnˈdɪfrənt/",
    meaning: "having no particular interest or concern",
    hindiMeaning: "उदासीन",
    usage: "He was indifferent to the outcome of the election.",
  },
  {
    word: "Intriguing",
    phonetic: "/ɪnˈtriːɡɪŋ/",
    meaning: "arousing one's curiosity or interest",
    hindiMeaning: "रोचक",
    usage: "The mysterious story was very intriguing.",
  },
  {
    word: "Indicate",
    phonetic: "/ˈɪndɪkeɪt/",
    meaning: "to show or point out",
    hindiMeaning: "सूचित करना",
    usage: "The weather report indicates that rain is expected tomorrow.",
  },
  {
    word: "Improvise",
    phonetic: "/ˈɪmprəvaɪz/",
    meaning: "to create or make something without preparation",
    hindiMeaning: "तत्काल करना",
    usage: "They had to improvise when the equipment failed.",
  },
  {
    word: "Insightful",
    phonetic: "/ˈɪnsaɪtfʊl/",
    meaning: "having a clear understanding or perception",
    hindiMeaning: "गहरी समझ",
    usage: "His insightful comments on the issue were appreciated.",
  },
  {
    word: "Infamous",
    phonetic: "/ˈɪnfeɪməs/",
    meaning: "well known for a bad quality or deed",
    hindiMeaning: "कुख्यात",
    usage: "The infamous pirate was feared by sailors around the world.",
  },
  {
    word: "Impressive",
    phonetic: "/ɪmˈprɛsɪv/",
    meaning: "making a strong impact or effect",
    hindiMeaning: "प्रभावशाली",
    usage: "Her presentation was impressive, leaving the audience in awe.",
  },
  {
    word: "Incredible",
    phonetic: "/ɪnˈkrɛdəbl/",
    meaning: "hard to believe; extraordinary",
    hindiMeaning: "अविश्वसनीय",
    usage: "He told an incredible story about his travels.",
  },
  {
    word: "Idealize",
    phonetic: "/aɪˈdɛəlaɪz/",
    meaning: "to regard or treat something as perfect",
    hindiMeaning: "आदर्श मानना",
    usage: "They idealized the old days, forgetting their difficulties.",
  },
  {
    word: "Impartial",
    phonetic: "/ɪmˈpɑːʃəl/",
    meaning: "not biased or prejudiced",
    hindiMeaning: "निष्पक्ष",
    usage: "The judge was impartial in his decision-making.",
  },
  {
    word: "Influx",
    phonetic: "/ˈɪnflʌks/",
    meaning: "an arrival or entry of large numbers of people or things",
    hindiMeaning: "प्रवाह",
    usage: "The city experienced an influx of tourists during the summer.",
  },
  {
    word: "Instinct",
    phonetic: "/ˈɪnstɪŋkt/",
    meaning: "an innate behavior or natural impulse",
    hindiMeaning: "स्वाभाविक प्रवृत्ति",
    usage: "The bird instinctively flew south for the winter.",
  },
  {
    word: "Indulgent",
    phonetic: "/ɪnˈdʌldʒənt/",
    meaning: "showing or characterized by excessive generosity or leniency",
    hindiMeaning: "दया से भरा",
    usage:
      "He was indulgent toward his children, allowing them to stay up late.",
  },
  {
    word: "Intimidate",
    phonetic: "/ɪnˈtɪmɪdeɪt/",
    meaning: "to frighten or make someone feel afraid",
    hindiMeaning: "डराना",
    usage: "The loud noise intimidated the smaller animals.",
  },
  {
    word: "Inclusive",
    phonetic: "/ɪnˈkluːsɪv/",
    meaning:
      "including all the services, facilities, or items normally expected",
    hindiMeaning: "समावेशी",
    usage: "The resort offered an all-inclusive package for the vacationers.",
  },
  {
    word: "Insulate",
    phonetic: "/ˈɪnsəleɪt/",
    meaning:
      "to protect something by surrounding it with material that reduces the passage of heat or sound",
    hindiMeaning: "इन्सुलेट करना",
    usage: "The walls were insulated to prevent heat loss during winter.",
  },
  {
    word: "Incite",
    phonetic: "/ɪnˈsaɪt/",
    meaning: "to provoke or stir up",
    hindiMeaning: "उकसाना",
    usage: "The speech was intended to incite the crowd into action.",
  },

  {
    word: "Jab",
    phonetic: "/dʒæb/",
    meaning: "a quick blow, especially with the fist",
    hindiMeaning: "घुसा",
    usage: "He delivered a powerful jab to his opponent's chest.",
  },
  {
    word: "Jail",
    phonetic: "/dʒeɪl/",
    meaning: "a place where prisoners are kept",
    hindiMeaning: "जेल",
    usage: "He was sent to jail for his crimes.",
  },
  {
    word: "Jasmine",
    phonetic: "/ˈdʒæzmɪn/",
    meaning: "a fragrant flower",
    hindiMeaning: "चमेली",
    usage: "The garden was filled with the sweet fragrance of jasmine.",
  },
  {
    word: "Juggle",
    phonetic: "/ˈdʒʌɡl/",
    meaning: "to continuously toss multiple objects into the air",
    hindiMeaning: "झूला",
    usage: "He can juggle five balls at once.",
  },
  {
    word: "Jovial",
    phonetic: "/ˈdʒoʊviəl/",
    meaning: "cheerful and friendly",
    hindiMeaning: "हंसी-मज़ाक करने वाला",
    usage: "He is a jovial person, always making others laugh.",
  },
  {
    word: "Joint",
    phonetic: "/dʒɔɪnt/",
    meaning: "a place where two or more things are connected",
    hindiMeaning: "संयुक्त",
    usage: "The elbow is a joint where the upper arm and forearm meet.",
  },
  {
    word: "Joke",
    phonetic: "/dʒoʊk/",
    meaning: "a humorous remark or story",
    hindiMeaning: "मज़ाक",
    usage: "He told a funny joke that made everyone laugh.",
  },
  {
    word: "Journey",
    phonetic: "/ˈdʒɜːrni/",
    meaning: "the act of traveling from one place to another",
    hindiMeaning: "यात्रा",
    usage: "They embarked on a long journey across the country.",
  },
  {
    word: "Jump",
    phonetic: "/dʒʌmp/",
    meaning: "to push oneself off the ground and into the air",
    hindiMeaning: "कूदना",
    usage: "She had to jump over the puddle to avoid getting wet.",
  },
  {
    word: "Justice",
    phonetic: "/ˈdʒʌstɪs/",
    meaning: "fair treatment or behavior",
    hindiMeaning: "न्याय",
    usage: "The court is committed to delivering justice to all.",
  },
  {
    word: "Jury",
    phonetic: "/ˈdʒʊri/",
    meaning: "a group of people selected to hear and decide a legal case",
    hindiMeaning: "जूरी",
    usage: "The jury found the defendant guilty of the crime.",
  },
  {
    word: "Jungle",
    phonetic: "/ˈdʒʌŋɡəl/",
    meaning: "a dense forest, typically in tropical areas",
    hindiMeaning: "जंगल",
    usage: "The jungle was home to a wide variety of wildlife.",
  },
  {
    word: "Juice",
    phonetic: "/dʒuːs/",
    meaning: "a liquid naturally contained in fruits or vegetables",
    hindiMeaning: "रस",
    usage: "She drank a glass of fresh orange juice.",
  },
  {
    word: "Jumpy",
    phonetic: "/ˈdʒʌmpi/",
    meaning: "nervous or easily startled",
    hindiMeaning: "काँपने वाला",
    usage: "He felt jumpy after hearing strange noises in the dark.",
  },
  {
    word: "Just",
    phonetic: "/dʒʌst/",
    meaning: "fair or morally right",
    hindiMeaning: "सिर्फ़",
    usage: "She made a just decision, considering all the facts.",
  },
  {
    word: "Jolly",
    phonetic: "/ˈdʒɒli/",
    meaning: "happy and cheerful",
    hindiMeaning: "खुश",
    usage: "They had a jolly time at the party.",
  },
  {
    word: "Jealous",
    phonetic: "/ˈdʒɛləs/",
    meaning: "feeling resentment or envy towards someone",
    hindiMeaning: "ईर्ष्यालु",
    usage: "She was jealous of her friend's new car.",
  },
  {
    word: "Jumpstart",
    phonetic: "/ˈdʒʌmpstɑːrt/",
    meaning: "to start something quickly or with extra effort",
    hindiMeaning: "तेज शुरुआत",
    usage: "He used coffee to jumpstart his morning.",
  },
  {
    word: "Joke",
    phonetic: "/dʒoʊk/",
    meaning: "a humorous statement or story",
    hindiMeaning: "मज़ाक",
    usage: "He cracked a joke to lighten the mood in the room.",
  },
  {
    word: "Jeopardy",
    phonetic: "/ˈdʒɛpərdi/",
    meaning: "danger of harm or loss",
    hindiMeaning: "खतरा",
    usage: "His actions put the whole project in jeopardy.",
  },
  {
    word: "Juggle",
    phonetic: "/ˈdʒʌɡl/",
    meaning: "to continuously throw and catch several objects",
    hindiMeaning: "झूला",
    usage: "He managed to juggle work and personal life effectively.",
  },
  {
    word: "Jargon",
    phonetic: "/ˈdʒɑːɡən/",
    meaning: "specialized language used by a particular group",
    hindiMeaning: "विशेषज्ञ शब्द",
    usage:
      "The doctor used medical jargon that the patients couldn't understand.",
  },
  {
    word: "Jolly",
    phonetic: "/ˈdʒɒli/",
    meaning: "happy, cheerful, or in a good mood",
    hindiMeaning: "मज़ेदार",
    usage: "They had a jolly time at the celebration.",
  },
  {
    word: "Joy",
    phonetic: "/dʒɔɪ/",
    meaning: "a feeling of great happiness",
    hindiMeaning: "आनंद",
    usage: "The birth of her child brought her immense joy.",
  },
  {
    word: "Joke",
    phonetic: "/dʒoʊk/",
    meaning: "a funny story or statement",
    hindiMeaning: "मज़ाक",
    usage: "She told a joke that made everyone burst out laughing.",
  },
  {
    word: "Jazz",
    phonetic: "/dʒæz/",
    meaning: "a style of music characterized by improvisation",
    hindiMeaning: "जैज़ संगीत",
    usage: "He loves listening to jazz music while working.",
  },
  {
    word: "Jostle",
    phonetic: "/ˈdʒɒsəl/",
    meaning: "to push or shove roughly",
    hindiMeaning: "धक्का देना",
    usage: "People jostled for a better view of the performance.",
  },
  {
    word: "Jinx",
    phonetic: "/dʒɪŋks/",
    meaning: "a person or thing that brings bad luck",
    hindiMeaning: "शुभाशुभ संकेत",
    usage: "She thought breaking a mirror would jinx her.",
  },
  {
    word: "Juxtapose",
    phonetic: "/ˈdʒʌkstəˌpoʊz/",
    meaning: "to place two things side by side for comparison",
    hindiMeaning: "साथ रखना",
    usage: "The artist juxtaposed light and dark colors in the painting.",
  },
  {
    word: "Jumpy",
    phonetic: "/ˈdʒʌmpi/",
    meaning: "easily startled or nervous",
    hindiMeaning: "काँपने वाला",
    usage: "The loud noises made him feel jumpy.",
  },
  {
    word: "Junk",
    phonetic: "/dʒʌŋk/",
    meaning: "old or discarded items",
    hindiMeaning: "कचरा",
    usage: "He collected junk to sell as scrap metal.",
  },
  {
    word: "Jagged",
    phonetic: "/ˈdʒæɡɪd/",
    meaning: "having rough, sharp points",
    hindiMeaning: "कटा हुआ",
    usage: "The cliff had jagged rocks along its edge.",
  },
  {
    word: "Jumbled",
    phonetic: "/ˈdʒʌmbəld/",
    meaning: "mixed up in a confused or disorderly manner",
    hindiMeaning: "उलझा हुआ",
    usage: "The papers on his desk were all jumbled together.",
  },
  {
    word: "Jumping",
    phonetic: "/ˈdʒʌmpɪŋ/",
    meaning: "leaping off the ground",
    hindiMeaning: "कूदना",
    usage: "She was jumping with excitement after receiving the news.",
  },
  {
    word: "Jerky",
    phonetic: "/ˈdʒɜːrki/",
    meaning: "abrupt or uneven movements",
    hindiMeaning: "झटकेदार",
    usage: "The car made jerky movements due to the rough road.",
  },
  {
    word: "Jeer",
    phonetic: "/dʒɪər/",
    meaning: "to mock or ridicule",
    hindiMeaning: "ठहाका लगाना",
    usage: "The crowd jeered at the player after his mistake.",
  },
  {
    word: "Jolly",
    phonetic: "/ˈdʒɒli/",
    meaning: "full of cheer or happiness",
    hindiMeaning: "खुश",
    usage: "The jolly atmosphere at the party made everyone feel welcome.",
  },
  {
    word: "Jolly",
    phonetic: "/ˈdʒɒli/",
    meaning: "happy and in good spirits",
    hindiMeaning: "मज़ेदार",
    usage: "He was always the jolly one at the party.",
  },

  {
    word: "Keen",
    phonetic: "/kiːn/",
    meaning: "having a sharp edge or point; eager",
    hindiMeaning: "तेज़, उत्साही",
    usage: "She was keen on learning new languages.",
  },
  {
    word: "Kettle",
    phonetic: "/ˈkɛtl/",
    meaning: "a container for boiling liquids",
    hindiMeaning: "चाय का बर्तन",
    usage: "He boiled water in the kettle for tea.",
  },
  {
    word: "Knowledge",
    phonetic: "/ˈnɒlɪdʒ/",
    meaning: "information, understanding, or skill gained through experience",
    hindiMeaning: "ज्ञान",
    usage: "He has vast knowledge of ancient history.",
  },
  {
    word: "Knot",
    phonetic: "/nɒt/",
    meaning: "a loop of rope or string tied in a specific way",
    hindiMeaning: "गांठ",
    usage: "He tied the rope in a secure knot.",
  },
  {
    word: "Kind",
    phonetic: "/kaɪnd/",
    meaning: "having a good and caring nature",
    hindiMeaning: "दयालु",
    usage: "She is a kind person who always helps others.",
  },
  {
    word: "Knee",
    phonetic: "/niː/",
    meaning: "the joint between the thigh and the lower leg",
    hindiMeaning: "घुटना",
    usage: "He injured his knee during the game.",
  },
  {
    word: "Kiss",
    phonetic: "/kɪs/",
    meaning: "to touch or press with the lips as a sign of love or affection",
    hindiMeaning: "चुमना",
    usage: "They shared a kiss before saying goodbye.",
  },
  {
    word: "Knock",
    phonetic: "/nɒk/",
    meaning: "to strike a surface or object with a sharp sound",
    hindiMeaning: "दरवाजे पर दस्तक देना",
    usage: "She knocked on the door before entering.",
  },
  {
    word: "King",
    phonetic: "/kɪŋ/",
    meaning: "a male ruler of a country",
    hindiMeaning: "राजा",
    usage: "The king ruled over the land for many years.",
  },
  {
    word: "Kid",
    phonetic: "/kɪd/",
    meaning: "a child or young person",
    hindiMeaning: "बच्चा",
    usage: "The kids were playing in the park.",
  },
  {
    word: "Kite",
    phonetic: "/kaɪt/",
    meaning: "a light frame covered with cloth or paper, flown in the wind",
    hindiMeaning: "पतंग",
    usage: "He flew a colorful kite in the sky.",
  },
  {
    word: "Kitchen",
    phonetic: "/ˈkɪtʃɪn/",
    meaning: "a room where food is prepared",
    hindiMeaning: "रसोई",
    usage: "She spent the afternoon cooking in the kitchen.",
  },
  {
    word: "Knive",
    phonetic: "/naɪv/",
    meaning: "a cutting instrument with a sharp blade",
    hindiMeaning: "चाकू",
    usage: "He used a sharp knife to cut the vegetables.",
  },
  {
    word: "Knowledgeable",
    phonetic: "/ˈnɒlɪdʒəbl/",
    meaning: "having much knowledge",
    hindiMeaning: "ज्ञानी",
    usage: "He is a knowledgeable person with great expertise.",
  },
  {
    word: "Killer",
    phonetic: "/ˈkɪlər/",
    meaning: "a person or thing that kills",
    hindiMeaning: "हत्यारा",
    usage: "The killer was arrested after a long chase.",
  },
  {
    word: "Kneeled",
    phonetic: "/niːld/",
    meaning: "to bend the knee to kneel down",
    hindiMeaning: "घुटने टेकना",
    usage: "She kneeled down to tie her shoes.",
  },
  {
    word: "Kindness",
    phonetic: "/ˈkaɪndnəs/",
    meaning: "the quality of being friendly, generous, and considerate",
    hindiMeaning: "दया",
    usage: "His kindness was appreciated by everyone.",
  },
  {
    word: "Killer",
    phonetic: "/ˈkɪlər/",
    meaning: "a person or thing that kills",
    hindiMeaning: "हत्यारा",
    usage: "The killer was arrested after a long investigation.",
  },
  {
    word: "Kettle",
    phonetic: "/ˈkɛtl/",
    meaning: "a container for boiling liquids",
    hindiMeaning: "चाय का बर्तन",
    usage: "The kettle is boiling with water for the tea.",
  },
  {
    word: "Knotty",
    phonetic: "/ˈnɒti/",
    meaning: "having knots or difficult to solve",
    hindiMeaning: "उलझा हुआ",
    usage: "The problem became knotty and hard to solve.",
  },
  {
    word: "Kneejerk",
    phonetic: "/ˈniːdʒɜːrk/",
    meaning: "a quick and automatic reaction",
    hindiMeaning: "तुरंत प्रतिक्रिया",
    usage: "His kneejerk reaction was to apologize immediately.",
  },
  {
    word: "Keenest",
    phonetic: "/kiːnɪst/",
    meaning: "having the sharpest or most intense quality",
    hindiMeaning: "उत्साही",
    usage: "She had the keenest mind of all the students.",
  },
  {
    word: "Kidnap",
    phonetic: "/ˈkɪdnæp/",
    meaning: "to take a person by force or threat",
    hindiMeaning: "अपहरण करना",
    usage: "The criminal was charged with kidnapping a child.",
  },
  {
    word: "Kale",
    phonetic: "/keɪl/",
    meaning: "a type of green vegetable",
    hindiMeaning: "साग",
    usage: "Kale is rich in vitamins and minerals.",
  },
  {
    word: "Knee-high",
    phonetic: "/ˈniːhaɪ/",
    meaning: "reaching up to the knees",
    hindiMeaning: "घुटने तक",
    usage: "The children were knee-high in the field of tall grass.",
  },
  {
    word: "Kinky",
    phonetic: "/ˈkɪŋki/",
    meaning: "unusual or strange in a way that is attractive",
    hindiMeaning: "अजीब",
    usage: "He wore a kinky outfit to the costume party.",
  },
  {
    word: "Kangaroo",
    phonetic: "/ˈkæŋɡəruː/",
    meaning: "a large marsupial from Australia",
    hindiMeaning: "कंगारू",
    usage: "We saw a kangaroo at the zoo.",
  },
  {
    word: "Knack",
    phonetic: "/næk/",
    meaning: "a special skill or ability",
    hindiMeaning: "कला",
    usage: "He has a knack for solving puzzles quickly.",
  },
  {
    word: "Knave",
    phonetic: "/neɪv/",
    meaning: "a dishonest or unscrupulous man",
    hindiMeaning: "धूर्त व्यक्ति",
    usage: "He was known as a knave who deceived people for his own benefit.",
  },
  {
    word: "Knitting",
    phonetic: "/ˈnɪtɪŋ/",
    meaning: "the act of creating fabric by interlocking yarn",
    hindiMeaning: "बुनाई",
    usage: "She spends her free time knitting scarves.",
  },
  {
    word: "Knead",
    phonetic: "/niːd/",
    meaning: "to work dough or clay by pressing it",
    hindiMeaning: "मलना",
    usage: "She kneaded the dough to make bread.",
  },
  {
    word: "Karma",
    phonetic: "/ˈkɑːrmə/",
    meaning: "the belief that actions will influence one's future",
    hindiMeaning: "कर्म",
    usage: "She believes in karma and that good deeds will be rewarded.",
  },
  {
    word: "Kernel",
    phonetic: "/ˈkɜːrnəl/",
    meaning: "the softer, usually edible part of a seed or nut",
    hindiMeaning: "बीज का मुलायम भाग",
    usage: "He cracked open the walnut to eat the kernel inside.",
  },
  {
    word: "Kick",
    phonetic: "/kɪk/",
    meaning: "to strike with the foot",
    hindiMeaning: "लात",
    usage: "She gave the ball a strong kick.",
  },
  {
    word: "Killer",
    phonetic: "/ˈkɪlər/",
    meaning: "something or someone that causes death",
    hindiMeaning: "हत्यारा",
    usage: "The killer was caught after the investigation.",
  },
  {
    word: "Knuckle",
    phonetic: "/ˈnʌkl/",
    meaning: "a joint of the fingers",
    hindiMeaning: "अंगूठे का जोड़",
    usage: "He cracked his knuckles out of habit.",
  },
  {
    word: "Knockout",
    phonetic: "/ˈnɒkaʊt/",
    meaning: "a blow that renders someone unconscious",
    hindiMeaning: "नॉकआउट",
    usage: "The boxer delivered a knockout punch.",
  },
  {
    word: "Kooky",
    phonetic: "/ˈkuːki/",
    meaning: "eccentric or strange",
    hindiMeaning: "अजीब",
    usage: "His kooky sense of humor made everyone laugh.",
  },
  {
    word: "Kaleidoscope",
    phonetic: "/kəˈlaɪdəskəʊp/",
    meaning: "a toy that creates changing patterns through reflection",
    hindiMeaning: "कलेडियोस्कोप",
    usage: "The kaleidoscope created beautiful patterns.",
  },
  {
    word: "Kryptonite",
    phonetic: "/ˈkrɪptənaɪt/",
    meaning: "a fictional substance that weakens Superman",
    hindiMeaning: "कृप्टोनाइट",
    usage: "Superman's kryptonite was used by his enemies to weaken him.",
  },
  {
    word: "Keenly",
    phonetic: "/ˈkiːnli/",
    meaning: "in a sharp or intense manner",
    hindiMeaning: "जोश से",
    usage: "She listened keenly to every word he said.",
  },
  {
    word: "Knavish",
    phonetic: "/ˈneɪvɪʃ/",
    meaning: "dishonest or deceitful",
    hindiMeaning: "धूर्त",
    usage: "The knavish man tricked everyone into believing his lies.",
  },
  {
    word: "Keystone",
    phonetic: "/ˈkiːstəʊn/",
    meaning: "a central principle or element that holds something together",
    hindiMeaning: "केंद्रीय तत्व",
    usage: "Education is the keystone of a successful society.",
  },

  {
    word: "Ladder",
    phonetic: "/ˈlædər/",
    meaning: "a set of steps used to climb up or down",
    hindiMeaning: "सीढ़ी",
    usage: "He climbed the ladder to reach the roof.",
  },
  {
    word: "Languish",
    phonetic: "/ˈlæŋɡwɪʃ/",
    meaning: "to grow weak or feeble",
    hindiMeaning: "दुखी होना",
    usage: "The plant began to languish without water.",
  },
  {
    word: "Loyal",
    phonetic: "/ˈlɔɪəl/",
    meaning: "faithful and devoted",
    hindiMeaning: "वफादार",
    usage: "She remained loyal to her friends through thick and thin.",
  },
  {
    word: "Linger",
    phonetic: "/ˈlɪŋɡər/",
    meaning: "to stay longer than expected",
    hindiMeaning: "रुकना",
    usage: "He lingered at the party long after everyone had left.",
  },
  {
    word: "Luminous",
    phonetic: "/ˈluːmɪnəs/",
    meaning: "giving off light",
    hindiMeaning: "प्रकाशमान",
    usage: "The moon was luminous in the night sky.",
  },
  {
    word: "Lament",
    phonetic: "/ləˈmɛnt/",
    meaning: "to express grief or sorrow",
    hindiMeaning: "अफसोस करना",
    usage: "She lamented the loss of her childhood pet.",
  },
  {
    word: "Lush",
    phonetic: "/lʌʃ/",
    meaning: "luxuriant, abundant in growth",
    hindiMeaning: "फूल-फूल कर बढ़ने वाला",
    usage: "The garden was full of lush green plants.",
  },
  {
    word: "Languid",
    phonetic: "/ˈlæŋɡwɪd/",
    meaning: "weak or faint from illness or fatigue",
    hindiMeaning: "कमज़ोर",
    usage: "She felt languid after the long journey.",
  },
  {
    word: "Liberal",
    phonetic: "/ˈlɪbərəl/",
    meaning: "open-minded, generous",
    hindiMeaning: "उदार",
    usage: "He is known for his liberal views on social issues.",
  },
  {
    word: "Lunar",
    phonetic: "/ˈluːnər/",
    meaning: "relating to the moon",
    hindiMeaning: "चंद्र",
    usage: "The lunar surface is covered with craters.",
  },
  {
    word: "Lad",
    phonetic: "/læd/",
    meaning: "a young boy or man",
    hindiMeaning: "लड़का",
    usage: "The lad ran across the field to catch the ball.",
  },
  {
    word: "Lumber",
    phonetic: "/ˈlʌmbər/",
    meaning: "wood that has been cut for use",
    hindiMeaning: "लकड़ी",
    usage: "The lumber was stacked neatly in the yard.",
  },
  {
    word: "Liberty",
    phonetic: "/ˈlɪbərti/",
    meaning: "the state of being free",
    hindiMeaning: "स्वतंत्रता",
    usage: "The country fought for its liberty.",
  },
  {
    word: "Lace",
    phonetic: "/leɪs/",
    meaning: "a delicate fabric or cord used for decoration",
    hindiMeaning: "जाल",
    usage: "She wore a dress with lace trim.",
  },
  {
    word: "Lucid",
    phonetic: "/ˈluːsɪd/",
    meaning: "clear and easy to understand",
    hindiMeaning: "स्पष्ट",
    usage: "The professor gave a lucid explanation of the theory.",
  },
  {
    word: "Luminous",
    phonetic: "/ˈluːmɪnəs/",
    meaning: "bright, shining",
    hindiMeaning: "प्रकाशमान",
    usage: "The luminous stars lit up the dark sky.",
  },
  {
    word: "Legacy",
    phonetic: "/ˈlɛɡəsi/",
    meaning: "something handed down from an ancestor or predecessor",
    hindiMeaning: "विरासत",
    usage: "He left behind a legacy of charity work.",
  },
  {
    word: "Leverage",
    phonetic: "/ˈlɛvərɪdʒ/",
    meaning: "use of something to gain an advantage",
    hindiMeaning: "प्रभाव",
    usage: "He used his knowledge as leverage in the negotiation.",
  },
  {
    word: "Loyalty",
    phonetic: "/ˈlɔɪəlti/",
    meaning: "faithfulness or devotion",
    hindiMeaning: "वफादारी",
    usage: "The dog showed great loyalty to its owner.",
  },
  {
    word: "Lacerate",
    phonetic: "/ˈlæsəreɪt/",
    meaning: "to tear or deeply cut",
    hindiMeaning: "कटना",
    usage: "He lacerated his hand on the sharp glass.",
  },
  {
    word: "Lurk",
    phonetic: "/lɜːrk/",
    meaning: "to wait secretly",
    hindiMeaning: "छिपना",
    usage: "The predator lurked in the shadows, waiting for its prey.",
  },
  {
    word: "Labyrinth",
    phonetic: "/ˈlæbərɪnθ/",
    meaning: "a complex network of paths",
    hindiMeaning: "साँप सीढ़ी",
    usage: "The ancient labyrinth was difficult to navigate.",
  },
  {
    word: "Lullaby",
    phonetic: "/ˈlʌləbaɪ/",
    meaning: "a soothing song for children",
    hindiMeaning: "लोरी",
    usage: "She sang her baby a soft lullaby to help him sleep.",
  },
  {
    word: "Languorous",
    phonetic: "/ˈlæŋɡərəs/",
    meaning: "characterized by a dreamy, pleasant fatigue",
    hindiMeaning: "नम्र और थका हुआ",
    usage: "The languorous afternoon was perfect for a nap.",
  },
  {
    word: "Libel",
    phonetic: "/ˈlaɪbəl/",
    meaning: "a published false statement that damages someone's reputation",
    hindiMeaning: "मानहानि",
    usage:
      "The newspaper was sued for libel after publishing false accusations.",
  },
  {
    word: "Liberalize",
    phonetic: "/ˈlɪbərəlʌɪz/",
    meaning: "to make something less strict or more open",
    hindiMeaning: "उदार बनाना",
    usage: "The country decided to liberalize its trade policies.",
  },
  {
    word: "Lumberjack",
    phonetic: "/ˈlʌmbərˌdʒæk/",
    meaning: "a person who cuts down trees",
    hindiMeaning: "लकड़ी काटने वाला",
    usage: "The lumberjack chopped down a tall pine tree.",
  },
  {
    word: "Languidly",
    phonetic: "/ˈlæŋɡwɪdli/",
    meaning: "in a weak or faint manner",
    hindiMeaning: "थकावट से",
    usage: "She moved languidly across the room, exhausted from the heat.",
  },
  {
    word: "Lark",
    phonetic: "/lɑːrk/",
    meaning: "a playful or carefree activity",
    hindiMeaning: "मज़ाक",
    usage: "They went on a lark to the beach for a fun day.",
  },
  {
    word: "Languor",
    phonetic: "/ˈlæŋɡər/",
    meaning: "a feeling of weakness or fatigue",
    hindiMeaning: "कमज़ोरी",
    usage: "The hot weather caused a feeling of languor among the workers.",
  },
  {
    word: "Leash",
    phonetic: "/liːʃ/",
    meaning: "a cord or strap used to restrain an animal",
    hindiMeaning: "कुत्ते की रस्सी",
    usage: "She held the dog on a leash during the walk.",
  },
  {
    word: "Luxe",
    phonetic: "/lʌks/",
    meaning: "luxury or elegance",
    hindiMeaning: "विलासिता",
    usage:
      "The hotel offered a luxe experience with its spa and gourmet meals.",
  },
  {
    word: "Limp",
    phonetic: "/lɪmp/",
    meaning: "to walk with difficulty due to injury",
    hindiMeaning: "लंगड़ा",
    usage: "He limped after spraining his ankle.",
  },
  {
    word: "Lamb",
    phonetic: "/læm/",
    meaning: "a young sheep",
    hindiMeaning: "मेमना",
    usage: "The farmer raised lambs for their wool.",
  },
  {
    word: "Lapse",
    phonetic: "/læps/",
    meaning: "a temporary failure or decline",
    hindiMeaning: "विलंब",
    usage: "He had a lapse in judgment and made a poor decision.",
  },
  {
    word: "Leverage",
    phonetic: "/ˈlɛvərɪdʒ/",
    meaning: "influence or power used to gain advantage",
    hindiMeaning: "प्रभाव",
    usage: "They used their market leverage to negotiate a better deal.",
  },
  {
    word: "Lace",
    phonetic: "/leɪs/",
    meaning: "a delicate fabric or cord used for decoration",
    hindiMeaning: "जाल",
    usage: "She wore a dress with lace trim.",
  },
  {
    word: "Lurk",
    phonetic: "/lɜːrk/",
    meaning: "to remain hidden or concealed",
    hindiMeaning: "छिपना",
    usage: "The animal lurked in the bushes, waiting for its prey.",
  },
  {
    word: "Lush",
    phonetic: "/lʌʃ/",
    meaning: "abundant, especially in vegetation",
    hindiMeaning: "भव्य",
    usage: "The lush garden was full of flowers and trees.",
  },
  {
    word: "Limpid",
    phonetic: "/ˈlɪmpɪd/",
    meaning: "clear, transparent",
    hindiMeaning: "स्पष्ट",
    usage: "The limpid water in the lake was perfect for swimming.",
  },

  {
    word: "Mansion",
    phonetic: "/ˈmænʃən/",
    meaning: "a large and impressive house",
    hindiMeaning: "बड़ी हवेली",
    usage: "The family lived in a luxurious mansion by the sea.",
  },
  {
    word: "Mend",
    phonetic: "/mɛnd/",
    meaning: "to repair something that is broken",
    hindiMeaning: "मरम्मत करना",
    usage: "She mended the torn dress with a needle and thread.",
  },
  {
    word: "Motive",
    phonetic: "/ˈmoʊtɪv/",
    meaning: "a reason for doing something",
    hindiMeaning: "प्रेरणा",
    usage: "The detective tried to find the motive behind the crime.",
  },
  {
    word: "Melancholy",
    phonetic: "/ˈmɛlənkɑːli/",
    meaning: "a feeling of deep sadness",
    hindiMeaning: "उदासी",
    usage: "He was filled with melancholy after hearing the bad news.",
  },
  {
    word: "Miserable",
    phonetic: "/ˈmɪzərəbəl/",
    meaning: "very unhappy or uncomfortable",
    hindiMeaning: "दुखी",
    usage: "She felt miserable after losing her job.",
  },
  {
    word: "Mimic",
    phonetic: "/ˈmɪmɪk/",
    meaning: "to imitate someone or something",
    hindiMeaning: "नकल करना",
    usage: "The child loved to mimic his father's actions.",
  },
  {
    word: "Mature",
    phonetic: "/məˈtjʊər/",
    meaning: "fully developed or grown",
    hindiMeaning: "परिपक्व",
    usage: "He has a mature attitude toward life.",
  },
  {
    word: "Massive",
    phonetic: "/ˈmæsɪv/",
    meaning: "large and heavy",
    hindiMeaning: "विशाल",
    usage: "The massive building towered over the city.",
  },
  {
    word: "Mischievous",
    phonetic: "/ˈmɪsˈtʃiːvəs/",
    meaning: "playfully causing trouble",
    hindiMeaning: "शरारती",
    usage: "The mischievous child hid the cookies from his mother.",
  },
  {
    word: "Marvel",
    phonetic: "/ˈmɑːrvəl/",
    meaning: "to be amazed or filled with wonder",
    hindiMeaning: "आश्चर्यचकित होना",
    usage: "We marveled at the beauty of the sunset.",
  },
  {
    word: "Magnificent",
    phonetic: "/mæɡˈnɪfɪsənt/",
    meaning: "very beautiful or impressive",
    hindiMeaning: "महान",
    usage: "The palace was magnificent with its intricate designs.",
  },
  {
    word: "Mutual",
    phonetic: "/ˈmjuːtʃuəl/",
    meaning: "shared by two or more parties",
    hindiMeaning: "आपसी",
    usage: "They had a mutual respect for each other's work.",
  },
  {
    word: "Mimicry",
    phonetic: "/ˈmɪmɪkri/",
    meaning: "the action of imitating someone or something",
    hindiMeaning: "नकल",
    usage: "Mimicry is a common behavior among animals to avoid predators.",
  },
  {
    word: "Mature",
    phonetic: "/məˈtjʊər/",
    meaning: "developed to a suitable or advanced state",
    hindiMeaning: "परिपक्व",
    usage: "The wine has matured for several years and tastes excellent.",
  },
  {
    word: "Merciful",
    phonetic: "/ˈmɜːrsɪfəl/",
    meaning: "showing kindness and forgiveness",
    hindiMeaning: "दयालु",
    usage: "The merciful king pardoned his enemies.",
  },
  {
    word: "Magnitude",
    phonetic: "/ˈmæɡnɪtjuːd/",
    meaning: "the great size or importance of something",
    hindiMeaning: "महत्व",
    usage: "The magnitude of the earthquake was 7.8 on the Richter scale.",
  },
  {
    word: "Misunderstand",
    phonetic: "/ˌmɪsʌndərˈstænd/",
    meaning: "to fail to understand something correctly",
    hindiMeaning: "गलत समझना",
    usage: "I think you misunderstood my intentions.",
  },
  {
    word: "Maintain",
    phonetic: "/meɪnˈteɪn/",
    meaning: "to keep something in good condition",
    hindiMeaning: "बनाए रखना",
    usage: "It’s important to maintain a healthy diet.",
  },
  {
    word: "Minimal",
    phonetic: "/ˈmɪnɪməl/",
    meaning: "small in amount or degree",
    hindiMeaning: "न्यूनतम",
    usage: "The design was minimal, with simple lines and few colors.",
  },
  {
    word: "Meticulous",
    phonetic: "/məˈtɪkjʊləs/",
    meaning: "showing great attention to detail",
    hindiMeaning: "सावधान",
    usage: "She is meticulous in her work, leaving no room for mistakes.",
  },
  {
    word: "Mock",
    phonetic: "/mɒk/",
    meaning: "to make fun of someone",
    hindiMeaning: "मज़ाक उड़ाना",
    usage: "The children mocked the teacher’s accent.",
  },
  {
    word: "Manifest",
    phonetic: "/ˈmænɪfɛst/",
    meaning: "to show or display something clearly",
    hindiMeaning: "प्रकट करना",
    usage: "His enthusiasm for the project was manifest in his actions.",
  },
  {
    word: "Majestic",
    phonetic: "/məˈdʒɛstɪk/",
    meaning: "grand or impressive in appearance",
    hindiMeaning: "भव्य",
    usage: "The majestic mountains loomed in the distance.",
  },
  {
    word: "Mellow",
    phonetic: "/ˈmɛloʊ/",
    meaning: "pleasantly smooth or soft",
    hindiMeaning: "मुलायम",
    usage: "The mellow tone of the music made everyone relax.",
  },
  {
    word: "Manipulate",
    phonetic: "/məˈnɪpjʊleɪt/",
    meaning: "to control or influence someone or something skillfully",
    hindiMeaning: "नियंत्रण करना",
    usage: "He tried to manipulate the situation for his benefit.",
  },
  {
    word: "Morale",
    phonetic: "/məˈræl/",
    meaning: "the confidence or spirit of a group",
    hindiMeaning: "आत्मविश्वास",
    usage: "The team's morale was high after their victory.",
  },
  {
    word: "Moan",
    phonetic: "/moʊn/",
    meaning: "to make a low sound of pain or discomfort",
    hindiMeaning: "कराहना",
    usage: "She moaned in pain after injuring her leg.",
  },
  {
    word: "Massacre",
    phonetic: "/ˈmæsəkər/",
    meaning: "the killing of a large number of people",
    hindiMeaning: "हत्याकांड",
    usage: "The massacre of innocent civilians shocked the entire nation.",
  },
  {
    word: "Merit",
    phonetic: "/ˈmɛrɪt/",
    meaning: "the quality of being good or deserving",
    hindiMeaning: "योग्यता",
    usage: "His promotion was based on merit and hard work.",
  },
  {
    word: "Motive",
    phonetic: "/ˈmoʊtɪv/",
    meaning: "the reason for doing something",
    hindiMeaning: "प्रेरणा",
    usage: "The detective discovered the motive behind the crime.",
  },
  {
    word: "Magnificent",
    phonetic: "/mæɡˈnɪfɪsənt/",
    meaning: "very beautiful or impressive",
    hindiMeaning: "महान",
    usage: "The view from the top of the mountain was magnificent.",
  },
  {
    word: "Momentous",
    phonetic: "/məˈmɛntəs/",
    meaning: "of great importance",
    hindiMeaning: "महत्वपूर्ण",
    usage: "It was a momentous occasion when the company achieved its goal.",
  },
  {
    word: "Miserly",
    phonetic: "/ˈmaɪzərli/",
    meaning: "showing a lack of generosity",
    hindiMeaning: "कंजूस",
    usage: "The miserly man refused to donate to charity.",
  },
  {
    word: "Mediate",
    phonetic: "/ˈmiːdieɪt/",
    meaning: "to intervene to resolve a conflict",
    hindiMeaning: "सुलझाना",
    usage: "She tried to mediate the argument between the two friends.",
  },
  {
    word: "Martial",
    phonetic: "/ˈmɑːrʃəl/",
    meaning: "related to war or the military",
    hindiMeaning: "सैन्य",
    usage: "The country has a martial tradition of defending its borders.",
  },
  {
    word: "Mourn",
    phonetic: "/mɔːrn/",
    meaning: "to feel or show sadness after a loss",
    hindiMeaning: "शोक करना",
    usage: "They mourned the passing of their beloved pet.",
  },
  {
    word: "Mutiny",
    phonetic: "/ˈmjuːtəni/",
    meaning: "a rebellion against authority",
    hindiMeaning: "विद्रोह",
    usage: "The sailors staged a mutiny against the captain's orders.",
  },
  {
    word: "Menace",
    phonetic: "/ˈmɛnəs/",
    meaning: "a threat or danger",
    hindiMeaning: "खतरा",
    usage: "The new policy was seen as a menace to the environment.",
  },
  {
    word: "Mutilate",
    phonetic: "/ˈmjuːtəˌleɪt/",
    meaning: "to violently damage or disfigure something",
    hindiMeaning: "विकृत करना",
    usage: "The vandal had mutilated the public statue.",
  },
  {
    word: "Mellow",
    phonetic: "/ˈmɛloʊ/",
    meaning: "pleasantly soft or smooth",
    hindiMeaning: "मुलायम",
    usage: "The mellow tones of the jazz music filled the room.",
  },
  {
    word: "Modify",
    phonetic: "/ˈmɒdɪfaɪ/",
    meaning: "to change something slightly",
    hindiMeaning: "संशोधित करना",
    usage: "She modified her plans to fit the new schedule.",
  },

  {
    word: "Noble",
    phonetic: "/ˈnoʊbəl/",
    meaning: "having high moral qualities",
    hindiMeaning: "उच्च",
    usage: "He is a noble person who always helps others.",
  },
  {
    word: "Narrative",
    phonetic: "/ˈnærətɪv/",
    meaning: "a story or account of events",
    hindiMeaning: "कहानी",
    usage: "The book is a narrative of the author's travels.",
  },
  {
    word: "Nurture",
    phonetic: "/ˈnɜːrtʃər/",
    meaning: "to care for and encourage growth",
    hindiMeaning: "पालन-पोषण",
    usage: "Parents should nurture their children's creativity.",
  },
  {
    word: "Neutral",
    phonetic: "/ˈnuːtrəl/",
    meaning: "not supporting either side in a conflict",
    hindiMeaning: "तटस्थ",
    usage: "The country remained neutral during the war.",
  },
  {
    word: "Notorious",
    phonetic: "/nəʊˈtɔːriəs/",
    meaning: "famous for a bad quality or action",
    hindiMeaning: "कुख्यात",
    usage: "The city is notorious for its high crime rate.",
  },
  {
    word: "Nomadic",
    phonetic: "/nəʊˈmædɪk/",
    meaning: "moving from place to place",
    hindiMeaning: "घूमंतू",
    usage: "The nomadic tribe moves across the desert every year.",
  },
  {
    word: "Nobleman",
    phonetic: "/ˈnoʊbəlmæn/",
    meaning: "a man of high rank or title",
    hindiMeaning: "उच्च जाति का व्यक्ति",
    usage: "The nobleman donated a large sum to the charity.",
  },
  {
    word: "Nurturing",
    phonetic: "/ˈnɜːrtʃərɪŋ/",
    meaning: "helping to grow or develop",
    hindiMeaning: "पालन करना",
    usage: "She is nurturing the plants with care and attention.",
  },
  {
    word: "Negligible",
    phonetic: "/ˈnɛɡlɪdʒəbəl/",
    meaning: "so small or unimportant that it can be ignored",
    hindiMeaning: "अशक्त",
    usage: "The damage to the car was negligible.",
  },
  {
    word: "Navigate",
    phonetic: "/ˈnævɪɡeɪt/",
    meaning: "to find your way",
    hindiMeaning: "मार्गदर्शन करना",
    usage: "The captain had to navigate through the storm.",
  },
  {
    word: "Nurture",
    phonetic: "/ˈnɜːrtʃər/",
    meaning: "to care for and help something grow",
    hindiMeaning: "पालन-पोषण",
    usage: "We need to nurture our environment to preserve it.",
  },
  {
    word: "Nomination",
    phonetic: "/ˌnɒmɪˈneɪʃən/",
    meaning: "the act of naming someone for an award or position",
    hindiMeaning: "नामांकन",
    usage: "He received a nomination for best actor in the film.",
  },
  {
    word: "Natural",
    phonetic: "/ˈnætʃərəl/",
    meaning: "existing in nature, not made by humans",
    hindiMeaning: "प्राकृतिक",
    usage: "This park is home to many natural wonders.",
  },
  {
    word: "Noblewoman",
    phonetic: "/ˈnoʊbəlwɪmən/",
    meaning: "a woman of noble birth",
    hindiMeaning: "उच्च जाति की महिला",
    usage: "She was a noblewoman who lived in a grand castle.",
  },
  {
    word: "Nap",
    phonetic: "/næp/",
    meaning: "a short sleep during the day",
    hindiMeaning: "झपकी",
    usage: "I usually take a nap after lunch.",
  },
  {
    word: "Narrow",
    phonetic: "/ˈnærəʊ/",
    meaning: "not wide",
    hindiMeaning: "संकीर्ण",
    usage: "The narrow path led to the hidden beach.",
  },
  {
    word: "Nerve",
    phonetic: "/nɜːv/",
    meaning: "bravery or courage",
    hindiMeaning: "हिम्मत",
    usage: "It took a lot of nerve to speak in front of the crowd.",
  },
  {
    word: "Normal",
    phonetic: "/ˈnɔːməl/",
    meaning: "usual, not strange or different",
    hindiMeaning: "सामान्य",
    usage: "It is normal to feel nervous before an exam.",
  },
  {
    word: "Nimble",
    phonetic: "/ˈnɪmbəl/",
    meaning: "quick and light in movement",
    hindiMeaning: "फुर्तीला",
    usage: "The nimble cat jumped from one wall to another.",
  },
  {
    word: "Noble",
    phonetic: "/ˈnoʊbəl/",
    meaning: "having high moral qualities",
    hindiMeaning: "उच्च",
    usage: "He made a noble effort to help the poor.",
  },
  {
    word: "Nurture",
    phonetic: "/ˈnɜːrtʃər/",
    meaning: "to care for and help grow",
    hindiMeaning: "पालन करना",
    usage: "The teacher nurtured the student's love for literature.",
  },
  {
    word: "Neglect",
    phonetic: "/nɪˈɡlɛkt/",
    meaning: "fail to care for something",
    hindiMeaning: "अवहेलना",
    usage: "He neglected his responsibilities at work.",
  },
  {
    word: "Needy",
    phonetic: "/ˈniːdi/",
    meaning: "lacking basic necessities",
    hindiMeaning: "आवश्यकताओं के बिना",
    usage: "The charity helps the needy people in the community.",
  },
  {
    word: "Nonchalant",
    phonetic: "/ˈnɒnʃələnt/",
    meaning: "calm and relaxed",
    hindiMeaning: "निश्चिंत",
    usage: "She was nonchalant about the upcoming exams.",
  },
  {
    word: "Noble",
    phonetic: "/ˈnoʊbəl/",
    meaning: "of high moral qualities",
    hindiMeaning: "उत्कृष्ट",
    usage: "His noble actions earned him respect from everyone.",
  },
  {
    word: "Navigate",
    phonetic: "/ˈnævɪɡeɪt/",
    meaning: "to guide or direct a course",
    hindiMeaning: "मार्गदर्शन करना",
    usage: "The captain navigated the ship through the stormy seas.",
  },
  {
    word: "Notable",
    phonetic: "/ˈnoʊtəbəl/",
    meaning: "worthy of attention or notice",
    hindiMeaning: "महत्वपूर्ण",
    usage: "He made notable contributions to the field of science.",
  },
  {
    word: "Nurturing",
    phonetic: "/ˈnɜːrtʃərɪŋ/",
    meaning: "helping to grow or develop",
    hindiMeaning: "पालन करना",
    usage: "She has a nurturing spirit, always caring for others.",
  },
  {
    word: "Narrate",
    phonetic: "/nəˈreɪt/",
    meaning: "to tell a story or give an account",
    hindiMeaning: "कहानी सुनाना",
    usage: "He narrated his childhood experiences to the class.",
  },
  {
    word: "Negligent",
    phonetic: "/ˈnɛɡlɪdʒənt/",
    meaning: "failing to take proper care",
    hindiMeaning: "लापरवाह",
    usage: "The company was negligent in maintaining safety standards.",
  },
  {
    word: "Novel",
    phonetic: "/ˈnɒvəl/",
    meaning: "a long story of fictional events",
    hindiMeaning: "उपन्यास",
    usage: "She is writing a novel about her travels around the world.",
  },
  {
    word: "Nurture",
    phonetic: "/ˈnɜːrtʃər/",
    meaning: "to encourage the growth or development of something",
    hindiMeaning: "पालन-पोषण",
    usage: "The community must nurture young talents for the future.",
  },
  {
    word: "Numb",
    phonetic: "/nʌm/",
    meaning: "unable to feel anything",
    hindiMeaning: "सुन्न",
    usage: "My fingers went numb after being in the cold for too long.",
  },
  {
    word: "Needle",
    phonetic: "/ˈniːdl/",
    meaning: "a thin, sharp object used for sewing",
    hindiMeaning: "सुई",
    usage: "She used a needle to stitch the fabric together.",
  },
  {
    word: "Nudge",
    phonetic: "/nʌdʒ/",
    meaning: "to gently push or prod",
    hindiMeaning: "धक्का देना",
    usage: "He nudged his friend to get his attention.",
  },
  {
    word: "Nay",
    phonetic: "/neɪ/",
    meaning: "no",
    hindiMeaning: "नहीं",
    usage: "Nay, I do not think that is a good idea.",
  },
  {
    word: "Nominee",
    phonetic: "/ˌnɒmɪˈniː/",
    meaning: "a person who is nominated for an award or position",
    hindiMeaning: "नामांकित व्यक्ति",
    usage: "She was the nominee for best actress in the movie.",
  },
  {
    word: "Native",
    phonetic: "/ˈneɪtɪv/",
    meaning: "belonging to a particular place or environment",
    hindiMeaning: "स्वदेशी",
    usage: "He is a native of India.",
  },
  {
    word: "Naked",
    phonetic: "/ˈneɪkɪd/",
    meaning: "without clothes",
    hindiMeaning: "नंगा",
    usage: "The baby was lying naked in the crib.",
  },
  {
    word: "Nurture",
    phonetic: "/ˈnɜːrtʃər/",
    meaning: "to care for and help grow",
    hindiMeaning: "पालन करना",
    usage: "Parents nurture their children to become responsible adults.",
  },

  {
    word: "Obvious",
    phonetic: "/ˈɒbviəs/",
    meaning: "easily perceived or understood",
    hindiMeaning: "स्पष्ट",
    usage: "It was obvious that she was upset after the meeting.",
  },
  {
    word: "Obligate",
    phonetic: "/ˈɒblɪɡeɪt/",
    meaning: "to require or compel",
    hindiMeaning: "बाध्य करना",
    usage: "The contract obligates the company to pay for damages.",
  },
  {
    word: "Occasion",
    phonetic: "/əˈkeɪʒən/",
    meaning: "a particular event or instance",
    hindiMeaning: "अवसर",
    usage:
      "This was a special occasion, and everyone was dressed in formal attire.",
  },
  {
    word: "Objective",
    phonetic: "/əbˈdʒɛktɪv/",
    meaning: "a goal or aim",
    hindiMeaning: "लक्ष्य",
    usage: "His objective was to finish the project by the end of the week.",
  },
  {
    word: "Observe",
    phonetic: "/əbˈzɜːv/",
    meaning: "to look at or watch carefully",
    hindiMeaning: "देखना",
    usage: "She observed the stars through the telescope last night.",
  },
  {
    word: "Obsolete",
    phonetic: "/ˌɒbsəˈliːt/",
    meaning: "no longer in use",
    hindiMeaning: "बेज़ुज",
    usage: "Many old technologies are now considered obsolete.",
  },
  {
    word: "Oblivious",
    phonetic: "/əˈblɪvɪəs/",
    meaning: "unaware or forgetful",
    hindiMeaning: "अविज्ञ",
    usage: "He was oblivious to the noise in the background while reading.",
  },
  {
    word: "Optimal",
    phonetic: "/ˈɒptɪməl/",
    meaning: "best or most effective",
    hindiMeaning: "इष्टतम",
    usage:
      "The optimal solution to the problem is to divide the workload equally.",
  },
  {
    word: "Obstacle",
    phonetic: "/ˈɒbstəkəl/",
    meaning: "something that prevents progress",
    hindiMeaning: "अवरोध",
    usage: "The biggest obstacle to our success was lack of resources.",
  },
  {
    word: "Offer",
    phonetic: "/ˈɒfə/",
    meaning: "to present or propose something",
    hindiMeaning: "प्रस्ताव",
    usage: "She made an offer to buy the house.",
  },
  {
    word: "Offend",
    phonetic: "/əˈfɛnd/",
    meaning: "to cause displeasure or hurt",
    hindiMeaning: "अपमान करना",
    usage: "He didn't mean to offend anyone with his comment.",
  },
  {
    word: "Ominous",
    phonetic: "/ˈɒmɪnəs/",
    meaning: "giving the impression that something bad is going to happen",
    hindiMeaning: "अशुभ",
    usage: "The dark clouds looked ominous, signaling a storm.",
  },
  {
    word: "Oppose",
    phonetic: "/əˈpəʊz/",
    meaning: "to be against or resist",
    hindiMeaning: "विरोध करना",
    usage: "She opposed the decision to cut the funding for education.",
  },
  {
    word: "Operate",
    phonetic: "/ˈɒpəreɪt/",
    meaning: "to control or work something",
    hindiMeaning: "संचालित करना",
    usage: "He learned to operate heavy machinery during his training.",
  },
  {
    word: "Outstanding",
    phonetic: "/aʊtˈstændɪŋ/",
    meaning: "exceptionally good",
    hindiMeaning: "अद्वितीय",
    usage: "She gave an outstanding performance at the concert.",
  },
  {
    word: "Obtain",
    phonetic: "/əbˈteɪn/",
    meaning: "to get or acquire something",
    hindiMeaning: "प्राप्त करना",
    usage: "He worked hard to obtain the necessary qualifications.",
  },
  {
    word: "Opt",
    phonetic: "/ɒpt/",
    meaning: "to make a choice",
    hindiMeaning: "चुनना",
    usage: "I opted for the vegetarian option at dinner.",
  },
  {
    word: "Origin",
    phonetic: "/ˈɒrɪdʒɪn/",
    meaning: "the beginning or source of something",
    hindiMeaning: "उत्पत्ति",
    usage: "The origin of the word is Latin.",
  },
  {
    word: "Obliged",
    phonetic: "/əˈblaɪdʒd/",
    meaning: "to be grateful or indebted",
    hindiMeaning: "आभारी",
    usage: "I am obliged to you for your help during the event.",
  },
  {
    word: "Overcome",
    phonetic: "/ˌəʊvərˈkʌm/",
    meaning: "to successfully deal with a problem or challenge",
    hindiMeaning: "जीतना",
    usage: "She overcame all the obstacles in her way to achieve her goals.",
  },
  {
    word: "Omnipotent",
    phonetic: "/ɒmˈnɪpətənt/",
    meaning: "having unlimited power",
    hindiMeaning: "सर्वशक्तिमान",
    usage: "In many religions, God is believed to be omnipotent.",
  },
  {
    word: "Offend",
    phonetic: "/əˈfɛnd/",
    meaning: "to hurt someone's feelings or dignity",
    hindiMeaning: "अपमान करना",
    usage: "He didn't mean to offend her with his rude remark.",
  },
  {
    word: "Oversee",
    phonetic: "/ˈəʊvəˈsiː/",
    meaning: "to supervise or manage",
    hindiMeaning: "निगरानी करना",
    usage: "She oversees the project to ensure everything runs smoothly.",
  },
  {
    word: "Onset",
    phonetic: "/ˈɒnsɛt/",
    meaning: "the beginning or start",
    hindiMeaning: "प्रारंभ",
    usage: "The onset of winter brought heavy snowfall.",
  },
  {
    word: "Oppress",
    phonetic: "/əˈprɛs/",
    meaning: "to treat someone in a cruel or unfair way",
    hindiMeaning: "दमन करना",
    usage: "The dictator oppressed his people for years.",
  },
  {
    word: "Overtake",
    phonetic: "/ˌəʊvəˈteɪk/",
    meaning: "to catch up with and pass something",
    hindiMeaning: "पीछे छोड़ना",
    usage: "The car overtook the truck on the highway.",
  },
  {
    word: "Overjoyed",
    phonetic: "/ˌəʊvəˈdʒɔɪd/",
    meaning: "extremely happy",
    hindiMeaning: "अत्यधिक खुश",
    usage: "She was overjoyed when she received the good news.",
  },
  {
    word: "Omit",
    phonetic: "/əˈmɪt/",
    meaning: "to leave out or exclude",
    hindiMeaning: "निकलना",
    usage: "He omitted the last chapter of the book from his report.",
  },
  {
    word: "Overtime",
    phonetic: "/ˈəʊvətaɪm/",
    meaning: "extra working hours",
    hindiMeaning: "अतिरिक्त समय",
    usage: "He worked overtime to finish the project before the deadline.",
  },
  {
    word: "Oral",
    phonetic: "/ˈɔːrəl/",
    meaning: "spoken rather than written",
    hindiMeaning: "मौखिक",
    usage: "She gave an oral presentation about her research.",
  },
  {
    word: "Outrage",
    phonetic: "/ˈaʊtreɪdʒ/",
    meaning: "a strong feeling of anger or shock",
    hindiMeaning: "घृणा",
    usage: "The public was outraged by the unfair treatment of workers.",
  },
  {
    word: "Oath",
    phonetic: "/oʊθ/",
    meaning: "a solemn promise",
    hindiMeaning: "कस्म",
    usage: "He took an oath to serve the country faithfully.",
  },
  {
    word: "Outlook",
    phonetic: "/ˈaʊtlʊk/",
    meaning: "a person's attitude or perspective on something",
    hindiMeaning: "दृष्टिकोण",
    usage: "Her optimistic outlook on life always lifted others' spirits.",
  },
  {
    word: "Obstacle",
    phonetic: "/ˈɒbstəkəl/",
    meaning: "something that blocks or hinders progress",
    hindiMeaning: "रुकावट",
    usage: "The roadblock was an obstacle in the way of progress.",
  },
  {
    word: "Overcome",
    phonetic: "/ˌəʊvərˈkʌm/",
    meaning: "to deal with and defeat a problem",
    hindiMeaning: "जीतना",
    usage: "She overcame her fears and successfully completed the challenge.",
  },
  {
    word: "Overstate",
    phonetic: "/ˌəʊvəˈsteɪt/",
    meaning: "to exaggerate or say something is greater than it is",
    hindiMeaning: "अधिक कहना",
    usage: "He tended to overstate his accomplishments to impress others.",
  },
  {
    word: "Open",
    phonetic: "/ˈəʊpən/",
    meaning: "allowing access or passage",
    hindiMeaning: "खुला",
    usage: "She opened the door to let in some fresh air.",
  },
  {
    word: "Outnumber",
    phonetic: "/ˌaʊtˈnʌmbə/",
    meaning: "to be greater in number than something else",
    hindiMeaning: "संख्या में अधिक होना",
    usage: "The enemy forces were outnumbered by the defenders.",
  },
  {
    word: "Outcast",
    phonetic: "/ˈaʊtkɑːst/",
    meaning: "a person who is rejected by society",
    hindiMeaning: "बहिष्कृत",
    usage: "The man felt like an outcast after the scandal.",
  },
  {
    word: "Outlaw",
    phonetic: "/ˈaʊtlɔː/",
    meaning: "a person who breaks the law",
    hindiMeaning: "अपराधी",
    usage: "The outlaw was caught and sentenced to prison.",
  },
  {
    word: "Offense",
    phonetic: "/əˈfɛns/",
    meaning: "a violation of the law or rules",
    hindiMeaning: "अपराध",
    usage: "He was arrested for committing a serious offense.",
  },

  {
    word: "Pace",
    phonetic: "/peɪs/",
    meaning: "the speed or rate of movement",
    hindiMeaning: "गति",
    usage: "She set a fast pace during the marathon.",
  },
  {
    word: "Plausible",
    phonetic: "/ˈplɔːzɪbəl/",
    meaning: "appearing to be reasonable or possible",
    hindiMeaning: "विश्वसनीय",
    usage: "His explanation seemed plausible, so we believed him.",
  },
  {
    word: "Pessimistic",
    phonetic: "/ˌpɛsɪˈmɪstɪk/",
    meaning: "having a negative outlook",
    hindiMeaning: "निराशावादी",
    usage: "She was pessimistic about the chances of winning the competition.",
  },
  {
    word: "Perspective",
    phonetic: "/pərˈspɛktɪv/",
    meaning: "a particular attitude toward or way of regarding something",
    hindiMeaning: "दृष्टिकोण",
    usage: "The book offered a new perspective on the issue.",
  },
  {
    word: "Plausibility",
    phonetic: "/ˌplɔːzɪˈbɪləti/",
    meaning: "the quality of being reasonable",
    hindiMeaning: "संगतता",
    usage: "The plausibility of his theory was confirmed by the results.",
  },
  {
    word: "Preliminary",
    phonetic: "/prɪˈlɪmɪnəri/",
    meaning: "something that prepares for the main event",
    hindiMeaning: "प्रारंभिक",
    usage: "The preliminary rounds of the competition were held last week.",
  },
  {
    word: "Pristine",
    phonetic: "/ˈprɪstiːn/",
    meaning: "in its original condition",
    hindiMeaning: "प्राचीन",
    usage: "The forest remained pristine, untouched by human activity.",
  },
  {
    word: "Ponder",
    phonetic: "/ˈpɒndə/",
    meaning: "to think carefully about something",
    hindiMeaning: "विचार करना",
    usage: "He sat down to ponder the consequences of his decision.",
  },
  {
    word: "Pursue",
    phonetic: "/pərˈsjuː/",
    meaning: "to follow or chase something",
    hindiMeaning: "पीछा करना",
    usage: "She decided to pursue a career in medicine.",
  },
  {
    word: "Procrastinate",
    phonetic: "/prəˈkræstɪneɪt/",
    meaning: "to delay doing something",
    hindiMeaning: "टालना",
    usage:
      "He tends to procrastinate when it comes to finishing his assignments.",
  },
  {
    word: "Pessimism",
    phonetic: "/ˈpɛsɪˌmɪzəm/",
    meaning: "a tendency to see the worst aspect of things",
    hindiMeaning: "निराशावाद",
    usage: "Her pessimism about the future prevented her from planning ahead.",
  },
  {
    word: "Prowess",
    phonetic: "/ˈpraʊəs/",
    meaning: "skill or expertise in a particular activity",
    hindiMeaning: "कौशल",
    usage: "He was admired for his prowess in chess.",
  },
  {
    word: "Plentiful",
    phonetic: "/ˈplɛntɪfəl/",
    meaning: "existing in large amounts",
    hindiMeaning: "प्रचुर",
    usage: "The harvest was plentiful, and there was enough food for everyone.",
  },
  {
    word: "Pivotal",
    phonetic: "/ˈpɪvətəl/",
    meaning: "of crucial importance",
    hindiMeaning: "महत्वपूर्ण",
    usage: "Her role in the project was pivotal to its success.",
  },
  {
    word: "Pretend",
    phonetic: "/prɪˈtɛnd/",
    meaning: "to act as if something is true when it is not",
    hindiMeaning: "ढोंग करना",
    usage: "The child pretended to be a superhero during playtime.",
  },
  {
    word: "Prolong",
    phonetic: "/prəˈlɒŋ/",
    meaning: "to extend the duration of something",
    hindiMeaning: "लंबा करना",
    usage: "They decided to prolong their vacation for a few more days.",
  },
  {
    word: "Pragmatic",
    phonetic: "/præɡˈmætɪk/",
    meaning: "dealing with things sensibly and realistically",
    hindiMeaning: "वास्तविक",
    usage: "She took a pragmatic approach to solving the problem.",
  },
  {
    word: "Persevere",
    phonetic: "/ˌpɜːsɪˈvɪə/",
    meaning: "to continue despite difficulties",
    hindiMeaning: "दृढ़ रहना",
    usage:
      "Despite the obstacles, she persevered in her efforts to complete the project.",
  },
  {
    word: "Ponder",
    phonetic: "/ˈpɒndə/",
    meaning: "to think deeply about something",
    hindiMeaning: "सोच विचार करना",
    usage: "He paused to ponder the meaning of the mysterious message.",
  },
  {
    word: "Pungent",
    phonetic: "/ˈpʌndʒənt/",
    meaning: "having a sharp smell or taste",
    hindiMeaning: "तीव्र गंध",
    usage: "The pungent smell of garlic filled the kitchen.",
  },
  {
    word: "Perplex",
    phonetic: "/pərˈplɛks/",
    meaning: "to confuse or bewilder",
    hindiMeaning: "हैरान करना",
    usage: "The complex problem perplexed the students.",
  },
  {
    word: "Plethora",
    phonetic: "/ˈplɛθərə/",
    meaning: "an excessive amount of something",
    hindiMeaning: "प्रचुरता",
    usage: "There was a plethora of books on the subject.",
  },
  {
    word: "Placid",
    phonetic: "/ˈplæsɪd/",
    meaning: "calm and peaceful",
    hindiMeaning: "शांत",
    usage: "The placid lake reflected the clear blue sky.",
  },
  {
    word: "Pejorative",
    phonetic: "/pɪˈdʒɒrətɪv/",
    meaning: "having a negative or disrespectful connotation",
    hindiMeaning: "नकारात्मक",
    usage: "The term 'lazy' is often used in a pejorative sense.",
  },
  {
    word: "Proactive",
    phonetic: "/prəʊˈæktɪv/",
    meaning: "taking action in advance to prevent problems",
    hindiMeaning: "सक्रिय",
    usage: "The company adopted a proactive approach to customer service.",
  },
  {
    word: "Passionate",
    phonetic: "/ˈpæʃənət/",
    meaning: "having or showing strong feelings or a strong belief",
    hindiMeaning: "उत्साही",
    usage:
      "She was passionate about animal rights and volunteered at shelters.",
  },
  {
    word: "Plausibility",
    phonetic: "/ˌplɔːzɪˈbɪləti/",
    meaning: "the quality of being reasonable or believable",
    hindiMeaning: "संभवता",
    usage: "The plausibility of his claim was questioned by experts.",
  },
  {
    word: "Perpetuate",
    phonetic: "/pəˈpɛtʃueɪt/",
    meaning: "to cause something to continue indefinitely",
    hindiMeaning: "स्थायी बनाना",
    usage: "The media can sometimes perpetuate stereotypes.",
  },
  {
    word: "Provocative",
    phonetic: "/prəˈvɒkətɪv/",
    meaning: "intended to provoke a reaction",
    hindiMeaning: "उत्तेजक",
    usage: "His provocative remarks caused a lot of controversy.",
  },
  {
    word: "Paradox",
    phonetic: "/ˈpærədɒks/",
    meaning: "a statement that contradicts itself but may be true",
    hindiMeaning: "विरोधाभास",
    usage: "The statement 'less is more' is a paradox.",
  },
  {
    word: "Pride",
    phonetic: "/praɪd/",
    meaning: "a feeling of self-respect or satisfaction",
    hindiMeaning: "गर्व",
    usage: "He took great pride in his work and always did his best.",
  },
  {
    word: "Prove",
    phonetic: "/pruːv/",
    meaning: "to demonstrate the truth of something",
    hindiMeaning: "सिद्ध करना",
    usage: "He was determined to prove his point in the debate.",
  },
  {
    word: "Panic",
    phonetic: "/ˈpænɪk/",
    meaning: "a sudden overwhelming fear",
    hindiMeaning: "घबराहट",
    usage: "There was panic in the crowd when the fire alarm went off.",
  },
  {
    word: "Parallel",
    phonetic: "/ˈpærəˌlɛl/",
    meaning: "lines that run in the same direction and never meet",
    hindiMeaning: "समानांतर",
    usage: "The two roads run parallel to each other for miles.",
  },
  {
    word: "Periphery",
    phonetic: "/pəˈrɪfəri/",
    meaning: "the outer limits or boundary of something",
    hindiMeaning: "परिधि",
    usage: "The town lies on the periphery of the forest.",
  },
  {
    word: "Plunge",
    phonetic: "/plʌndʒ/",
    meaning: "to jump or dive into something",
    hindiMeaning: "डुबकी लगाना",
    usage: "He decided to plunge into the pool to cool off.",
  },

  {
    word: "Quaint",
    phonetic: "/kweɪnt/",
    meaning: "attractive in an unusual or old-fashioned way",
    hindiMeaning: "प्राचीन",
    usage: "The quaint little house stood at the end of the street.",
  },
  {
    word: "Quench",
    phonetic: "/kwɛntʃ/",
    meaning: "to satisfy thirst",
    hindiMeaning: "तृप्त करना",
    usage: "Water will quench your thirst on a hot day.",
  },
  {
    word: "Quicken",
    phonetic: "/ˈkwɪkən/",
    meaning: "to make something happen faster",
    hindiMeaning: "तेज़ करना",
    usage: "The news of the promotion quickened her step.",
  },
  {
    word: "Quotient",
    phonetic: "/ˈkwəʊʃənt/",
    meaning: "a result of division",
    hindiMeaning: "भागफल",
    usage: "The quotient of 20 divided by 5 is 4.",
  },
  {
    word: "Qualify",
    phonetic: "/ˈkwɒlɪfaɪ/",
    meaning: "to be eligible for something",
    hindiMeaning: "योग्य होना",
    usage: "He did well in the exams and qualified for the scholarship.",
  },
  {
    word: "Quest",
    phonetic: "/kwɛst/",
    meaning: "a long or difficult search for something",
    hindiMeaning: "खोज",
    usage: "He went on a quest to find the lost city.",
  },
  {
    word: "Quick",
    phonetic: "/kwɪk/",
    meaning: "moving fast or doing something fast",
    hindiMeaning: "तेज़",
    usage: "She made a quick decision to leave the party early.",
  },
  {
    word: "Quarrel",
    phonetic: "/ˈkwɒrəl/",
    meaning: "an argument or disagreement",
    hindiMeaning: "झगड़ा",
    usage: "They had a quarrel about the best way to solve the problem.",
  },
  {
    word: "Quality",
    phonetic: "/ˈkwɒlɪti/",
    meaning: "the standard of something",
    hindiMeaning: "गुणवत्ता",
    usage: "The quality of the product was very high.",
  },
  {
    word: "Quantify",
    phonetic: "/ˈkwɒntɪfaɪ/",
    meaning: "to measure or express the quantity of something",
    hindiMeaning: "मात्रा निर्धारित करना",
    usage: "It's difficult to quantify the impact of climate change.",
  },
  {
    word: "Quiver",
    phonetic: "/ˈkwɪvə/",
    meaning: "to shake with a slight, rapid motion",
    hindiMeaning: "काँपना",
    usage: "Her hands quivered with excitement as she opened the letter.",
  },
  {
    word: "Quarter",
    phonetic: "/ˈkwɔːtə/",
    meaning: "one of four equal parts",
    hindiMeaning: "तिमाही",
    usage: "The report is due by the end of the first quarter.",
  },
  {
    word: "Quaintness",
    phonetic: "/ˈkweɪntnəs/",
    meaning: "charmingly unusual or old-fashioned",
    hindiMeaning: "अजीब",
    usage: "The quaintness of the village attracted many tourists.",
  },
  {
    word: "Quash",
    phonetic: "/kwɒʃ/",
    meaning: "to reject or annul something",
    hindiMeaning: "रद्द करना",
    usage: "The court quashed the decision after hearing new evidence.",
  },
  {
    word: "Quota",
    phonetic: "/ˈkwəʊtə/",
    meaning: "a fixed share or portion",
    hindiMeaning: "कोटा",
    usage: "Each student must fulfill their quota of volunteer hours.",
  },
  {
    word: "Quaintly",
    phonetic: "/ˈkweɪntli/",
    meaning: "in a way that is charmingly unusual",
    hindiMeaning: "अजीब तरीके से",
    usage: "The old house was quaintly decorated with vintage furniture.",
  },
  {
    word: "Quotable",
    phonetic: "/ˈkwəʊtəbl/",
    meaning: "worthy of being quoted",
    hindiMeaning: "उद्धरणीय",
    usage: "He gave a quotable speech that inspired everyone.",
  },
  {
    word: "Quotidian",
    phonetic: "/kwɒˈtɪdiən/",
    meaning: "occurring every day",
    hindiMeaning: "दैनिक",
    usage: "His quotidian routine included a morning jog and breakfast.",
  },
  {
    word: "Quick-witted",
    phonetic: "/ˈkwɪkwɪtɪd/",
    meaning: "able to respond quickly and intelligently",
    hindiMeaning: "तेज़ दिमाग वाला",
    usage: "She is quick-witted and always has a clever remark.",
  },
  {
    word: "Quaintness",
    phonetic: "/ˈkweɪntnəs/",
    meaning: "charmingly old-fashioned",
    hindiMeaning: "अजीबपन",
    usage: "The quaintness of the old bookstore made it a popular spot.",
  },
  {
    word: "Query",
    phonetic: "/ˈkwɪəri/",
    meaning: "a question or inquiry",
    hindiMeaning: "प्रश्न",
    usage: "She raised a query about the new policy at the meeting.",
  },
  {
    word: "Quibble",
    phonetic: "/ˈkwɪbəl/",
    meaning: "to argue or raise objections about a trivial matter",
    hindiMeaning: "पचड़ा",
    usage: "Stop quibbling and focus on the main issue.",
  },
  {
    word: "Quicklime",
    phonetic: "/ˈkwɪklaɪm/",
    meaning: "a white, caustic substance made by heating limestone",
    hindiMeaning: "जल चूना",
    usage: "The chemical reaction with quicklime was dangerous.",
  },
  {
    word: "Quantum",
    phonetic: "/ˈkwɒntəm/",
    meaning: "a quantity or amount",
    hindiMeaning: "राशि",
    usage: "The quantum of knowledge gained during the lecture was immense.",
  },
  {
    word: "Quintessential",
    phonetic: "/ˌkwɪntɪˈsɛnʃəl/",
    meaning: "representing the most typical example of something",
    hindiMeaning: "सर्वश्रेष्ठ",
    usage: "He is the quintessential gentleman, always polite and respectful.",
  },
  {
    word: "Quash",
    phonetic: "/kwɒʃ/",
    meaning: "to suppress or forcefully put an end to something",
    hindiMeaning: "रद्द करना",
    usage: "The judge quashed the order due to insufficient evidence.",
  },
  {
    word: "Quorum",
    phonetic: "/ˈkwɔːrəm/",
    meaning: "the minimum number of members required for a meeting",
    hindiMeaning: "क्वोरम",
    usage: "The meeting was postponed due to the lack of a quorum.",
  },
  {
    word: "Quiet",
    phonetic: "/ˈkwaɪət/",
    meaning: "making little or no noise",
    hindiMeaning: "शांत",
    usage: "Please remain quiet during the test.",
  },
  {
    word: "Quasi",
    phonetic: "/ˈkwɑːzaɪ/",
    meaning: "seemingly, but not really",
    hindiMeaning: "लगभग",
    usage: "They had a quasi-official status in the group.",
  },
  {
    word: "Qualitative",
    phonetic: "/ˈkwɒlɪtətɪv/",
    meaning: "relating to the quality of something",
    hindiMeaning: "गुणात्मक",
    usage:
      "The research focused on qualitative rather than quantitative aspects.",
  },
  {
    word: "Qualify",
    phonetic: "/ˈkwɒlɪfaɪ/",
    meaning: "to be entitled to a particular benefit or outcome",
    hindiMeaning: "योग्य बनाना",
    usage: "She will qualify for the scholarship based on her grades.",
  },
  {
    word: "Quickstep",
    phonetic: "/ˈkwɪkˌstɛp/",
    meaning: "a lively, fast-paced dance",
    hindiMeaning: "तेज़ कदम",
    usage: "They danced the quickstep at the ballroom competition.",
  },
  {
    word: "Quenched",
    phonetic: "/kwɛntʃt/",
    meaning: "to have satisfied thirst or extinguished a fire",
    hindiMeaning: "तृप्त",
    usage: "He quenched his thirst after a long run.",
  },
  {
    word: "Quietude",
    phonetic: "/ˈkwaɪətjuːd/",
    meaning: "a state of stillness or calm",
    hindiMeaning: "शांति",
    usage: "The quietude of the countryside made her feel at peace.",
  },
  {
    word: "Quid",
    phonetic: "/kwɪd/",
    meaning: "a British pound (slang)",
    hindiMeaning: "पाउंड (स्लैंग)",
    usage: "He paid ten quid for the new book.",
  },
  {
    word: "Quotability",
    phonetic: "/ˌkwəʊtəˈbɪləti/",
    meaning: "the quality of being worthy of being quoted",
    hindiMeaning: "उद्धरणीयता",
    usage: "The author's quotes have great quotability.",
  },
  {
    word: "Quenchless",
    phonetic: "/ˈkwɛntʃləs/",
    meaning: "incapable of being quenched",
    hindiMeaning: "अतृप्त",
    usage: "Her quenchless curiosity led her to explore new subjects.",
  },
  {
    word: "Quick-wittedness",
    phonetic: "/ˈkwɪkˌwɪtɪdnɪs/",
    meaning: "the ability to think and respond quickly",
    hindiMeaning: "तेज़ दिमागी",
    usage: "Quick-wittedness is essential in improv comedy.",
  },

  {
    word: "Radiant",
    phonetic: "/ˈreɪdiənt/",
    meaning: "sending out light; shining",
    hindiMeaning: "तेज चमकदार",
    usage: "The radiant sun brightened up the whole day.",
  },
  {
    word: "Ravenous",
    phonetic: "/ˈrævənəs/",
    meaning: "extremely hungry",
    hindiMeaning: "बहुत भूखा",
    usage: "After the long hike, he was ravenous.",
  },
  {
    word: "Reckless",
    phonetic: "/ˈrɛkləs/",
    meaning: "without thinking or caring about the consequences",
    hindiMeaning: "लापरवाह",
    usage: "His reckless driving put everyone in danger.",
  },
  {
    word: "Resilient",
    phonetic: "/rɪˈzɪlɪənt/",
    meaning: "able to recover quickly from difficulties",
    hindiMeaning: "लचीलापन",
    usage: "She is a resilient woman who overcame many challenges.",
  },
  {
    word: "Reverent",
    phonetic: "/ˈrɛvərənt/",
    meaning: "showing deep respect",
    hindiMeaning: "आदरपूर्ण",
    usage: "The students were reverent during the moment of silence.",
  },
  {
    word: "Reliable",
    phonetic: "/rɪˈlaɪəbl/",
    meaning: "consistently good in quality or performance",
    hindiMeaning: "विश्वसनीय",
    usage: "He is a reliable friend who always keeps his promises.",
  },
  {
    word: "Reciprocal",
    phonetic: "/rɪˈsɪprəkəl/",
    meaning: "given or done in return",
    hindiMeaning: "आपसी",
    usage: "They exchanged reciprocal gestures of goodwill.",
  },
  {
    word: "Retrospective",
    phonetic: "/ˌrɛtrəˈspɛktɪv/",
    meaning: "looking back on or dealing with past events or situations",
    hindiMeaning: "अतीत पर विचार करने वाला",
    usage: "The exhibition was a retrospective of the artist's work.",
  },
  {
    word: "Rational",
    phonetic: "/ˈræʃənəl/",
    meaning: "based on or in accordance with reason or logic",
    hindiMeaning: "विवेकपूर्ण",
    usage: "He made a rational decision after weighing all the facts.",
  },
  {
    word: "Revolutionary",
    phonetic: "/ˌrɛvəˈluːʃəneri/",
    meaning: "involving or causing a complete change",
    hindiMeaning: "क्रांतिकारी",
    usage: "The industrial revolution was a revolutionary event in history.",
  },
  {
    word: "Rejuvenate",
    phonetic: "/rɪˈdʒuːvəˌneɪt/",
    meaning:
      "to make someone or something look or feel younger, fresher, or more lively",
    hindiMeaning: "पुनः युवा बनाना",
    usage: "A good night's sleep can rejuvenate your body and mind.",
  },
  {
    word: "Redundant",
    phonetic: "/rɪˈdʌndənt/",
    meaning: "not necessary because something else already exists",
    hindiMeaning: "अत्यधिक",
    usage:
      "The word 'ATM machine' is redundant because ATM stands for 'Automated Teller Machine.'",
  },
  {
    word: "Rugged",
    phonetic: "/ˈrʌɡɪd/",
    meaning: "having a rough or uneven surface",
    hindiMeaning: "कठोर",
    usage: "The rugged terrain made hiking difficult.",
  },
  {
    word: "Rebellious",
    phonetic: "/rɪˈbɛlɪəs/",
    meaning: "showing a desire to resist authority or control",
    hindiMeaning: "बागी",
    usage: "The rebellious teenager refused to follow the rules.",
  },
  {
    word: "Rationalize",
    phonetic: "/ˈræʃəˌnʌɪz/",
    meaning:
      "to attempt to explain or justify behavior or an attitude with logical reasons",
    hindiMeaning: "विवेकपूर्ण तरीके से समझाना",
    usage: "She tried to rationalize her decision to leave early.",
  },
  {
    word: "Refined",
    phonetic: "/rɪˈfaɪnd/",
    meaning: "with impurities or unwanted elements removed",
    hindiMeaning: "शुद्ध",
    usage: "The refined sugar was perfect for baking.",
  },
  {
    word: "Remorse",
    phonetic: "/rɪˈmɔːs/",
    meaning: "deep regret or guilt for a wrong committed",
    hindiMeaning: "पश्चाताप",
    usage: "He felt deep remorse for his actions.",
  },
  {
    word: "Resonate",
    phonetic: "/ˈrɛzəˌneɪt/",
    meaning: "to produce or be filled with a deep, full, reverberating sound",
    hindiMeaning: "गूंजना",
    usage: "Her speech resonated with the audience.",
  },
  {
    word: "Rapt",
    phonetic: "/ræpt/",
    meaning: "completely fascinated or absorbed",
    hindiMeaning: "मोहित",
    usage: "He listened to the lecture with rapt attention.",
  },
  {
    word: "Reproach",
    phonetic: "/rɪˈproʊtʃ/",
    meaning: "to express disapproval or disappointment",
    hindiMeaning: "निंदा करना",
    usage: "His actions brought reproach to his family.",
  },
  {
    word: "Revolution",
    phonetic: "/ˌrɛvəˈluːʃən/",
    meaning: "a forcible overthrow of a government or social order",
    hindiMeaning: "क्रांति",
    usage: "The revolution led to the establishment of a new government.",
  },
  {
    word: "Reinforce",
    phonetic: "/ˌriːɪnˈfɔːrs/",
    meaning: "to strengthen or support an idea or object",
    hindiMeaning: "मज़बूत करना",
    usage: "The teacher used examples to reinforce her point.",
  },
  {
    word: "Resign",
    phonetic: "/rɪˈzaɪn/",
    meaning: "to voluntarily leave a job or position",
    hindiMeaning: "त्याग देना",
    usage: "She decided to resign from her job to pursue other opportunities.",
  },
  {
    word: "Remedy",
    phonetic: "/ˈrɛmɪdi/",
    meaning: "a treatment or solution to a problem",
    hindiMeaning: "उपचार",
    usage: "The doctor prescribed a remedy for the cold.",
  },
  {
    word: "Rough",
    phonetic: "/rʌf/",
    meaning: "having an uneven or irregular surface",
    hindiMeaning: "खुरदुरा",
    usage: "The rough surface of the road caused the car to bounce.",
  },
  {
    word: "Reassure",
    phonetic: "/ˌriːəˈʃʊr/",
    meaning: "to say or do something to make someone feel better",
    hindiMeaning: "संतुष्ट करना",
    usage: "The nurse reassured the patient before the surgery.",
  },
  {
    word: "Resist",
    phonetic: "/rɪˈzɪst/",
    meaning: "to withstand or fight against",
    hindiMeaning: "विरोध करना",
    usage: "He tried to resist the temptation to eat junk food.",
  },
  {
    word: "Ramble",
    phonetic: "/ˈræmbəl/",
    meaning: "to talk or write in a confused or disconnected way",
    hindiMeaning: "बातों का उलझना",
    usage: "He started to ramble during his presentation.",
  },
  {
    word: "Reprimand",
    phonetic: "/ˈrɛprɪˌmænd/",
    meaning: "to rebuke or scold someone",
    hindiMeaning: "फटकार लगाना",
    usage: "The manager reprimanded the employee for being late.",
  },
  {
    word: "Replicate",
    phonetic: "/ˈrɛplɪˌkeɪt/",
    meaning: "to make an exact copy of",
    hindiMeaning: "नकल करना",
    usage: "Scientists tried to replicate the experiment's results.",
  },
  {
    word: "Rave",
    phonetic: "/reɪv/",
    meaning: "to speak or write about something with great enthusiasm",
    hindiMeaning: "प्रशंसा करना",
    usage: "Critics raved about the movie's performances.",
  },
  {
    word: "Resiliency",
    phonetic: "/rɪˈzɪlɪənsi/",
    meaning:
      "the ability to recover from or adjust easily to misfortune or change",
    hindiMeaning: "लचीलापन",
    usage:
      "The resiliency of the community helped them rebuild after the disaster.",
  },
  {
    word: "Revolting",
    phonetic: "/rɪˈvəʊltɪŋ/",
    meaning: "extremely unpleasant",
    hindiMeaning: "घृणित",
    usage: "The smell was so revolting that I had to leave the room.",
  },
  {
    word: "Ransack",
    phonetic: "/ˈrænsæk/",
    meaning: "to search through something in a hurried or violent way",
    hindiMeaning: "लूटना",
    usage: "The thieves ransacked the house and took everything of value.",
  },
  {
    word: "Reluctant",
    phonetic: "/rɪˈlʌktənt/",
    meaning: "unwilling or hesitant",
    hindiMeaning: "अनिच्छुक",
    usage: "He was reluctant to speak in front of the large crowd.",
  },
  {
    word: "Rejuvenated",
    phonetic: "/rɪˈdʒuːvəˌneɪtɪd/",
    meaning: "feeling fresh or youthful again",
    hindiMeaning: "पुनः युवा",
    usage: "The spa treatment made her feel rejuvenated.",
  },
  {
    word: "Raze",
    phonetic: "/reɪz/",
    meaning: "to completely destroy or demolish",
    hindiMeaning: "नष्ट करना",
    usage: "The old building was razed to make room for new construction.",
  },
  {
    word: "Reconcile",
    phonetic: "/ˈrɛkənsaɪl/",
    meaning: "to restore friendly relations",
    hindiMeaning: "सुलह करना",
    usage: "They worked hard to reconcile their differences.",
  },
  {
    word: "Reflex",
    phonetic: "/ˈriːflɛks/",
    meaning: "an automatic, involuntary response to a stimulus",
    hindiMeaning: "प्रतिक्रिया",
    usage: "The doctor tested his reflexes with a small hammer.",
  },
  {
    word: "Rash",
    phonetic: "/ræʃ/",
    meaning: "displaying poor judgment",
    hindiMeaning: "अविचारपूर्ण",
    usage: "It was rash of him to make such a decision.",
  },
  {
    word: "Romantic",
    phonetic: "/roʊˈmæntɪk/",
    meaning: "characterized by a love of beauty or nature",
    hindiMeaning: "रोमांटिक",
    usage: "They had a romantic dinner by the candlelight.",
  },
  {
    word: "Rationalism",
    phonetic: "/ˈræʃənəlɪzəm/",
    meaning: "the belief that reason is the chief source of knowledge",
    hindiMeaning: "विवेकवाद",
    usage: "Rationalism emphasizes the importance of logical thinking.",
  },
  {
    word: "Recalcitrant",
    phonetic: "/rɪˈkælsɪtrənt/",
    meaning: "having an obstinately uncooperative attitude",
    hindiMeaning: "अवज्ञाकारी",
    usage:
      "The recalcitrant student refused to follow the teacher's instructions.",
  },
  {
    word: "Repentant",
    phonetic: "/rɪˈpɛntənt/",
    meaning: "showing remorse for one's wrongdoings",
    hindiMeaning: "पश्चातापपूर्ण",
    usage: "He was repentant for his actions and apologized.",
  },
  {
    word: "Replete",
    phonetic: "/rɪˈpliːt/",
    meaning: "filled or well-supplied with something",
    hindiMeaning: "संपूर्ण",
    usage: "The meal was replete with delicious flavors.",
  },
  {
    word: "Rebuff",
    phonetic: "/rɪˈbʌf/",
    meaning: "to reject or criticize sharply",
    hindiMeaning: "नकारना",
    usage: "He was rebuffed when he asked for a raise.",
  },

  {
    word: "Sublime",
    phonetic: "/səˈblaɪm/",
    meaning:
      "of such excellence, grandeur, or beauty as to inspire great admiration",
    hindiMeaning: "उत्कृष्ट",
    usage: "The view from the mountain top was absolutely sublime.",
  },
  {
    word: "Serene",
    phonetic: "/səˈriːn/",
    meaning: "calm, peaceful, and untroubled",
    hindiMeaning: "शांत",
    usage: "The lake was serene in the early morning light.",
  },
  {
    word: "Sympathy",
    phonetic: "/ˈsɪmpəθi/",
    meaning: "feelings of pity and sorrow for someone's misfortune",
    hindiMeaning: "सहानुभूति",
    usage: "She offered her sympathy to the family of the deceased.",
  },
  {
    word: "Skeptical",
    phonetic: "/ˈskɛptɪkəl/",
    meaning: "not easily convinced; having doubts or reservations",
    hindiMeaning: "संशयात्मक",
    usage: "He was skeptical about the new policy.",
  },
  {
    word: "Sincere",
    phonetic: "/sɪnˈsɪr/",
    meaning: "free from pretense or deceit; genuine",
    hindiMeaning: "ईमानदार",
    usage: "Her apology was sincere, and she truly regretted her actions.",
  },
  {
    word: "Sustain",
    phonetic: "/səˈsteɪn/",
    meaning: "to support, hold, or bear up from below",
    hindiMeaning: "सहारा देना",
    usage: "The bridge was built to sustain the weight of heavy trucks.",
  },
  {
    word: "Scrutiny",
    phonetic: "/ˈskruːtɪni/",
    meaning: "critical observation or examination",
    hindiMeaning: "समीक्षा",
    usage: "The company's financial statements are under scrutiny by auditors.",
  },
  {
    word: "Solace",
    phonetic: "/ˈsɒləs/",
    meaning: "comfort or consolation in a time of distress or sadness",
    hindiMeaning: "संतोष",
    usage: "She found solace in her friend's support after the loss.",
  },
  {
    word: "Stubborn",
    phonetic: "/ˈstʌbərn/",
    meaning:
      "having or showing determination not to change one's attitude or position",
    hindiMeaning: "हठी",
    usage: "He was too stubborn to admit he was wrong.",
  },
  {
    word: "Superficial",
    phonetic: "/ˌsuːpərˈfɪʃəl/",
    meaning: "existing or occurring at or on the surface",
    hindiMeaning: "सतही",
    usage: "The damage to the car was only superficial.",
  },
  {
    word: "Subtle",
    phonetic: "/ˈsʌtl/",
    meaning: "delicate or precise as to be difficult to analyze or describe",
    hindiMeaning: "सूक्ष्म",
    usage: "Her subtle smile revealed her true feelings.",
  },
  {
    word: "Sustainable",
    phonetic: "/səˈsteɪnəbl/",
    meaning: "able to be maintained or continued over the long term",
    hindiMeaning: "सतत",
    usage:
      "The company is focusing on sustainable practices in their production.",
  },
  {
    word: "Savage",
    phonetic: "/ˈsævɪdʒ/",
    meaning: "fierce, violent, and uncontrolled",
    hindiMeaning: "भयंकर",
    usage: "The savage storm caused widespread destruction.",
  },
  {
    word: "Serendipity",
    phonetic: "/ˌsɛrənˈdɪpɪti/",
    meaning: "the occurrence of events by chance in a happy or beneficial way",
    hindiMeaning: "संयोग",
    usage: "Finding the perfect job was pure serendipity.",
  },
  {
    word: "Skeptical",
    phonetic: "/ˈskɛptɪkəl/",
    meaning: "having doubts or reservations",
    hindiMeaning: "संदेहपूर्ण",
    usage: "She was skeptical about the success of the new product.",
  },
  {
    word: "Soporific",
    phonetic: "/ˌsɒpəˈrɪfɪk/",
    meaning: "tending to induce drowsiness or sleep",
    hindiMeaning: "नींद लाने वाला",
    usage: "The lecture was soporific, and I could hardly stay awake.",
  },
  {
    word: "Summon",
    phonetic: "/ˈsʌmən/",
    meaning: "to call upon or order to come",
    hindiMeaning: "आज्ञा देना",
    usage: "The king summoned his advisors for an urgent meeting.",
  },
  {
    word: "Savory",
    phonetic: "/ˈseɪvəri/",
    meaning: "having a salty or spicy taste, rather than a sweet one",
    hindiMeaning: "स्वादिष्ट",
    usage: "I prefer savory snacks over sweet ones.",
  },
  {
    word: "Stagnant",
    phonetic: "/ˈstæɡnənt/",
    meaning: "having no current or flow and often having an unpleasant smell",
    hindiMeaning: "ठहराव",
    usage: "The stagnant water was a breeding ground for mosquitoes.",
  },
  {
    word: "Subtle",
    phonetic: "/ˈsʌtl/",
    meaning: "delicate or not obvious",
    hindiMeaning: "सूक्ष्म",
    usage: "There was a subtle change in the way he spoke.",
  },
  {
    word: "Silhouette",
    phonetic: "/ˌsɪluːˈɛt/",
    meaning:
      "the dark shape and outline of someone or something visible against a lighter background",
    hindiMeaning: "आकृति",
    usage:
      "The silhouette of the mountain against the sunset was breathtaking.",
  },
  {
    word: "Speculate",
    phonetic: "/ˈspɛkjʊˌleɪt/",
    meaning:
      "to form a theory or conjecture about a subject without firm evidence",
    hindiMeaning: "अनुमान करना",
    usage: "They speculated about the cause of the fire.",
  },
  {
    word: "Stagnant",
    phonetic: "/ˈstæɡnənt/",
    meaning: "not flowing or moving",
    hindiMeaning: "ठहराव",
    usage: "The stagnant water in the pond became polluted.",
  },
  {
    word: "Symmetry",
    phonetic: "/ˈsɪmɪtri/",
    meaning:
      "the quality of being made up of exactly similar parts facing each other or around an axis",
    hindiMeaning: "समानता",
    usage: "The symmetry of the building's design was impressive.",
  },
  {
    word: "Swindle",
    phonetic: "/ˈswɪndəl/",
    meaning: "to cheat or defraud someone out of money",
    hindiMeaning: "धोखा देना",
    usage: "He was arrested for attempting to swindle investors.",
  },
  {
    word: "Serene",
    phonetic: "/səˈriːn/",
    meaning: "calm and peaceful",
    hindiMeaning: "शांत",
    usage: "The garden was a serene place to relax and reflect.",
  },
  {
    word: "Shrewd",
    phonetic: "/ʃruːd/",
    meaning: "having or showing sharp judgment and common sense",
    hindiMeaning: "चतुर",
    usage: "He made a shrewd investment that paid off handsomely.",
  },
  {
    word: "Saturate",
    phonetic: "/ˈsætʃəreɪt/",
    meaning: "to cause something to be thoroughly soaked or filled",
    hindiMeaning: "संतृप्त करना",
    usage: "The rainstorm saturated the ground with water.",
  },
  {
    word: "Squalid",
    phonetic: "/ˈskwɒlɪd/",
    meaning:
      "extremely dirty and unpleasant, especially as a result of poverty or neglect",
    hindiMeaning: "गंदा",
    usage: "The refugees were living in squalid conditions.",
  },
  {
    word: "Sociable",
    phonetic: "/ˈsəʊʃəbəl/",
    meaning: "willing to talk and engage in activities with other people",
    hindiMeaning: "सामाजिक",
    usage: "He is a sociable person who enjoys meeting new people.",
  },
  {
    word: "Shackle",
    phonetic: "/ˈʃækəl/",
    meaning:
      "a pair of metal restraints used to fasten someone's ankles or wrists",
    hindiMeaning: "हथकड़ी",
    usage: "The prisoner was placed in shackles before being transported.",
  },
  {
    word: "Subordinate",
    phonetic: "/səˈbɔːdɪnət/",
    meaning: "lower in rank or position",
    hindiMeaning: "अधीन",
    usage: "She gave the subordinate tasks to her assistant.",
  },
  {
    word: "Sovereign",
    phonetic: "/ˈsɒvrɪn/",
    meaning: "a supreme ruler, especially a monarch",
    hindiMeaning: "संप्रभु",
    usage: "The country was ruled by a sovereign king.",
  },
  {
    word: "Subsidy",
    phonetic: "/ˈsʌbsɪdi/",
    meaning:
      "a sum of money granted by the government or a public body to assist an industry or business",
    hindiMeaning: "अनुदान",
    usage: "The government offered subsidies to farmers during the drought.",
  },
  {
    word: "Sanction",
    phonetic: "/ˈsæŋkʃən/",
    meaning: "a penalty for disobeying a law or rule",
    hindiMeaning: "प्रवंध",
    usage:
      "The company faced sanctions for violating environmental regulations.",
  },
  {
    word: "Seize",
    phonetic: "/siːz/",
    meaning: "to take hold or control of something suddenly",
    hindiMeaning: "जबरदस्ती करना",
    usage: "The authorities seized the illegal drugs.",
  },
  {
    word: "Seclude",
    phonetic: "/sɪˈkluːd/",
    meaning: "to isolate or keep away from others",
    hindiMeaning: "अलग करना",
    usage: "He decided to seclude himself from the distractions of city life.",
  },
  {
    word: "Savor",
    phonetic: "/ˈseɪvə/",
    meaning: "to enjoy or appreciate something, especially food or a moment",
    hindiMeaning: "स्वाद लेना",
    usage: "She savored every bite of the delicious cake.",
  },
  {
    word: "Secure",
    phonetic: "/sɪˈkjʊə/",
    meaning: "to make something safe, or protected from harm",
    hindiMeaning: "सुरक्षित",
    usage: "They worked hard to secure the building after the break-in.",
  },
  {
    word: "Sympathy",
    phonetic: "/ˈsɪmpəθi/",
    meaning: "feelings of pity and sorrow for someone's misfortune",
    hindiMeaning: "सहानुभूति",
    usage: "He expressed his sympathy for the loss of her pet.",
  },
  {
    word: "Synthesize",
    phonetic: "/ˈsɪnθəsaɪz/",
    meaning: "to combine different parts or elements to form a whole",
    hindiMeaning: "संश्लेषण करना",
    usage: "They synthesized various chemicals to create the new compound.",
  },

  {
    word: "Tangible",
    phonetic: "/ˈtændʒəbl/",
    meaning: "perceptible by touch",
    hindiMeaning: "स्पर्शनीय",
    usage: "The evidence was tangible, making the case easier to prove.",
  },
  {
    word: "Tolerant",
    phonetic: "/ˈtɒlərənt/",
    meaning:
      "showing willingness to allow the existence of opinions or behavior that one does not necessarily agree with",
    hindiMeaning: "सहिष्णु",
    usage: "He is tolerant of different cultures and beliefs.",
  },
  {
    word: "Trivial",
    phonetic: "/ˈtrɪviəl/",
    meaning: "of little value or importance",
    hindiMeaning: "तुच्छ",
    usage: "The argument was about trivial matters.",
  },
  {
    word: "Turbulent",
    phonetic: "/ˈtɜːbjʊlənt/",
    meaning: "characterized by conflict, disorder, or confusion",
    hindiMeaning: "उथल-पुथल",
    usage: "The turbulent sea made it difficult to sail.",
  },
  {
    word: "Tactful",
    phonetic: "/ˈtæktfʊl/",
    meaning:
      "having or showing sensitivity in dealing with others or with difficult issues",
    hindiMeaning: "सयंत्र",
    usage: "Her tactful response helped calm the situation.",
  },
  {
    word: "Tangible",
    phonetic: "/ˈtændʒəbl/",
    meaning: "perceptible by touch",
    hindiMeaning: "स्पर्शनीय",
    usage: "The company provided tangible proof of their success.",
  },
  {
    word: "Turbulence",
    phonetic: "/ˈtɜːbjʊləns/",
    meaning: "violent or unsteady movement of air or water",
    hindiMeaning: "कांपना",
    usage: "We experienced a lot of turbulence during the flight.",
  },
  {
    word: "Tranquil",
    phonetic: "/ˈtræŋkwɪl/",
    meaning: "free from disturbance",
    hindiMeaning: "शांत",
    usage: "The garden was a tranquil retreat after a long day.",
  },
  {
    word: "Thorough",
    phonetic: "/ˈθɜːrəʊ/",
    meaning: "complete with regard to every detail",
    hindiMeaning: "पूर्ण",
    usage: "He did a thorough job cleaning the house.",
  },
  {
    word: "Turbid",
    phonetic: "/ˈtɜːbɪd/",
    meaning: "cloudy, opaque, or thick with suspended matter",
    hindiMeaning: "मलीन",
    usage: "The river water was turbid after the heavy rainfall.",
  },
  {
    word: "Tolerate",
    phonetic: "/ˈtɒləreɪt/",
    meaning: "to allow the existence, occurrence, or practice of something",
    hindiMeaning: "सहना",
    usage: "She could not tolerate the noise any longer.",
  },
  {
    word: "Tenacious",
    phonetic: "/tɪˈneɪʃəs/",
    meaning: "holding fast; characterized by determination",
    hindiMeaning: "जिद्दी",
    usage:
      "Her tenacious attitude helped her succeed in the competitive industry.",
  },
  {
    word: "Tantamount",
    phonetic: "/ˈtæntəmaʊnt/",
    meaning: "equivalent in seriousness to",
    hindiMeaning: "बराबर",
    usage: "His actions were tantamount to betrayal.",
  },
  {
    word: "Tactile",
    phonetic: "/ˈtæktɪl/",
    meaning: "of or connected with the sense of touch",
    hindiMeaning: "स्पर्श संबंधित",
    usage: "The fabric had a soft, tactile feel.",
  },
  {
    word: "Trivialize",
    phonetic: "/ˈtrɪvɪəlaɪz/",
    meaning: "to make something seem less important",
    hindiMeaning: "तुच्छ बनाना",
    usage: "His comments trivialized the significance of the issue.",
  },
  {
    word: "Toxic",
    phonetic: "/ˈtɒksɪk/",
    meaning: "poisonous",
    hindiMeaning: "विषाक्त",
    usage: "The toxic waste was dumped into the river.",
  },
  {
    word: "Tremendous",
    phonetic: "/trɪˈmɛndəs/",
    meaning: "very great in amount, scale, or intensity",
    hindiMeaning: "विशाल",
    usage: "They made a tremendous effort to complete the project on time.",
  },
  {
    word: "Tolerable",
    phonetic: "/ˈtɒlərəbəl/",
    meaning: "able to be endured or tolerated",
    hindiMeaning: "सहनशील",
    usage: "The pain was tolerable, so she didn’t need medication.",
  },
  {
    word: "Thrive",
    phonetic: "/θraɪv/",
    meaning: "to grow, develop, or be successful",
    hindiMeaning: "प्रोन्नति करना",
    usage: "The company continues to thrive in a competitive market.",
  },
  {
    word: "Tempt",
    phonetic: "/tɛmpt/",
    meaning: "to entice or try to persuade someone to do something",
    hindiMeaning: "ललचाना",
    usage: "She was tempted to try the new dessert at the restaurant.",
  },
  {
    word: "Tangible",
    phonetic: "/ˈtændʒəbl/",
    meaning: "able to be touched or perceived",
    hindiMeaning: "स्पर्शनीय",
    usage: "The lawyer presented tangible evidence in court.",
  },
  {
    word: "Tolerability",
    phonetic: "/ˌtɒlərəˈbɪləti/",
    meaning: "the ability to endure or withstand",
    hindiMeaning: "सहनशीलता",
    usage: "The tolerability of the medicine was tested on volunteers.",
  },
  {
    word: "Tactician",
    phonetic: "/tækˈtɪʃən/",
    meaning:
      "a person skilled in planning and executing military or strategic operations",
    hindiMeaning: "रणनीतिक",
    usage: "The general was a brilliant tactician.",
  },
  {
    word: "Truncate",
    phonetic: "/ˈtrʌŋkeɪt/",
    meaning: "to shorten by cutting off the top or end",
    hindiMeaning: "काटना",
    usage: "The speech was truncated to fit the time slot.",
  },
  {
    word: "Transcend",
    phonetic: "/trænˈsɛnd/",
    meaning: "to go beyond the limits of",
    hindiMeaning: "अतिरिक्त",
    usage: "Her actions transcended all expectations.",
  },
  {
    word: "Transitory",
    phonetic: "/ˈtrænzɪtəri/",
    meaning: "not permanent; temporary",
    hindiMeaning: "अस्थायी",
    usage: "The excitement of the holiday season is transitory.",
  },
  {
    word: "Tense",
    phonetic: "/tɛns/",
    meaning: "in a state of mental or emotional strain",
    hindiMeaning: "तनावपूर्ण",
    usage: "The tense atmosphere in the room made everyone uneasy.",
  },
  {
    word: "Tolerant",
    phonetic: "/ˈtɒlərənt/",
    meaning:
      "willing to accept or endure beliefs or behaviors that are different from one's own",
    hindiMeaning: "सहनशील",
    usage: "The teacher was tolerant of students' diverse opinions.",
  },
  {
    word: "Trophy",
    phonetic: "/ˈtrəʊfi/",
    meaning:
      "a prize or award, typically a cup or plaque, awarded for a victory or achievement",
    hindiMeaning: "पुरस्कार",
    usage: "He won the first-place trophy in the competition.",
  },
  {
    word: "Tranquility",
    phonetic: "/træŋˈkwɪləti/",
    meaning: "the quality or state of being calm",
    hindiMeaning: "शांति",
    usage: "The tranquility of the forest provided a peaceful escape.",
  },
  {
    word: "Toleration",
    phonetic: "/ˌtɒləˈreɪʃən/",
    meaning: "the act of allowing the existence or practice of something",
    hindiMeaning: "सहनशीलता",
    usage:
      "Toleration of different religions is essential in a diverse society.",
  },
  {
    word: "Turbid",
    phonetic: "/ˈtɜːbɪd/",
    meaning: "cloudy, opaque, or thick with suspended matter",
    hindiMeaning: "मलीन",
    usage: "The river's water was turbid after the heavy rains.",
  },
  {
    word: "Tonic",
    phonetic: "/ˈtɒnɪk/",
    meaning: "a medicinal substance taken to restore or improve health",
    hindiMeaning: "स्वास्थ्यवर्धक",
    usage: "She drank a tonic to help with her energy levels.",
  },
  {
    word: "Tangible",
    phonetic: "/ˈtændʒəbl/",
    meaning: "clear and definite",
    hindiMeaning: "स्पष्ट",
    usage: "The tangible benefits of exercise were seen after a few weeks.",
  },
  {
    word: "Tart",
    phonetic: "/tɑːt/",
    meaning: "sharp in taste or flavor",
    hindiMeaning: "तीखा",
    usage: "The lemonade was too tart for my taste.",
  },
  {
    word: "Trivial",
    phonetic: "/ˈtrɪviəl/",
    meaning: "of little importance or value",
    hindiMeaning: "तुच्छ",
    usage: "The arguments were trivial and did not warrant attention.",
  },
  {
    word: "Tact",
    phonetic: "/tækt/",
    meaning: "sensitivity in dealing with others",
    hindiMeaning: "सहनशीलता",
    usage: "She handled the difficult situation with great tact.",
  },
  {
    word: "Twitch",
    phonetic: "/twɪtʃ/",
    meaning: "a sudden quick movement",
    hindiMeaning: "काँपना",
    usage: "He felt a twitch in his leg after sitting for so long.",
  },

  {
    word: "Ultimate",
    phonetic: "/ˈʌltɪmət/",
    meaning: "being or happening at the end of a process",
    hindiMeaning: "अंतिम",
    usage: "Winning the championship was the ultimate goal for the team.",
  },
  {
    word: "Ubiquitous",
    phonetic: "/juːˈbɪkwɪtəs/",
    meaning: "present, appearing, or found everywhere",
    hindiMeaning: "सर्वव्यापी",
    usage: "Smartphones are ubiquitous in today's society.",
  },
  {
    word: "Uplift",
    phonetic: "/ˈʌplɪft/",
    meaning: "to raise something to a higher level",
    hindiMeaning: "उत्थान",
    usage: "The community project aims to uplift those in need.",
  },
  {
    word: "Unanimous",
    phonetic: "/juːˈnænɪməs/",
    meaning: "fully in agreement",
    hindiMeaning: "एकमत",
    usage: "The decision to cancel the event was unanimous.",
  },
  {
    word: "Unprecedented",
    phonetic: "/ʌnˈprɛsɪdɛntɪd/",
    meaning: "never done or known before",
    hindiMeaning: "अद्वितीय",
    usage: "The storm caused unprecedented damage to the town.",
  },
  {
    word: "Urgent",
    phonetic: "/ˈɜːdʒənt/",
    meaning: "requiring immediate action or attention",
    hindiMeaning: "आपातकालीन",
    usage: "The urgent letter needed to be delivered right away.",
  },
  {
    word: "Unique",
    phonetic: "/juˈniːk/",
    meaning: "being the only one of its kind",
    hindiMeaning: "अद्वितीय",
    usage: "Each person's fingerprint is unique.",
  },
  {
    word: "Ubiquity",
    phonetic: "/juːˈbɪkwɪti/",
    meaning: "the state of being everywhere",
    hindiMeaning: "सर्वव्यापी",
    usage: "The ubiquity of social media has changed communication.",
  },
  {
    word: "Underestimate",
    phonetic: "/ˌʌndərˈɛstɪmeɪt/",
    meaning:
      "to think of something as being smaller, less important, or less significant than it really is",
    hindiMeaning: "अंडरएस्टिमेट करना",
    usage: "Never underestimate the power of a positive attitude.",
  },
  {
    word: "Unstable",
    phonetic: "/ʌnˈsteɪbəl/",
    meaning: "liable to change or fail",
    hindiMeaning: "अस्थिर",
    usage: "The political situation in the country is unstable.",
  },
  {
    word: "Utter",
    phonetic: "/ˈʌtə/",
    meaning: "to speak or say something",
    hindiMeaning: "उच्चारण करना",
    usage: "He couldn’t utter a word in his surprise.",
  },
  {
    word: "Utilize",
    phonetic: "/ˈjuːtɪlaɪz/",
    meaning: "to make practical use of something",
    hindiMeaning: "उपयोग करना",
    usage: "The company plans to utilize new technology to improve efficiency.",
  },
  {
    word: "Universal",
    phonetic: "/ˌjuːnɪˈvɜːsəl/",
    meaning: "applicable or common to all purposes, conditions, or situations",
    hindiMeaning: "सार्वभौमिक",
    usage: "Laughter is a universal language.",
  },
  {
    word: "Unusual",
    phonetic: "/ʌnˈjuːʒʊəl/",
    meaning: "not habitually occurring or done",
    hindiMeaning: "असामान्य",
    usage: "The pattern on the butterfly’s wings was unusual.",
  },
  {
    word: "Undermine",
    phonetic: "/ˌʌndərˈmaɪn/",
    meaning: "to weaken or harm something",
    hindiMeaning: "नुकसान करना",
    usage: "Their actions could undermine the success of the project.",
  },
  {
    word: "Unveil",
    phonetic: "/ʌnˈveɪl/",
    meaning: "to reveal or make known",
    hindiMeaning: "प्रकाश में लाना",
    usage: "The company will unveil its new product next week.",
  },
  {
    word: "Unify",
    phonetic: "/ˈjuːnɪfaɪ/",
    meaning: "to bring together or make one",
    hindiMeaning: "एकजुट करना",
    usage: "The event helped unify the community.",
  },
  {
    word: "Urban",
    phonetic: "/ˈɜːbən/",
    meaning: "relating to cities or towns",
    hindiMeaning: "शहरी",
    usage: "Urban areas tend to have more job opportunities.",
  },
  {
    word: "Unequivocal",
    phonetic: "/ˌʌnɪˈkwɪvəkəl/",
    meaning: "clear and unambiguous",
    hindiMeaning: "स्पष्ट",
    usage: "The evidence provided an unequivocal answer.",
  },
  {
    word: "Uplifting",
    phonetic: "/ˈʌplɪftɪŋ/",
    meaning: "inspiring happiness or hope",
    hindiMeaning: "प्रेरणादायक",
    usage: "Her uplifting speech inspired the whole audience.",
  },
  {
    word: "Undefeated",
    phonetic: "/ˌʌndɪˈfiːtɪd/",
    meaning: "not having lost a game or battle",
    hindiMeaning: "अजेय",
    usage: "The team remained undefeated throughout the season.",
  },
  {
    word: "Unravel",
    phonetic: "/ʌnˈrævl/",
    meaning: "to untangle or solve something",
    hindiMeaning: "सुलझाना",
    usage: "The detective worked hard to unravel the mystery.",
  },
  {
    word: "Utility",
    phonetic: "/juːˈtɪləti/",
    meaning: "the state of being useful",
    hindiMeaning: "उपयोगिता",
    usage: "This tool has great utility in repairing machinery.",
  },
  {
    word: "Upbeat",
    phonetic: "/ˈʌpbiːt/",
    meaning: "optimistic, cheerful",
    hindiMeaning: "आशावादी",
    usage: "Despite the challenges, he maintained an upbeat attitude.",
  },
  {
    word: "Uptake",
    phonetic: "/ˈʌpteɪk/",
    meaning: "the action of accepting or starting to use something",
    hindiMeaning: "स्वीकार",
    usage: "The uptake of the new technology was rapid in the industry.",
  },
  {
    word: "Uncomplicated",
    phonetic: "/ʌnˈkɒmplɪkeɪtɪd/",
    meaning: "simple and easy to understand",
    hindiMeaning: "साधारण",
    usage: "The instructions were straightforward and uncomplicated.",
  },
  {
    word: "Upset",
    phonetic: "/ʌpˈsɛt/",
    meaning: "to disturb the normal order or position of something",
    hindiMeaning: "अशांत",
    usage: "She was upset after hearing the news.",
  },
  {
    word: "Unworthy",
    phonetic: "/ʌnˈwɜːði/",
    meaning: "not deserving of something",
    hindiMeaning: "अयोग्य",
    usage: "He felt unworthy of receiving such an honor.",
  },
  {
    word: "Usefulness",
    phonetic: "/ˈjuːsfʊlnɪs/",
    meaning: "the quality of being useful",
    hindiMeaning: "उपयोगिता",
    usage: "The usefulness of the new software was evident in the workflow.",
  },
  {
    word: "Utmost",
    phonetic: "/ˈʌtməʊst/",
    meaning: "most extreme or greatest",
    hindiMeaning: "अत्यधिक",
    usage: "He made the utmost effort to complete the task on time.",
  },
  {
    word: "Underestimate",
    phonetic: "/ˌʌndərˈɛstɪmeɪt/",
    meaning:
      "to think of something as being smaller, less important, or less significant than it really is",
    hindiMeaning: "अंडरएस्टिमेट करना",
    usage: "Never underestimate the power of kindness.",
  },
  {
    word: "Urgency",
    phonetic: "/ˈɜːdʒənsi/",
    meaning: "importance requiring swift action",
    hindiMeaning: "तत्कालता",
    usage: "There was a sense of urgency in the room during the emergency.",
  },
  {
    word: "Uprise",
    phonetic: "/ʌpˈraɪz/",
    meaning: "to rise or revolt against authority",
    hindiMeaning: "उठ खड़ा होना",
    usage: "The citizens decided to uprise against the unjust government.",
  },
  {
    word: "Undulate",
    phonetic: "/ˈʌndjʊleɪt/",
    meaning: "to move in a smooth wave-like motion",
    hindiMeaning: "लहराना",
    usage: "The surface of the water began to undulate with the wind.",
  },
  {
    word: "Unveil",
    phonetic: "/ʌnˈveɪl/",
    meaning: "to reveal or make known",
    hindiMeaning: "प्रकट करना",
    usage: "The company will unveil the new product at the conference.",
  },
  {
    word: "Unintended",
    phonetic: "/ˌʌnɪnˈtɛndɪd/",
    meaning: "not planned or meant",
    hindiMeaning: "अनपेक्षित",
    usage:
      "The unintended consequences of the policy became apparent over time.",
  },
  {
    word: "Unite",
    phonetic: "/juːˈnaɪt/",
    meaning: "to come together as one",
    hindiMeaning: "एकजुट करना",
    usage: "The group united to fight for a common cause.",
  },
  {
    word: "Untamed",
    phonetic: "/ʌnˈteɪmd/",
    meaning: "wild or uncontrolled",
    hindiMeaning: "अविनीत",
    usage: "The jungle was untamed and full of dangers.",
  },

  {
    word: "Vague",
    phonetic: "/veɪɡ/",
    meaning: "unclear or indistinct",
    hindiMeaning: "अस्पष्ट",
    usage: "His explanation was too vague to understand.",
  },
  {
    word: "Valiant",
    phonetic: "/ˈvælɪənt/",
    meaning: "showing courage or determination",
    hindiMeaning: "वीर",
    usage: "The valiant soldier saved many lives during the battle.",
  },
  {
    word: "Vanish",
    phonetic: "/ˈvænɪʃ/",
    meaning: "disappear from sight",
    hindiMeaning: "गायब होना",
    usage: "The magician made the rabbit vanish from his hat.",
  },
  {
    word: "Vast",
    phonetic: "/væst/",
    meaning: "of very great extent or size",
    hindiMeaning: "विशाल",
    usage: "The Sahara Desert is vast and inhospitable.",
  },
  {
    word: "Vibrant",
    phonetic: "/ˈvaɪbrənt/",
    meaning: "full of energy and life",
    hindiMeaning: "जोश से भरा",
    usage: "The city is known for its vibrant culture.",
  },
  {
    word: "Vicious",
    phonetic: "/ˈvɪʃəs/",
    meaning: "deliberately harmful or violent",
    hindiMeaning: "क्रूर",
    usage: "The dog had a vicious attitude toward strangers.",
  },
  {
    word: "Victory",
    phonetic: "/ˈvɪktəri/",
    meaning: "an act of winning or triumphing",
    hindiMeaning: "विजय",
    usage: "They celebrated their victory with a grand party.",
  },
  {
    word: "Vivid",
    phonetic: "/ˈvɪvɪd/",
    meaning: "producing powerful feelings or strong, clear images",
    hindiMeaning: "जिवंत",
    usage: "She gave a vivid description of the landscape.",
  },
  {
    word: "Vulnerable",
    phonetic: "/ˈvʌlnərəbl/",
    meaning: "capable of being hurt or attacked",
    hindiMeaning: "संवेदनशील",
    usage: "The village was vulnerable to attacks during the war.",
  },
  {
    word: "Venture",
    phonetic: "/ˈvɛntʃər/",
    meaning: "a risky or daring journey or undertaking",
    hindiMeaning: "साहसी प्रयास",
    usage: "They decided to venture into the new market despite the risks.",
  },
  {
    word: "Vocal",
    phonetic: "/ˈvoʊkl/",
    meaning: "expressing opinions or feelings freely",
    hindiMeaning: "स्वर",
    usage: "She was vocal about her disagreement with the decision.",
  },
  {
    word: "Vigorous",
    phonetic: "/ˈvɪɡərəs/",
    meaning: "strong, healthy, and full of energy",
    hindiMeaning: "जोशीला",
    usage: "He engages in vigorous exercise every morning.",
  },
  {
    word: "Validate",
    phonetic: "/ˈvælɪˌdeɪt/",
    meaning: "to confirm or prove the truth of something",
    hindiMeaning: "सत्यापित करना",
    usage: "The data must be validated before the report is submitted.",
  },
  {
    word: "Voracious",
    phonetic: "/vəˈreɪʃəs/",
    meaning: "having a very eager approach to something",
    hindiMeaning: "अत्यधिक भूखा",
    usage: "He has a voracious appetite for books.",
  },
  {
    word: "Vile",
    phonetic: "/vaɪl/",
    meaning: "extremely unpleasant or morally bad",
    hindiMeaning: "घृणित",
    usage: "The villain in the movie was a vile character.",
  },
  {
    word: "Vibration",
    phonetic: "/vaɪˈbreɪʃən/",
    meaning: "a rapid motion back and forth",
    hindiMeaning: "कंपन",
    usage: "The vibration of the machine can be felt from a distance.",
  },
  {
    word: "Virtuous",
    phonetic: "/ˈvɜːrtʃuəs/",
    meaning: "having high moral standards",
    hindiMeaning: "सद्गुणी",
    usage: "She is a virtuous person who always helps others.",
  },
  {
    word: "Vision",
    phonetic: "/ˈvɪʒən/",
    meaning: "the ability to see or the act of seeing",
    hindiMeaning: "दृष्टि",
    usage: "He had a clear vision of what he wanted to achieve.",
  },
  {
    word: "Vibrance",
    phonetic: "/ˈvaɪbrəns/",
    meaning: "full of life and energy",
    hindiMeaning: "जोश",
    usage: "The vibrance of the city makes it an exciting place to live.",
  },
  {
    word: "Verbal",
    phonetic: "/ˈvɜːrbəl/",
    meaning: "relating to words or speech",
    hindiMeaning: "मौखिक",
    usage: "The agreement was made through verbal communication.",
  },
  {
    word: "Vow",
    phonetic: "/vaʊ/",
    meaning: "a solemn promise or assertion",
    hindiMeaning: "वचन",
    usage: "They took a vow to always support each other.",
  },
  {
    word: "Vulnerable",
    phonetic: "/ˈvʌlnərəbl/",
    meaning: "susceptible to harm or damage",
    hindiMeaning: "कमजोर",
    usage: "The elderly are more vulnerable to illnesses.",
  },
  {
    word: "Veil",
    phonetic: "/veɪl/",
    meaning: "a piece of cloth used to cover or conceal",
    hindiMeaning: "पर्दा",
    usage: "The bride wore a beautiful veil over her face.",
  },
  {
    word: "Vocalize",
    phonetic: "/ˈvoʊkəˌlaɪz/",
    meaning: "to express something in words",
    hindiMeaning: "स्वर में कहना",
    usage: "She vocalized her thoughts about the new project.",
  },
  {
    word: "Vibrantly",
    phonetic: "/ˈvaɪbrəntli/",
    meaning: "in a lively or energetic manner",
    hindiMeaning: "जोश से",
    usage: "The flowers bloomed vibrantly in the spring.",
  },
  {
    word: "Vessel",
    phonetic: "/ˈvɛsl/",
    meaning: "a container for holding something",
    hindiMeaning: "संचय",
    usage: "The ship was a large vessel that could carry many goods.",
  },
  {
    word: "Variety",
    phonetic: "/vəˈraɪəti/",
    meaning: "the quality or state of being different or diverse",
    hindiMeaning: "विविधता",
    usage: "There is a wide variety of foods to choose from in the restaurant.",
  },
  {
    word: "Vagabond",
    phonetic: "/ˈvæɡəbɒnd/",
    meaning: "a person who travels from place to place without a fixed home",
    hindiMeaning: "भटका हुआ",
    usage: "He lived as a vagabond, moving from city to city.",
  },
  {
    word: "Valor",
    phonetic: "/ˈvælər/",
    meaning: "great courage in the face of danger",
    hindiMeaning: "वीरता",
    usage: "The soldier showed great valor in battle.",
  },
  {
    word: "Vanity",
    phonetic: "/ˈvænəti/",
    meaning: "excessive pride in one's appearance or achievements",
    hindiMeaning: "आत्ममुग्धता",
    usage: "Her vanity was evident in the way she admired herself.",
  },
  {
    word: "Verifiable",
    phonetic: "/ˌvɛrɪˈfaɪəbl/",
    meaning: "able to be proven true or valid",
    hindiMeaning: "सत्यापनीय",
    usage: "The information provided was verifiable through multiple sources.",
  },
  {
    word: "Vigilant",
    phonetic: "/ˈvɪdʒɪlənt/",
    meaning: "alert and watchful, especially to avoid danger",
    hindiMeaning: "सतर्क",
    usage: "The security guard was vigilant throughout the night.",
  },
  {
    word: "Vex",
    phonetic: "/vɛks/",
    meaning: "to annoy or frustrate",
    hindiMeaning: "चिढ़ाना",
    usage: "The constant noise began to vex him.",
  },
  {
    word: "Vindicate",
    phonetic: "/ˈvɪndɪkeɪt/",
    meaning: "to clear someone of blame or suspicion",
    hindiMeaning: "साफ़ करना",
    usage: "The evidence vindicated his innocence.",
  },
  {
    word: "Viral",
    phonetic: "/ˈvaɪrəl/",
    meaning: "rapidly spreading or popular, especially online",
    hindiMeaning: "वायरल",
    usage: "The video went viral and was shared by millions of people.",
  },
  {
    word: "Vigorous",
    phonetic: "/ˈvɪɡərəs/",
    meaning: "done with force and energy",
    hindiMeaning: "जोशीला",
    usage: "The team performed a vigorous workout session.",
  },
  {
    word: "Vastly",
    phonetic: "/ˈvæstli/",
    meaning: "to a very great extent",
    hindiMeaning: "अत्यधिक",
    usage: "The situation has vastly improved over the past year.",
  },
  {
    word: "Virtually",
    phonetic: "/ˈvɜːtʃuəli/",
    meaning: "nearly or almost entirely",
    hindiMeaning: "व्यावहारिक रूप से",
    usage: "Virtually everyone agreed on the new policy.",
  },
  {
    word: "Vine",
    phonetic: "/vaɪn/",
    meaning: "a plant that produces grapes",
    hindiMeaning: "लता",
    usage: "The grapes grew on the vine in the garden.",
  },

  {
    word: "Wage",
    phonetic: "/weɪdʒ/",
    meaning:
      "a fixed regular payment, typically paid on a daily or weekly basis",
    hindiMeaning: "वेतन",
    usage: "She received a weekly wage for her work at the store.",
  },
  {
    word: "Wander",
    phonetic: "/ˈwɒndər/",
    meaning: "to move about without a fixed course, aim, or purpose",
    hindiMeaning: "भटकना",
    usage: "He wandered through the streets, looking for a place to eat.",
  },
  {
    word: "Warrant",
    phonetic: "/ˈwɔːrənt/",
    meaning:
      "a legal document authorizing the police to make an arrest, search, etc.",
    hindiMeaning: "वॉरंट",
    usage: "The police obtained a warrant to search the house.",
  },
  {
    word: "Wary",
    phonetic: "/ˈwɛəri/",
    meaning: "feeling or showing caution about possible dangers or problems",
    hindiMeaning: "सतर्क",
    usage: "She was wary of strangers approaching her in the park.",
  },
  {
    word: "Wage",
    phonetic: "/weɪdʒ/",
    meaning: "to carry on or engage in (a war or campaign)",
    hindiMeaning: "युद्ध करना",
    usage: "The country decided to wage war against its neighbor.",
  },
  {
    word: "Wealth",
    phonetic: "/wɛlθ/",
    meaning: "an abundance of valuable possessions or money",
    hindiMeaning: "धन",
    usage: "He accumulated great wealth over the course of his career.",
  },
  {
    word: "Widespread",
    phonetic: "/ˈwaɪdˌsprɛd/",
    meaning: "found or distributed over a large area or among many people",
    hindiMeaning: "व्यापक",
    usage: "There was widespread support for the new law.",
  },
  {
    word: "Wholesome",
    phonetic: "/ˈhoʊlsəm/",
    meaning:
      "conducive to or suggestive of good health and physical well-being",
    hindiMeaning: "स्वस्थ",
    usage: "They prefer wholesome foods to processed ones.",
  },
  {
    word: "Warrant",
    phonetic: "/ˈwɔːrənt/",
    meaning:
      "a legal document authorizing the police to make an arrest, search, etc.",
    hindiMeaning: "वॉरंट",
    usage: "The judge issued a warrant for the suspect's arrest.",
  },
  {
    word: "Wit",
    phonetic: "/wɪt/",
    meaning: "mental sharpness and inventiveness",
    hindiMeaning: "चतुराई",
    usage: "Her wit made her a favorite at social gatherings.",
  },
  {
    word: "Wield",
    phonetic: "/wiːld/",
    meaning: "to hold and use (a weapon or tool)",
    hindiMeaning: "वापस लेना",
    usage: "He wielded a sword with great skill.",
  },
  {
    word: "Worry",
    phonetic: "/ˈwʌri/",
    meaning: "to feel anxious or concerned about something",
    hindiMeaning: "चिंता",
    usage: "I always worry about my exams before they start.",
  },
  {
    word: "Whisper",
    phonetic: "/ˈwɪspər/",
    meaning:
      "to speak very softly using one's breath without one's vocal cords",
    hindiMeaning: "फुसफुसाना",
    usage: "She whispered a secret into his ear.",
  },
  {
    word: "Worthy",
    phonetic: "/ˈwɜːrði/",
    meaning: "deserving effort, attention, or respect",
    hindiMeaning: "योग्य",
    usage: "He is a worthy candidate for the position.",
  },
  {
    word: "Withdraw",
    phonetic: "/wɪðˈdrɔː/",
    meaning: "to remove or take away something",
    hindiMeaning: "निकालना",
    usage: "He decided to withdraw from the competition.",
  },
  {
    word: "Wonder",
    phonetic: "/ˈwʌndər/",
    meaning:
      "a feeling of amazement and admiration, caused by something beautiful, remarkable, or unfamiliar",
    hindiMeaning: "आश्चर्य",
    usage: "She gazed at the stars in wonder.",
  },
  {
    word: "Withstand",
    phonetic: "/wɪðˈstænd/",
    meaning: "to remain undamaged or unaffected by",
    hindiMeaning: "सहन करना",
    usage: "The building was designed to withstand earthquakes.",
  },
  {
    word: "Wipe",
    phonetic: "/waɪp/",
    meaning: "to clean or dry something by rubbing it",
    hindiMeaning: "पोंछना",
    usage: "She wiped the table after dinner.",
  },
  {
    word: "Whim",
    phonetic: "/wɪm/",
    meaning:
      "a sudden desire or change of mind, especially one that is unusual or unexplained",
    hindiMeaning: "मनमर्जी",
    usage: "He went on a whim and bought a new car.",
  },
  {
    word: "Widen",
    phonetic: "/ˈwaɪdn/",
    meaning: "to make or become wider",
    hindiMeaning: "चौड़ा करना",
    usage: "They decided to widen the road for more traffic.",
  },
  {
    word: "Wander",
    phonetic: "/ˈwɒndər/",
    meaning: "to move aimlessly from place to place",
    hindiMeaning: "भटकना",
    usage: "They wandered through the market looking for souvenirs.",
  },
  {
    word: "Willing",
    phonetic: "/ˈwɪlɪŋ/",
    meaning: "ready, eager, or prepared to do something",
    hindiMeaning: "इच्छुक",
    usage: "She was willing to help anyone in need.",
  },
  {
    word: "Whisk",
    phonetic: "/wɪsk/",
    meaning: "to beat or stir something quickly",
    hindiMeaning: "फेंटना",
    usage: "She whisked the eggs before pouring them into the pan.",
  },
  {
    word: "Warmth",
    phonetic: "/wɔːrmθ/",
    meaning: "the state of being warm, a moderate heat",
    hindiMeaning: "गर्माहट",
    usage: "He enjoyed the warmth of the sun on his face.",
  },
  {
    word: "Wear",
    phonetic: "/wɛər/",
    meaning: "to have something on one's body as clothing",
    hindiMeaning: "पहना",
    usage: "She likes to wear casual clothes on weekends.",
  },
  {
    word: "Wreck",
    phonetic: "/rɛk/",
    meaning: "to destroy or severely damage something",
    hindiMeaning: "विनाश",
    usage: "The storm wrecked the house and left it in ruins.",
  },
  {
    word: "Wane",
    phonetic: "/weɪn/",
    meaning: "to decrease or diminish in size or strength",
    hindiMeaning: "कम होना",
    usage: "The moon began to wane as the night went on.",
  },
  {
    word: "Wave",
    phonetic: "/weɪv/",
    meaning: "to move one's hand to and fro in greeting or as a signal",
    hindiMeaning: "लहर",
    usage: "She waved at her friends as they left the party.",
  },
  {
    word: "Wrist",
    phonetic: "/rɪst/",
    meaning: "the joint connecting the hand to the forearm",
    hindiMeaning: "कलाई",
    usage: "She wore a beautiful bracelet around her wrist.",
  },
  {
    word: "Wretched",
    phonetic: "/ˈrɛtʃɪd/",
    meaning: "in a very unhappy or unfortunate state",
    hindiMeaning: "दुर्भाग्यपूर्ण",
    usage: "He felt wretched after hearing the bad news.",
  },
  {
    word: "Widening",
    phonetic: "/ˈwaɪdənɪŋ/",
    meaning: "the process of making something wider",
    hindiMeaning: "चौड़ा करना",
    usage: "The widening of the highway will reduce traffic jams.",
  },
  {
    word: "Wrath",
    phonetic: "/ræθ/",
    meaning: "extreme anger",
    hindiMeaning: "क्रोध",
    usage: "His wrath was evident when he found out about the mistake.",
  },
  {
    word: "Writhe",
    phonetic: "/raɪð/",
    meaning: "to twist or contort the body, usually in pain",
    hindiMeaning: "लड़खड़ाना",
    usage: "He writhed in pain after stepping on a nail.",
  },
  {
    word: "Wistful",
    phonetic: "/ˈwɪstfəl/",
    meaning: "longing or yearning for something that may never return",
    hindiMeaning: "उदास",
    usage:
      "She had a wistful expression as she looked at her old childhood home.",
  },
  {
    word: "Whack",
    phonetic: "/wæk/",
    meaning: "to strike something with a sharp blow",
    hindiMeaning: "मारना",
    usage: "He whacked the ball with a bat.",
  },
  {
    word: "Warranted",
    phonetic: "/ˈwɔːrəntɪd/",
    meaning: "justified or authorized",
    hindiMeaning: "जवाबदेह",
    usage: "The suspicion was warranted based on the evidence.",
  },
  {
    word: "Wholesome",
    phonetic: "/ˈhoʊlsəm/",
    meaning: "promoting good health or moral well-being",
    hindiMeaning: "स्वस्थ",
    usage: "They served wholesome meals at the retreat.",
  },
  {
    word: "Widow",
    phonetic: "/ˈwɪdəʊ/",
    meaning: "a woman whose husband has died",
    hindiMeaning: "विधवा",
    usage: "She became a widow after her husband's death.",
  },
  {
    word: "Wrench",
    phonetic: "/rɛntʃ/",
    meaning: "to pull or twist something suddenly and violently",
    hindiMeaning: "मरोड़ना",
    usage: "He wrenched his arm free from the grip.",
  },
  {
    word: "Wheel",
    phonetic: "/wiːl/",
    meaning: "a circular object that revolves around a central axis",
    hindiMeaning: "पहिया",
    usage: "The car's wheel was damaged after hitting the pothole.",
  },

  {
    word: "Xenon",
    phonetic: "/ˈzɛnɒn/",
    meaning: "a chemical element, a colorless, dense, odorless gas",
    hindiMeaning: "ज़ेनॉन (रासायनिक तत्व)",
    usage: "Xenon is used in high-performance lamps.",
  },
  {
    word: "Xenophobia",
    phonetic: "/ˌzɛnəˈfoʊbiə/",
    meaning: "fear or dislike of strangers or foreigners",
    hindiMeaning: "विदेशियों या अजनबियों से डर",
    usage: "Xenophobia has led to tensions between the communities.",
  },
  {
    word: "X-ray",
    phonetic: "/ˈɛksˌreɪ/",
    meaning: "a type of radiation used in medical imaging",
    hindiMeaning: "एक्स-रे",
    usage: "The doctor recommended an X-ray to check for any fractures.",
  },
  {
    word: "Xylophone",
    phonetic: "/ˈzaɪləˌfoʊn/",
    meaning:
      "a musical instrument consisting of a series of wooden bars struck by mallets",
    hindiMeaning: "साइलोफोन (संगीत वाद्ययंत्र)",
    usage: "The child played the xylophone at the music recital.",
  },
  {
    word: "Xenial",
    phonetic: "/ˈzɛniəl/",
    meaning:
      "of or relating to hospitality or the relationship between a host and guest",
    hindiMeaning: "अतिथि-सत्कार से संबंधित",
    usage: "Their xenial behavior made the guests feel welcome.",
  },
  {
    word: "Xerox",
    phonetic: "/ˈzɪərɒks/",
    meaning: "a brand name for a photocopy machine",
    hindiMeaning: "फोटोकॉपी मशीन (ब्रांड नाम)",
    usage: "She made a Xerox of the document for the meeting.",
  },
  {
    word: "Xenogenesis",
    phonetic: "/ˌzɛnəˈdʒɛnɪsɪs/",
    meaning: "the production of offspring different from the parent organism",
    hindiMeaning: "विदेशी उत्पत्ति",
    usage:
      "Xenogenesis refers to the theory of organisms producing offspring unlike themselves.",
  },
  {
    word: "Xylitol",
    phonetic: "/ˈzaɪlɪtɒl/",
    meaning: "a sugar alcohol used as a sweetener",
    hindiMeaning: "एक प्रकार की शक्कर",
    usage: "Xylitol is often used in sugar-free chewing gum.",
  },
  {
    word: "Xylograph",
    phonetic: "/ˈzaɪləˌɡræf/",
    meaning: "an engraving on wood",
    hindiMeaning: "लकड़ी की नक्काशी",
    usage: "The artist created a beautiful xylograph on the wooden panel.",
  },
  {
    word: "Xenodocheionology",
    phonetic: "/ˌzɛnəˌdɒkiːəˈnɒlədʒi/",
    meaning: "the study of hotels and inns",
    hindiMeaning: "होटल और इन के अध्ययन",
    usage:
      "Xenodocheionology examines how hospitality and accommodation services have evolved.",
  },
  {
    word: "Xylocarp",
    phonetic: "/ˈzaɪləˌkɑːrp/",
    meaning: "a fruit with a hard, woody outer shell",
    hindiMeaning: "कठोर फल",
    usage: "The coconut is a type of xylocarp.",
  },
  {
    word: "Xenolith",
    phonetic: "/ˈzɛnəˌlɪθ/",
    meaning: "a rock fragment embedded in another type of rock",
    hindiMeaning: "एक चट्टान का टुकड़ा जो अन्य चट्टान में शामिल होता है",
    usage: "Xenoliths are important for studying the earth's crust.",
  },
  {
    word: "Xenotype",
    phonetic: "/ˈzɛnəˌtaɪp/",
    meaning:
      "an organism having a phenotype influenced by foreign genetic material",
    hindiMeaning: "विदेशी आनुवंशिक पदार्थ से प्रभावित जीव",
    usage: "A xenotype might exhibit traits from other species.",
  },
  {
    word: "Xerophyte",
    phonetic: "/ˈzɪərəʊˌfaɪt/",
    meaning: "a plant adapted to survive in dry conditions",
    hindiMeaning: "सूखा सहन करने वाला पौधा",
    usage: "Cacti are xerophytes, able to survive in arid environments.",
  },
  {
    word: "Xenotransplant",
    phonetic: "/ˈzɛnəˌtrænsplænt/",
    meaning:
      "the process of transplanting organs or tissues from one species to another",
    hindiMeaning: "विदेशी अंग प्रत्यारोपण",
    usage: "Xenotransplants are controversial due to ethical concerns.",
  },
  {
    word: "Xenotext",
    phonetic: "/ˈzɛnəˌtɛkst/",
    meaning: "a text containing foreign or imported material",
    hindiMeaning: "विदेशी सामग्री वाला पाठ",
    usage:
      "The novel included xenotext, drawing on literature from different cultures.",
  },
  {
    word: "Xiphoid",
    phonetic: "/ˈzɪfɔɪd/",
    meaning:
      "relating to a sword-like shape, often referring to the xiphoid process in the human body",
    hindiMeaning: "तलवार जैसा",
    usage: "The xiphoid process is located at the end of the sternum.",
  },
  {
    word: "Xenodochium",
    phonetic: "/ˌzɛnəˈdɒkɪəm/",
    meaning: "a guest chamber in an ancient or medieval monastery",
    hindiMeaning: "प्राचीन मठ में अतिथि कक्ष",
    usage: "The monks welcomed travelers in the xenodochium.",
  },
  {
    word: "Xenotrophic",
    phonetic: "/ˈzɛnəˌtrɒfɪk/",
    meaning: "organisms that require foreign tissues for nutrition",
    hindiMeaning: "विदेशी ऊतक से पोषण प्राप्त करने वाला",
    usage: "Xenotrophic bacteria depend on foreign organisms for nutrients.",
  },
  {
    word: "Xylography",
    phonetic: "/ˈzaɪlɒˌɡræfi/",
    meaning: "the art of engraving on wood",
    hindiMeaning: "लकड़ी पर नक्काशी करने की कला",
    usage: "Xylography was a popular form of art in ancient cultures.",
  },
  {
    word: "Xenogenic",
    phonetic: "/ˌzɛnəʊˈdʒɛnɪk/",
    meaning: "originating from a foreign species",
    hindiMeaning: "विदेशी प्रजाति से उत्पन्न",
    usage: "Xenogenic cells are often used in biological research.",
  },
  {
    word: "Xeroxing",
    phonetic: "/ˈzɪərɒksɪŋ/",
    meaning: "the act of copying documents using a Xerox machine",
    hindiMeaning: "फोटोकॉपी करना",
    usage: "I spent the afternoon xeroxing all the important files.",
  },
  {
    word: "Xenotaxis",
    phonetic: "/ˈzɛnəˌtæksɪs/",
    meaning:
      "the movement of organisms towards or away from foreign substances",
    hindiMeaning: "विदेशी पदार्थ की ओर या दूर की ओर गति",
    usage: "The study of xenotaxis can help in understanding animal behavior.",
  },
  {
    word: "Xenocentric",
    phonetic: "/ˌzɛnəˈsɛntrɪk/",
    meaning:
      "preferring the values or practices of another culture over one's own",
    hindiMeaning: "विदेशी संस्कृति को प्राथमिकता देना",
    usage: "Xenocentric people may idealize foreign ways of life.",
  },
  {
    word: "Xylophilous",
    phonetic: "/ˌzaɪləˈfɪləs/",
    meaning: "attracted to or living on wood",
    hindiMeaning: "लकड़ी पर रहने वाला",
    usage: "Xylophilous fungi thrive on decaying wood.",
  },
  {
    word: "Xenogeny",
    phonetic: "/ˌzɛnəˈdʒɛni/",
    meaning: "the origin of life from foreign substances",
    hindiMeaning: "विदेशी पदार्थ से जीवन का उत्पत्ति",
    usage:
      "Xenogeny explores the hypothesis of extraterrestrial origins of life.",
  },
  {
    word: "Xenograph",
    phonetic: "/ˈzɛnəʊˌɡræf/",
    meaning: "a foreign inscription or written record",
    hindiMeaning: "विदेशी शिलालेख",
    usage: "The archaeologists discovered an ancient xenograph on the ruins.",
  },
  {
    word: "Xanthophyll",
    phonetic: "/ˈzanθəfɪl/",
    meaning: "a yellow pigment found in plants",
    hindiMeaning: "एक पीला रंग द्रव्य",
    usage: "Xanthophyll gives leaves their yellow color during autumn.",
  },
  {
    word: "Xenon",
    phonetic: "/ˈzɛnɒn/",
    meaning: "a rare, colorless, and dense noble gas",
    hindiMeaning: "ज़ेनॉन (रासायनिक तत्व)",
    usage: "Xenon is used in certain types of lamps and lasers.",
  },

  {
    word: "Yacht",
    phonetic: "/jɒt/",
    meaning: "a medium-sized sailboat, typically used for racing or pleasure",
    hindiMeaning: "याच (प्रकार का जहाज)",
    usage: "They sailed around the island in their luxurious yacht.",
  },
  {
    word: "Yarn",
    phonetic: "/jɑːrn/",
    meaning:
      "a continuous strand of twisted fibers, used for knitting or weaving",
    hindiMeaning: "सूत्र",
    usage: "She knitted a sweater using soft wool yarn.",
  },
  {
    word: "Yearn",
    phonetic: "/jɜːrn/",
    meaning: "to have a strong desire or longing for something",
    hindiMeaning: "लालसा करना",
    usage: "He yearned for a peaceful life away from the city.",
  },
  {
    word: "Yawn",
    phonetic: "/jɔːn/",
    meaning:
      "to open the mouth wide and inhale deeply, typically out of tiredness",
    hindiMeaning: "ज्यादा थक जाने से मुँह खोलकर गहरी सांस लेना",
    usage: "She yawned repeatedly during the long lecture.",
  },
  {
    word: "Yell",
    phonetic: "/jɛl/",
    meaning: "to shout loudly, typically to get attention or express anger",
    hindiMeaning: "चिल्लाना",
    usage: "He yelled for help when he saw the fire.",
  },
  {
    word: "Yellow",
    phonetic: "/ˈjɛləʊ/",
    meaning: "a color, typically bright and cheerful",
    hindiMeaning: "पीला",
    usage: "The walls of the room were painted a soft yellow.",
  },
  {
    word: "Yelp",
    phonetic: "/jɛlp/",
    meaning: "to give a short, sharp cry, often out of pain or surprise",
    hindiMeaning: "कुंआन (अकस्मात दर्द से)",
    usage: "The dog yelped when it stepped on a thorn.",
  },
  {
    word: "Yolk",
    phonetic: "/joʊlk/",
    meaning: "the yellow part of an egg, which is rich in nutrients",
    hindiMeaning: "अंडे की जर्दी",
    usage: "The yolk of the egg is a good source of protein.",
  },
  {
    word: "Youth",
    phonetic: "/juːθ/",
    meaning:
      "the period of life when a person is young, often referring to adolescence",
    hindiMeaning: "युवावस्था",
    usage:
      "He spent his youth traveling the world and experiencing new cultures.",
  },
  {
    word: "Yucky",
    phonetic: "/ˈjʌki/",
    meaning: "something unpleasant or distasteful",
    hindiMeaning: "गंदा",
    usage: "The spoiled food smelled yucky and was thrown away.",
  },
  {
    word: "Yellows",
    phonetic: "/ˈjɛləʊz/",
    meaning: "a medical term for jaundice, a yellowing of the skin",
    hindiMeaning: "पीलिया",
    usage: "The doctor diagnosed the patient with the yellows.",
  },
  {
    word: "Yesteryear",
    phonetic: "/ˈjɛstərɪɪr/",
    meaning: "the past, especially the time before the present",
    hindiMeaning: "बीता समय",
    usage:
      "Yesteryear's technology seems primitive compared to today’s advancements.",
  },
  {
    word: "Yogurt",
    phonetic: "/ˈjoʊɡərt/",
    meaning: "a thick dairy product made by fermenting milk with bacteria",
    hindiMeaning: "दही",
    usage: "He likes to eat yogurt with fruits for breakfast.",
  },
  {
    word: "Yoke",
    phonetic: "/joʊk/",
    meaning:
      "a wooden crosspiece that is fastened over the necks of two animals to pull a cart",
    hindiMeaning: "जुए",
    usage: "The oxen were yoked together to pull the plow.",
  },
  {
    word: "Yonder",
    phonetic: "/ˈjɒndər/",
    meaning: "a literary term meaning at or in that place, over there",
    hindiMeaning: "वहां",
    usage: "They live yonder, across the river.",
  },
  {
    word: "Yarn",
    phonetic: "/jɑːrn/",
    meaning: "a tale or narrative, often a fictional story",
    hindiMeaning: "कहानी",
    usage: "He spun a yarn about his adventure in the mountains.",
  },
  {
    word: "Yanking",
    phonetic: "/jæŋkɪŋ/",
    meaning: "pulling something with a sudden sharp movement",
    hindiMeaning: "झटके से खींचना",
    usage: "He was yanking the door open when it got stuck.",
  },
  {
    word: "Yip",
    phonetic: "/jɪp/",
    meaning: "a small, sharp bark or cry, often from a small dog",
    hindiMeaning: "कुत्ते का तेज़ बarks",
    usage: "The dog let out a yip when it saw the squirrel.",
  },
  {
    word: "Yoke",
    phonetic: "/joʊk/",
    meaning: "to join or link together, like a pair of animals in harness",
    hindiMeaning: "जोड़ना",
    usage: "The farmers yoked the horses to plow the field.",
  },
  {
    word: "Yelping",
    phonetic: "/ˈjɛlpɪŋ/",
    meaning: "crying out in pain or excitement",
    hindiMeaning: "चिल्लाना",
    usage: "The puppy kept yelping as it ran around the yard.",
  },
  {
    word: "Yeast",
    phonetic: "/jiːst/",
    meaning: "a type of fungus used in baking and brewing",
    hindiMeaning: "खमीर",
    usage: "The baker added yeast to the dough to make it rise.",
  },
  {
    word: "Yikes",
    phonetic: "/jaɪks/",
    meaning: "an exclamation of surprise or fear",
    hindiMeaning: "अरे बाप रे",
    usage: "Yikes! That was a close call!",
  },
  {
    word: "Yarned",
    phonetic: "/jɑːrnd/",
    meaning: "to tell a long and often imaginative story",
    hindiMeaning: "लंबी कहानी सुनाना",
    usage: "He yarned about his travels for hours.",
  },
  {
    word: "Yelps",
    phonetic: "/jɛlps/",
    meaning: "small cries or barks, typically from pain or alarm",
    hindiMeaning: "कुंआना",
    usage: "The puppy yelps when it is frightened.",
  },
  {
    word: "Yoghurt",
    phonetic: "/ˈjoʊɡərt/",
    meaning: "a creamy dairy product, made by fermenting milk",
    hindiMeaning: "दही",
    usage: "I had some yoghurt with honey for breakfast.",
  },
  {
    word: "Yowling",
    phonetic: "/ˈjaʊlɪŋ/",
    meaning: "a loud, mournful cry, typically from a cat",
    hindiMeaning: "कैट का चीखना",
    usage: "The cat was yowling outside my window all night.",
  },
  {
    word: "Yellowish",
    phonetic: "/ˈjɛləʊɪʃ/",
    meaning: "slightly yellow in color",
    hindiMeaning: "पीले रंग का",
    usage: "The leaves turned yellowish as the autumn approached.",
  },
  {
    word: "Yuppie",
    phonetic: "/ˈjʌpi/",
    meaning: "a young urban professional",
    hindiMeaning: "युवा शहरी पेशेवर",
    usage:
      "Yuppies are often seen as a symbol of the booming economy in big cities.",
  },
  {
    word: "Yen",
    phonetic: "/jɛn/",
    meaning: "a strong desire or craving",
    hindiMeaning: "इच्छा",
    usage: "She had a yen for chocolate and couldn't resist.",
  },
  {
    word: "Yaks",
    phonetic: "/jæks/",
    meaning: "large domesticated wild oxen found in the Himalayan region",
    hindiMeaning: "याक (हिमालयी बकरियां)",
    usage: "Yaks are used as pack animals in the Himalayas.",
  },
  {
    word: "Yellowtail",
    phonetic: "/ˈjɛləʊteɪl/",
    meaning: "a type of fish, often found in oceans",
    hindiMeaning: "पीली पूंछ वाली मछली",
    usage: "We caught some yellowtail fish on our fishing trip.",
  },
  {
    word: "Yes",
    phonetic: "/jɛs/",
    meaning: "an affirmative response",
    hindiMeaning: "हाँ",
    usage: "She nodded and said 'yes' when asked if she wanted to go.",
  },
  {
    word: "Yogis",
    phonetic: "/ˈjoʊɡɪz/",
    meaning: "practitioners of yoga",
    hindiMeaning: "योगी",
    usage: "Yogis spend years perfecting their physical and mental discipline.",
  },
  {
    word: "Yachting",
    phonetic: "/ˈjɒtɪŋ/",
    meaning: "the sport or activity of sailing in yachts",
    hindiMeaning: "याचिंग (याच में सवारी करना)",
    usage: "They spent the weekend yachting along the coast.",
  },
  {
    word: "Yule",
    phonetic: "/juːl/",
    meaning: "the Christmas season",
    hindiMeaning: "क्रिसमस का मौसम",
    usage: "They exchanged gifts during the Yule season.",
  },

  {
    word: "Zebra",
    phonetic: "/ˈzɛbrə/",
    meaning: "a wild animal with black and white stripes, native to Africa",
    hindiMeaning: "ज़ेब्रा (सफ़ेद और काले धारियों वाला जानवर)",
    usage: "The zoo had a beautiful zebra in the new African safari section.",
  },
  {
    word: "Zero",
    phonetic: "/ˈzɪəroʊ/",
    meaning: "the numerical value of nothing",
    hindiMeaning: "शून्य",
    usage: "The temperature dropped to zero degrees last night.",
  },
  {
    word: "Zenith",
    phonetic: "/ˈzɛnɪθ/",
    meaning: "the highest point or peak",
    hindiMeaning: "आसमानी उच्चतम बिंदु",
    usage: "At the zenith of his career, he received numerous awards.",
  },
  {
    word: "Zephyr",
    phonetic: "/ˈzɛfər/",
    meaning: "a gentle, mild breeze",
    hindiMeaning: "मुलायम हवा",
    usage: "A cool zephyr blew through the open window.",
  },
  {
    word: "Zinc",
    phonetic: "/zɪŋk/",
    meaning: "a metallic element used in batteries and for galvanizing iron",
    hindiMeaning: "जिंक (धातु)",
    usage: "Zinc is often used in the production of batteries.",
  },
  {
    word: "Zipper",
    phonetic: "/ˈzɪpər/",
    meaning: "a fastening device used in clothing or bags",
    hindiMeaning: "जिप (कपड़े या बैग में लगने वाली पट्टी)",
    usage: "She closed the zipper of her jacket tightly to keep warm.",
  },
  {
    word: "Zombie",
    phonetic: "/ˈzɒmbi/",
    meaning: "a fictional undead being often depicted in horror films",
    hindiMeaning: "जॉम्बी (मृत, फिर से जीवित हुआ व्यक्ति)",
    usage: "The movie had terrifying zombies roaming the streets.",
  },
  {
    word: "Zoology",
    phonetic: "/zoʊˈɒlədʒi/",
    meaning: "the scientific study of animals",
    hindiMeaning: "प्राणीविज्ञान",
    usage: "She decided to pursue a degree in zoology after studying animals.",
  },
  {
    word: "Zucchini",
    phonetic: "/zuːˈkiːni/",
    meaning: "a type of summer squash with tender green skin",
    hindiMeaning: "ज़ुकीनी (एक प्रकार की सब्जी)",
    usage: "She added zucchini to the stir-fry for extra flavor.",
  },
  {
    word: "Zip",
    phonetic: "/zɪp/",
    meaning: "to fasten with a zipper",
    hindiMeaning: "जिप लगाना",
    usage: "He quickly zipped up his coat as the cold wind blew.",
  },
  {
    word: "Zany",
    phonetic: "/ˈzeɪni/",
    meaning: "amusingly unconventional or strange",
    hindiMeaning: "अजीब और मजेदार",
    usage: "The comedian's zany antics had the audience laughing.",
  },
  {
    word: "Zeal",
    phonetic: "/ziːl/",
    meaning: "great energy or enthusiasm in pursuit of a cause",
    hindiMeaning: "उत्साह",
    usage: "She worked with great zeal to complete the project on time.",
  },
  {
    word: "Zigzag",
    phonetic: "/ˈzɪɡzæɡ/",
    meaning: "a pattern of sharp turns or angles",
    hindiMeaning: "ज़िगज़ैग",
    usage: "The path to the top of the hill was a zigzag trail.",
  },
  {
    word: "Zippered",
    phonetic: "/ˈzɪpərd/",
    meaning: "having a zipper fastener",
    hindiMeaning: "जिपर वाला",
    usage: "The jacket had a zippered pocket for easy access.",
  },
  {
    word: "Zodiac",
    phonetic: "/ˈzoʊdiæk/",
    meaning: "an imaginary belt in the sky containing the paths of the planets",
    hindiMeaning: "राशिचक्र",
    usage:
      "According to the zodiac, today's horoscope is favorable for travel.",
  },
  {
    word: "Zoom",
    phonetic: "/zuːm/",
    meaning: "to move or travel quickly",
    hindiMeaning: "तेज गति से जाना",
    usage: "The car zoomed past me on the highway.",
  },
  {
    word: "Zoologist",
    phonetic: "/zoʊˈɒlədʒɪst/",
    meaning: "a scientist who studies animals",
    hindiMeaning: "प्राणीविज्ञानी",
    usage: "The zoologist observed the behavior of wild tigers in the forest.",
  },
  {
    word: "Zoning",
    phonetic: "/ˈzoʊnɪŋ/",
    meaning: "the system of dividing land into zones for different uses",
    hindiMeaning: "क्षेत्र विभाजन",
    usage: "The city council is discussing new zoning regulations for housing.",
  },
  {
    word: "Zest",
    phonetic: "/zɛst/",
    meaning: "great enthusiasm or energy",
    hindiMeaning: "उत्साह",
    usage: "She worked with zest, eager to complete her tasks.",
  },
  {
    word: "Zinc",
    phonetic: "/zɪŋk/",
    meaning:
      "a bluish-white metallic element used in various industrial applications",
    hindiMeaning: "जिंक",
    usage:
      "Zinc is an essential metal used in the making of batteries and alloyed with other metals.",
  },
  {
    word: "Ziggurat",
    phonetic: "/ˈzɪɡʊræt/",
    meaning: "a rectangular stepped tower, often part of a temple complex",
    hindiMeaning: "ज़िगगुरात (प्राचीन मेसोपोटामिया के मंदिरों का प्रकार)",
    usage: "The ziggurat stood tall in the ancient city of Ur.",
  },
  {
    word: "Zoologically",
    phonetic: "/zoʊˈɒlədʒɪkli/",
    meaning: "in a manner relating to zoology or the study of animals",
    hindiMeaning: "प्राणीविज्ञान से संबंधित रूप में",
    usage: "Zoologically speaking, the cheetah is the fastest land animal.",
  },
  {
    word: "Zipped",
    phonetic: "/zɪpt/",
    meaning: "fastened with a zipper",
    hindiMeaning: "जिप लगाना",
    usage: "She zipped up her jacket to protect herself from the cold.",
  },
  {
    word: "Zucchini",
    phonetic: "/zuːˈkiːni/",
    meaning: "a type of vegetable also known as courgette",
    hindiMeaning: "ज़ुकीनी (एक प्रकार की सब्जी)",
    usage: "He made a zucchini soup for dinner last night.",
  },
  {
    word: "Zoologist",
    phonetic: "/zoʊˈɒlədʒɪst/",
    meaning: "a person who studies animals",
    hindiMeaning: "प्राणीविज्ञानी",
    usage: "The zoologist examined the behavior of the endangered species.",
  },
  {
    word: "Zombify",
    phonetic: "/ˈzɒmbɪfaɪ/",
    meaning: "to turn into a zombie or make something lifeless",
    hindiMeaning: "जॉम्बी जैसा बना देना",
    usage: "The movie showed a virus that could zombify humans.",
  },
  {
    word: "Zapping",
    phonetic: "/ˈzæpɪŋ/",
    meaning: "to destroy or eliminate quickly",
    hindiMeaning: "नष्ट करना",
    usage: "He spent the day zapping bugs with the insecticide.",
  },
  {
    word: "Zonal",
    phonetic: "/ˈzoʊnəl/",
    meaning: "relating to or divided into zones",
    hindiMeaning: "क्षेत्रीय",
    usage: "The city is divided into zonal areas for different purposes.",
  },
  {
    word: "Zygote",
    phonetic: "/ˈzaɪɡoʊt/",
    meaning: "a fertilized egg cell",
    hindiMeaning: "जायगोट (प्रजनन कोशिका)",
    usage: "The zygote divides and forms the early stages of an embryo.",
  },
  {
    word: "Zebrawood",
    phonetic: "/ˈzɛbrəwʊd/",
    meaning: "a type of wood known for its striped appearance",
    hindiMeaning: "ज़ेब्रावुड",
    usage:
      "Zebrawood is often used in the making of furniture and decorative items.",
  },
  {
    word: "Zephyrian",
    phonetic: "/zɛfɪriən/",
    meaning: "relating to or characteristic of a gentle breeze",
    hindiMeaning: "मुलायम हवाओं से संबंधित",
    usage: "The zephyrian winds blew gently across the beach.",
  },
  {
    word: "Zoology",
    phonetic: "/zoʊˈɒlədʒi/",
    meaning: "the study of animals and animal behavior",
    hindiMeaning: "प्राणीविज्ञान",
    usage:
      "She decided to major in zoology because of her interest in marine life.",
  },
  {
    word: "Zymology",
    phonetic: "/zaɪˈmɒlədʒi/",
    meaning: "the scientific study of fermentation",
    hindiMeaning: "किण्वन विज्ञान",
    usage: "Zymology is important in brewing and winemaking.",
  },
];
function home() {
  let homeMainDivObj = document.getElementById("home_Main_Div");
  if (homeMainDivObj) homeMainDivObj.style.display = "block";

  let dicMainDivObj = document.getElementById("dic_Main_Div");
  if (dicMainDivObj) dicMainDivObj.style.display = "none";

  let transMainDivObj = document.getElementById("trans_Main_Div");
  if (transMainDivObj) transMainDivObj.style.display = "none";

  let helpMainDivobj = document.getElementById("help_Main_div");
  if (helpMainDivobj) helpMainDivobj.style.display = "none";

  let conMainDiv = document.getElementById("con_Main_div");
  if (conMainDiv) conMainDiv.style.display = "none";

  if (isHomeLoaded) return;
  isHomeLoaded = true;

  let mainDiv = document.getElementById("main");

  let homeDiv = document.createElement("div");
  homeDiv.setAttribute("id", "home_Main_Div");

  let ran_word = document.createElement("div");
  ran_word.setAttribute(
    "style",
    "align-items: center;justify-content: center; display: flex; flex-direction: column;"
  );

  let ranWord = document.createElement("div");
  ranWord.setAttribute(
    "style",
    "margin-top:10px;height:auto;width:100%;gap:30px;"
  );

  let titileDiv = document.createElement("div");
  titileDiv.setAttribute(
    "style",
    "align-items: center;margin-top:200px;justify-content: center;  display: flex; margin-bottom:150px; flex-direction: column;"
  );
  let title = document.createElement("h1");
  title.innerHTML = `Welcome to My Dictionary App <br> Word of the Day `;
  title.setAttribute(
    "style",
    "justify-items: center;font-size: 2rem;  text-align: center; font-weight: bold; "
  );
  titileDiv.appendChild(title);
  ran_word.appendChild(titileDiv);

  let displayDiv = document.createElement("div");
  displayDiv.setAttribute(
    "style",
    "margin-left:auto; margin-right:auto; display: flex; align-items: center; justify-content: center; flex-wrap: wrap;width:100%; gap:30px; padding: 10px;"
  );

  // Loop through and create word cards dynamically
  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * wordsArray.length);
    let words = wordsArray[randomIndex];

    let showDiv = document.createElement("div");
    showDiv.setAttribute(
      "style",
      " margin-top:15px;background: linear-gradient(135deg, #193A07 0%, #4CAF50 100%);padding:10px; border-radius:10px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; width:100%;max-width:300px;height:auto; box-sizing: border-box;"
    );

    // Creating word element
    let pword = document.createElement("p");
    pword.setAttribute("style", "  color:white;");
    pword.innerHTML = `<h3>Word  : ${words.word}</h3>`;

    // Creating phonetic element
    let pPhonetic = document.createElement("p");
    pPhonetic.innerHTML = `Phonetic : ${words.phonetic}`;
    pPhonetic.setAttribute("style", "  color:white;");
    // Creating Hindi meaning element
    let pHindiMeaning = document.createElement("p");
    pHindiMeaning.innerHTML = `Hindi Meaning :${words.hindiMeaning}`;
    pHindiMeaning.setAttribute("style", "  color:white;");
    // Creating meaning element
    let pMeaning = document.createElement("p");
    pMeaning.innerHTML = `Meaning : ${words.meaning}`;
    pMeaning.setAttribute("style", "  color:white;");
    // Creating usage element
    let pUsage = document.createElement("p");
    pUsage.innerHTML = `Usage :${words.usage}`;
    pUsage.setAttribute("style", "  color:white;");
    // Appending all elements to showDiv
    showDiv.appendChild(pword);
    showDiv.appendChild(pPhonetic);
    showDiv.appendChild(pHindiMeaning);
    showDiv.appendChild(pMeaning);
    showDiv.appendChild(pUsage);

    // Appending showDiv to the container div, assumed to be 'ranWord'
    displayDiv.appendChild(showDiv);
  }

  homeDiv.appendChild(ran_word);
  ran_word.appendChild(ranWord);
  ranWord.appendChild(displayDiv);
  mainDiv.appendChild(homeDiv);

  // Add styles for responsiveness
  const style1 = document.createElement("style");
  style1.innerHTML = `
    /* General responsive layout for smaller screens */
    @media (max-width: 768px) {
      #home_Main_Div {
        padding: 20px;
      }

      h1 {
        font-size: 1.5rem;
        margin-bottom: 15px;
      }

      .ran_word {
        margin-top: 50px;
      }

      .ranWord {
        width: 100%;
        margin-top: 30px;
        gap: 15px;
      }

      .showDiv {
        width: 100%;
        max-width: 280px;
      }

      .displayDiv {
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      #home_Main_Div {
        padding: 15px;
      }

      h1 {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      .ranWord {
        width: 100%;
        margin-top: 20px;
      }

      .displayDiv {
        gap: 10px;
      }

      .showDiv {
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
      }
    }
  `;
  document.head.appendChild(style1);
}

function ContainBar() {
  let dicMainDivObj = document.getElementById("dic_Main_Div");
  if (dicMainDivObj) dicMainDivObj.style.display = "block";
  let transMainDivObj = document.getElementById("trans_Main_Div");
  if (transMainDivObj) transMainDivObj.style.display = "none";
  let helpMainDivobj = document.getElementById("help_Main_div");
  if (helpMainDivobj) helpMainDivobj.style.display = "none";
  let conMainDiv = document.getElementById("con_Main_div");
  if (conMainDiv) conMainDiv.style.display = "none";
  let homeMainDivObj = document.getElementById("home_Main_Div");
  if (homeMainDivObj) homeMainDivObj.style.display = "none";
  if (isDicLoaded) return;

  isDicLoaded = true;

  let mainDiv = document.getElementById("main");
  let dicMainDiv = document.createElement("div");
  dicMainDiv.setAttribute("id", "dic_Main_Div");
  dicMainDiv.style.display = "block";
  let searchDiv = document.createElement("div");
  // searchDiv.setAttribute("id", "dic_Div");
  searchDiv.setAttribute(
    "class",
    "searchBar d-flex align-items-center justify-content-center "
  );
  searchDiv.setAttribute(
    "style",
    " margin-top:200px;height: 200px; align-items: center;display:block;"
  );

  let icon = document.createElement("div");
  icon.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  // this is input filds
  let searchObj = document.createElement("div");
  searchObj.setAttribute(
    "style",
    "display:flex; border:1px solid; padding:7px;border-radius:10px ;"
  );

  let childOfSearch = document.createElement("input");
  childOfSearch.setAttribute("id", "childOfSearch");
  childOfSearch.setAttribute("type", "text");
  childOfSearch.setAttribute("placeholder", "Enter your word..");

  childOfSearch.setAttribute(
    "style",
    "background-color:transparent;height: 50px; width: 300px; padding-left: 10px; font-size: 20px; border: none; outline: none;font-weight:900;"
  );

  let submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submitButton");

  submitButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  submitButton.setAttribute(
    "style",
    "height: 50px; width: 50px; font-size: 25px; border: none; background-color: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;"
  );

  let resultContainer = document.createElement("div");
  resultContainer.setAttribute(
    "class",
    "resultContainer d-flex align-items-center justify-content-center"
  );
  //this is my result div
  let result = document.createElement("div");
  result.setAttribute("id", "resultDiv");
  result.setAttribute(
    "style",
    "display: none; width: 510px; margin-top: 300px; border: 1px solid black; padding: 20px; border-radius: 10px; font-weight: 700; flex-direction: column; justify-content: center; align-items: center; position: absolute; top: 100px; left: 50%; transform: translateX(-50%);"
  );

  submitButton.addEventListener("click", handleSearch);

  childOfSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });

  function handleSearch() {
    let inputValue = childOfSearch.value.trim();
    if (inputValue) {
      getData(inputValue);
    }
  }

  function closeFunction() {
    let closeButton = document.createElement("button");
    closeButton.setAttribute("class", "btn btn-outline-danger d-flex");
    closeButton.setAttribute(
      "style",
      "margin-left: 50% ;margin-top:50px ; font-size: 25px; font-weight: bold; border-radius: 50%;"
    );
    closeButton.innerHTML = "X";

    result.appendChild(closeButton);
    result.style.display = "block";

    closeButton.addEventListener("click", function () {
      childOfSearch.value = "";
      result.style.display = "none";
    });
  }

  function displayResult(data) {
    let resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = "";

    result.setAttribute(
      "style",
      "display: none;background-color: #9EDF9C ;width:510px;height:auto ;margin-top:25px;  padding: 20px; border-radius: 10px; font-weight: 700;  flex-direction: column; justify-content: center; align-items: center;"
    );

    if (data.length > 0) {
      let wordInfo = data[0];
      let word = wordInfo.word;
      let meanings = wordInfo.meanings;

      // Display the word with custom styles
      let yourWord = document.createElement("h3");
      yourWord.setAttribute(
        "style",
        "text-align: center;  font-size: 36px; font-weight: bold; margin-bottom: 20px; text-transform: capitalize;"
      );
      yourWord.textContent = `${word}`;
      resultDiv.appendChild(yourWord);

      // Phonetic display with styles
      let phoneticText = "Not available";
      let phoneticAudio = null;

      if (wordInfo.phonetics && wordInfo.phonetics.length > 0) {
        for (let phonetic of wordInfo.phonetics) {
          if (phonetic.text && phoneticText === "Not available") {
            phoneticText = phonetic.text;
          }
          if (phonetic.audio && !phoneticAudio) {
            phoneticAudio = phonetic.audio;
          }
          if (phoneticText !== "Not available" && phoneticAudio) {
            break;
          }
        }
      }

      let phoneticDisplay = document.createElement("p");
      phoneticDisplay.setAttribute(
        "style",
        "text-align: center; font-size: 20px; color: #16a085; font-weight: 600; margin: 15px 0;"
      );
      phoneticDisplay.textContent = `Phonetic: ${phoneticText}`;
      resultDiv.appendChild(phoneticDisplay);

      // Add play audio button if audio is available
      if (phoneticAudio) {
        let audioButton = document.createElement("button");
        audioButton.setAttribute(
          "style",
          "background: linear-gradient(to right, #ff7e5f, #feb47b); color: white; border: none; border-radius: 50px; padding: 16px 32px; font-size: 20px; cursor: pointer; transition: all 0.3s ease-in-out; display: block; margin: 20px auto; font-family: 'Arial', sans-serif; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);"
        );

        // Add an icon inside the button
        audioButton.innerHTML = `<span style="font-size: 24px;">&#x1F50A;</span> Play Pronunciation`;

        // Play audio on click
        audioButton.onclick = () => new Audio(phoneticAudio).play();

        resultDiv.appendChild(audioButton);
      } else {
        let noAudioMessage = document.createElement("p");
        noAudioMessage.setAttribute(
          "style",
          "text-align: center; color: #e74c3c; font-size: 18px; font-weight: 500; margin-top: 10px;"
        );
        noAudioMessage.textContent = "Audio pronunciation not available.";
        resultDiv.appendChild(noAudioMessage);
      }

      // Horizontal line with style
      let line = document.createElement("hr");
      line.setAttribute(
        "style",
        "border: none; height: 1px; background: linear-gradient(to right, #1abc9c, #3498db); margin: 30px 0;"
      );
      resultDiv.appendChild(line);

      // Display meanings
      for (const meaning of meanings) {
        let meaningDiv = document.createElement("p");
        meaningDiv.setAttribute(
          "style",
          "text-align: center; font-size: 20px; color: #34495e; margin: 12px 0; font-weight: 600;"
        );
        meaningDiv.textContent = `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`;
        resultDiv.appendChild(meaningDiv);

        // Display example sentences (limit to 4 examples)
        let exampleCount = 0;
        for (const definition of meaning.definitions) {
          if (definition.example && exampleCount < 4) {
            let exampleSentence = document.createElement("p");
            exampleSentence.setAttribute(
              "style",
              "text-align: center; font-size: 18px; color: #7f8c8d; font-style: italic; margin: 8px 0;"
            );
            exampleSentence.textContent = `Example: ${definition.example}`;
            resultDiv.appendChild(exampleSentence);
            exampleCount++;
          }
        }
      }

      // Add a second horizontal line
      let line2 = document.createElement("hr");
      line2.setAttribute(
        "style",
        "border: none; height: 1px; background: linear-gradient(to right, #1abc9c, #3498db); margin: 30px 0;"
      );
      resultDiv.appendChild(line2);
    }

    // Call closeFunction to add the close button
    closeFunction();
  }

  mainDiv.appendChild(dicMainDiv);
  resultContainer.appendChild(result);
  searchDiv.appendChild(searchObj);
  searchObj.appendChild(childOfSearch);
  searchObj.appendChild(submitButton);
  dicMainDiv.appendChild(searchDiv);
  dicMainDiv.appendChild(resultContainer);
  childOfSearch.appendChild(icon);
  let isClose = false;

  async function getData(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("Word Not found");
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      displayResult(json);
    } catch (error) {
      console.error(error.message);
      console.log("Word Not found");

      result.style.display = "block";
      result.innerHTML = "Word Not Found";

      if (!isClose) {
        closeFunction();
        isClose = true;
      }
    }
  }
}

function transition() {
  let transMainDivObj = document.getElementById("trans_Main_Div");
  if (transMainDivObj) transMainDivObj.style.display = "block";
  let dicMainDivObj = document.getElementById("dic_Main_Div");
  if (dicMainDivObj) dicMainDivObj.style.display = "none";
  let helpMainDivobj = document.getElementById("help_Main_div");
  if (helpMainDivobj) helpMainDivobj.style.display = "none";
  let conMainDiv = document.getElementById("con_Main_div");
  if (conMainDiv) conMainDiv.style.display = "none";
  let homeMainDivObj = document.getElementById("home_Main_Div");
  if (helpMainDivobj) homeMainDivObj.style.display = "none";

  if (isTranslatorLoaded) return;

  isTranslatorLoaded = true;
  let mainDiv = document.getElementById("main");

  let tran_container = document.createElement("div");
  tran_container.setAttribute("id", "trans_Main_Div");
  tran_container.setAttribute(
    "style",
    "align-items: center; justify-content: center; display: flex;"
  );
  let container = document.createElement("div");
  container.setAttribute("id", "Main_div");
  container.setAttribute(
    "style",
    "margin-top:200px;margin-left:0 px;display: flex;  flex-direction: column; align-items: center; justify-content:center;  padding: 20px; border: 1px solid black; border-radius: 10px; background-color: #f9f9f9; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
  );

  let selectSection = document.createElement("div");
  selectSection.setAttribute(
    "style",
    "display: flex; width: 100%; justify-content: space-between; margin-bottom: 10px;"
  );

  const countries = {
    "en-GB": "English",
    "es-ES": "Spanish",

    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",

    "hi-IN": "Hindi",

    "it-IT": "Italian",
    "ja-JP": "Japanese",

    "kn-IN": "Kannada",
    "ko-KR": "Korean",

    "ne-NP": "Nepali",

    "ro-RO": "Romanian",
    "ru-RU": "Russian",

    "ta-LK": "Tamil",
    "te-IN": "Telugu",
  };

  async function translateText(text, sourceLang, targetLang) {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${sourceLang}|${targetLang}`
    );

    if (!response.ok) {
      throw new Error("Translation failed");
    }

    const data = await response.json();
    return data.responseData.translatedText;
  }

  // First Select
  const select_div1 = document.createElement("select");
  for (const country_code in countries) {
    const option = document.createElement("option");

    option.value = country_code;
    option.textContent = countries[country_code];
    select_div1.appendChild(option);
  }

  select_div1.setAttribute(
    "style",
    "padding: 5px; border: 1px solid #ccc; border-radius: 5px; flex: 1; margin-right: 5px; "
  );

  // Exchange icon
  let ex_icon = document.createElement("i");
  ex_icon.setAttribute("class", "fas fa-exchange-alt");
  ex_icon.setAttribute(
    "style",
    "margin: 0 10px; cursor: pointer; align-self: center;"
  );

  // Second Select
  const select_div2 = document.createElement("select");
  for (const country_code2 in countries) {
    const option = document.createElement("option");
    option.value = country_code2;
    option.textContent = countries[country_code2];
    select_div2.appendChild(option);
  }

  select_div2.setAttribute(
    "style",
    "padding: 5px; border: 1px solid #ccc; border-radius: 5px; flex: 1; margin-left: 5px;"
  );

  let inputSection = document.createElement("div");
  inputSection.setAttribute(
    "style",
    "display: flex; width: 100%; justify-content: space-between; color: black;"
  );

  let inputValueContainer = document.createElement("div");
  inputValueContainer.setAttribute(
    "style",
    "flex: 1; position: relative; margin-right: 10px;"
  );

  // First Textarea
  let inputValue = document.createElement("textarea");
  inputValue.setAttribute("class", "text-area");
  inputValue.setAttribute(
    "style",
    "flex: 1; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-right: 10px; resize: none;"
  );
  inputValue.placeholder = "Enter text...";

  // Second Textarea
  let inputValue_div = document.createElement("textarea");
  inputValue_div.setAttribute("class", "text-area");
  inputValue_div.setAttribute(
    "style",
    "flex: 1; height: 200px; border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-left: 10px; resize: none;"
  );
  inputValue_div.placeholder = "Translation...";
  inputValue_div.readOnly = true;

  // Button
  let btn_trans = document.createElement("button");
  btn_trans.setAttribute(
    "style",
    "height: 40px; width: 100%; border-radius: 5px; border: none; background-color: #4CAF50; color: white; font-size: 16px; cursor: pointer; transition: background-color 0.3s; margin-top: 10px;"
  );
  btn_trans.innerText = "Translate";
  btn_trans.addEventListener("click", async () => {
    const fromLang = select_div1.value;
    const toLang = select_div2.value;
    const textToTranslate = inputValue.value;

    try {
      const translatedText = await translateText(
        textToTranslate,
        fromLang,
        toLang
      );
      inputValue_div.value = translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
    }
  });

  ex_icon.addEventListener("click", () => {
    const temp = select_div1.value;
    select_div1.value = select_div2.value;
    select_div2.value = temp;

    const tempText = inputValue.value;
    inputValue.value = inputValue_div.value;
    inputValue_div.value = tempText;
  });

  selectSection.appendChild(select_div1);
  selectSection.appendChild(ex_icon);
  selectSection.appendChild(select_div2);

  inputSection.appendChild(inputValue);
  inputSection.appendChild(inputValue_div);

  container.appendChild(selectSection);
  container.appendChild(inputSection);
  container.appendChild(btn_trans);
  tran_container.appendChild(container);
  mainDiv.appendChild(tran_container);
  const style = document.createElement("style");
  style.innerHTML = `
  #Main_div {
    width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 786px) {
    #Main_div {
      width: 500px;
    }

    textarea {
      font-size: 1rem;
      padding: 8px;
      width: 100%;  
    }

    select, button {
      font-size: 1rem;
      padding: 8px;
      width: 100%;  
    }

    .fas {
      font-size: 1.2rem;
    }
  }

 
  @media (max-width: 480px) {
    #Main_div {
      width: 350px;
    }

    select, textarea, button {
      font-size: 0.9rem;
      padding: 6px;
      width: 100%;  
    }

    textarea {
      height: 100px;
    }

    .fas {
      font-size: 1rem;
    }
  }
`;

  document.head.appendChild(style);
}

function help() {
  let helpMainDivobj = document.getElementById("help_Main_div");
  if (helpMainDivobj) helpMainDivobj.style.display = "block";
  let transMainDivObj = document.getElementById("trans_Main_Div");
  if (transMainDivObj) transMainDivObj.style.display = "none";
  let dicMainDivObj = document.getElementById("dic_Main_Div");
  if (dicMainDivObj) dicMainDivObj.style.display = "none";
  let conMainDiv = document.getElementById("con_Main_div");
  if (conMainDiv) conMainDiv.style.display = "none";
  let homeMainDivObj = document.getElementById("home_Main_Div");
  if (homeMainDivObj) homeMainDivObj.style.display = "none";
  if (isHelpLoaded) return;
  isHelpLoaded = true;

  let mainHelp = document.getElementById("main");

  // Create the main help container div
  let helpDiv = document.createElement("div");
  helpDiv.setAttribute("id", "help_Main_div");
  helpDiv.setAttribute(
    "style",
    "margin-top:200px;height:500px; width:100%; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;"
  );

  let help_div_1 = document.createElement("div");
  help_div_1.setAttribute(
    "style",
    "background: #B6E388; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 500px;  margin: auto; margin-top: 50px;"
  );

  const faqs = [
    {
      question: "How do I find the meaning of a word?",
      answer:
        "You can search for any word in the search bar to find its meaning.",
    },
    {
      question: "How can I hear the pronunciation of a word?",
      answer:
        "Click the speaker icon next to the word to hear its pronunciation.",
    },
    {
      question: "Does this app include synonyms and antonyms?",
      answer: "Yes, each word entry shows synonyms and antonyms for reference.",
    },
    {
      question: "What is the origin of a word?",
      answer:
        "The origin or etymology section provides information on the word's history.",
    },
    {
      question: "Can I see example sentences?",
      answer: "Yes, we provide example sentences to show the word in context.",
    },
    {
      question: "How do I translate a word?",
      answer:
        "Type the word and choose the target language to see the translation.",
    },
    {
      question: "Can I translate sentences?",
      answer: "Yes, you can translate both words and sentences.",
    },
    {
      question: "Does the app support multiple languages?",
      answer: "Yes, it supports many languages for translation.",
    },
    {
      question: "Can I hear the translated text?",
      answer: "Yes, click the speaker icon to listen to the translation.",
    },
  ];

  let faqContainer = document.createElement("div");
  faqContainer.setAttribute(
    "style",
    "width:100%; margin:20px auto; font-family:Arial, sans-serif;"
  );

  for (const element of faqs) {
    let question = document.createElement("div");
    question.setAttribute(
      "style",
      "padding:15px; cursor:pointer; border:1px solid black; border-radius:5px; margin-top:5px; font-weight:bold;"
    );
    question.textContent = element.question;

    let answer = document.createElement("div");
    answer.textContent = element.answer;
    answer.setAttribute(
      "style",
      "display:none; padding:15px; border-left:3px solid #3a3a3a; background-color:#B6E388; font-size:0.9em;"
    );

    question.addEventListener("click", () => {
      if (answer.style.display === "none") {
        answer.style.display = "block";
      } else {
        answer.style.display = "none";
      }
    });

    faqContainer.appendChild(question);
    faqContainer.appendChild(answer);
  }

  mainHelp.appendChild(helpDiv);
  helpDiv.appendChild(help_div_1);
  help_div_1.appendChild(faqContainer);

  const Style = document.createElement("style");
  Style.innerHTML = `
  @media (max-width: 480px) {
  #help_Main_div {
    padding: 10px;
  }

  #help_div_1 {
    padding: 15px;
    width: 100%;
    margin-top: 20px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .faq-item {
    font-size: 0.9rem;
  }

  .faq-item div {
    font-size: 0.8rem;
  }
}

/* Tablets and small screens */
@media (max-width: 768px) {
  #help_div_1 {
    padding: 20px;
    width: 90%;
    margin-top: 30px;
  }

  h2 {
    font-size: 1.8rem;
  }

  .faq-item {
    font-size: 1rem;
  }

  .faq-item div {
    font-size: 0.9rem;
  }
}

/* Larger screens */
@media (min-width: 769px) {
  #help_div_1 {
    width: 700px;
    padding: 30px;
    margin-top: 40px;
  }

  h2 {
    font-size: 2rem;
  }
}
  `;
}
function Contact() {
  let conMainDiv = document.getElementById("con_Main_div");
  if (conMainDiv) conMainDiv.style.display = "block";
  let helpMainDivobj = document.getElementById("help_Main_div");
  if (helpMainDivobj) helpMainDivobj.style.display = "none";
  let transMainDivObj = document.getElementById("trans_Main_Div");
  if (transMainDivObj) transMainDivObj.style.display = "none";
  let dicMainDivObj = document.getElementById("dic_Main_Div");
  if (dicMainDivObj) dicMainDivObj.style.display = "none";
  let homeMainDivObj = document.getElementById("home_Main_Div");
  if (homeMainDivObj) homeMainDivObj.style.display = "none";

  if (isConLoaded) return;
  isConLoaded = true;

  let mainDiv = document.getElementById("main");

  let conDiv = document.createElement("div");
  conDiv.setAttribute("id", "con_Main_div");
  conDiv.setAttribute(
    "style",
    "background: #B6E388; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 400px; max-width: 90%; margin: auto; margin-top: 200px;"
  );

  let title = document.createElement("h2");
  title.innerText = "Contact Us";
  title.setAttribute(
    "style",
    "color: #2A3663; text-align: center; margin-bottom: 20px;"
  );

  let nameInput = document.createElement("input");
  nameInput.setAttribute(
    "style",
    "background: #B6E388;border-radius:7px; padding:10px; width:100%; border: 1px solid black; margin-bottom: 10px;"
  );
  nameInput.setAttribute("placeholder", "First Name");

  let lastInput = document.createElement("input");
  lastInput.setAttribute("placeholder", "Last Name");
  lastInput.setAttribute(
    "style",
    "background: #B6E388;border-radius:7px; padding:10px; width:100%; border: 1px solid black; margin-bottom: 10px;"
  );

  let emailInput = document.createElement("input");
  emailInput.setAttribute("placeholder", "Enter your Email");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute(
    "style",
    "background: #B6E388;border-radius:7px; padding:10px; width:100%; border: 1px solid black; margin-bottom: 10px;"
  );

  let phoneInput = document.createElement("input");
  phoneInput.setAttribute("placeholder", "Phone NO.");
  phoneInput.setAttribute("type", "tel");
  phoneInput.setAttribute(
    "style",
    "background: #B6E388;border-radius:7px; padding:10px; width:100%; border: 1px solid black; margin-bottom: 20px;"
  );

  let send = document.createElement("button");
  send.innerText = "Send";
  send.setAttribute(
    "style",
    "border-radius:7px; width:100%; height:40px; background:#2A3663; color:white; border: none; font-size: 16px; cursor: pointer;"
  );

  send.addEventListener("click", () => {
    nameInput.value = "";
    lastInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  });

  mainDiv.appendChild(conDiv);
  conDiv.appendChild(title);
  conDiv.appendChild(nameInput);
  conDiv.appendChild(lastInput);
  conDiv.appendChild(emailInput);
  conDiv.appendChild(phoneInput);
  conDiv.appendChild(send);

  const Style = document.createElement("style");
  Style.innerHTML = `
  @media (max-width: 480px) {
  #con_Main_div {
    padding: 20px;
    width: 90%;
    margin-top: 30px;
  }

  h2 {
    font-size: 1.5rem;
  }

  input, button {
    padding: 8px;
  }
}


@media (max-width: 768px) {
  #con_Main_div {
    padding: 25px;
    width: 90%;
    margin-top: 40px;
  }

  h2 {
    font-size: 1.8rem;
  }

  input, button {
    padding: 10px;
  }
}


@media (min-width: 769px) {
  #con_Main_div {
    width: 600px;
    margin-top: 50px;
  }

  h2 {
    font-size: 2rem;
  }
}`;
}
