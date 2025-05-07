import json
import logging
from datetime import datetime, timedelta
from backend.settings import app_settings
from backend.history.cosmosdbservice import CosmosConversationClient
from backend.utils import init_openai_client, init_cosmosdb_client

# TODO: This should be a CalenderService which makes use of a CalenderEvent class / entity / model

def normalize_to_monday(date_str: str) -> str:
    """
    Normalize a date string (ISO 8601) to the Monday of that week.
    """
    try:
        dt = datetime.fromisoformat(date_str)
        monday = dt - timedelta(days=dt.weekday())
        return monday.date().isoformat()
    except Exception as e:
        logging.warning(f"Failed to normalize date: {e}")
        return date_str

#TODO: Follow single respnsibility principle. A class should only do one thing.

async def extract_and_save_events_from_chat_history(user_id, conversation_id, messages):
    """
    Extracts events from recent chat messages using Azure OpenAI and saves them to CosmosDB.
    """
    prompt = (
        "Extract all work-related tasks from the following chat messages. "
        "Return a JSON array with 'description' and 'date' (ISO 8601 format for when the task was done or mentioned).\n"
        f"Chat messages: {json.dumps(messages)}"
    )
    try:
        azure_openai_client = await init_openai_client()
        response = await azure_openai_client.chat.completions.create(
            model=app_settings.azure_openai.model,
            messages=[{"role": "system", "content": prompt}],
            temperature=0,
            max_tokens=512
        )
        content = response.choices[0].message.content
        events = json.loads(content)
    except Exception as e:
        logging.error(f"Failed to extract or parse events: {e}")
        return

    # Use CalendarEvents container for event storage
    cosmos_events_client = await init_cosmosdb_client(container_name="CalendarEvents")
    
    for event in events:
        try:
            if not event.get("description") or not event.get("date"):
                logging.warning("Event missing description or date")

                continue

            normalized_date = normalize_to_monday(event["date"])
            event_doc = {
                "user_id": user_id,
                "conversation_id": conversation_id,
                "description": event["description"],
                "event_date": normalized_date,
                "created_at": datetime.utcnow().isoformat()
            }
            
            logging.info(f"Saving event: {event_doc}")

            await cosmos_events_client.create_event(event_doc)
        except Exception as e:
            logging.error(f"Failed to save event {event} with exception. {e}")

async def get_events_for_user(user_id):
    """
    Fetch all events for a user from CosmosDB.
    """
    # Use CalendarEvents container for event retrieval
    cosmos_events_client = await init_cosmosdb_client(container_name="CalendarEvents")
    try:
        return await cosmos_events_client.get_events(user_id)
    except Exception as e:
        logging.error(f"Failed to fetch events: {e}")
        return []
