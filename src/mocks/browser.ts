// src/mocks/browser.js
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(
    http.get("/api/users", () => HttpResponse.json({ id: "abc-123" })),
);
