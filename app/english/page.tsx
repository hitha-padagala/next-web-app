"use client";
import { useState } from "react";
import Link from "next/link";

type Section = "grammar" | "moral-stories" | "ramayana" | "krishna" | "disney";

interface GrammarQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  emoji: string;
}

interface MoralStory {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  characters?: string[];
}

interface IndianStory {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  characters: string[];
}

interface DisneyStory {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  princess: string;
}

const grammarQuestions: GrammarQuestion[] = [
  {
    question: "The cat is ___ on the mat",
    options: ["sit", "sitting", "sits"],
    answer: "sitting",
    explanation:
      "We use 'sitting' because the action is happening now (present continuous tense)",
    emoji: "🐱",
  },
  {
    question: "She ___ to school every day",
    options: ["go", "goes", "going"],
    answer: "goes",
    explanation: "We use 'goes' with he/she/it in simple present tense",
    emoji: "🏫",
  },
  {
    question: "They are ___ cricket in the park",
    options: ["play", "playing", "plays"],
    answer: "playing",
    explanation: "We use 'playing' after 'are' (present continuous tense)",
    emoji: "🏏",
  },
  {
    question: "I ___ a mango every morning",
    options: ["eat", "eats", "eating"],
    answer: "eat",
    explanation: "We use 'eat' with I/we/you/they in simple present tense",
    emoji: "🥭",
  },
  {
    question: "The sun ___ in the east",
    options: ["rise", "rises", "rising"],
    answer: "rises",
    explanation: "We use 'rises' because the sun is singular (it)",
    emoji: "🌅",
  },
  {
    question: "We ___ to the market yesterday",
    options: ["go", "went", "gone"],
    answer: "went",
    explanation: "We use 'went' for past tense of 'go'",
    emoji: "🛒",
  },
  {
    question: "The birds ___ in the sky",
    options: ["fly", "flies", "flying"],
    answer: "fly",
    explanation: "We use 'fly' with plural subjects like 'birds'",
    emoji: "🐦",
  },
  {
    question: "He ___ a beautiful picture",
    options: ["draw", "drew", "drawn"],
    answer: "drew",
    explanation: "We use 'drew' for past tense of 'draw'",
    emoji: "🎨",
  },
  {
    question: "The dog ___ very loudly",
    options: ["bark", "barks", "barking"],
    answer: "barks",
    explanation: "We use 'barks' with he/she/it (the dog is singular)",
    emoji: "🐕",
  },
  {
    question: "I have ___ my homework",
    options: ["finish", "finished", "finishing"],
    answer: "finished",
    explanation: "We use 'finished' after 'have' (present perfect tense)",
    emoji: "📝",
  },
  {
    question: "The moon ___ at night",
    options: ["shine", "shines", "shining"],
    answer: "shines",
    explanation: "We use 'shines' because the moon is singular (it)",
    emoji: "🌙",
  },
  {
    question: "She ___ a song beautifully",
    options: ["sing", "sings", "singing"],
    answer: "sings",
    explanation: "We use 'sings' with he/she/it in simple present tense",
    emoji: "🎵",
  },
  {
    question: "The children ___ in the garden",
    options: ["play", "plays", "playing"],
    answer: "play",
    explanation: "We use 'play' with plural subjects like 'children'",
    emoji: "🌺",
  },
  {
    question: "He ___ to music every evening",
    options: ["listen", "listens", "listening"],
    answer: "listens",
    explanation: "We use 'listens' with he/she/it in simple present tense",
    emoji: "🎧",
  },
  {
    question: "The fish ___ in the water",
    options: ["swim", "swims", "swimming"],
    answer: "swim",
    explanation: "We use 'swim' with plural or collective subjects",
    emoji: "🐟",
  },
];

