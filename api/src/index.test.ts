import { expect, test } from "bun:test";
import app from "./index";

test("GET / returns the greeting", async () => {
	const res = await app.request("/");
	expect(res.status).toBe(200);
	expect(await res.text()).toBe("Hello Hono!");
});

test("GET / test greeting with params", async () => {
	const res = await app.request("/hello/Hono");
	expect(res.status).toBe(200);
	expect(await res.json()).toMatchObject({ message: `Hello, Hono!` });
});
