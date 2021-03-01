import { WebSocket, Server } from "mock-socket";
import { render } from "@testing-library/react";
import Behov from "./behov";

describe("Behov component", () => {
  let wrapper;
  const fakeURL = "ws://localhost:8080";
  let mockServer;

  beforeEach(() => {
    mockServer = new Server(fakeURL);
    wrapper = render(<Behov />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should handle ws messages", () => {
    mockServer.on("connection", (socket) => {
      socket.on("message", (data) => {});
    });
  });
});
export {};
