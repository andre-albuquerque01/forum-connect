import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import CreateUser from "./page";

describe("List sing up", () => {
    it("should display the page sing up", () => {
        const wrapper = render(<CreateUser />)
        expect(wrapper.getByText("Sing up")).toBeInTheDocument()
      })
})