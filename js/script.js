const questions = [
    {
        question: "Q1.若い女性のがんによる死亡のうち、<br>子宮頸がんは第何位？",
        choices: ["第1位", "第2位", "第3位", "第4位"],
        correctAnswer: 1,
        explanation: "A1.<br>子宮頸がんは日本の25～40歳の若い女性のがんによる死亡の第2位です。<br>死亡率は30代前半から高くなる傾向にあります。",
        image: "img/cerv_shibo.png"
    },

            {
            question: "Q2.早期がんの生存率はどのくらい？",
            choices: ["90%以上", "約80%", "約60%", "約40%"],
            correctAnswer: 0,
            explanation:"A2.<br>胃、肺、大腸、子宮頸部、乳房の5つのがんは、がん検診で早期発見・早期治療ができれば「9割以上の人が治ります」。<br>がん検診は早期発見・早期治療可能ながんを対象としています。<br>怖がりすぎず、少しでも早く見つけて治療することが大切！",
            image: "img/gan1.png"
        },
        
        {
            question: "Q3.子宮頸がん検診（子宮頸部細胞診）は<br>何歳から受けると良い？",
            choices: ["20歳", "30歳", "40歳", "50歳"],
            correctAnswer: 0,
            explanation:"A3.<br>子宮頸がんを発症する割合は20代から上昇します。<br>そのため、日本では20歳以上の女性は定期的に子宮頸がん検診（子宮頸部細胞診）を受けることが推奨されています。<br>※2024年4月から実施体制が整った自治体では30歳以上の女性に5年に1回のHPV検査単独法も選択可能となりました。<br>詳細はお住いの自治体にご確認下さい。",
            image:"img/cerv_rikan.png"
        },
        
        {
            question: "Q4.子宮頸がん検診（子宮頸部細胞診）の<br>適切な受診頻度は？",
            choices: ["毎年", "2年に1回", "3年に1回", "5年に1回"],
            correctAnswer: 1,
            explanation: "A4.<br>子宮頸部細胞診は2年に1回の受診が推奨されています。<br>子宮頸部の細胞を「医師が採取」して細胞に何らかの異常がないかを検査します。",
            image:"img/kensa.png"
        },


        {
            question: "Q5.子宮頸がん患者の何%に<br>ヒトパピローマウイルス（HPV）が見つかる？",
            choices: ["50%", "70%", "80%", "90%"],
            correctAnswer: 3,
            explanation:"A5.<br>子宮頸がんの患者さんの90%以上で見つかり、HPVに長期感染することで子宮頸がんになると考えられています。<br>HPVは一般に性行為を介して感染するため、日本では小学6年～高校1年相当の女子に公費での定期接種が提供されています。",
            image:"img/hpv3.png"
        },


        {
            question: "Q6.HPVワクチン（2価/4価/9価）の<br>予防効果は？",
            choices: ["20～60%", "30～70%", "40～80%", "50～90%"],
            correctAnswer: 3,
            explanation:"A6.<br>2価ワクチン（サーバリックス）および4価ワクチン（ガーダシル）は、HPV16型と18型を対象とし原因の50～70%を、9価ワクチン（シルガード9）は、HPV16型と18型に加え、31型、33型、45型、52型、58型を対象とし原因の80～90%を予防します。",
            image:"img/hpv1.png"   
        },
        {
            question: "Q7.日本のHPVワクチンの接種率は？海外の状況は？",
            choices: ["30%", "10%", "5%", "2%"],
            correctAnswer: 3,
            explanation:"A7.<br>日本の接種率は2019年時点でわずか2%にとどまります。<br>2022年4月に約8年ぶりにHPVワクチンの積極的な接種勧奨が再開されました。<br>対して、国際的な動きはどうでしょう。<br>2020年11月時点で110カ国で公的な接種が行われ、カナダやイギリス、オーストラリアなどの接種率は約8割となっています。<br>子宮頸がんにつながるHPVの感染はHPVワクチン接種で防ぐことができます。速やかな接種率向上が望まれます。",
            image:"img/hpv2.png"
            
        }

    ];

    let currentQuestion = 0;
    let score = 0;
    // let answered = false; // 新しい変数を追加して、回答済みかどうかを追跡
    const questionElement = document.getElementById("question");
    const next_button = document.querySelector(".next_button");


