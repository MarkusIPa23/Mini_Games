class TypingGame {
    constructor(level, language = 'lv') {
        this.level = level;
        this.language = language;
        this.texts = {
            lv: {
                easy: [
                    "Sniegs krita klusi kā noslēpums. Pilsēta apklusa, ielas kļuva baltas, domas vieglas. Bērns atvēra plaukstu, noķēra pārslu un pasmaidīja. Tajā mirklī ziema iemācīja gaidīt, elpot lēnāk un ticēt mazām brīnumu pēdām. Nakts iededzināja gaismu logos, pulksteņi apstājās, un pasaule uz brīdi kļuva lēna, silta pat aukstumā, mierīga sirdī ikvienam klātesošajam.",
                    "Ziemas rīts sākās ar sarmu uz logiem un aukstu, dzidru gaisu dārzā.",
                    "Ziema atnāca klusi, pārklājot pilsētu ar sniega segu. Laternu gaismas dzirkstīja, elpa pārvērtās tvaikā. Bērni smējās, veidojot sniegavīrus, bet vecie logi čīkstēja aukstumā. Naktī pasaule kļuva mierīga, balta, un cerība sasildīja sirdis klusumā dzima sapņi, soļi čabēja, mēness sargāja nakti ilgi kamēr laiks apstājās un cilvēki ticēja brīnumiem kopā vienmēr."
                ],
                medium: [
                    "Ziema atnāca klusi, pārklājot pilsētu ar sudrabotu elpu. Ielas kļuva lēnākas, logi siltāki, domas mierīgākas. Sniegs čīkstēja zem soļiem, atgādinot par bērnības rītiem un aizmirstām ragaviņām. Parkā koki stāvēja kā sargi, bet upe elpoja zem ledus. Cilvēki pasmaidīja biežāk, it kā aukstums saliedētu. Vakari iemirdzējās sveču gaismā, tējas tvaikā, klusās sarunās. Kad debesis satumsa, zvaigznes šķita tuvākas, un ziema apsolīja pacietību, cerību, jaunu sākumu pavasarim. Sniegpārslas lēni krita, nosēžoties uz cepurēm, soliem, laternām, padarot laiku biezāku, skaņas klusākas, bet sirdis drosmīgākas, gaidot rītdienu. Katrs elpas vilciens dzirkstīja gaisā, atgādinot, ka siltums rodas no kopā būšanas. Un cerība nekad nepazūd pilnībā.",
                    "Ziema atnāca klusi, un sniegs krita kā noslēpums pār pilsētu. Ielas kļuva baltas, trokšņi mīksti, domas lēnākas. Bērni zīmēja eņģeļus, elpa pārvērtās mākoņos, bet logs glabāja siltumu. Vecs vīrs stāvēja parkā, klausījās, kā sniegs runā ar kokiem. Katrs pārslas pieskāriens solīja sākumu, piedošanu, mieru. Naktī laternas dega, un pasaule izskatījās jauna, it kā rīts vēl tikai mācītos elpot. Cilvēki apstājās, pasmaidīja svešiniekiem, atcerējās bērnību, dzirdēja klusumu, juta laiku, kas lēni krājas uz pleciem, kā sega, sargājot trauslu cerību līdz pavasarim. Sniegs kūstot neatvadījās, bet atstāja pēdas atmiņās, kabatās, stāstos, kurus vēlāk stāstīt ugunskura gaismā, un sirdīs klusu ilgošanos nākamajai ziemai.",
                    "Ziemas vakars bija kluss, un sniega pārslas lēni krīt uz ielas. Marta stāvēja pie loga, skatoties, kā pilsēta spīd gaismās. Pulkstenis tuvojās pusnaktij. Viņas sirds trīcēja tas bija laiks jauniem sapņiem un solījumiem. Pēkšņi telefonu pieskārās ziņa no draugiem: “Gatavojies pārsteigumam!” Marta pasmaidīja un devās uz ielu. Pulkstenis sitot divpadsmito reizi, debesis izgaismoja krāsainas uguņošanas gaismas. Smiekli, apskāvieni un prieks piepildīja nakti. Marta juta – šis gads būs citāds, pilns cerības, piedzīvojumiem un mīlestības. Jaunais gads bija sācies ar brīnumu."
                ],
                hard: [
                    "Ziema ir klusuma un miera periods, kad daba ietinas baltā sniega segā, dāvājot mums neismeltāmu estētisko baudījumu. Šis gadalaiks Latvijā asociējas ar īsām dienām un garām, zvaigžņotām naktīm, kurās sals pie logu rūtīm zīmē sudrabainas ledus puķes. Ziemas ainava ir kā tīrs audekls, kas aicina apstāties un ieklausīties sevī, prom no ikdienas steigas un trokšņiem. Lai gan aukstums mēdz būt skarbs, tas mūs satuvina. Mēs meklējam siltumu mājīgās telpās, malkojot karstu tēju un pavadot laiku kopā ar mīļajiem. Ziemassvētku gaidīšanas laiks un gadu mija piešķir šim periodam maģisku noskaņu, atgādinot par cerību un jaunu sākumu. Aktīvās atpūtas cienītājiem ziema piedāvā prieku slēpošanas trasēs vai uz aizsalušiem ezeriem, kur ledus stingrums pārbauda mūsu izturību. Tomēr ziemas lielākā vērtība ir tās spēja mūs palēnināt. Tā ir dabas ieelpa pirms pavasara atmodas, mācot mums pacietību un spēju saskatīt skaistumu vienkāršībā. Ziema nav tikai aukstums; tas ir laiks, kad sirds siltums kļūst par mūsu svarīgāko gaismas avotu.",
                    "Jaungads ir maģisks laika posms, kad pasaule uz brīdi apstājas, lai atskatītos uz piedzīvoto un pavērtu durvis nezināmajam. Tas nav tikai kalendāra maiņas brīdis, bet gan emocionāls slieksnis starp pagātni un nākotni. Vecgada vakarā mēs bieži izvērtējam savus sasniegumus, mācāmies no kļūdām un klusi sev apsolām kļūt labāki, drosmīgāki vai mierīgāki. Svētku gaisotni piepilda spožas lampiņu virtenes, salūta dārdi un kopābūšanas prieks. Tomēr Jaungada būtība slēpjas cerībā. Tā ir ticība tam, ka jauns sākums sniedz jaunas iespējas. Šajā laikā mēs dāvinām ne vien materiālas lietas, bet arī mīlestību un labas vēlējumus. Kaut arī apņemšanās dažkārt izplēn ikdienas steigā, pats nodoms mainīties uz augšu ir vērtīgs. Jaungads mums atgādina, ka laiks ir dārgākais, kas mums pieder. Tas mudina mūs novērtēt esošo, sapņot drosmīgi un doties uz priekšu ar gaišu skatu. Šie svētki ir simbolisks atspēriena punkts, lai rakstītu nākamo dzīves nodaļu vēl aizraujošāku un piepildītāku nekā iepriekšējo.",
                    ""
                ],
                hardcore: [
                    "Ziema ir gadalaiks, kas daudziem saistās ar aukstumu un tumsu, tomēr tajā mīt savdabīgs miers un attīrošs spēks. Kad pirmās sniega pārslas lēni nolaižas uz sasalušās zemes, pasaule it kā apstājas. Steidzīgo ikdienas ritmu nomaina pieklusinātas skaņas, un daba dodas pelnītā atpūtā, ietinusies biezā, baltā villainē. Viena no ziemas skaistākajām šķautnēm ir tās vizuālā estētika. Sniegs nav tikai nokrišņi; tas ir mākslinieks, kas pārveido ainavu. Parasti koki kļūst par greznām skulptūrām, bet apsarmojušie logu rūtis atgādina smalkus mežģīņu rakstus. Saulainās ziemas dienās, kad sniegs mirdz kā miljoniem sīku kristālu, rodas pasakaina sajūta, kas liek aizmirst par sala radīto dzeldīgumu. Šis baltais klusums palīdz sakārtot domas un sniedz vizuālu atslodzi no pilsētas pelēcības. Tomēr ziema nav tikai ārējs skaistums tā ir arī iekšēja siltuma meklēšanas laiks. Kad ārā plosās putenis vai termometra stabiņš noslīd zemu zem nulles, mēs vairāk novērtējam māju sajūtu. Ziema mūs saved kopā pie siltas tējas tases, sveču gaismā vai pie iekurta kamīna. Tas ir laiks, kad pievērsties sev: lasīt grāmatas, kuras atliktas uz vēlāku, kavēties sarunās ar tuviniekiem vai vienkārši baudīt mirkli pašam ar sevi. Ziemas tumšie vakari nav domāti skumjām, bet gan mierīgai refleksijai un spēku uzkrāšanai pirms pavasara atmodas. Arī aktīvā atpūta ziemā sniedz īpašu enerģiju. Slidošana pa dabisku ledu, brauciens ar ragaviņām vai kluss pārgājiens pa piesnigušu mežu ļauj sajust saikni ar dabu tās skarbākajā, bet reizē patiesākajā formā. Svaigais, dzestrais gaiss attīra prātu un liek asinīm ritēt straujāk, atgādinot par mūsu pašu dzīvīgumu. Noslēgumā var teikt, ka ziema ir pārejas un sagatavošanās posms. Tā iemāca mums pacietību un spēju saskatīt skaisto vienkāršībā. Pat ja ziema mēdz būt skarba un gara, tā ir nepieciešama, lai mēs vēlāk spētu pilnībā novērtēt pavasara pirmo siltumu un dzīvības uzvaru pār sasalumu. Ziema ir dabas dziļā ieelpa pirms nākamā dzīves cikla sākuma.",
                    "Sniegs ir viena no fascinējošākajām dabas parādībām, kas spēj pilnībā izmainīt ne tikai ainavu, bet arī cilvēka iekšējo sajūtu pasauli. Kad no pelēkajām ziemas debesīm sāk krist pirmās pārslas, pasaule it kā aiztur elpu. Tas nav tikai nokrišņu veids; tas ir simbols mieram, tīrībai un dabas spējai atjaunoties. Viena no unikālākajām sniega īpašībām ir tā spēja dāvāt klusumu. Svaigi snidzis sniegs darbojas kā dabisks skaņas izolators, absorbējot pilsētas dūkoņu un ikdienas steigu. Šajā klusumā cilvēks paliek aci pret aci ar sevi. Pastaiga piesnigušā mežā, kur dzirdama tikai sniega širkstoņa zem kājām, sniedz terapeitisku mieru, ko nespēj aizstāt neviens mūsdienu trokšņu slāpētājs. Sniegs mūs piespiež palēnināties gan tiešā nozīmē, pārvietojoties uzmanīgāk, gan emocionāli, liekot apstāties un novērtēt mirkļa skaistumu. Vizuāli sniegs ir izcils mākslinieks. Tas pārklāj kailos zarus, raupjās māju kores un dubļainos ceļus ar mirdzoši baltu palagu, padarot apkārtni par pasaku valstību. Katra sniegpārsla ir unikāls kristāls, dabas inženierijas šedevrs, kas atgādina par pasaules sarežģītību un trauslumu vienlaikus. Tomēr sniegam piemīt arī divdabība. Lai gan tas priecē bērnus ar kamanu braucieniem un sniegavīru celšanu, tas atgādina par dabas varenumu un skarbumu. Sniega vētras un aukstums prasa no mums izturību un pielāgošanos. Visbeidzot, sniegs ir apsolījums. Zem biezās sniega kārtas daba guļ un krāj spēkus pavasarim. Tas kalpo kā aizsargslānis zemei, sargājot augu saknes no sasalšanas. Tādējādi sniegs ir nevis beigas, bet gan nepieciešama pauze dzīvības ciklā. Tas māca mums, ka dažreiz ir nepieciešams paslēpties no pasaules un pārziemot, lai vēlāk atgrieztos ar jaunu enerģiju. Noslēgumā var teikt, ka sniegs ir kas vairāk par sasalušu ūdeni. Tā ir dabas dāvana, kas liek mums saskatīt skaistumu vienkāršībā un atrast mieru haosā. Kamēr vien zemi klās balts sniegs, mūsos dzīvos cerība par tīru, jaunu sākumu.",
                    "Jaunā gada sagaidīšana ir viens no tiem retajiem mirkļiem, kad šķiet, ka visa pasaule uz mirkli aiztur elpu. Tas nav tikai datuma maiņa kalendārā; tas ir simbolisks slieksnis, kurā pagātnes pieredze satiekas ar nākotnes nezināmo. Šis laiks mums piedāvā unikālu iespēju apstāties, izvērtēt paveikto un ar tīru sirdsapziņu pavērt durvis uz jaunu sākumu. Gada pēdējās dienās mēs bieži vien kļūstam nostalģiski. Mēs atceramies uzvaras, kas lika sirdij pukstēt straujāk, un zaudējumus, kas mūs norūdīja. Svarīgi ir saprast, ka katrs notikums, neatkarīgi no tā emocionālās nokrāsas, ir bijis vērtīgs skolotājs. Pateicība ir atslēgvārds, kas palīdz noslēgt veco posmu pateicība par satiktajiem cilvēkiem, gūtajām mācībām un pat par grūtībām, kas palīdzēja mums augt. Bez šī atskata jaunie mērķi var šķist tukši, jo tie nav balstīti mūsu patiesajā pieredzē. Līdz ar pusnakts salūtu un šampanieša burbuļiem mūsos dzimst jauna enerģija. Jauns gads, jauns es šī frāze, lai arī cik bieži dzirdēta, sevī ietver cilvēka dabisko tieksmi pēc pilnveidošanās. Mēs apsolām sev dzīvot veselīgāk, mācīties ko jaunu vai vienkārši būt labāki pret apkārtējiem. Tomēr svarīgāk par skaļiem solījumiem ir iekšējais nodoms. Jaunais gads mums atgādina, ka mēs jebkurā brīdī varam mainīt savas dzīves virzienu, ja vien mums pietiek drosmes spert pirmo soli. Jaunais gads ir cerību laiks. Tas mums māca, ka laiks ir mūsu vērtīgākais resurss, un katrs janvāra rīts ir kā balta papīra lapa, kuru mēs paši varam piepildīt ar saviem stāstiem. Galu galā, nav tik būtiski, cik grandiozi ir mūsu plāni, bet gan tas, cik daudz mīlestības, neatlaidības un prieka mēs ieliksim katrā no 365 dienām. Lai šis gads kļūst par iespēju kļūt par labāko sevis versiju!"
                ]
            },
            en: {
                easy: ["The snow fell silently like a mystery. The city fell silent, the streets turned white, thoughts light. The child opened his palm, caught a flake and smiled. In that moment, winter taught him to wait, to breathe more slowly and to believe in small traces of miracles. The night lit the windows, the clocks stopped, and the world became slow for a moment, warm even in the cold, peaceful in the heart of everyone present.",
                    "Cold winter days.",
                    "Winter came quietly, covering the city with a blanket of snow. The lights of the lanterns sparkled, the breath turned into steam. Children laughed, making snowmen, but the old windows creaked in the cold. At night the world became calm, white, and hope warmed hearts, dreams were born in silence, footsteps squelched, the moon guarded the night for a long time until time stopped and people believed in miracles together always"
                ],

                medium: ["Winter came quietly, covering the city with a silvery breath. The streets were slower, the windows were warmer, thoughts were calmer. The snow creaked underfoot, reminding us of childhood mornings and forgotten sledges. In the park, the trees stood like sentinels, but the river breathed under the ice. People smiled more often, as if the cold had melted away. The evenings sparkled in candlelight, in the steam of tea, in quiet conversations. When the sky darkened, the stars seemed closer, and winter promised patience, hope, a new beginning for spring. Snowflakes fell slowly, settling on hats, benches, lanterns, making time thicker, sounds quieter, but hearts braver, waiting for tomorrow. Every breath sparkled in the air, reminding us that warmth comes from being together. And hope never disappears completely.",
                        "Winter came quietly, and snow fell like a mystery over the city. The streets became white, the noises soft, thoughts slower. Children drew angels, breath turned into clouds, but the window kept the warmth. An old man stood in the park, listening to how the snow spoke to the trees. Every touch of a flake promised a beginning, forgiveness, peace. At night, lanterns burned, and the world looked new, as if the morning was just learning to breathe. People stopped, smiled at strangers, remembered childhood, heard the silence, felt time slowly accumulating on their shoulders, like a blanket, protecting a fragile hope until spring. The snow did not say goodbye as it melted, but left traces in memories, pockets, stories to be told later by the light of a campfire, and in their hearts a silent longing for the next winter.",
                        "The winter evening was quiet, and snowflakes were slowly falling on the street. Marta stood by the window, watching the city shine in the lights. The clock was approaching midnight. Her heart was trembling - it was time for new dreams and promises. Suddenly, a message from her friends touched her phone: “Get ready for a surprise!” Marta smiled and went out into the street. As the clock struck twelve, the sky lit up with colorful fireworks. Laughter, hugs and joy filled the night. Marta felt - this year would be different, full of hope, adventures and love. The new year had begun with a miracle."
                ],

                hard: ["Christmas is a time of warmth, tradition, and togetherness. Homes are filled with soft lights, candles, and festive decorations that create a cozy atmosphere during dark winter days. Families gather to share meals, stories, and laughter, strengthening bonds and creating lasting memories. Christmas reminds people to slow down and focus on what truly matters. It is a season of kindness, generosity, and caring for others. People exchange gifts, not only to give objects, but to show love and appreciation. Traditional foods, music, and customs bring comfort and joy year after year. Outside, winter may be cold, but inside hearts feel warm. Christmas also encourages reflection and gratitude for the year that is ending. This celebration brings peace, hope, and light, reminding us that even during the darkest season, love, joy, and togetherness shine the brightest.",
                        "Snow changes the world in a quiet and magical way. When the first snowflakes fall, everything feels calmer and softer. Streets, trees, and rooftops are covered in white, creating a peaceful winter landscape. The air becomes crisp and fresh, and even familiar places look new and beautiful. Snow slows life down, inviting people to pause and enjoy the moment. Footsteps sound quieter, and the world feels more gentle. Children play outside, building snowmen and laughing, while adults admire the calm beauty from warm windows. Snow brings a sense of purity and balance, reminding us that nature has its own rhythm. Winter silence helps clear thoughts and creates space for reflection. Even though snow can be cold, it brings warmth to the heart through memories, joy, and simple pleasures. Snow shows that beauty does not need noise, only time and patience to be truly appreciated.",
                        "The New Year represents new beginnings, fresh hopes, and endless possibilities. As the old year comes to an end, people reflect on their experiences, lessons, and achievements. The New Year arrives with excitement and optimism, encouraging change and growth. Fireworks light the sky, symbolizing a bright start and a clean slate. Many people make resolutions, set goals, and dream about the future. The New Year is a time to believe in improvement and new opportunities. It brings motivation to leave behind worries and move forward with confidence. Winter nights feel special as people celebrate with family and friends, welcoming the year together. The New Year is not only about celebration, but also about determination and courage. Each new year offers a chance to grow stronger, wiser, and kinder. It reminds us that time moves forward, and every day is an opportunity to create something better."
                ],

                hardcore: ["Winter is a season that many associate with cold and darkness, yet it has a unique peace and purifying power. When the first snowflakes slowly fall on the frozen ground, the world seems to stop. The hurried rhythm of everyday life is replaced by muted sounds, and nature goes on a well-deserved rest, wrapped in a thick, white blanket. One of the most beautiful aspects of winter is its visual aesthetics. Snow is not just precipitation; it is an artist who transforms the landscape. Usually, trees become luxurious sculptures, but frosted window panes resemble delicate lace patterns. On sunny winter days, when the snow shines like millions of tiny crystals, a fabulous feeling arises that makes you forget about the yellowness caused by frost. This white silence helps to organize your thoughts and provides visual relief from the grayness of the city. However, winter is not only external beauty, it is also a time to search for inner warmth. When a blizzard rages outside or the thermometer drops below zero, we appreciate the feeling of home more. Winter brings us together over a warm cup of tea, by candlelight or by a lit fireplace. It is a time to focus on ourselves: reading books that have been postponed for later, lingering in conversations with loved ones or simply enjoying a moment with ourselves. The dark evenings of winter are not meant for sadness, but for peaceful reflection and accumulating strength before the spring awakening. Active recreation in winter also provides special energy. Skating on natural ice, a sleigh ride or a quiet hike through a snowy forest allows you to feel a connection with nature in its harshest, but at the same time most true form. The fresh, cool air clears the mind and makes the blood flow faster, reminding us of our own vitality. In conclusion, we can say that winter is a stage of transition and preparation. It teaches us patience and the ability to see beauty in simplicity. Even though winter can be harsh and long, it is necessary for us to later be able to fully appreciate the first warmth of spring and the victory of life over frost. Winter is nature's deep breath before the beginning of the next life cycle.", 
                    "Snow is one of the most fascinating natural phenomena, capable of completely changing not only the landscape, but also the inner world of a person's feelings. When the first flakes begin to fall from the gray winter sky, the world seems to hold its breath. It is not just a type of precipitation; it is a symbol of peace, purity and the ability of nature to renew itself. One of the most unique properties of snow is its ability to give silence. Freshly fallen snow acts as a natural sound insulator, absorbing the hum of the city and the daily rush. In this silence, a person remains face to face with himself. A walk in a snowy forest, where only the crunch of snow underfoot can be heard, provides a therapeutic peace that no modern noise suppressor can replace. Snow forces us to slow down both literally, moving more carefully, and emotionally, forcing us to stop and appreciate the beauty of the moment. Visually, snow is a great artist. It covers bare branches, rough ridges of houses and muddy roads with a sparkling white sheet, turning the surrounding area into a fairy-tale kingdom. Each snowflake is a unique crystal, a masterpiece of natural engineering, reminding us of the complexity and fragility of the world at the same time. However, snow also has a dual nature. While it delights children with sledding and building snowmen, it reminds us of the power and harshness of nature. Snowstorms and cold require us to be resilient and adaptable. Finally, snow is a promise. Under the thick layer of snow, nature sleeps and gathers strength for spring. It serves as a protective layer for the earth, protecting the roots of plants from freezing. Thus, snow is not the end, but a necessary pause in the cycle of life. It teaches us that sometimes it is necessary to hide from the world and hibernate, in order to return later with new energy. In conclusion, we can say that snow is more than frozen water. It is a gift from nature that makes us see beauty in simplicity and find peace in chaos. As long as the ground is covered in white snow, the hope of a clean, new beginning will live within us.", 
                    "The New Year is one of those rare moments when the whole world seems to hold its breath for a moment. It is not just a change of date on the calendar; it is a symbolic threshold where past experiences meet the unknown of the future. This time offers us a unique opportunity to stop, evaluate what has been accomplished, and with a clear conscience open the door to a new beginning. In the last days of the year, we often become nostalgic. We remember the victories that made our hearts beat faster and the losses that hardened us. It is important to understand that every event, regardless of its emotional hue, has been a valuable teacher. Gratitude is the keyword that helps to close the old stage, gratitude for the people we met, the lessons we learned, and even the difficulties that helped us grow. Without this look back, new goals can seem empty because they are not based on our true experiences. With the midnight fireworks and champagne bubbles, new energy is born within us. New year, new me, this phrase, no matter how often heard, embodies the natural human desire for improvement. We promise ourselves to live healthier, learn something new or simply be better to those around us. However, more important than loud promises is the inner intention. The New Year reminds us that we can change the direction of our lives at any time, as long as we have the courage to take the first step. The New Year is a time of hope. It teaches us that time is our most valuable resource, and each January morning is like a blank sheet of paper that we can fill with our own stories. In the end, it is not so important how grandiose our plans are, but how much love, perseverance and joy we will put into each of the 365 days. May this year become an opportunity to become the best version of ourselves!"
                ]
            }
        };

        const possibleTexts = this.texts[this.language][this.level];
        this.text = possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
        
        this.startTime = null;
        this.timerInterval = null;
        this.isStarted = false;
        this.isFinished = false;
    }

    start() {
        const display = document.getElementById("text-display");
        display.innerHTML = this.text.split(' ').map(word => `<span>${word}</span>`).join(' ');
        
        const input = document.getElementById("typing-input");
        input.innerText = "";
        input.focus();
        
        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (this.isStarted && !this.isFinished) this.finish();
                return;
            }

            if (!this.isStarted && e.key !== "Escape") {
                this.isStarted = true;
                this.startTime = Date.now();
                this.startTimer();
            }
        };

        input.oninput = () => this.checkInput(input.innerText);
    }

    checkInput(userInput) {
        if (this.isFinished) return;

        const spans = document.querySelectorAll("#text-display span");
        const targetWords = this.text.split(' ');
        const userWords = userInput.trim().split(/\s+/);

        targetWords.forEach((word, i) => {
            if (!userWords[i]) {
                spans[i].className = '';
            } else if (userWords[i] === word) {
                spans[i].className = 'correct';
            } else {
                spans[i].className = 'incorrect';
            }
            if (userWords.length - 1 === i) spans[i].classList.add('current');
        });

        const progress = Math.min((userWords.length / targetWords.length) * 100, 100);
        document.getElementById("progress-bar").style.width = `${progress}%`;

        if (userWords.length === targetWords.length && userWords[userWords.length-1] === targetWords[targetWords.length-1]) {
            this.finish();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            const userWords = document.getElementById("typing-input").innerText.trim().split(/\s+/).length;
            const wpm = Math.round((userWords / elapsed) * 60) || 0;
            
            document.getElementById("timer").textContent = `Laiks: ${Math.floor(elapsed)}s`;
            document.getElementById("wpm").textContent = `WPM: ${wpm}`;
        }, 500);
    }

    finish() {
        if (this.isFinished) return;
        this.isFinished = true;
        clearInterval(this.timerInterval);

        const elapsed = (Date.now() - this.startTime) / 1000;
        const wordsCount = this.text.split(' ').length;
        const wpm = Math.round((wordsCount / elapsed) * 60);
        
        this.saveScore(wpm, Math.floor(elapsed));
        alert(`Gatavs! Tavs ātrums: ${wpm} WPM`);
        document.getElementById("restart-btn").style.display = "block";
    }

    saveScore(wpm, time) {
        const formData = new FormData();
        formData.append('level', this.level);
        formData.append('language', this.language);
        formData.append('wpm', wpm);
        formData.append('time_seconds', time);

        fetch("/typing", { 
            method: "POST", 
            body: formData 
        })
        .then(res => res.json())
        .then(data => {
            console.log("Rezultāts saglabāts:", data);
            updateLeaderboardUI(); // Tagad šī funkcija ir definēta zemāk!
        })
        .catch(err => console.error("Kļūda saglabājot:", err));
    }
}

