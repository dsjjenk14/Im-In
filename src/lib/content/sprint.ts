/**
 * The 30 Day Sprint. One short lesson and one action a day, dated from the
 * member's own start date. Paid content. Written in Dominique's voice.
 * `**text**` inside a paragraph renders bold.
 */
export interface SprintDay {
  t: string;
  theme: string;
  lesson: string[];
  action: string;
  note?: string;
  tpl?: { label: string; text: string };
  prompt: string;
}

const W1 = "Week 1 · Get your bearings";
const W2 = "Week 2 · Build the materials";
const W3 = "Week 3 · Go visible";
const W4 = "Week 4 · Talk to people who hire";
const W5 = "Days 29 and 30 · Close the loop";

export const SPRINT_DAYS: SprintDay[] = [
  {
    t: "Pick your lane for the next 30 days", theme: W1,
    lesson: [
      "Most job searches fail on day one, and nobody notices until week six. They fail because the person never decided what they were actually looking for. They apply to a recruiter role on Monday, an HR assistant role on Tuesday, a benefits job on Wednesday, and by Friday they have three different resumes and no idea which one is them.",
      "**For the next 30 days you are looking for one thing.** One role title, one kind of company, one place. You can change it at day 31. But for now, a narrow target lets you write one strong resume, learn one set of search terms, and talk to the right people instead of everybody.",
      "If you took the assessment, use that result. If you are still torn between two, pick the one with more open roles in your area this week. You are not marrying it. You are giving yourself something to aim at.",
    ],
    action: "Write one sentence: I am looking for a [role] at a [kind of company] in [place or remote], and I will not apply to anything else for 30 days.",
    note: "A focused search looks slower for about two weeks. Then it starts pulling ahead, because every message, every application, and every conversation is pointed at the same door.",
    prompt: "I am looking for a...",
  },
  {
    t: "Count everything you did", theme: W1,
    lesson: [
      "Here is the fastest way to tell an amateur resume from a professional one: the professional one has numbers in it. Not because numbers are magic, but because a number tells me the scale you operated at without making me guess.",
      "You have more numbers than you think. How many people were on your team. How many customers, calls, tickets, patients, students, or orders you handled in a day or a week. How much money passed through your hands. How long you held a role or a responsibility. What went up or down because of you, in percent or in plain counts.",
      "**Today you are not writing anything polished.** You are making a list. Estimates are fine as long as you could defend them if asked. Rounding is fine. A number you are 80 percent sure of beats a bullet with no number at all.",
    ],
    action: "Write down ten numbers from your current or most recent job. Headcount, volume, dollars, time, and anything that changed because of you.",
    tpl: { label: "Where numbers hide", text: "People: team size, people trained, people managed, customers per day\nVolume: calls, orders, tickets, appointments, files, shifts covered\nMoney: sales, budget, cash handled, costs cut\nTime: months in role, years without a miss, turnaround times\nChange: error rates, satisfaction scores, no-shows, wait times, turnover" },
    prompt: "My ten numbers...",
  },
  {
    t: "Find the one story you tell best", theme: W1,
    lesson: [
      "Every interview you will ever have is built on a handful of stories. The angry customer you calmed down. The schedule you fixed. The new person you trained who stayed. The mistake you caught before it cost anything. You already have these. You just have not written them down.",
      "Today, pick the one you tell best. The one where you know exactly what happened, what you did, and how it ended. Do not pick the most impressive one. **Pick the one you can tell without thinking.** Confidence in the telling matters more than the size of the story.",
      "Write it in four lines. What was going on. What you did, in first person, with no we. What changed, with a number if there is one. And the single sentence you would want the interviewer to remember.",
    ],
    action: "Write your best story in four lines: situation, what I did, result, the line to remember.",
    prompt: "Situation:\nWhat I did:\nResult:\nThe line:",
  },
  {
    t: "Message one person who already knows you", theme: W1,
    lesson: [
      "You are going to reach out to strangers later in this sprint. Not today. Today is easier and more valuable: you message one person who already knows you are reliable. A former manager, a coworker who moved on, the friend who runs a business. Someone who would pick up if you called.",
      "You are not asking for a job. You are telling them what you are doing and asking one small question. People who already like you want to help. They just need to know what you are working on, and most of them have no idea.",
      "**Keep it short enough to read on a phone.** Three or four sentences. Say what you are moving toward, say why you thought of them, and ask one thing they can actually answer.",
    ],
    action: "Send a message to one person from your list of five who already knows your work.",
    tpl: { label: "The message", text: "Hi [Name], quick update from me. I am making a move into HR and recruiting, and I am targeting [role] over the next few months.\n\nI thought of you because [one real reason]. Do you know anyone in HR or recruiting I should talk to, even just for twenty minutes? No pressure either way.\n\nHope you are doing well." },
    prompt: "Who I messaged, and what they said...",
  },
  {
    t: "Learn the names your job goes by", theme: W1,
    lesson: [
      "If you search one title, you see a fraction of the roles. The job you want is posted as Recruiting Coordinator at one company, Talent Acquisition Coordinator at the next, People Operations Coordinator at a startup, and HR Assistant at a hospital. Same work, four names.",
      "Today you build your search list. Go back to the Title and Industry Decoder, pick your lane, and pull five to eight titles. Then set a job alert for each one on LinkedIn and Indeed. **Alerts do the searching while you sleep,** and they catch postings in the first 48 hours, which is when recruiters are actually reading applications.",
      "One more thing. Set at least one alert with no title at all, just the words HR and your city. You will catch the oddly named roles that way.",
    ],
    action: "Set five job alerts, each for a different title from your search list.",
    note: "Turn the alerts to daily, not instant. Instant alerts train you to react to every posting. Daily alerts let you batch and choose.",
    prompt: "My search terms...",
  },
  {
    t: "Read ten postings and find the pattern", theme: W1,
    lesson: [
      "Before you write a single resume bullet, you need to know what the postings in your lane actually ask for. Not what you assume they ask for. What they say.",
      "Open ten postings for your target role. Skip the company fluff and go to the requirements. Write down every skill, system, and task that shows up. Then count. **The five that show up most are your keywords.** Those exact words need to be in your resume and your LinkedIn, because those are the words recruiters type into the search box.",
      "You will also notice what does not show up. Most coordinator and assistant postings do not require an HR degree. Many do not require HR experience at all. They ask for organization, communication, systems, and discretion. You have those. You just have not used their words yet.",
    ],
    action: "Read ten postings for your target role and list the five requirements that appeared most often.",
    prompt: "The five things every posting asked for...",
  },
  {
    t: "Review the week, then rest", theme: W1,
    lesson: [
      "A job search without a weekly review turns into a fog. You feel busy, you cannot remember what you did, and you have no idea whether anything is working. Ten minutes on day seven fixes that.",
      "Answer four questions. What did I actually do this week. What did I learn about my target. What is one thing I will do differently next week. What is one thing I am proud of, however small. **Write the answers down.** You will read them again on a hard week, and they will prove you have been moving.",
      "Then stop for the day. Rest is part of the plan, not a break from it. The people who burn out in week three are the ones who treated week one like a sprint to the finish instead of the first lap.",
    ],
    action: "Fill in the weekly review below, then take the rest of the day off from the search.",
    tpl: { label: "Weekly review", text: "This week I did:\n\nI learned that my target role usually wants:\n\nNext week I will change:\n\nOne thing I am proud of:" },
    prompt: "This week I did...",
  },
  {
    t: "Rewrite your single strongest bullet", theme: W2,
    lesson: [
      "You have your numbers from day two and your keywords from day six. Today they meet. Take the one thing you did at work that you are most proud of and write it as a bullet a recruiter would stop on.",
      "The formula is the same one from the Resume Lab: strong verb, what you did, the number, what changed. **Say it in one sentence, under 30 words.** If you need two sentences, you are explaining instead of stating.",
      "Then read it as me. I have 200 resumes and I am scanning for scale and results. Does your bullet tell me, in one pass, how big the job was and what you made better? If I have to reread it, cut words until I do not.",
    ],
    action: "Write one resume bullet with a number in it, under 30 words, and read it out loud.",
    tpl: { label: "Before and after", text: "Weak: Handled scheduling for the team.\nStrong: Built and ran the weekly schedule for a 22 person team across two shifts, holding full coverage for 14 straight months." },
    prompt: "My strongest bullet...",
  },
  {
    t: "Write your summary", theme: W2,
    lesson: [
      "The summary at the top of your resume is where a career changer wins or loses the first ten seconds. It is the only place you get to say, in plain words, who you are now and where you are going, before a recruiter sees a job title that does not say HR.",
      "Three sentences. The first says what you have been doing and for how long. The second names the two or three things from that work that map directly to HR. The third says what you are moving toward, and if you have started a certification, says that too. **No adjectives about yourself.** Not motivated, not passionate, not detail oriented. Those are claims. Numbers and specifics are proof.",
      "Write it, then cut it by a third. Summaries always start too long.",
    ],
    action: "Write your three sentence summary and paste it into the Resume Lab.",
    tpl: { label: "Summary skeleton", text: "[Field] professional with [X] years of experience, most recently [the biggest thing you did, with a number]. Background in [skill one], [skill two], and [skill three], all of which map directly to [target role] work. Moving into HR deliberately, and currently [certification or course, or: building toward the aPHR]." },
    prompt: "My summary...",
  },
  {
    t: "Finish the rest of the resume", theme: W2,
    lesson: [
      "Your top bullet and your summary carry most of the weight. Today you fill in the rest, and the rule is simple: the older the job, the fewer the words. Your most recent role gets three bullets with numbers. The one before gets two or three. Anything older than ten years gets a title, a company, and dates, and that is all.",
      "Every job needs exact months. March 2021 to June 2024, not 2021 to 2024. Years alone look like you are hiding something, even when you are not.",
      "**Then the skills section.** List the keywords from day six using their exact words, plus every system you have actually used. If you have used any scheduling, point of sale, ticketing, or records system, name it. Those count. Recruiters search for system names.",
    ],
    action: "Complete every job in the Resume Lab builder with exact dates, then download the Word file and read it on your phone.",
    note: "Read it on your phone on purpose. That is where most recruiters open it first, and a resume that looks fine on a laptop can fall apart on a small screen.",
    prompt: "What I noticed reading it on my phone...",
  },
  {
    t: "Publish your headline", theme: W2,
    lesson: [
      "Your LinkedIn headline is the single most searched line you own. It follows you into every comment, every connection request, and every search result. Right now it probably says your current job title, which tells a recruiter nothing about where you are going.",
      "Use the three part headline from the LinkedIn Lab. What you want to be found as, what you do well, and your proof with a number. **Aspiring is a fine word.** It is honest, it is searchable, and recruiters sourcing for coordinator roles use the word in their searches more than you would expect.",
      "Publish it today. Not after you have perfected it. A good headline live beats a perfect headline in a draft.",
    ],
    action: "Build your headline in the LinkedIn Lab and change it on LinkedIn today.",
    prompt: "My headline, as published...",
  },
  {
    t: "Write the About section", theme: W2,
    lesson: [
      "The About section is the one place on LinkedIn where you get to sound like a person. It should read like you talking across a table, not like a press release. First person. Short paragraphs. One number in the first three lines.",
      "Tell the reader what you have been doing, what you learned there that translates to HR, and what you are moving toward. Then end with an invitation. Something like: if you work in HR and are open to a quick conversation, I would genuinely like to connect. **That last line turns readers into replies.**",
      "Length matters less than the first two lines, because LinkedIn hides the rest behind a see more link. Put the pivot in those two lines.",
    ],
    action: "Write your About section in the LinkedIn Lab and publish it.",
    prompt: "The first two lines of my About section...",
  },
  {
    t: "Write the paragraph you will reuse forever", theme: W2,
    lesson: [
      "Every career changer gets asked the same question in every cover letter, every screen, and every interview: why HR, and why now. If you answer it fresh each time, you will ramble. If you write it once and polish it, you will sound like you have thought about it, because you have.",
      "This is the pivot paragraph from the Cover Letter Lab. Four or five sentences. Why the work you do best is people work. What you have done on purpose to move toward HR, with specifics. And the line that matters most: **your background is an asset, not a gap.** Say it directly.",
      "Write it today. You will paste it into letters, say a spoken version on phone screens, and lean on it in interviews.",
    ],
    action: "Write your pivot paragraph and save it in the Cover Letter Lab.",
    tpl: { label: "Pivot paragraph skeleton", text: "I am moving into HR deliberately, not accidentally. The part of my work I have always done best is the people part: [two specific examples]. Over the past [time] I have [what you have done on purpose: conversations, a course, a certification, volunteering]. I am not leaving my background behind. [One sentence on why it is an advantage for this role]." },
    prompt: "My pivot paragraph...",
  },
  {
    t: "Get one honest read", theme: W2,
    lesson: [
      "You have spent a week building materials. Before you send them to a single company, send them to one person who will tell you the truth. Not someone who will say it looks great. Someone who will say the second bullet is confusing and the summary is too long.",
      "Ideal is somebody who hires or has hired. Second best is anyone who reads a lot of resumes. Third is a friend who is blunt. **Ask for three specific things:** what is unclear, what is missing, and what they would cut.",
      "Then do the weekly review. What you built, what you learned, what changes. You are halfway through the sprint, and you now have a resume, a headline, an About section, and a pivot paragraph that did not exist two weeks ago.",
    ],
    action: "Send your resume to one honest person and ask for three things: what is unclear, what is missing, what they would cut. Then do your weekly review.",
    prompt: "This week I built...\n\nWhat my reader said...",
  },
  {
    t: "Build your target list", theme: W3,
    lesson: [
      "A job search that only reacts to postings is always behind. The people who land faster keep a list of companies they want to work for and go toward them, whether or not something is posted today.",
      "Fifteen companies. Pick them for reasons you can say out loud: they hire a lot in your lane, they are growing, someone you know works there, they are a commutable distance, or you have used their product and liked it. Mix sizes. **Big companies have structured HR teams and real coordinator roles. Small ones take chances on career changers.**",
      "For each one, write the name, why it is on the list, and one person who works in HR there that you found on LinkedIn. You will use that column next week.",
    ],
    action: "List fifteen target companies with one reason each and one HR person at each.",
    prompt: "My fifteen...",
  },
  {
    t: "Get on two agency recruiters' radar", theme: W3,
    lesson: [
      "Staffing agencies place HR assistants, coordinators, and recruiters every week, and they hire recruiters themselves. An agency recruiter who knows you is a person who thinks of you when a role opens, before it is ever posted. That is worth more than fifty applications.",
      "Find two agencies that place HR and administrative roles in your area. Register on their site, then find a recruiter there on LinkedIn and send a short note. Tell them your target role, your real salary range, and when you could start. **Be specific and be easy to work with.** Agency recruiters remember the candidates who made their job simple.",
      "Then put a reminder in your calendar to check back in three weeks. Staying on their radar is the whole game.",
    ],
    action: "Register with two staffing agencies and send a short note to one recruiter at each.",
    tpl: { label: "Note to an agency recruiter", text: "Hi [Name], I am moving into HR and targeting [role] roles in [area]. My background is [X years in field], with a lot of [the relevant skill, with a number]. I am looking in the [salary range] range and could start with two weeks notice.\n\nIf you see anything that fits, I would love to be considered. Resume attached. Thank you." },
    prompt: "Agencies and recruiters I reached out to...",
  },
  {
    t: "Send three messages to people you do not know yet", theme: W3,
    lesson: [
      "Today is the day most people skip, which is exactly why it works. Three messages to people in HR you have never met. Not asking for a job. Asking how they got in.",
      "Pick from your target list column, from your SHRM chapter, or from people who commented on an HR post you read. Choose people one or two years ahead of you, not vice presidents. **They reply more, and their advice is more useful,** because they remember what it was like.",
      "Use the outreach message from the LinkedIn Lab. One real reason you picked them. A small ask. Then let it go. You will hear back from about one in three, and that is a good week.",
    ],
    action: "Send three outreach messages to people in HR you have not met.",
    note: "Do not refresh waiting for replies. Send, log them in the networking tracker, close the app. Replies come on their schedule, not yours.",
    prompt: "Who I messaged and why I picked them...",
  },
  {
    t: "Apply to five roles, properly", theme: W3,
    lesson: [
      "Not forty. Five. Five applications done properly beat forty done fast, every single time, and I say that as the person reading the forty.",
      "Properly means this. Read the posting and pull its exact words into your resume where they are true. Write a short cover letter with your pivot paragraph and one real detail about the company. Apply on the company site if you can, not just the job board. Then find the recruiter or a team member on LinkedIn and send a short note saying you applied and why you fit. **Log every one in the application tracker.**",
      "That is about 25 minutes each. Two hours for the five. It feels slow and it is not. It is the difference between a resume in a pile and a name someone has seen twice.",
    ],
    action: "Apply to five roles with a tailored resume and a short note to someone at the company. Log all five.",
    prompt: "The five I applied to...",
  },
  {
    t: "Comment, do not just scroll", theme: W3,
    lesson: [
      "You do not have to post on LinkedIn to be visible on it. Comments do most of the work, and they are far less scary. When you leave a thoughtful comment on a recruiter's post, their network sees your name and your headline, and your headline now says what you are moving toward.",
      "Find three posts from people in HR or recruiting. Read them properly. Then add something real: a question, a short story from your own work that connects, or a specific thing you agree with and why. **Two sentences is plenty.** Great post is not a comment, it is noise.",
      "Do this three times this week and you will start to recognize names, and some of them will start to recognize yours.",
    ],
    action: "Leave a real comment on three posts by people in HR or recruiting.",
    tpl: { label: "Comment shapes that work", text: "The connection: This matches what I saw running a [team or desk]. The hardest part was [specific thing]. How do you handle that on the HR side?\n\nThe specific agree: The point about [detail] is the one people miss. In my experience [one sentence of proof].\n\nThe honest question: I am moving into HR from [field]. Is [specific thing] as common as it sounds, or is that a bigger company thing?" },
    prompt: "Posts I commented on, and what I said...",
  },
  {
    t: "Follow up on everything from last week", theme: W3,
    lesson: [
      "Most people send one message and wait forever. One follow up, sent politely about a week later, roughly doubles your reply rate. It is the cheapest thing in the entire job search and almost nobody does it.",
      "Go through your networking tracker and your application tracker. Anyone who did not reply to a message from last week gets one short follow up. Any application older than a week gets a note to the recruiter if you have not sent one. **One follow up per person. Not three.** After that, let it go.",
      "Keep the tone light. You are not chasing. You are making it easy for a busy person to say yes.",
    ],
    action: "Send one follow up to every unanswered message and every application older than a week.",
    tpl: { label: "The follow up", text: "Hi [Name], floating this back up in case it got buried. I am still working toward [role] and would love twenty minutes to hear how you got into HR, whenever is easy. If now is a bad time, no worries at all." },
    prompt: "Who I followed up with...",
  },
  {
    t: "Book one coffee chat", theme: W3,
    lesson: [
      "By now somebody has replied. Maybe a former coworker, maybe one of the strangers, maybe an agency recruiter. Today you turn a reply into a calendar invite. Twenty minutes, phone or video, within the next week.",
      "Offer two specific times. Not when works for you, which makes them do the work. Tuesday at noon or Thursday at four. **Specific times get booked. Open ended offers get forgotten.**",
      "Then do your weekly review. Three weeks in, you have a target list, two agencies who know you, people you have messaged, five real applications, and a conversation on the calendar. That is a job search that is actually running.",
    ],
    action: "Book one twenty minute conversation with someone in HR. Then do your weekly review.",
    prompt: "This week I did...\n\nWho I am talking to, and when...",
  },
  {
    t: "Build your 90 second answer", theme: W4,
    lesson: [
      "The phone screen opens with some version of walk me through your background, and most career changers answer it for five minutes. I need ninety seconds. Where you are now, the thread that connects it to this role, and why you are excited. Then stop.",
      "Write it out. Say it out loud with a timer. Cut until it is under ninety seconds at a normal pace. **Then say it ten more times,** standing up, until it comes out the same way without thinking.",
      "Record yourself once on your phone and listen back. You will hear the filler words and the parts where you lose confidence. That is useful information, not a reason to feel bad.",
    ],
    action: "Write your 90 second summary, time it, and say it out loud ten times.",
    tpl: { label: "90 second shape", text: "Now: I have spent [X years] in [field], most recently [role] where I [biggest thing, with a number].\n\nThe thread: The part I have always done best is [the people part, specifically]. That is [coordination / communication / handling sensitive situations], which is the core of [target role].\n\nWhy this: I have been moving toward HR on purpose, [what you have done], and this role is the right next step because [one specific reason]." },
    prompt: "My 90 second answer...",
  },
  {
    t: "Know your number before anyone asks", theme: W4,
    lesson: [
      "Somebody is going to ask what you are looking for in salary, probably on the first call. If you have not prepared, you will either lowball yourself or name a number that ends the conversation. Both are avoidable with twenty minutes of homework.",
      "Look up your target role in your metro on two or three sources. Find the midpoint for someone at your level. Build a range around it, where the bottom is a number you would actually accept. **Then practice saying the range out loud** until it comes out as a fact and not an apology.",
      "If the posting shows a range, anchor to it. Your range of 55 to 70 lines up with my research and I am comfortable in that band. That sentence makes you easy to move forward and costs you nothing.",
    ],
    action: "Research your salary range, write it down, and say it out loud five times.",
    prompt: "My range, and where I found it...",
  },
  {
    t: "Tell stories two and three out loud", theme: W4,
    lesson: [
      "You have one story from day three. You need three to cover an interview. A difficult person, a mistake you owned, and a time you made something better. Most behavioral questions are one of those wearing a different hat.",
      "Build the other two in the story bank. Then the part people skip: **say them out loud.** Not in your head. Out loud, to a wall, to a dog, to your phone. A story that lives in your head comes out tangled the first time you say it, and you do not want the first time to be in the interview.",
      "Land each one on the result. The number, the change, the thing that was different afterward. Then stop talking.",
    ],
    action: "Finish stories two and three in the story bank and tell all three out loud.",
    prompt: "Stories two and three, in a line each...",
  },
  {
    t: "Write the questions you will ask them", theme: W4,
    lesson: [
      "At the end of every interview comes do you have any questions for us. No is the worst possible answer. It reads as not caring, every time, even when you were just tired.",
      "Write five today. Make them about the work and the team, not about vacation and remote days, which you can ask once there is an offer. **The best questions show you have thought about doing the job,** not just getting it. What does a normal week look like. What would you want me up to speed on first. What happened to the last person in this seat.",
      "Keep them on a note. Ask two or three. Listen to the answers, because they tell you whether you want this job as much as they tell them whether they want you.",
    ],
    action: "Write five questions to ask at the end of an interview and save them in the Interview Academy.",
    prompt: "My five questions...",
  },
  {
    t: "Do a mock interview", theme: W4,
    lesson: [
      "You can read about interviews for a year and still freeze in the first one, because reading is not practice. Practice is answering questions out loud while someone watches. It is uncomfortable, which is the point. Better to be uncomfortable with a friend than with a hiring manager.",
      "Ask someone to run the six questions from the question bank, in order, with no breaks and no do-overs. If nobody is available, record yourself answering all six on video. **Watch it back once.** Note the three things you want to fix and ignore everything else. Perfectionism here is a trap.",
      "Then do it one more time, fixing only those three things. That second run is where the improvement actually happens.",
    ],
    action: "Run a mock interview with a friend, or record yourself answering all six bank questions, then do it once more.",
    prompt: "The three things I am fixing...",
  },
  {
    t: "Line up your three references", theme: W4,
    lesson: [
      "References get asked for at the exact moment you are busiest, usually between a final interview and an offer. If you have to scramble then, you will list someone you have not spoken to in a year who does not know what to say. Line them up now while nothing is urgent.",
      "Three people. At least one who managed you. All three should actually pick up the phone, and all three should like your work. Ask them today, by message, and tell them the kind of role you are going for. **A briefed reference is worth three cold ones.**",
      "Get their current phone and email, and put all three in the References step so they are ready to copy into a form in thirty seconds.",
    ],
    action: "Ask three people to be your references and record their details in the References step.",
    tpl: { label: "Asking someone to be a reference", text: "Hi [Name], I am making a move into HR and am starting to interview for [role] roles. Would you be comfortable being a reference for me? If a company reaches out, they would mostly ask what I was like to work with and whether you would hire me again.\n\nI will always give you a heads up before anyone calls. Thank you, it means a lot." },
    prompt: "My three references...",
  },
  {
    t: "Do the math on your search", theme: W4,
    lesson: [
      "Four weeks in, you have real numbers. Messages sent, replies, applications, screens, interviews. Today you look at them honestly, because the numbers tell you where the search is working and where it is stuck.",
      "Roughly speaking, a healthy search looks like this. Around one in three outreach messages gets a reply. Around one in ten applications gets a screen. Around one in three screens becomes an interview. **If one of your ratios is far below that, that is the stage to fix,** not the whole search.",
      "No replies to outreach means the message needs work or the targets are too senior. Applications but no screens means the resume or the fit. Screens but no interviews means the ninety second answer or the salary conversation. Each one has a specific fix, and you already have the tools for all of them.",
    ],
    action: "Count your numbers for the four weeks: messages, replies, applications, screens, interviews. Find the weakest ratio.",
    note: "Small numbers lie. If you have sent four messages and got zero replies, that is not a pattern yet. Send ten more before you change anything.",
    prompt: "Messages / replies:\nApplications / screens:\nScreens / interviews:\nThe stage I am fixing:",
  },
  {
    t: "What to do when nothing has happened yet", theme: W5,
    lesson: [
      "Here is the honest version. Thirty days is enough to build a real search. It is often not enough to land the job. Many people land in week six, week ten, week fourteen. If you are at day 29 with no offer, that is not evidence you cannot do this. It is the normal middle of a career change.",
      "The danger now is not that you give up loudly. It is that you quietly slow down. You skip the follow ups. You apply to two instead of five. You stop commenting. The search goes cold without anyone deciding to end it. **So decide, today, what you will keep doing,** and make it small enough that you will actually do it.",
      "Pick one thing to change for the next 30 days, based on yesterday's math. One. Then go back to the dated plan and run the next weeks on repeat. Momentum is the whole thing.",
    ],
    action: "Write down the one thing you will change for the next 30 days, and the three things you will keep doing no matter what.",
    prompt: "The one thing I am changing...\n\nThe three things I will keep doing...",
  },
  {
    t: "Start the next thirty", theme: W5,
    lesson: [
      "Thirty days ago you had a job title that did not say HR and a story you had never written down. Today you have a resume with numbers, a LinkedIn profile that says where you are going, a pivot paragraph, a target list, two agencies who know your name, people you have talked to, applications in the tracker, three stories you can tell cold, and three references lined up. None of that existed a month ago. You built it.",
      "The next thirty days are easier, because the building is done and the rhythm is set. Apply to a few good roles a week. Message a few people. Follow up on everything. Take every screen. Review on Sundays. **Do the week you are in.**",
      "And when you land it, and you will, come back and tell me. I mean that. Send me the message. I want to know.",
    ],
    action: "Set a new start date for the next thirty days, and write what a normal week will look like from here.",
    tpl: { label: "A normal week from here", text: "Monday: check alerts, pick the week's roles\nTuesday: two tailored applications, notes to someone at each\nWednesday: three outreach messages or comments\nThursday: two more applications, follow ups on anything older than a week\nFriday: take any screens, prep for any interviews\nSunday: ten minute review" },
    prompt: "My normal week from here...",
  },
];
