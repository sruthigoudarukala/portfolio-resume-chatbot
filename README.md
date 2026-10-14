# TechNova Support Bot: Build and Observe a Production-Ready Chatbot

A customer-support chatbot for a fictional electronics store, **TechNova**. It answers policy questions, looks up orders, remembers the conversation, and never shows a Python error to the customer. The bot is built with **LangGraph** and an **NVIDIA-hosted LLM**, and every call is traced in **LangSmith**, where I measured latency, tokens and cost, triggered failures on purpose, and evaluated answer quality.

- LangSmith project: `technova-bot-sruthi`
- Evaluation dataset: `technova-eval-sruthi`
- Colab notebook (where everything was first built and run): *add your Colab link here*
- Mode: individual assignment

---

## 1. Architecture

```
User types a question (command-line chat loop)
        |
        v
ask_bot  ->  clean_input                  our own traced steps (extra spaces removed)
        |
        v
+------------------- LangGraph bot --------------------+
|                                                       |
|   START -> agent -> (asked for a tool?) -> tools      |
|              ^                              |         |
|              +------ tool result -----------+         |
|              |                                        |
|              v  no tool needed                        |
|            final answer                               |
|                                                       |
|   Memory: MemorySaver, one saved chat per thread_id   |
+-------------------------------------------------------+
        |                              |
        v                              v
NVIDIA model (ChatNVIDIA)        Mock TechNova data
 small: openai/gpt-oss-20b        ORDERS, POLICIES
 large: nvidia/nemotron-3-super-120b-a12b

Every step is recorded in LangSmith: traces, tags, metadata, tokens, errors, evaluations.
```

| Layer | Tool |
|---|---|
| Conversation flow | LangGraph (`StateGraph`, `ToolNode`, `tools_condition`) |
| Model | `ChatNVIDIA` from `langchain-nvidia-ai-endpoints`, temperature 0 |
| Tools | `get_order_status`, `get_policy` (`@tool`) |
| Memory | `MemorySaver` checkpointer, `thread_id` per conversation |
| Observability | LangSmith (tags, metadata, `@traceable`, datasets, experiments, feedback) |
| Data / tables | pandas |

**Models.** The assignment suggested Llama 8B and 70B, but NVIDIA had retired them (the API answers `410 Gone` even though they are still listed). I tested the models in the catalogue and used the two that worked:
small = `openai/gpt-oss-20b`, large = `nvidia/nemotron-3-super-120b-a12b`.

---

## 2. Setup and how to run

Run all commands from the repository root.

```bash
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env                 # Windows: copy .env.example .env
# open .env and paste your own keys (NVIDIA_API_KEY, LANGSMITH_API_KEY)
```

Keys: NVIDIA at build.nvidia.com (starts with `nvapi-`), LangSmith at smith.langchain.com, Settings, API Keys (starts with `lsv2_`). The real `.env` is in `.gitignore` and must never be committed.

| What | Command |
|---|---|
| Chat with the bot (Part A) | `python -m app.chat` |
| Latency: 20 questions, both models (Part C) | `python -m experiments.latency` |
| Latency plus time to first word | `python -m experiments.latency --ttft` |
| Tokens and cost, 10-turn growth, trimming (Part D) | `python -m experiments.tokens` |
| One failure scenario (Part E) | `python -m experiments.faults --fault bad_model` |
| All five failure scenarios | `python -m experiments.faults --all` |
| Error rate over 20 requests | `python -m experiments.faults --rate` |
| Dataset, AI judge, experiments, feedback (Part F) | `python -m experiments.evaluate` |

Valid values for `--fault` (or the `FAULT_MODE` environment variable): `bad_model`, `bad_key`, `timeout`, `tool_failure`, `bad_input`.

Notes
- Every benchmark pauses 2 to 3 seconds between questions. NVIDIA's free endpoint answered `429 Too Many Requests` when I went faster.
- Scripts write their CSV files into `results/` and overwrite what is there. The files already in `results/` were built from the numbers of my Colab runs, so running a script again gives slightly different numbers (the models and the server vary from run to run).
- Each script takes a few minutes, because of the pauses and the model calls.
- Part F needs the large model as the judge, so it uses your NVIDIA credits.

---

## 3. Results

### Latency (20 questions, one run per model)

| Model | Average | p50 | p95 | Answer quality (1 to 5, my judgement) |
|---|---|---|---|---|
| Small (gpt-oss-20b) | 2.25 s | 1.66 s | 4.96 s | 4 |
| Large (nemotron-120b) | 1.70 s | 1.45 s | 2.77 s | 4 |

![latency](results/latency_comparison.png)

- **Which step is slowest?** In the slowest run (6.08 s) the model call took 6.07 s. My own code and the routing took about 0 s.
- **Time to first word (5 questions, small model):** the first word appeared at 2.10 s on average and the whole answer at 2.61 s. Streaming does not shorten the total time, but the user sees text about half a second earlier, so it feels faster.

### Tokens and cost (20 questions, assumed rate card: small $0.20, large $0.90 per 1M tokens)

| Model | Total tokens | Cost, 20 questions | Cost per month (10,000 chats a day) |
|---|---|---|---|
| Small | 14,248 | $0.0028 | about $47 |
| Large | 22,241 | $0.0200 | about $334 |

The monthly numbers use short test chats, so real chats would cost more.

