import { expect, test } from "bun:test";
import app from "./index";

test("GET / returns the greeting", async () => {
	const res = await app.request("/");
	expect(res.status).toBe(200);
	expect(await res.text()).toBe("Hello Hono!");
});

test("GET / test endpoint /hello/:name", async () => {
	const res = await app.request("/hello/Hono");
	expect(res.status).toBe(200);
	expect(await res.json()).toMatchObject({ message: "Hello, Hono!" });
});

test("GET / test endpoint /hello/:name", async () => {
	const res = await app.request("/hello/Ada%20Lovelace");
	expect(res.status).toBe(200);
	expect(await res.json()).toMatchObject({ message: "Hello, Ada Lovelace!" });
});
