import { Server } from "mock-socket";
import { render } from "@testing-library/react";
import Behov from "../pages/behov";

describe("Behov component", () => {
  let wrapper;
  const fakeURL = process.env.NEXT_PUBLIC_INNSYN_WS_URL;
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(fakeURL);
    wrapper = render(<Behov />);
  });

  afterEach(() => {
    mockServer.stop();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should handle ws messages", async () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (data) => {
        socket.send(JSON.stringify({ "@løsninger": "" }));
      });
    });
    const { findByRole, findByLabelText } = wrapper;

    const submit = await findByRole("button", { name: /Løs dette/i });
    submit.click();

    expect(await findByLabelText("Løsning:")).toHaveTextContent("@løsninger");
  });
});
