import { SQL, sql } from "bun";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/health", async (c) => {
	try {
		const [row] = await sql`select now() as now`;
		return c.json({ ok: true, dbTime: row.now });
	} catch (e: unknown) {
		if (e instanceof SQL.PostgresError) {
			return c.json({ ok: false, message: "postgres error" }, 503);
		} else {
			return c.json({ ok: false, message: "unknown error" }, 503);
		}
	}
});

app.get("/hello/:name", async (c) => {
	const name = c.req.param("name");
	return c.json({ message: `Hello, ${name}!` });
});

export default app;