const moralStories: MoralStory[] = [
  {
    title: "The Thirsty Crow",
    story:
      "Once upon a time, there was a crow. He was very thirsty. He flew here and there looking for water. At last, he found a pot with some water. But the water was very low. He could not reach it. The clever crow picked up small stones and dropped them into the pot. The water came up. The crow drank the water and flew away happily.",
    lesson: "Where there is a will, there is a way! 🌟",
    emoji: "🐦‍⬛",
  },
  {
    title: "The Lion and the Mouse",
    story:
      "Once a lion was sleeping. A little mouse started playing on him. The lion woke up and caught the mouse. The mouse said, 'Please let me go! I will help you someday.' The lion laughed and let him go. One day, the lion was caught in a hunter's net. The mouse came and cut the net with his sharp teeth. The lion was saved!",
    lesson: "No act of kindness, no matter how small, is ever wasted! 💝",
    emoji: "🦁",
  },
  {
    title: "The Tortoise and the Hare",
    story:
      "Once a hare made fun of a tortoise for being slow. The tortoise said, 'Let us have a race!' The hare ran very fast and was soon far ahead. He thought, 'I have plenty of time. Let me take a nap.' The tortoise kept walking slowly but steadily. When the hare woke up, the tortoise had already reached the finish line!",
    lesson: "Slow and steady wins the race! 🏆",
    emoji: "🐢",
  },
  {
    title: "The Greedy Dog",
    story:
      "Once there was a dog. He found a piece of meat. He was crossing a bridge over a stream. He saw his reflection in the water. He thought it was another dog with a bigger piece of meat. He barked to scare the other dog. As soon as he opened his mouth, his meat fell into the water. The greedy dog lost everything!",
    lesson: "Greed is a curse! Be happy with what you have! 🎁",
    emoji: "🐕",
  },
  {
    title: "The Ant and the Grasshopper",
    story:
      "In summer, the ant worked hard collecting food for winter. The grasshopper laughed at him and said, 'Why work so hard? Come and sing with me!' The ant kept working. When winter came, the grasshopper had no food. He was hungry and cold. The ant had plenty of food and lived happily.",
    lesson: "Work today, enjoy tomorrow! Always plan ahead! 📅",
    emoji: "🐜",
  },
  {
    title: "The Boy Who Cried Wolf",
    story:
      "A shepherd boy used to watch sheep near a village. He was bored and shouted, 'Wolf! Wolf!' The villagers came running. The boy laughed. This happened many times. One day, a real wolf came. The boy shouted for help, but no one came. The wolf attacked the sheep.",
    lesson: "Nobody believes a liar, even when they tell the truth! 🤥",
    emoji: "🐺",
  },
  {
    title: "The Golden Egg",
    story:
      "A farmer had a magical hen that laid golden eggs every day. The farmer became rich. But he was greedy. He thought, 'If I cut open the hen, I can get all the eggs at once!' He killed the hen but found nothing inside. Now he had no hen and no golden eggs!",
    lesson: "Greed destroys what you already have! 🥚",
    emoji: "🐔",
  },
  {
    title: "The Honest Woodcutter",
    story:
      "A woodcutter was cutting wood near a river. His axe fell into the water. He began to cry. The river god appeared and showed him a golden axe. The woodcutter said, 'That is not mine.' Then the god showed a silver axe. Again he said no. Finally, the god showed his iron axe. The woodcutter said, 'This is mine!' The god was pleased and gave him all three axes.",
    lesson: "Honesty is the best policy! Always tell the truth! ✨",
    emoji: "🪓",
  },
  {
    title: "The Fox and the Grapes",
    story:
      "A fox saw some ripe grapes hanging from a vine. He wanted to eat them. He jumped and jumped but could not reach them. He tried many times but failed. At last, he walked away saying, 'The grapes are sour anyway!'",
    lesson: "It is easy to despise what you cannot have! 🍇",
    emoji: "🦊",
  },
  {
    title: "The Two Friends and the Bear",
    story:
      "Two friends were walking through a forest. Suddenly, they saw a bear. One friend quickly climbed a tree. The other friend could not climb, so he lay down and pretended to be dead. The bear came, sniffed him, and walked away. The friend in the tree came down and asked, 'What did the bear say?' The other friend replied, 'The bear said: Never trust a false friend!'",
    lesson: "A true friend is one who helps in times of need! 🤝",
    emoji: "🐻",
  },
];

