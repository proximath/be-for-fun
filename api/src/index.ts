import { sql } from "bun";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/health", async (c) => {
	const [row] = await sql`select now() as now`;
	return c.json({ ok: true, dbTime: row.now });
});

export default app;
