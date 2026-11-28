# Chief of Staff's desk

The Owner's morning brief: today's schedule (from TalloCPA OS's `my_schedule` and the Owner's Google Calendar), and on BIR returns what is overdue, what is
due soon, and what is waiting for the Owner's approval. Prepared by the Chief of Staff, read by the Owner; it
changes nothing in TalloCPA OS.

## Before you start (TalloCPA OS)

Settings → AI employees → **Chief of Staff**:

- **On**; Books access **Summary**; **Every client** ticked.
- Connector → Tools: **Grant all** (who am I, my clients, a client, upcoming returns, trial balance, **my schedule**). If the Chief of Staff was set up before `my_schedule` existed, grant **my_schedule** now and replace the `morning-brief` skill with the new version.
- `my_schedule` is always the **Owner's** schedule: client meetings and discovery calls booked with you in the app, returns due, your tasks and requests due, and registration target dates. It does not include Google Calendar events; the desk reads those through Cowork's Google Calendar connector (step 2 below) and lists each meeting once.

## Set up the desk (Cowork, once)

1. **Connector.** Customize → Connectors → Add custom connector: name *Tallo Chief of Staff*, URL `https://app.tallocpa.com/api/mcp/chief_of_staff`. Connect, sign in, **Allow**.
2. **Project.** Create a Cowork project named **Chief of Staff**. In its connectors, turn on **only** *Tallo Chief of Staff* and **Google Calendar** (the Owner's own calendar; the brief reads it and never changes it).
3. **Instructions.** Open the project's instructions and paste all of [`project-instructions.md`](project-instructions.md).
4. **Skill.** Add the [`morning-brief`](morning-brief/SKILL.md) skill (after an update here, replace the old version with the new one): Customize → Skills → add a skill, and upload the `morning-brief` folder (or a zip of it). If your plan has no custom skills, paste the skill's steps at the end of the project instructions instead.
5. **Try it.** In the project, type: *Run my morning brief.*
6. **Schedule it.** In the project, create a scheduled task with the prompt in [`schedule.md`](schedule.md), weekdays at **6:45 AM** Manila time (before the app's 7:00 AM email). A desktop Cowork runs scheduled tasks only while the Claude app is open on that computer.

## Check it

TalloCPA OS → Settings → AI employees → Chief of Staff → **Activity** lists every call the
brief made, with the time and outcome.