**10-turn chat.** The input per turn grows because the whole history is sent again on every call. Using `trim_messages` (keep the last 6 messages) the input tokens fell from 11,600 to 6,324 (about 45% less).

![token growth](results/token_growth.png)

### Error handling (Part E)

| Scenario | Fix | What the user sees |
|---|---|---|
| Wrong model name | `.with_fallbacks([backup])` | The backup model answers normally |
| Wrong API key | Fail fast, one attempt, no retry | "Our assistant is not set up correctly right now..." |
| Slow or failed call | `.with_retry(stop_after_attempt=3, wait_exponential_jitter=True)` | The answer after retries, or "taking longer than usual" |
| Tool failure | The error goes back to the model | An apology: the order system is temporarily unavailable |
| Bad input (empty, too long) | Checked before the model is called | Guidance, and no tokens are used |

**Error rate:** 6 errors in 20 requests = **30%**. This is high on purpose, because 6 of the 20 requests were broken deliberately (2 bad input, 1 bad key, 1 timeout, 1 tool failure, 1 bad model). The 14 normal requests had 0 errors.

### Evaluation (Part F)

| Experiment | Correctness (PASS rate) |
|---|---|
| small-v2 (gpt-oss-20b) | 0.8 |
| large-v2 (nemotron-120b) | 0.8 |

10 questions with reference answers, marked by an LLM judge (PASS or FAIL). The two models tie. With only 10 questions I cannot separate them, and the judge itself made mistakes (for example one blank verdict), so the marks need a human spot-check. 5 benchmark runs received a thumbs-up rating (`user_rating = 1`).

### Screenshots (folder `results/screenshots/`)
- `run_tree_clean_input.png`: run tree with my own traced `clean_input` step
- `thread_view.png`: runs grouped into one Thread
- `slowest_run_tree.png`: the slowest run, the model call takes almost all the time
- `dataset_examples.png`: the evaluation dataset in LangSmith
- `fault_bad_key_failed.png`: failed run for the wrong API key (403 Forbidden), one attempt and no retry
- `fault_tool_failure_fixed.png`: after the tool-failure fix, another order (TN1001) still works
- `error_rate_langsmith.png`: the error counter in LangSmith (`error_event` rows, tag `error`)
- `eval_comparison.png`: the two evaluation experiments compared (small-v2 and large-v2)

---

## 4. Problems found, diagnosed and fixed

**1. The bot invented a return label and a free replacement.** In the first chat test the bot promised things that are not in the store data. The system prompt said "never guess", which was not strict enough. I added rules: only state facts that come from the tools, and say that it cannot send emails or start returns. Then a second problem appeared: the bot asked for the order ID again after I had given it. I added "read the whole conversation before asking for an ID". Every prompt change needs to be tested again.

**2. Fake fast times in the first large-model benchmark.** Two questions "took 0.1 s". They were `429 Too Many Requests` errors that my code still timed. I added a pause between questions and an error count, re-ran, and only used the run with `Errors: 0`.

**3. The first AI judge gave scores of 0.3 and 0.5.** The judge answered with the digits 1 or 0 and my code read the last 1 or 0 in the reply, but order IDs such as `TN1001` contain those digits. Most of the marked-wrong answers were actually correct. I switched the judge to the words PASS and FAIL, gave it clearer rules, and print every verdict so a human can check. The invalid first scores are kept in `results/evaluation_scores.csv` for honesty.

**4. Trimming saved tokens but lost memory.** With only the last 6 messages kept, the question "What was the first order I asked about?" was answered with the wrong order (TN1003 instead of TN1001). Fewer tokens means the bot forgets older messages. A safer setting keeps more messages (not tested).

---

## 5. Lessons learned

1. **Being listed does not mean working.** NVIDIA's model list still shows retired models. Always test a model before building on it.
2. **A confident bot can still make things up.** A strict rulebook plus testing is needed, and every change to the rulebook must be tested again.
3. **Check measurements before trusting them.** Failed requests can look like very fast ones.
4. **Long chats cost more.** The history is sent again on every call, so tokens grow every turn. Trimming helps but loses old memory.
5. **Handle each failure on purpose.** A wrong key should fail fast, a timeout should retry with backoff, a tool error should go back to the model, and bad input should be stopped before it costs money.
6. **An AI judge needs a human spot-check.**
7. **Keys stay out of code, chats and GitHub.** Keep them in `.env` or hidden prompts only.

---

## 6. Repository structure

```
technova-bot/
|-- README.md
|-- .env.example          placeholder keys only
|-- .gitignore
|-- requirements.txt
|-- app/
|   |-- tools.py          Part A: the two tools and the mock data
|   |-- graph.py          Parts A and B: the LangGraph bot, memory, tags, traced helpers
|   |-- chat.py           Part A: command-line chat loop
|-- experiments/
|   |-- common.py         the 20 test questions, rate card, helpers
|   |-- latency.py        Part C
|   |-- tokens.py         Part D
|   |-- faults.py         Part E
|   |-- evaluate.py       Part F
|-- results/              CSV files, charts and screenshots
|-- report.pdf            Part G
```

## 7. Limits of this work
- Each latency number comes from a single run per model, so small differences are noise.
- The evaluation has only 10 questions and an AI judge that can be wrong.
- The cost rates are the assumed rates from the assignment, not real prices.
- Bonus items (chat UI, dashboard and alerts, guardrail node) were not done.
