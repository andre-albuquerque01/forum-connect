import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import ThreadsList from "./page";

describe("List threads", () => {
    it("should display the list threads", () => {
        const thread = render(<ThreadsList searchParams={{}} />)
        thread.debug()
    })
})