const ramayanaStories: IndianStory[] = [
  {
    title: "Baby Rama",
    story:
      "Long ago, in the kingdom of Ayodhya, King Dasharatha had four sons. The eldest was Rama. Baby Rama was very special. He had big lotus eyes and a sweet smile. Everyone loved to see baby Rama crawl and play. When he was a little boy, he could break the great bow of Lord Shiva! Even as a child, Rama was brave and kind. He always listened to his parents and teachers.",
    lesson: "Always respect your elders and be kind to everyone! 🙏",
    emoji: "👶",
    characters: ["Rama", "King Dasharatha", "Queen Kaushalya"],
  },
  {
    title: "Rama Goes to the Forest",
    story:
      "When Rama was young, his father's wife Kaikeyi asked the king to send Rama to the forest for 14 years. Rama was very sad but he kept his promise. His wife Sita and brother Lakshmana went with him. In the forest, they lived simply. They wore clothes made of bark and ate fruits and roots. Rama never complained. He was always brave and happy.",
    lesson: "Keep your promises no matter how difficult! 💪",
    emoji: "🌲",
    characters: ["Rama", "Sita", "Lakshmana"],
  },
  {
    title: "Hanuman Meets Rama",
    story:
      "One day, Rama met a great devotee named Hanuman. Hanuman was a vanara (monkey) with great strength. When Hanuman met Rama, he bowed down and said, 'I am your servant, my Lord!' Rama hugged Hanuman. From that day, Hanuman became Rama's best friend and helper. Hanuman always helped Rama with his great strength and devotion.",
    lesson: "True friendship and devotion can overcome any obstacle! 🤝",
    emoji: "🐒",
    characters: ["Rama", "Hanuman"],
  },
  {
    title: "Sita in the Garden",
    story:
      "When Rama, Sita, and Lakshmana lived in the forest, they had a beautiful hut near a river. Sita loved the flowers in the forest. One day, a golden deer came near their hut. Sita liked it very much and asked Rama to catch it for her. The golden deer was actually a demon in disguise. This was the beginning of many troubles, but Sita remained brave and faithful.",
    lesson: "Do not be fooled by beautiful appearances! 🦌",
    emoji: "🌸",
    characters: ["Sita", "Rama", "Lakshmana"],
  },
  {
    title: "Hanuman Flies to Lanka",
    story:
      "When the demon king Ravana took Sita to Lanka, Rama needed to find her. Hanuman said, 'I will find Mother Sita!' Hanuman grew very big and jumped across the ocean. He flew to Lanka and found Sita sitting under a tree. Hanuman gave her Rama's ring as a sign. Sita was happy to hear about Rama. Hanuman then burned Lanka with his tail and returned to Rama with the good news!",
    lesson: "Devotion and courage can achieve the impossible! 🔥",
    emoji: "🏝️",
    characters: ["Hanuman", "Sita", "Rama"],
  },
  {
    title: "The Bridge to Lanka",
    story:
      "Rama needed to reach Lanka to rescue Sita. The ocean was very wide. Rama prayed to the ocean god. Then, all the vanaras (monkeys) and bears started building a bridge! They wrote Rama's name on stones and threw them into the ocean. Amazingly, the stones floated! Soon, a beautiful bridge was ready. Rama and his army crossed the bridge to Lanka.",
    lesson: "When everyone works together, great things happen! 🌉",
    emoji: "🌊",
    characters: ["Rama", "Hanuman", "Vanaras"],
  },
  {
    title: "Rama Defeats Ravana",
    story:
      "Ravana was a powerful demon king with ten heads. He had taken Sita to Lanka. Rama fought a great battle with Ravana. Ravana was very strong, but Rama was stronger because he was good and righteous. Rama prayed to Goddess Durga and shot a powerful arrow. The arrow hit Ravana and he fell down. Good had won over evil! Everyone cheered for Rama.",
    lesson: "Good always wins over evil! Be brave and do good! ⚔️",
    emoji: "🏹",
    characters: ["Rama", "Ravana", "Sita"],
  },
  {
    title: "Rama Returns to Ayodhya",
    story:
      "After 14 years, Rama, Sita, and Lakshmana returned to Ayodhya. The people of Ayodhya were very happy! They lit thousands of oil lamps to welcome Rama. The whole city was decorated with lights and flowers. This day is celebrated as Diwali - the festival of lights! Rama became the king and everyone lived happily ever after.",
    lesson: "Patience and goodness are always rewarded! 🪔",
    emoji: "🏰",
    characters: ["Rama", "Sita", "Lakshmana", "People of Ayodhya"],
  },
  {
    title: "Jatayu the Brave Bird",
    story:
      "When Ravana was taking Sita to Lanka, a brave old bird named Jatayu tried to save her. Jatayu was a great warrior in his youth. Even though he was old, he fought bravely with Ravana. Ravana cut his wings, but Jatayu did not give up. He fell down but remembered everything. Later, Rama found Jatayu and gave him peace. Jatayu is remembered as a great hero!",
    lesson:
      "Bravery is not about age or strength, but about courage in heart! 🦅",
    emoji: "🐦",
    characters: ["Jatayu", "Sita", "Ravana"],
  },
  {
    title: "The Loyal Lakshmana",
    story:
      "Lakshmana was Rama's younger brother. He loved Rama very much. When Rama went to the forest, Lakshmana went with him. For 14 years, Lakshmana served Rama and Sita. He never slept at night and guarded them. When Sita was in trouble, Lakshmana drew a line around the hut and told her not to cross it. Lakshmana is remembered for his loyalty and devotion.",
    lesson: "Love and loyalty to family is the greatest virtue! 💝",
    emoji: "🛡️",
    characters: ["Lakshmana", "Rama", "Sita"],
  },
];

