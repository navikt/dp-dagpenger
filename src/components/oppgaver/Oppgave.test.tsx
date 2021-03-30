import { render, RenderResult } from "@testing-library/react";
import { Oppgave } from "./Oppgave";

describe('Oppgave komponent', () => {
    const expected = { tittel: "TestTittel", href: "http://vg.no" };
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Oppgave oppgaveTittel={expected.tittel} href={expected.href} />);
    });

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    it('should render the correct title', () => {
        const el = wrapper.findByText(expected.tittel);
        expect(el).toBeDefined();
    });

    it('should point to the URL from props', () => {
        const result = wrapper.container.getElementsByClassName("oppgave").item(0);
        expect(result).toHaveAttribute("href", expected.href);
    });

});