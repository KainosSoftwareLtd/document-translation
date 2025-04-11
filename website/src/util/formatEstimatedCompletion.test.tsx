import { renderToStaticMarkup } from "react-dom/server";
import { formatEstimatedCompletion } from "./formatEstimatedCompletion";

const minute = 60;

describe("formatTimestamp", () => {

    test("calculates estimated completion correctly", () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const fiveMinutesAgoInSeconds = currentTimeInSeconds - 5 * minute;

        const element = formatEstimatedCompletion(fiveMinutesAgoInSeconds, "processing");
        const htmlString = renderToStaticMarkup(element);
    
        expect(htmlString).toContain("15 minutes");
    });

    test("calculates estimated completion correctly for single minute", () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const nineteenMinutesAgo = currentTimeInSeconds - 19 * minute;

        const element = formatEstimatedCompletion(nineteenMinutesAgo, "uploaded");
        const htmlString = renderToStaticMarkup(element);
    
        expect(htmlString).toContain("1 minute");
    });

    test("returns empty string for completed job", () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const fiveMinutesAgoInSeconds = currentTimeInSeconds - 19 * minute;

        const element = formatEstimatedCompletion(fiveMinutesAgoInSeconds, "COMPLETED");
        const htmlString = renderToStaticMarkup(element);
    
        expect(htmlString).toEqual("");
    });
});
