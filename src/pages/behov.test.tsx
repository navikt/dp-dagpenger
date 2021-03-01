import { Server } from "mock-socket";
import { render, waitFor } from "@testing-library/react";
import Behov from "./behov";

describe("Behov component", () => {
  let wrapper;
  const fakeURL = process.env.WEBSOCKET_API;
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
    await waitFor(() =>
      expect(wrapper.container).toHaveTextContent("@løsninger")
    );
  });
});
