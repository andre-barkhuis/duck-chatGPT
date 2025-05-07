# Task Context

After a user sends a message, you fetch recent chat history for that conversation from CosmosDB.
You send these recent messages to Azure OpenAI (GPT-4o) with a prompt to extract all work-related tasks/events, including their description and date.
The model returns a list of tasks/events, each with a description and date.
For each event, you normalize the date to the Monday of that week and save it to a CosmosDB events collection.
The frontend fetches these events from /api/calendar/events and displays them in the calendar.
This ensures the calendar shows what the user did, based on their chat history, with each event anchored to the correct week. Let me know if you want to start with the backend extraction logic!