const krishnaStories: IndianStory[] = [
  {
    title: "Baby Krishna's Birth",
    story:
      "Long ago, there was a wicked king named Kamsa. He was afraid of a prophecy that said his cousin's child would defeat him. So he locked his cousin Devaki and her husband in prison. When baby Krishna was born, something magical happened! The prison doors opened by themselves. Krishna's father carried the baby across the river Yamuna to a safe place in Gokul. Baby Krishna was safe!",
    lesson:
      "God always protects the innocent! Divine power is beyond everything! ✨",
    emoji: "👶",
    characters: ["Baby Krishna", "Devaki", "Vasudeva"],
  },
  {
    title: "Krishna Steals Butter",
    story:
      "Little Krishna loved butter very much! His mother Yashoda would hang butter pots high up so Krishna could not reach them. But clever Krishna would call his friends, and they would make a human pyramid! Krishna would climb on top and break the pot. When Mother Yashoda found out, she would pretend to be angry, but she loved her naughty Krishna very much!",
    lesson:
      "Childhood is the most beautiful time of life! Enjoy every moment! 🧈",
    emoji: "🧈",
    characters: ["Krishna", "Mother Yashoda", "Friends"],
  },
  {
    title: "Krishna and the Serpent Kaliya",
    story:
      "In the river Yamuna lived a poisonous serpent named Kaliya. The water became so poisonous that no one could drink it. Little Krishna jumped into the river! Kaliya wrapped around Krishna, but Krishna danced on Kaliya's many heads. Kaliya realized Krishna was God and left the river. The water became clean again, and everyone was happy!",
    lesson: "Courage and goodness can defeat any evil! Be brave! 🐍",
    emoji: "🐍",
    characters: ["Krishna", "Kaliya", "People of Vrindavan"],
  },
  {
    title: "Krishna Lifts Govardhan Hill",
    story:
      "The people of Vrindavan used to worship Lord Indra for rain. Little Krishna said, 'Why worship Indra? Nature gives us everything!' The people agreed with Krishna. Indra became very angry and sent a huge storm. Krishna lifted the Govardhan Hill on his little finger and held it like an umbrella! All the people and animals stayed safe under it for seven days!",
    lesson: "True devotion is more powerful than pride! Protect nature! 🏔️",
    emoji: "🏔️",
    characters: ["Krishna", "Lord Indra", "People of Vrindavan"],
  },
  {
    title: "Krishna and Sudama",
    story:
      "Krishna had a poor friend named Sudama. They studied together when they were young. Many years later, Sudama was very poor and hungry. His wife said, 'Go meet Krishna! He can help you.' Sudama went with just a handful of beaten rice as a gift. Krishna welcomed him with love and ate the rice happily! Krishna blessed Sudama, and he became rich. True friendship never forgets!",
    lesson: "True friendship is priceless! Never forget your old friends! 🤝",
    emoji: "👫",
    characters: ["Krishna", "Sudama"],
  },
  {
    title: "Krishna Plays the Flute",
    story:
      "Krishna was not only brave but also very musical! He played a beautiful flute. When Krishna played his flute in the forests of Vrindavan, all the cows, birds, and even the trees would stop to listen. The peacocks would dance! The gopis would smile. The whole of nature loved Krishna's music. His flute music was so sweet that everyone felt peaceful and happy.",
    lesson: "Music brings peace and joy to everyone! Share your talents! 🎵",
    emoji: "🎶",
    characters: ["Krishna", "Cows", "Peacocks", "Gopis"],
  },
  {
    title: "Krishna and the Demon Putana",
    story:
      "The wicked king Kamsa sent a demon named Putana to harm baby Krishna. Putana disguised herself as a beautiful woman and tried to feed Krishna poisoned milk. But baby Krishna knew she was a demon! He drank the milk and also drank all of Putana's life force! Putana fell down and showed her true form. Baby Krishna saved everyone!",
    lesson: "Evil can never defeat good! God protects those who are pure! 👼",
    emoji: "👹",
    characters: ["Baby Krishna", "Putana", "Yashoda"],
  },
  {
    title: "Krishna as a Cowherd",
    story:
      "Young Krishna lived in Vrindavan as a cowherd boy. Every morning, he would take the cows to the forest. He played with his friends, sang songs, and took care of the cows. The cows loved Krishna so much! They would follow him everywhere. Krishna knew the name of every cow. He was the best cowherd in all of Vrindavan!",
    lesson: "Love and care for all living beings! Be responsible! 🐄",
    emoji: "🐄",
    characters: ["Krishna", "Cows", "Friends"],
  },
  {
    title: "Krishna and the Rainbow Peacock",
    story:
      "Krishna loved peacocks very much. One day, a beautiful peacock came to Krishna and said, 'I want to dance for you, Lord!' Krishna played his flute, and the peacock danced beautifully. Krishna was so happy that he blessed the peacock with beautiful rainbow colors. That is why peacocks have such colorful feathers even today!",
    lesson:
      "Beauty comes from devotion and love! Appreciate nature's beauty! 🦚",
    emoji: "🦚",
    characters: ["Krishna", "Peacock"],
  },
  {
    title: "Krishna's Divine Form",
    story:
      "One day, Mother Yashoda was feeding Krishna. She looked into his mouth and saw something amazing! Inside Krishna's mouth, she saw the entire universe - stars, planets, oceans, mountains, and all living beings! Yashoda was amazed. She realized her little Krishna was the Supreme God himself! But Krishna smiled and made her forget, so she could continue loving him as her baby.",
    lesson:
      "God is everywhere and in everything! The divine is beyond our imagination! 🌌",
    emoji: "🌌",
    characters: ["Krishna", "Mother Yashoda"],
  },
];

