# AI-Powered Portfolio with a Resume Chatbot

A personal portfolio website with a chatbot that answers questions about me using only the facts in my resume. The front end was generated with Google AI Studio (Build mode). The back end is a RAG service built in Google Colab with NVIDIA Nemotron models, FAISS and LangChain, and every question is traced in LangSmith.

**Links** 
- Colab notebook:(https://colab.research.google.com/drive/1Rk1r-nsKrZAIAa5htiOcisXA6M6FnXPn#scrollTo=ncLpjg7qJlN2)
- Front end code:(https://github.com/sruthigoudarukala/portfolio-resume-chatbot)
- Live site:(https://aistudio.google.com/apps/a77dc847-d8d5-4edf-bddd-6a090d846f8b?showAssistant=true&appParams=experience&showCode=true

> The chatbot calls a temporary Cloudflare quick tunnel. The URL in `BACKEND_URL` stops working when the Colab session ends, so it must be updated to the current tunnel URL for the demo.

---

## 1. Architecture

```
Visitor types a question in the portfolio chat widget (AI Studio app)
        |
        v   POST /chat  {"question": "...", "session_id": "..."}
Colab FastAPI service (public HTTPS URL via cloudflared quick tunnel)
        |
        |-- 1. Embed the question          NVIDIAEmbeddings (Nemotron embedding model)
        |-- 2. Search the vector DB        FAISS, top chunks from resume.md, about.md, projects.md
        |-- 3. Build a grounded prompt     retrieved chunks + question
        |-- 4. Generate the answer         nvidia/nemotron-3.5-lightning-30b-a3b via ChatNVIDIA
        |-- 5. Trace every step            LangSmith (project: portfolio-bot-sruthi)
        v
JSON reply {"answer": "...", "sources": [...]}  ->  shown in the chat widget
```

| Layer | Tool |
| --- | --- |
| Front end | Google AI Studio (Build mode), React, Tailwind CSS |
| Back end | Google Colab, FastAPI, CORS enabled |
| Embeddings | NVIDIA Nemotron embeddings via `NVIDIAEmbeddings` |
| Vector database | FAISS (index saved to disk) |
| LLM | `nvidia/nemotron-3.5-lightning-30b-a3b` via `ChatNVIDIA` (max 300 output tokens, temperature 0) |
| Framework | LangChain (`langchain-nvidia-ai-endpoints`) |
| Observability | LangSmith |
| Public link | cloudflared quick tunnel |

The chat answers come from Nemotron through the Colab back end. The Gemini API is not used for chat.

---

## 2. Setup steps

1. **Keys.** In Colab, open the Secrets panel and add `NVIDIA_API_KEY` and `LANGSMITH_API_KEY`. Keys are never written in code cells. Run the keys cell first, before importing LangChain.
2. **Knowledge base.** Create `resume.md`, `about.md` and `projects.md` from the privacy-safe portfolio copy of the resume (no phone number or home address).
3. **Index.** Load the files with `TextLoader`, split with `RecursiveCharacterTextSplitter`, embed with `NVIDIAEmbeddings`, store in FAISS and save the index to disk.
4. **RAG chain.** Build retriever, prompt, `ChatNVIDIA` and output parser. Each call uses `run_name="portfolio_chat"`, with tags and metadata (`source` and a session ID).
5. **API.** Wrap the chain in FastAPI with `POST /chat`, enable CORS, run the server in Colab and start a cloudflared quick tunnel.
6. **Front end.** Open the project in Google AI Studio, set `BACKEND_URL` in `src/components/ChatWidget.tsx` to the tunnel URL, and export the ZIP or push to GitHub.
7. **Each new session.** A restarted tunnel gets a new URL. Run the tunnel cell, copy the new `PUBLIC URL` and update `BACKEND_URL`.

---

## 3. Prompts used in Google AI Studio


**Follow-up prompts**

1. Certifications section:
```
Add a Certifications section between Experience and Contact, in the same
dark theme and accent colour, with a "Certifications" navbar link. Show one
small card: "Data Science Training (in progress)", Innomatics Research Labs,
2025 to present. Do not change ChatWidget.tsx or BACKEND_URL.
```

2. Replace the generated placeholder content with the details from my real resume (name, summary, grouped skills without percentages, the two projects, training, teaching experience and education), and remove the sections that were not in my resume. The prompt also said not to change `ChatWidget.tsx` or `BACKEND_URL`.

3. Update the tunnel address:
```
In src/components/ChatWidget.tsx, change only the value of BACKEND_URL to:
"<current tunnel URL>"
Do not change anything else in the file, and do not change any other file.
```

4. Text cleanup:
```
In the chat widget header, change the subtitle to "AI assistant · Data science & ML projects".
Change the widget's opening message to: "Hello! I am Sruthi Arukala's portfolio assistant. Ask me about her education, teaching experience, data science training, skills or machine learning projects."
Do not change BACKEND_URL, the fetch call, or any other logic.
```

---

## 4. Test results (10 questions asked from the website)

All questions were asked from the website, and each appears in LangSmith with the tag `source=website`. Questions 8 and 9 must be refused. Question 10 is a made-up-fact check that failed first and was fixed (see section 5).

| # | Question | Answer | Correct | Latency | Input tokens | Output tokens | Total tokens |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Where did Sruthi study? | JNTUH, M.Tech and B.Tech | Y | 1.10s | 580 | 38 | 618 |
| 2 | What projects has Sruthi built? | SMS Spam Classifier API, House Price Prediction App | Y | 11.39s | 583 | 32 | 615 |
| 3 | Does Sruthi know Python? | Yes, she knows Python | Y | 0.58s | 516 | 7 | 523 |
| 4 | What is Sruthi's teaching experience? | Assistant Professor 2019 to 2021, Cultural Head, workshop | Y | 1.96s | 582 | 58 | 640 |
| 5 | Which tools does Sruthi use for deployment? | Streamlit, Vercel | Y | 1.01s | 586 | 6 | 592 |
| 6 | What is Sruthi currently learning? | ML and deep learning at Innomatics | Y | 21.71s | 581 | 20 | 601 |
| 7 | What role is Sruthi looking for? | Entry-level Data Scientist or Data Analyst | Y | 1.00s | 582 | 19 | 601 |
| 8 | What is Sruthi's salary? | Refused | Y | 1.07s | 581 | 11 | 592 |
| 9 | What is the capital of France? | Refused | Y | 0.88s | 515 | 11 | 526 |
| 10a | Does Sruthi know Azure? (before fix) | "No, she doesn't have Azure listed" | N | 7.15s | 580 | 13 | 593 |
| 10b | Does Sruthi know Azure (after fix) | Refused | Y | 1.05s | 636 | 11 | 647 |

Notes:
- Retrieval took about 0.4s in every run, so the two slow answers (21.71s and 11.39s) came from the hosted model, not from retrieval.
- Input tokens dominate (about 515 to 586) because every request carries the system prompt and the retrieved chunks. Output is only 6 to 58 tokens.
- An extra check, "Does Sruthi work at PS Associates", was correctly rejected, which confirmed the old placeholder data was gone from the index.

---

## 5. Task 4: one bad answer, diagnosed and fixed

**Problem.** For "Does Sruthi know Azure?" the bot answered "No, she doesn't have Azure listed in her skills."

**Diagnosis from the trace.** Retrieval worked: the context sent to the model contained the Skills section, and Azure appears nowhere in it. The system prompt already said to reply "I don't have that information in my profile" when the context lacks the answer, but the model treated "not listed" as proof that I lack the skill. A resume cannot show that someone does not know something, so the plain "No" is an unsupported claim.

**Fix.** I added a rule to the system prompt: never answer yes or no to whether I know or have used something unless the context states it directly, and reply with the standard refusal instead.

**Result.** The same question now returns "I don't have that information in my profile." A control question, "Does Sruthi know Python?", still gets a yes. The extra rule adds about 56 input tokens per request (580 to 636).

Screenshots (folder `screenshots/`):
- Before: `before1.png` (question and wrong answer), `before2.png` (system prompt and context), `before3.png` (model and settings)
- After: `after1.png` (question and refusal), `after2.png` (prompt with the added rule), `after3.png` (token usage)
- Full trace tree and run list: `trace1.png`, `runlist1.png`

---

## 6. Lessons learned

1. **A grounded prompt needs an explicit rule for "not mentioned".** Telling the model to use only the context was not enough. It still turned a missing skill into a "No". Yes/no questions about skills need their own instruction to refuse.
2. **Free tunnels change address.** Every restart of the cloudflared tunnel gives a new URL and the website shows "offline" until `BACKEND_URL` is updated. Finish testing in one session and do not restart the tunnel while recording the demo.
3. **Check what the generator wrote.** Google AI Studio filled the first version of the site with invented skill percentages, certifications and job details, and its first chat greeting still referred to them. Every line of generated content has to be checked against the real resume, and the chat widget text has to match the knowledge base.
4. **Hosted models can be slow or time out.** Most answers took about a second, but some took over 10 seconds and one call timed out at 60 seconds. Limiting output tokens and setting a timeout with retries keeps the chat usable.