// --- GLOBĀLĀS FUNKCIJAS (Atrodas ārpus klases) ---

let currentLang = 'lv';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        // Pārbauda vai pogas teksts vai onclick satur doto valodu
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(lang));
    });
    if (window.activeLevel) startTypingGame(window.activeLevel);
}

function startTypingGame(level) {
    window.activeLevel = level;
    // Ja ir vecs taimeris, to nodzēšam
    const timerElem = document.getElementById("timer");
    const wpmElem = document.getElementById("wpm");
    if(timerElem) timerElem.textContent = "Laiks: 0s";
    if(wpmElem) wpmElem.textContent = "WPM: 0";
    
    const game = new TypingGame(level, currentLang);
    game.start();
    document.getElementById("restart-btn").style.display = "none";
}

function updateLeaderboardUI() {
    const flags = { lv: '🇱🇻', en: '🇬🇧'};

fetch('/controllers/typing/getTopTyping.php')
        .then(res => {
            if (!res.ok) throw new Error('404');
            return res.json();
        })
        .then(data => {
            Object.keys(data).forEach(lvl => {
                const list = document.querySelector(`.score-card[data-level="${lvl}"] ol`);
                if (list) {
                    if (!data[lvl] || data[lvl].length === 0) {
                        list.innerHTML = "<li>Nav rekordu</li>";
                    } else {
                        list.innerHTML = data[lvl].map(s => `
                            <li>
                                <span>${flags[s.language] || '🌐'}</span>
                                <strong>${s.username}</strong>: ${parseFloat(s.wpm).toFixed(1)} WPM
                            </li>
                        `).join('');
                    }
                }
            });
        })
        .catch(err => console.error("Leaderboard kļūda:", err));
}

const inputField = document.getElementById('typing-input');
const textDisplay = document.getElementById('text-display');

// Neļauj ielīmēt tekstu rakstīšanas laukā
inputField.onpaste = (e) => {
    e.preventDefault();
    return false;
};

// Papildus drošība: Neļauj izmantot Ctrl+C uz teksta lauka
textDisplay.oncopy = (e) => {
    e.preventDefault();
    return false;
};

// Izsaucam vienreiz ielādējot lapu, lai aizpildītu datus
document.addEventListener("DOMContentLoaded", updateLeaderboardUI);