const disneyStories: DisneyStory[] = [
  {
    title: "Cinderella's Dream",
    story:
      "Cinderella was a kind girl who lived with her wicked stepmother and two stepsisters. They made her work all day and sleep by the fireplace. But Cinderella never lost hope. She believed that dreams come true! One day, the King invited all girls to a royal ball. Cinderella wanted to go, but her stepmother said no. Her Fairy Godmother appeared and made a beautiful dress and a glass slipper! At the ball, the Prince danced with Cinderella. When the clock struck midnight, she ran away and left one glass slipper. The Prince found her, and they lived happily ever after!",
    lesson:
      "Never give up on your dreams! Kindness and courage will always win! 👗",
    emoji: "👠",
    princess: "Cinderella",
  },
  {
    title: "Snow White and the Seven Dwarfs",
    story:
      "Snow White was a beautiful princess with skin as white as snow. Her wicked stepmother, the Queen, was jealous of her beauty. The Queen ordered a huntsman to take Snow White to the forest. But the huntsman let her go. Snow White found a small cottage and lived with seven friendly dwarfs: Doc, Grumpy, Happy, Sleepy, Bashful, Sneezy, and Dopey! The Queen tricked Snow White with a poisoned apple, but a Prince's kiss broke the spell. Good won over evil!",
    lesson: "True love and kindness can break any spell! Be good to others! 🍎",
    emoji: "👸",
    princess: "Snow White",
  },
  {
    title: "Belle and the Beast",
    story:
      "Belle was a smart and brave girl who loved reading books. Her father got lost in a dark forest and found a castle. A scary Beast lived there! The Beast kept Belle's father prisoner. Belle bravely offered to stay instead. At first, Belle was scared of the Beast. But slowly, she saw that the Beast had a kind heart. Belle taught the Beast to be gentle and loving. Because of Belle's love, the Beast turned back into a handsome Prince! They lived happily ever after.",
    lesson: "Don't judge by appearances! True beauty is inside! 📚",
    emoji: "🌹",
    princess: "Belle",
  },
  {
    title: "Ariel's Ocean Adventure",
    story:
      "Ariel was a mermaid princess who lived under the sea. She loved collecting human things and dreamed of living on land. One day, she saved a Prince named Eric from a shipwreck and fell in love with him. Ariel made a deal with the sea witch Ursula to get legs. But Ursula tricked her! With her father's help and the Prince's love, Ariel defeated Ursula. Ariel got her voice back and could choose to live on land with the Prince she loved!",
    lesson: "Follow your heart, but be careful who you trust! Be brave! 🧜‍♀️",
    emoji: "🧜‍♀️",
    princess: "Ariel",
  },
  {
    title: "Rapunzel's Tower",
    story:
      "Rapunzel was a princess with magical long golden hair. A wicked witch named Mother Gothel locked her in a tall tower. Rapunzel could only see the world through her window. Every year on her birthday, she saw floating lights in the sky and wondered what they were. One day, a thief named Flynn Rider climbed her tower! Rapunzel made him take her to see the lights. They had amazing adventures together! Rapunzel discovered she was the lost princess and returned to her real parents.",
    lesson:
      "Be brave and explore the world! Your dreams are worth fighting for! 🏰",
    emoji: "💇‍♀️",
    princess: "Rapunzel",
  },
  {
    title: "Moana and the Ocean",
    story:
      "Moana was a brave girl from an island. The ocean chose her for a special mission! Her island was dying because the heart of the goddess Te Fiti was stolen. Moana sailed across the ocean with the demigod Maui. They faced giant monsters and dangerous storms. Moana was scared but she didn't give up. She found Maui and together they returned the heart to Te Fiti. The island was saved! Moana became a great leader and explorer.",
    lesson:
      "Be brave and follow your calling! You can do anything you set your mind to! 🌊",
    emoji: "🌺",
    princess: "Moana",
  },
  {
    title: "Elsa's Ice Powers",
    story:
      "Elsa was a princess with magical ice powers. When she was little, she accidentally hurt her sister Anna. Elsa was scared of her powers and locked herself away for years. When she became Queen, her powers were revealed and she ran away to the mountains. She built a beautiful ice castle! Anna went to find her and showed Elsa that love is the key to controlling fear. Elsa learned that love makes us strong. She used her powers to bring joy to everyone!",
    lesson: "Don't be afraid of who you are! Love conquers all fear! ❄️",
    emoji: "❄️",
    princess: "Elsa",
  },
  {
    title: "Anna's True Love",
    story:
      "Anna was Elsa's younger sister. She was brave, fun, and full of love! When Elsa's ice powers made the kingdom freeze forever, Anna went to find her sister. Anna met a kind ice seller named Kristoff and a funny reindeer named Sven. They went on an adventure together! When Anna's heart was frozen, only true love could save her. Instead of waiting for a prince, Anna sacrificed herself to save Elsa. That act of true sisterly love broke the spell and saved everyone!",
    lesson:
      "Family love is the strongest love of all! Be selfless and brave! 💝",
    emoji: "⛄",
    princess: "Anna",
  },
  {
    title: "Jasmine's Brave Choice",
    story:
      "Jasmine was a princess who lived in a magical kingdom. She did not want to marry someone just because they were a prince. She wanted to marry someone who loved her for who she was! Jasmine ran away from the palace and met a poor boy named Aladdin. They had amazing adventures on a magic carpet! Jasmine was brave and stood up to the evil Jafar. She showed that princesses can be strong and make their own choices!",
    lesson:
      "Be yourself and stand up for what you believe in! You are strong! 🧞",
    emoji: "🕌",
    princess: "Jasmine",
  },
  {
    title: "Tiana's Hard Work",
    story:
      "Tiana was a hardworking girl who dreamed of opening her own restaurant. She worked two jobs and saved every coin! One day, a frog prince named Naveen asked her to kiss him so he would turn back into a human. But Tiana turned into a frog too! They went on an adventure in the bayou. Tiana learned that wishes don't come true just by asking - you have to work hard! In the end, Tiana and Naveen fell in love, turned back into humans, and opened their restaurant together!",
    lesson:
      "Hard work and determination make dreams come true! Never give up! 🐸",
    emoji: "🍽️",
    princess: "Tiana",
  },
];