function displayQuestion() {
    questionElement.innerHTML = questions[currentQuestion].question;
    for (let i = 0; i < 4; i++) {
        document.getElementsByTagName("button")[i].textContent = questions[currentQuestion].choices[i];
    }
    next_button.classList.add('hidden'); // 初期状態で次へボタンを非表示にする
    answered = false; // 新しい質問が表示されたときに、回答済みフラグをリセット
}



function fadeInElement(element) {
    element.style.opacity = 0;
    element.offsetHeight; // Reflow to trigger transition
    element.style.transition = "opacity 0.5s ease";
    element.style.opacity = 1;
}

function fadeInExplanationAndImage(explanation, imageSrc, imageAlt) {
    const explanationElement = document.getElementById("explanation");
    explanationElement.innerHTML = questions[currentQuestion].explanation;
    fadeInElement(explanationElement);

    if (imageSrc && imageAlt) {
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = imageAlt;
        imgElement.className = 'responsive-image'; // 追加するクラス
        explanationElement.appendChild(imgElement);
        fadeInElement(imgElement);
    }
}

function checkAnswer(selectedIndex) {
const correctAnswer = questions[currentQuestion].correctAnswer;
if (selectedIndex === correctAnswer) {
    document.getElementById('correctSound').play(); // 正解音を再生
    if (!answered) {  // 回答がまだ未記録であれば
        score += 10;  // スコアを加算
        alert("正解です！ 10点加算");
        answered = true;  // 回答記録をセット
    } else {
        alert("正解です！");  // すでに回答済みであれば、ポイント加算なし
    }
    const explanation = questions[currentQuestion].explanation;
const imageSrc = questions[currentQuestion].image;
const imageAlt = `解説画像 ${currentQuestion + 1}`;
fadeInExplanationAndImage(explanation, imageSrc, imageAlt);
next_button.style.display = "block";

} else {
    document.getElementById('incorrectSound').play(); // 不正解音を再生
    if (!answered) {  // 初回回答が不正解の場合
        alert("不正解です。もう一度考えてみてください。");
        answered = true;  // 回答記録をセット、これ以降の回答ではポイント加算しない
    } else {
        alert("不正解です。");  // すでに回答済みであれば再度のアラート
    }
    displayExplanation(); // 解説を表示する関数を呼び出す
}    
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        next_button.style.display = "none";
        const explanationElement = document.getElementById("explanation");
        explanationElement.innerHTML = ""; // Clear previous content
        explanationElement.style.opacity = 0;
    } else {
        displayScore();
        alert(`あなたの合計スコアは ${score} 点です。`);// スコアを表示
     }               
    }
    

function selectButton(selectedIndex) {
    for (let i = 0; i < 4; i++) {
        document.getElementsByTagName("button")[i].classList.remove("selected");
    }
    document.getElementsByTagName("button")[selectedIndex].classList.add("selected");
}


function displayScore() {
    let message = "";
    let imagePath = "";

    if (score <= 30) {
        message = "努力賞！<br>もう一度やってみよう！<br>目指せ！子宮頸がん検診博士！";
        imagePath = "img/doryoku.png";
    } else if (score > 30 && score <= 60) {
        message = "惜しい！<br>子宮頸がん検診博士まであと少し！";
        imagePath = "img/oshii.png";
    } else if (score > 60) {
        message = "あなたはもう子宮頸がん検診博士！<br>周りの人にも教えてあげよう！";
        imagePath = "img/hakase.png";
    }
    
    document.getElementById("awardMessage").innerHTML = message; // .textContentから.innerHTMLに変更
    document.getElementById("awardImage").src = imagePath;
    document.getElementById("awardScreen").style.display = "flex";  // 表彰画面を表示
}


function restartQuiz() {
currentQuestion = 0; // 最初の質問にインデックスをリセット
score = 0; // スコアをリセット
   const explanationElement = document.getElementById("explanation");
explanationElement.innerHTML = ""; // 解説をクリア
displayQuestion(); // 最初の質問を再表示
document.getElementById("awardScreen").style.display = "none"; // 表彰画面を隠す
document.getElementById("quizContainer").style.display = "block"; // クイズコンテナを再表示
}


displayQuestion();
