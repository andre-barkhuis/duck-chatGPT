# Cosmos DB Schema Reference

This document defines the schema used in Cosmos DB for storing chat conversations and extracted calendar events.  
It serves as a single source of truth for data models used by the backend (Python), frontend (React), and tooling (e.g., GitHub Copilot or internal scripts).

---

## Database

**Name:** `db_conversation_history`

---

## Container: `conversations`

This container stores both conversation metadata and individual chat messages. The document type is distinguished using the `type` field.

**Partition Key:** `/userId`

### Document Types

#### Type: `conversation`

```json
{
  "id": "f3a2efb9-79a4-4f2e-8b02-8d93dbe49c41",
  "type": "conversation",
  "userId": "user-123",
  "title": "Quarterly Planning",
  "createdAt": "2025-05-06T09:00:00.000Z",
  "updatedAt": "2025-05-06T09:05:00.000Z"
}
```

#### Type: `message`

```json
{
  "id": "msg-456",
  "type": "message",
  "userId": "user-123",
  "conversationId": "f3a2efb9-79a4-4f2e-8b02-8d93dbe49c41",
  "role": "user",
  "content": "I completed the dashboard updates this morning.",
  "feedback": "",
  "createdAt": "2025-05-06T09:01:00.000Z",
  "updatedAt": "2025-05-06T09:01:00.000Z"
}
```

---

## Container: `CalendarEvents`

This container stores individual tasks or events extracted from chat history by the GPT-4o model.

**Partition Key:** `/user_id`

### Document Schema

```json
{
  "id": "event-001",
  "user_id": "user-123",
  "description": "Completed the dashboard updates",
  "date": "2025-05-06",
  "sourceMessageId": "msg-456",
  "conversationId": "f3a2efb9-79a4-4f2e-8b02-8d93dbe49c41"
}
```

---

## Usage Notes

- All timestamps are in ISO 8601 format (e.g., `2025-05-06T09:00:00Z`).
- Partition keys must be respected when querying and writing data.
- The `conversations` container stores both metadata and messages using a shared schema and a type discriminator.
- `CalendarEvents` should only be written after successful LLM extraction from user chat input.
- `sourceMessageId` and `conversationId` provide traceability and context linkage between events and chats.

---

## Copilot Guidance

- Reference this file when reading or writing to Cosmos DB.
- Match schema exactly for upsert or patch operations.
- When adding new fields, ensure they're documented here and indexed if needed.