const sectionConfig: Record<
  Section,
  { label: string; emoji: string; color: string }
> = {
  grammar: {
    label: "Grammar Quiz",
    emoji: "📝",
    color: "from-green-400 to-emerald-500",
  },
  "moral-stories": {
    label: "Moral Stories",
    emoji: "📚",
    color: "from-purple-400 to-pink-500",
  },
  ramayana: {
    label: "Ramayana",
    emoji: "🏹",
    color: "from-orange-400 to-red-500",
  },
  krishna: {
    label: "Krishna Stories",
    emoji: "🦚",
    color: "from-blue-400 to-indigo-500",
  },
  disney: {
    label: "Disney Princess",
    emoji: "👑",
    color: "from-pink-400 to-rose-500",
  },
};

export default function EnglishPage() {
  const [activeSection, setActiveSection] = useState<Section>("grammar");
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [ramayanaIndex, setRamayanaIndex] = useState(0);
  const [krishnaIndex, setKrishnaIndex] = useState(0);
  const [disneyIndex, setDisneyIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showStoryMoral, setShowStoryMoral] = useState(false);

  const currentQuestion = grammarQuestions[grammarIndex];

  const checkAnswer = (opt: string) => {
    if (opt === currentQuestion.answer) {
      setResult("🎉 Correct! Great job!");
      setScore((s) => s + 1);
    } else {
      setResult(`❌ Oops! The answer is "${currentQuestion.answer}"`);
    }
    setShowExplanation(true);

    setTimeout(() => {
      setResult("");
      setShowExplanation(false);
      setGrammarIndex((i) => (i + 1) % grammarQuestions.length);
    }, 2500);
  };

  const renderStorySection = (
    stories: IndianStory[] | DisneyStory[],
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    sectionColor: string,
    borderColor: string,
    bgColor: string,
    title: string,
    showCharacters: boolean = true,
  ) => {
    const current = stories[currentIndex];
    const isDisney = "princess" in current;

    return (
      <div
        className={`bg-white rounded-3xl shadow-xl p-6 border-4 ${borderColor} relative`}
      >
        {/* Decorative corner emojis */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
          {current.emoji}
        </div>
        <div
          className="absolute -top-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          {isDisney ? "👑" : "🪔"}
        </div>
        <div
          className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          {isDisney ? "✨" : "🌟"}
        </div>
        <div
          className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          {isDisney ? "🏰" : "🙏"}
        </div>

        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{
            color: sectionColor.includes("blue")
              ? "#1e40af"
              : sectionColor.includes("pink")
                ? "#be185d"
                : "#c2410c",
          }}
        >
          {title}
        </h2>

        {/* Story Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {stories.map((story, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setShowStoryMoral(false);
              }}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition transform hover:scale-110 ${
                idx === currentIndex
                  ? `bg-gradient-to-br ${sectionColor} text-white shadow-lg`
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {story.emoji}
            </button>
          ))}
        </div>

        {/* Story Content */}
        <div
          className={`bg-gradient-to-r ${bgColor} rounded-2xl p-6 mb-4 border-2 ${borderColor}`}
        >
          <div className="text-center mb-4">
            <span className="text-6xl animate-bounce inline-block">
              {current.emoji}
            </span>
          </div>
          <h3
            className="text-2xl font-bold text-center mb-4"
            style={{
              color: sectionColor.includes("blue") ? "#1e40af" : "#be185d",
            }}
          >
            {current.title}
          </h3>

          {/* Characters/Princess Badge */}
          {showCharacters && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {"characters" in current
                ? current.characters.map((char, idx) => (
                    <span
                      key={idx}
                      className="bg-white px-3 py-1 rounded-full text-sm font-bold border-2"
                      style={{
                        borderColor: sectionColor.includes("blue")
                          ? "#93c5fd"
                          : "#fda4af",
                        color: sectionColor.includes("blue")
                          ? "#1e40af"
                          : "#be185d",
                      }}
                    >
                      {char}
                    </span>
                  ))
                : "princess" in current && (
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-300 text-pink-600">
                      👑 Princess {current.princess}
                    </span>
                  )}
            </div>
          )}

          <div className="text-lg leading-relaxed text-gray-800 mb-4 bg-white rounded-xl p-4 border-2 border-gray-100">
            {current.story}
          </div>

          {showStoryMoral ? (
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-300 text-center animate-pulse">
              <h4 className="font-bold text-yellow-800 mb-2">
                🌟 What We Learn:
              </h4>
              <p className="text-lg text-yellow-700 font-semibold">
                {current.lesson}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowStoryMoral(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-yellow-500 hover:to-amber-600 transition transform hover:scale-110 shadow-lg"
            >
              🌟 See the Lesson!
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              const newIndex =
                (currentIndex - 1 + stories.length) % stories.length;
              setCurrentIndex(newIndex);
              setShowStoryMoral(false);
            }}
            className={`bg-gradient-to-r ${sectionColor} text-white px-6 py-3 rounded-2xl text-lg font-bold transition transform hover:scale-110 shadow-lg`}
          >
            ⬅️ Previous
          </button>
          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % stories.length;
              setCurrentIndex(newIndex);
              setShowStoryMoral(false);
            }}
            className={`bg-gradient-to-r ${sectionColor} text-white px-6 py-3 rounded-2xl text-lg font-bold transition transform hover:scale-110 shadow-lg`}
          >
            ➡️ Next
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">
            Story {currentIndex + 1}
          </span>
          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${sectionColor} transition-all duration-300`}
              style={{
                width: `${((currentIndex + 1) / stories.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">{stories.length}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-purple-100 to-pink-200">
      {/* Floating clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float-slow absolute top-10 left-10 text-6xl">
          ☁️
        </div>
        <div className="animate-float-medium absolute top-20 right-20 text-5xl">
          ☁️
        </div>
        <div className="animate-float-fast absolute top-40 left-1/3 text-4xl">
          ☁️
        </div>
        <div className="animate-float-slow absolute top-60 right-1/4 text-6xl">
          ☁️
        </div>
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-twinkle"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-bounce absolute top-32 left-20 text-4xl"
          style={{ animationDelay: "0s" }}
        >
          📝
        </div>
        <div
          className="animate-bounce absolute top-48 right-16 text-4xl"
          style={{ animationDelay: "0.5s" }}
        >
          📚
        </div>
        <div
          className="animate-bounce absolute bottom-32 left-24 text-4xl"
          style={{ animationDelay: "1s" }}
        >
          🦚
        </div>
        <div
          className="animate-bounce absolute bottom-48 right-24 text-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          👑
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Fun header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl animate-bounce">🔤</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
                English Fun Time!
              </h1>
              <span
                className="text-5xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎯
              </span>
            </div>
            <p className="text-xl font-semibold text-purple-700 drop-shadow-sm">
              {"Hey Champ! Let's Learn English! 🚀"}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(Object.keys(sectionConfig) as Section[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setShowStoryMoral(false);
                }}
                className={`px-5 py-3 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-110 ${
                  activeSection === key
                    ? `bg-gradient-to-br ${sectionConfig[key].color} text-white border-white shadow-lg`
                    : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl mr-2">
                  {sectionConfig[key].emoji}
                </span>
                {sectionConfig[key].label}
              </button>
            ))}
          </div>

          {/* Grammar Quiz Section */}
          {activeSection === "grammar" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-green-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                📝
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ✏️
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                📖
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎓
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-green-700">
                  📝 Grammar Quiz
                </h2>
                <div className="bg-gradient-to-r from-yellow-300 to-amber-300 px-4 py-2 rounded-full font-bold text-lg">
                  ⭐ Score: {score}/{grammarQuestions.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-sm text-gray-500">
                  Question {grammarIndex + 1}
                </span>
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                    style={{
                      width: `${((grammarIndex + 1) / grammarQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {grammarQuestions.length}
                </span>
              </div>

              {/* Question Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 border-2 border-green-200">
                <div className="text-center mb-4">
                  <span className="text-6xl animate-bounce inline-block">
                    {currentQuestion.emoji}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => checkAnswer(opt)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Result */}
                {result && (
                  <div
                    className={`mt-4 text-xl font-bold text-center p-3 rounded-xl ${
                      result.includes("Correct")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result}
                  </div>
                )}

                {/* Explanation */}
                {showExplanation && (
                  <div className="mt-4 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2">
                      💡 Learn Why:
                    </h4>
                    <p className="text-gray-700">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() =>
                    setGrammarIndex(
                      (i) =>
                        (i - 1 + grammarQuestions.length) %
                        grammarQuestions.length,
                    )
                  }
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                >
                  ⬅️ Previous
                </button>
                <button
                  onClick={() =>
                    setGrammarIndex((i) => (i + 1) % grammarQuestions.length)
                  }
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                >
                  ➡️ Next
                </button>
              </div>
            </div>
          )}

          {/* Moral Stories Section */}
          {activeSection === "moral-stories" &&
            renderStorySection(
              moralStories as unknown as IndianStory[],
              storyIndex,
              (i) => {
                setStoryIndex(i);
              },
              "from-purple-400 to-pink-500",
              "border-purple-200",
              "from-purple-50 to-pink-50",
              "📚 Moral Stories for Kids",
              false,
            )}

          {/* Ramayana Stories Section */}
          {activeSection === "ramayana" &&
            renderStorySection(
              ramayanaStories,
              ramayanaIndex,
              (i) => {
                setRamayanaIndex(i);
              },
              "from-orange-400 to-red-500",
              "border-orange-200",
              "from-orange-50 to-red-50",
              "🏹 Ramayana Stories for Kids",
            )}

          {/* Krishna Stories Section */}
          {activeSection === "krishna" &&
            renderStorySection(
              krishnaStories,
              krishnaIndex,
              (i) => {
                setKrishnaIndex(i);
              },
              "from-blue-400 to-indigo-500",
              "border-blue-200",
              "from-blue-50 to-indigo-50",
              "🦚 Krishna Stories for Kids",
            )}

          {/* Disney Princess Stories Section */}
          {activeSection === "disney" &&
            renderStorySection(
              disneyStories,
              disneyIndex,
              (i) => {
                setDisneyIndex(i);
              },
              "from-pink-400 to-rose-500",
              "border-pink-200",
              "from-pink-50 to-rose-50",
              "👑 Disney Princess Stories",
            )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
            >
              🏠 Back to Home
            </Link>
          </div>

          {/* Bottom decorative elements */}
          <div className="mt-8 flex items-center justify-center gap-4 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              🎈
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🌟
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              🎯
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>
              🏆
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.8s" }}>
              🎈
            </span>
          </div>
        </div>
      </div>

      {/* Rainbow decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-red-400 via-green-400 to-purple-400"></div>
    </div>
  );
}
